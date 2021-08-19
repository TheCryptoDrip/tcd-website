import { NextApiRequest, NextApiResponse } from 'next';
import lib from "@emurgo/cardano-serialization-lib-nodejs";
import AssetFingerprint from '@emurgo/cip14-js';

import Cache from '../../../lib/cache';
import { isValidSession } from '../../../lib/api/helpers';

export interface NamiCacheDetails {
  address: string;
  balance: number;
  assets?: string[];
  hasLifetimeAsset: boolean;
  cached: string;
}
export interface NamiApiResponse {
  message?: {
    client: string;
    dev: string;
  };
  details?: NamiCacheDetails;
}

const CACHE_TTL = 24 * 60 * 60; // 1 day

export default async function handler(req: NextApiRequest, res: NextApiResponse<NamiApiResponse>) {
  const {
    headers: {
      session,
      address
    },
    method
  } = req;

  res.setHeader('Cache-Control', CACHE_TTL);

  // Ensure an actual user is requesting data.
  const valid = await isValidSession(session as string);
  if (!valid) {
    return res.status(403).json({
      message: {
        client: 'You must be logged in to see this!',
        dev: 'You must pass a valid <accessToken> header with your request.',
      }
    });
  }

  // Must have a hex encoded address.
  if (!address) {
    return res.status(400).json({
      message: {
        client: 'You must have Nami Wallet connected. Please try again.',
        dev: 'You must pass an <address> header with your request.'
      }
    });
  }

  const forceNewCache = 'POST' === method;
  const walletDetails = await getWalletDetals(address as string, forceNewCache);
  return res.status(200).json({
    details: walletDetails
  });
}

/**
 * Retrieves the wallet details from a hex encoded address string.
 *
 * @param {string} address The hex encoded address string given by Nami Wallet.
 * @param {boolean} force Whether or not to force a fresh copy of data.
 * @returns
 */
const getWalletDetals = async (address: string, force = false): Promise<NamiCacheDetails> => {
  const cacheKey = `${address}_details`;
  if (Cache.has(cacheKey) && !force) {
    return Cache.get(cacheKey);
  }

  const decodedAddress = decodeNamiWalletAddress(address);
  const utxos = decodedAddress ? await getUtxosFromDecodedAddress(decodedAddress) : null;
  const assets = utxos ? getAssetsFromUtxos(utxos) : null;
  const balance = utxos ? getBalanceFromUtxos(utxos) : null;
  const hasLifetimeAsset = utxos ? getLifetimeAsset(utxos) : null;

  const newData: NamiCacheDetails = {
    address: decodedAddress,
    balance,
    assets,
    hasLifetimeAsset,
    cached: new Date().toTimeString()
  };
  Cache.set(cacheKey, newData, CACHE_TTL);
  return newData;
}

/**
 * Converts the hex encoded byte string returned from Nami wallet to a readable address.
 *
 * @param {string} address A hex encoded byte string.
 * @returns {string} Readable wallet address.
 */
const decodeNamiWalletAddress = (address: string): string => {
  return lib.Address.from_bytes(
    Buffer.from(address, "hex")
  ).to_bech32();
}

/**
 * Searches an array of UTXOs for a matching policy ID.
 *
 * @param {BlockFrostUTXO[]} utxos
 * @returns {boolean} True if a matching policy ID is found.
 */
const getLifetimeAsset = (utxos: BlockFrostUTXO[]): boolean =>
  !!utxos.find(utxo =>
    utxo?.amount
      .filter((output) => output.unit !== 'lovelace')
      .find((output) => {
        const policyID = output.unit.slice(0, 56);
        return policyID === process.env.TCD_LIFETIME_POLICY_ID;
      })
  );

/**
 * Helper function to retrieve asset names from an array of UTXOs.
 *
 * @param {Array<BlockFrostUTXO>} utxos
 * @returns {Array<string>}
 */
const getAssetsFromUtxos = (utxos: BlockFrostUTXO[]): string[] => {
  const assets = utxos.reduce((acc, utxo) => {
    return acc.concat(
      utxo?.amount
        .filter((output) => output.unit !== "lovelace")
        .map((output) => {
          const _policy = output.unit.slice(0, 56);
          const _name = output.unit.slice(56);
          const fingerprint = new AssetFingerprint(
              Buffer.from(_policy, 'hex'),
              Buffer.from(_name, 'hex')
          ).fingerprint();

          return fingerprint;
        })
    );
  }, []);

  return assets;
}

/**
 * Gets the total ADA balance of a user's address.
 *
 * @param {BlockFrostUTXO[]} utxos
 * @returns {number} Balance in ADA.
 */
const getBalanceFromUtxos = (utxos: BlockFrostUTXO[]): number => {
  const balance = utxos.reduce((total, utxo) => {
    const lovelace = utxo?.amount.filter(
      (output) => output.unit === "lovelace"
    )[0].quantity;
    return total + parseInt(lovelace);
  }, 0);

  // Convert to whole ADA
  return balance / 1000000;
}

/**
 * Retrieves an array of UTXOs from the Blockfrost API.
 *
 * @param {string} address The human-readable wallet address.
 * @returns {Promise<BlockFrostUTXO[]>} An array of UTXOs.
 */
const getUtxosFromDecodedAddress = async (address: string): Promise<BlockFrostUTXO[]> => {
  const freshUtxos = await (
    await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}/utxos`,
      {
        headers: {
          project_id: process.env.BLOCKFROST_API_KEY,
        },
      }
    )
  ).json() as Promise<BlockFrostUTXO[]>;

  return freshUtxos;
}
