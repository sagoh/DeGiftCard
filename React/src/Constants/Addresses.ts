import { ChainId } from '@usedapp/core';

export type AddressMap = { [chainId: number]: string };

export const NFT_ADDRESSES: AddressMap = {
	[ChainId.Rinkeby]: '0x7531ed4B65C5e13Cd89eBd76C6dC377edE75A6F3',
};
