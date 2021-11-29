import { GiftVoucherAbi } from '../../ABIs/types';
import ABI from '../../ABIs/GiftVoucher.abi.json';
import { NFT_ADDRESSES } from '../../Constants/Addresses';
import React, { useState } from 'react';
import { JsonRpcSigner } from '@ethersproject/providers';
import { getExplorerTransactionLink, useEthers } from '@usedapp/core';
import useContract from '../../Hooks/useContract';
import image from '../../Assets/Images/Gift-Voucher1.png';
import MintButton from '../../Components/MintButton/MintButton';



export default function GiftVoucher() {
	const contract = useContract<GiftVoucherAbi>(
		NFT_ADDRESSES,
		ABI
	);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [txHash, setTxHash] = useState<string | undefined>(undefined);
	const { library, chainId } = useEthers();

	const buyVoucher = async (name: string) => {
		const signer: JsonRpcSigner | undefined = library?.getSigner();

		if (signer) {
			const tx = await contract
				?.connect(signer)
				.buyVoucher();

			if (chainId && tx) {
				setIsDisabled(true);
				const link = getExplorerTransactionLink(tx?.hash, chainId);
				setTxHash(link);
			}

			await tx?.wait();
			//props.handleUpdate(tx?.hash);

			setIsDisabled(false);
			setTxHash(undefined);
		}
	};

	return (
		<div>
			<h1>0.1 Eth Gift Voucher</h1>
			<img className='image' src={image} alt='NFT Voucher' />
			<MintButton
				text='Buy'
				onClick={buyVoucher}
				isDisabled={isDisabled}
			/>
			<div>
				<a href={txHash} target='_blank' rel='noreferrer'>
					{txHash}
				</a>
			</div>
		</div>
	);
}
