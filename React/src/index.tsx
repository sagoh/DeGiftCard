import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChainId, Config, DAppProvider } from '@usedapp/core';

const client = new QueryClient();

const alchemyKey =
	process.env.REACT_APP_ALCHEMY_KEY ;

const config = {
	readOnlyChainId: ChainId.Rinkeby,
	readOnlyUrls: {
		[ChainId.Rinkeby]: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyKey}`,
	},
	supportedChains: [ChainId.Rinkeby],
};



ReactDOM.render(
  <DAppProvider config={config}>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </DAppProvider>,
  document.getElementById('root')
);
