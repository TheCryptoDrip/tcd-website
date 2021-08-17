import { FC } from 'react';
import cs from 'classnames';

import { NamiApiResponse } from '../../../pages/api/wallet/nami';

export interface WalletDetailsCardProps {
  data: NamiApiResponse | null,
  className?: string;
}

export const WalletDetailsCard: FC<WalletDetailsCardProps> = (props) => {
  const { data, className, ...rest } = props;

  if (!data) {
    return <p>Nothing to see here!</p>
  }

  if (data?.message) {
    process.env.NODE_ENV === 'development' && console.log(data?.message.dev);
    return <p>{data?.message.client}</p>;
  }

  return (
    <div className={cs('p-4 border-2 rounded-md border-gray-500 whitespace-pre-wrap break-all w-2/5', className)} {...rest}>
      <p>
        <strong>Address:</strong> {data?.details.address}<br/>
        <strong>Balance:</strong> {data?.details.balance}
      </p>
    </div>
  )
}
