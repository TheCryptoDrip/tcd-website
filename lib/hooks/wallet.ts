import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { NamiApiResponse } from '../../pages/api/wallet/nami';

export const useWalletData = (force = false): [NamiApiResponse | [], boolean] => {
  const [loadingWalletData, updateLoadingWalletData] = useState(false);
  const [walletData, updateWalletData] = useState<NamiApiResponse | null>(null);
  const [session, isLoading] = useSession();

  const syncWalletData = useCallback(async () => {
    updateLoadingWalletData(true);
    const isEnabled = await window.cardano.isEnabled();
    const address = isEnabled ? await window.cardano.getUsedAddresses() : null;
    const data: NamiApiResponse = address ? await (await fetch(`/api/wallet/nami`, {
      headers: {
        'address': address[0],
        'session': session.accessToken as string
      }
    })).json() : [];

    updateWalletData(data);
    updateLoadingWalletData(false);
  }, [session]);

  useEffect(() => {
    if (isLoading || !session) {
      return;
    }
    syncWalletData();
  }, [isLoading]);

  return [walletData, loadingWalletData];
}
