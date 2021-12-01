import React, { useEffect, useState } from 'react';
import useContract from '../../Hooks/useContract';
import { GiftVoucherAbi } from '../../ABIs/types';
import ABI from '../../ABIs/GiftVoucher.abi.json';
import { NFT_ADDRESSES } from '../../Constants/Addresses';
import Grid from '@material-ui/core/Grid';
import {Link,Button} from '@material-ui/core';
import { getExplorerTransactionLink, useEthers } from '@usedapp/core';
import { JsonRpcSigner } from '@ethersproject/providers';
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
import ens from "../../Components/Account/Account"

const { ethers } = require("ethers");
//const readContracts = useContractLoader(localProvider, contractConfig);

export default function GiftVoucherMgt() {
    const [ownedVouchers, setOwnVouchers] = useState([] as BigNumber[] | undefined);
    const { account,library, chainId } = useEthers();
    
    const contract = useContract<GiftVoucherAbi>(
        NFT_ADDRESSES,
        ABI
    );
    
    useEffect(() => {
      const loadVoucher = async()  => {
        const signer: JsonRpcSigner | undefined = library?.getSigner();
        console.log("giftvouchermgmt:"+account);
        if (signer) {

            const voucherTokenIDs = await contract
            ?.connect(signer)
            .getOwnedVoucher("" + account,false);
                      
            setOwnVouchers(voucherTokenIDs);
            
            }

      };

      loadVoucher();

    }, [account,library]);

    

    
    return (
      <>
        {!account ?(
          <NotAuthenticated />
        ):
        ( 
          <p>
            <Grid container spacing={3}>

            {ownedVouchers?.map(item => (
              <>
                  <Grid item xs={8}>
                    <>
                      {"Voucher No :" + item}
                    </>
                  </Grid>
                  <Grid item xs={4}>
                    <>
                      <Button>
                        <Link href={"/voucher/details/" + item}>
                            Details
                        </Link>
                      </Button>
                    </>
                  </Grid>
              </>   
              ))}
              </Grid>
              
            

          </p>
        )        
        }
      </>
    );
}