import { GiftVoucherAbi } from '../../ABIs/types';
import ABI from '../../ABIs/GiftVoucher.abi.json';
import { NFT_ADDRESSES } from '../../Constants/Addresses';
import React, { useState } from 'react';
import { JsonRpcSigner } from '@ethersproject/providers';
import { getExplorerTransactionLink, useEthers } from '@usedapp/core';
import useContract from '../../Hooks/useContract';
import image from '../../Assets/Images/Gift-Voucher1.png';
import MintButton from '../../Components/MintButton/MintButton';
import { Link } from "@material-ui/core";

import {
	useBalance,
	useContractLoader,
	useContractReader,
	useGasPrice,
	useOnBlock,
	useUserProviderAndSigner,
  } from "eth-hooks";
  import { useEventListener } from "eth-hooks/events/useEventListener";
  import { useExchangeEthPrice } from "eth-hooks/dapps/dex";

const { ethers } = require("ethers");


export default function GiftVoucher() {
	const contract = useContract<GiftVoucherAbi>(
		NFT_ADDRESSES,
		ABI
	);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [txHash, setTxHash] = useState<string | undefined>(undefined);
	const { library, chainId } = useEthers();
	const [errorMessage, setErrorMessage] = useState('');
	const [voucherPurchased, setVoucherPurchased] = useState('');

	const buyVoucher = async (name: string) => {
		const signer: JsonRpcSigner | undefined = library?.getSigner();
		setErrorMessage("");
		if (signer) {

			try{
				
				const tx = await contract
					?.connect(signer)
					.buyVoucher({ value: ethers.utils.parseEther("0.1") });

				if (chainId && tx) {
					setIsDisabled(true);
					const link = getExplorerTransactionLink(tx?.hash, chainId);
					setTxHash(link);
				}

				await tx?.wait();
				console.log("txvalue" + tx?.value);
				console.log("txdata" + tx?.data);
				console.log("txdata" + tx?.v?.toString());


				setIsDisabled(false);
				//setTxHash(undefined);
				setVoucherPurchased('You ')
			}
			catch(error)
			{
				console.log(error);
				setErrorMessage(""+error);
			}
		}
	};
if(voucherPurchased)
{
	return(
		<div>
			Thanks for buying the gift voucher. 
			You can see this voucher under your <Link href="/voucher/mgmt">voucher management page</Link>.
			
		</div>
	)
}
else
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
			<div>
				{errorMessage && (
			 		 <p className="error"> {errorMessage} </p>
				)}
			</div>
		</div>
	);
}
