import { FC } from 'react';
import { NamiApiResponse } from '../../../pages/api/wallet/nami';

export interface WalletDetailsCardProps {
  data: NamiApiResponse | null
}

export const WalletDetailsCard: FC<WalletDetailsCardProps> = (props) => {
  const { data } = props;

  if (!data) {
    return <p>Nothing to see here!</p>
  }

  if (data?.message) {
    process.env.NODE_ENV === 'development' && console.log(data?.message.dev);
    return <p>{data?.message.client}</p>;
  }

  return (
    <p>Example Card</p>
  )
}
