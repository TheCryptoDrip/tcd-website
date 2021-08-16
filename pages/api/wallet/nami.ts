import { NextApiRequest, NextApiResponse } from 'next';
import lib from "@emurgo/cardano-serialization-lib-nodejs";
import AssetFingerprint from '@emurgo/cip14-js';

import Cache from '../../../lib/cache';
import { isValidSession } from '../../../lib/api/helpers';

export interface NamiApiResponse {
  message?: {
    client: string;
    dev: string;
  };
  data?: any;
  cached?: boolean;
}

const CACHE_TTL = 24 * 60 * 60; // 1 day

export default async function handler(req: NextApiRequest, res: NextApiResponse<NamiApiResponse>) {
  const {
    headers: {
      session,
      address
    }
  } = req;

  res.setHeader('Cache-Control', CACHE_TTL);

  const valid = await isValidSession(session as string);
  if (!valid) {
    return res.status(403).json({
      message: {
        client: 'You must be logged in to see this!',
        dev: 'You must pass a valid <accessToken> header with your request.',
      }
    });
  }

  if (!address) {
    return res.status(400).json({
      message: {
        client: 'Something went wrong, contact support.',
        dev: 'You must pass an <address> header with your request.'
      }
    });
  }

  const cacheKey = getUtxoCacheKey(address as string);
  if (Cache.has(cacheKey)) {
    return res.status(200).json({
      data: Cache.get(cacheKey),
      cached: true
    });
  } else {
    Cache.set(cacheKey, address, CACHE_TTL);
    return res.status(200).json({
      data: address,
      cached: false
    })
  }


  // console.log(Cache.keys())

  // if (Cache.has(cacheKey)) {
  //   console.log('cached');
  //   return res.status(200).json(Cache.get(cacheKey));
  // }

  // const set = Cache.set(cacheKey, address, CACHE_TTL);
  // if (set) {
  //   console.log('fresh');
  //   return res.status(200).json({
  //     error: false,
  //     data: {
  //       address
  //     }
  //   });
  // } else {
  //   return res.status(400).json({
  //     error: true,
  //     messages: {
  //       client: 'Oops, try again.',
  //       dev: 'The cache was not set.'
  //     }
  //   });
  // }

  // const decodedAddress = lib.Address.from_bytes(
  //   Buffer.from(address, "hex")
  // ).to_bech32();
  // let assets = [];
  // let balance = 0;

  // if (decodedAddress) {
  //   const utxos = await getUtxosFromDecodedAddress(decodedAddress, fresh);

  //   balance = utxos.reduce((total, utxo) => {
  //     const lovelace = utxo?.amount.filter(
  //       (output) => output.unit === "lovelace"
  //     )[0].quantity;
  //     return total + parseInt(lovelace);
  //   }, 0);

  //   assets = utxos.reduce((acc, utxo) => {
  //     return acc.concat(
  //       utxo?.amount
  //         .filter((output) => output.unit !== "lovelace")
  //         .map((output) => {
  //           const _policy = output.unit.slice(0, 56);
  //           const _name = output.unit.slice(56);
  //           const fingerprint = new AssetFingerprint(
  //               Buffer.from(_policy, 'hex'),
  //               Buffer.from(_name, 'hex')
  //           ).fingerprint();

  //           return fingerprint;
  //         })
  //     );
  //   }, []);
  // }

  // const data = {
  //   decodedAddress,
  //   assets,
  //   balance,
  // };

  // res.status(200).json(data);
}

const getUtxoCacheKey = (address: string): string => `${address}_utxos`;

const getUtxosFromDecodedAddress = async (address: string, fresh: boolean = false): Promise<BlockFrostUTXO[]> => {
  const cacheKey = getUtxoCacheKey(address);
  const cachedUtxos = Cache.get(cacheKey) as BlockFrostUTXO[];

  console.log('cached', address, cachedUtxos);

  if (cachedUtxos && !fresh) {
    return cachedUtxos;
  }

  const freshUtxos = await (
    await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}/utxos`,
      {
        headers: {
          project_id: "vCYz2BoiH2AsolrJcgjF3GpsC1gGpsqa",
        },
      }
    )
  ).json() as Promise<BlockFrostUTXO[]>;

  Cache.set(cacheKey, freshUtxos, 72 * 60 * 60); // 3 days cached
  return freshUtxos;
}
