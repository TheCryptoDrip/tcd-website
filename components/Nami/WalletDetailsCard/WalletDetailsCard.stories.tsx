import React from 'react';

import { Meta } from '@storybook/react';

import { WalletDetailsCard, WalletDetailsCardProps } from './index';

export default {
  title: 'Components/WalletDetailsCard',
  component: WalletDetailsCard,
} as Meta;

export const WithData = () => <WalletDetailsCard data={{ details: { address: 'addr1q99se7swct7qsghpu7tfe02vt7gle089xct8y25yjjnryuk5pckwdhpqgv20fnvy30u9mylpq7knjdunxuz2jen56jpsc6gywg', balance: 400220 }, status: 200 }} />
export const WithError = () => <WalletDetailsCard data={{ message: { dev: 'This is a console message.', client: 'This is a client message.' }, status: 400 }} />
export const NoData = () => <WalletDetailsCard data={null} />
