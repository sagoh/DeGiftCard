import React, { useEffect, useState } from 'react';
import useContract from '../../Hooks/useContract';
import { GiftVoucherAbi } from '../../ABIs/types';
import ABI from '../../ABIs/GiftVoucher.abi.json';
import { NFT_ADDRESSES } from '../../Constants/Addresses';
import Grid from '@material-ui/core/Grid';
import { getExplorerTransactionLink, useEthers } from '@usedapp/core';
import { JsonRpcSigner } from '@ethersproject/providers';
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
import { BigNumber } from '@ethersproject/bignumber';

const { ethers } = require("ethers");

//const readContracts = useContractLoader(localProvider, contractConfig);


type IProps = {
    address: string;
  };

export default function GiftVoucherMgt() {
    const { library, chainId } = useEthers();
    
    const contract = useContract<GiftVoucherAbi>(
        NFT_ADDRESSES,
        ABI
    );
    
/*
    const loadVoucher = async(address:string) : Promise<int[]> => {
        const signer: JsonRpcSigner | undefined = library?.getSigner();
        if (signer) {

            const voucherTokenIDs = await contract
            ?.connect(signer)
            .getOwnedVoucher(address,false);
            
              console.log("voucherTokenID:", voucherTokenIDs?.values);

              return voucherTokenIDs?.values;
            }
    }

    const vouchers = loadVoucher(props.address);
    */
    return (<div>Voucher Management</div>
    )
}