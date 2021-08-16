import { FC } from 'react';

interface WalletDataProps {
  data: NamiApiResponse;
}

const WalletData: FC<WalletDataProps> = (props) => {
  const { data } = props;

  if (!data) {
    return <p>Nothing to see here!</p>
  }

  if (data?.error) {
    process.env.NODE_ENV === 'development' && console.log(data?.message.dev);
    return <p>{data?.message.client}</p>;
  }

  return null;
}

export default WalletData;
