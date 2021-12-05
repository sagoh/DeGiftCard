import { ChainId } from '@usedapp/core';

export type AddressMap = { [chainId: number]: string };

export const NFT_ADDRESSES: AddressMap = {
	[ChainId.Rinkeby]: '0x7531ed4B65C5e13Cd89eBd76C6dC377edE75A6F3',
};

//const infuraID = process.env.InfuraID;
const infuraID = "1406b6d9dc5f4683b64a286e6b002052";


export const NETWORKS = {

	localhost: {
	  name: "localhost",
	  color: "#666666",
	  chainId: 31337,
	  blockExplorer: "",
	  rpcUrl: "http://" + window.location.hostname + ":8545",
	},
	mainnet: {
	  name: "mainnet",
	  color: "#ff8b9e",
	  chainId: 1,
	  rpcUrl: "https://mainnet.infura.io/v3/" + "-hGaD3Kdebo8_Q5fYjPEUkn6qTjcKKoR",
	  blockExplorer: "https://etherscan.io/",
	},
	kovan: {
	  name: "kovan",
	  color: "#7003DD",
	  chainId: 42,
	  rpcUrl: "https://kovan.infura.io/v3/" + process.env.InfuraID,
	  blockExplorer: "https://kovan.etherscan.io/",
	  faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
	},
	rinkeby: {
	  name: "rinkeby",
	  color: "#e0d068",
	  chainId: 4,
	  rpcUrl: "https://rinkeby.infura.io/v3/" + process.env.InfuraID,
	  faucet: "https://faucet.rinkeby.io/",
	  blockExplorer: "https://rinkeby.etherscan.io/",
	}
};