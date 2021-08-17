import dynamic from 'next/dynamic';

import { useWalletData } from '../../lib/hooks/wallet';

const WalletData = dynamic(() => import('./WalletDetailsCard').then(mod => mod.WalletDetailsCard));

export const NamiWalletCard = () => {
  const [wallet, isLoadingWallet] = useWalletData();
  console.log(wallet);
  return (
    <div className={`p-4 m-4 radius-lg border-1-gray`}>
      {isLoadingWallet
        ? <p>Fetching wallet details...</p>
        : <WalletData data={wallet} />}
    </div>
  )
}
