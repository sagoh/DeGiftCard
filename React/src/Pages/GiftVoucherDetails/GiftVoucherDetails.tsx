import React, { useEffect, useState } from 'react';
import useContract from '../../Hooks/useContract';
import { GiftVoucherAbi } from '../../ABIs/types';
import ABI from '../../ABIs/GiftVoucher.abi.json';
import { NFT_ADDRESSES } from '../../Constants/Addresses';
import Grid from '@material-ui/core/Grid';
import {Link,Button} from '@material-ui/core';
import { getExplorerTransactionLink, useEthers } from '@usedapp/core';
import { JsonRpcSigner } from '@ethersproject/providers';
import { useParams } from 'react-router-dom';
import VoucherDetails from "../../Components/VoucherDetails/VoucherDetails"
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated"
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
import TransferVoucher from "../../Components/TransferVoucher/TransferVoucher";
const { ethers } = require("ethers");
//const readContracts = useContractLoader(localProvider, contractConfig);
type Props ={
  voucherID : BigNumber
}

export default function GiftVoucherDetails ()  {

      type t_VoucherDetails = {
        deadline: string;
        amount: string;
        voucherName: string;
        isAvailable: boolean;
        usedBy: string;
        broughtBy: string,
        ownBy: string
    }

    const [vourcherDetails, setVourcherDetails] = useState<t_VoucherDetails>();
    const [transVourcher,setTransferVoucher] = useState<string>("");
    const [error,setError] = useState("" as string);
    const { account,library, chainId } = useEthers();
    const { voucherID } = useParams();
    const signer: JsonRpcSigner | undefined = library?.getSigner();

    
    const contract = useContract<GiftVoucherAbi>(
        NFT_ADDRESSES,
        ABI
    );

    const handleTransferVoucher = async(address: string) => {
      if(signer)
      {
        try
        {
          const vDetails = await contract
                ?.connect(signer)
                .giveVoucher(BigNumber.from(voucherID),address);
          setTransferVoucher("Transfer Successful");
        }
        catch (err)
        {
          setError("" + err);

        }

      }
     
    };


    useEffect(() => {
    const loadVoucherDetails = async() =>{
    //: Promise<[BigNumber, string, string, boolean, string, string, string]>  => {
        console.log("giftvouchermgmt:"+account);
        var defaultVoucherDetails : [BigNumber, string, string, boolean, string, string, string] = [BigNumber.from(0),"","",false,"","",""];
        if (signer) {
          try{
            const bigNumberVoucherID = BigNumber.from(voucherID);
            if(BigNumber.isBigNumber(bigNumberVoucherID))
            {
              
              const vDetails = await contract
              ?.connect(signer)
              .getVoucherDetails(bigNumberVoucherID) ;

              //setVourcherDetails(vDetails);
              var tup_vDetails : [BigNumber, string, string, boolean, string, string, string] ;
              tup_vDetails = vDetails as [BigNumber, string, string, boolean, string, string, string];
              var s_voucherDetails : t_VoucherDetails = {
                deadline: BigNumber.from(tup_vDetails[0]).toString(),
                amount: tup_vDetails[1],
                voucherName: tup_vDetails[2],
                isAvailable: tup_vDetails[3],
                usedBy: tup_vDetails[4],
                broughtBy: tup_vDetails[5],
                ownBy: tup_vDetails[6]
              };
               
              console.log(JSON.stringify(s_voucherDetails));
              console.log(s_voucherDetails);
              
              setVourcherDetails(s_voucherDetails);
              //console.log(JSON.stringify(vDetailsTuple[0]));
              
              //return vDetailsTuple;
              //setVourcherDetails(JSON.parse(vDetails));
              
              
            }
            else
            {
              setError("VoucherID is not number");
            }
          }
          catch (err)
            {
              setError("" +err);
            }
            //return defaultVoucherDetails;
        }
  // return defaultVoucherDetails;
    };

    loadVoucherDetails() ;
  },[transVourcher]);

    
    return (
      <>
      {error?
        (
          <div>
            {error}
          </div>
        )
        :
        (
          vourcherDetails ?
            ( 
              <>
              <VoucherDetails 
                deadline={vourcherDetails.deadline}
                amount={vourcherDetails.amount}
                voucherName={vourcherDetails.voucherName}
                isAvailable={vourcherDetails.isAvailable}
                usedBy={vourcherDetails.usedBy}
                boughtBy={vourcherDetails.broughtBy}
                ownBy={vourcherDetails.ownBy}
    
              />
              <br/>
              <TransferVoucher 
                transferVoucher = {handleTransferVoucher}
                transferState = {transVourcher}
              />
              </>
            ) :
            ( <> Not Voucher Details for this voucher number</>)       
        )
      }
      
      </>
    );     
    }   
        