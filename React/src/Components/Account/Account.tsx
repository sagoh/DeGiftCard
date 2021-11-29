import React, { useEffect, useState } from 'react';
import { shortenIfAddress, useEthers } from '@usedapp/core';
import { Badge,Button } from "@material-ui/core";


export default function Account() {
	const { activateBrowserWallet, account, library } = useEthers();
	const [ens, setEns] = useState<string | null | undefined>(null);
	const [newTransaction, setNewTransaction] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		const isEns = async () => {
			if (account && library) {
				const _ens = await library?.lookupAddress(account);
				setEns(_ens);
			}
		};

		isEns();
	}, [account, library]);

	const formatAddress = () => {
		return ens ?? shortenIfAddress(account);
	};

	const _handleUpdate = (_newTransaction: string) => {
		setNewTransaction(_newTransaction);
	};

	return (
		<>
			{console.log("account"+ account)}
			{!account ? (
				<>
				<Button onClick={() => {
					console.log("activatewallet");
                    activateBrowserWallet();
                }} >Connect wallet</Button>
				</>
			) : (
				<>
					<p className='text'>Connected: {formatAddress()}</p>
				</>
			)}
		</>
	);
}