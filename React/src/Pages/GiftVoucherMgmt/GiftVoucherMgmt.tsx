import React, { useEffect, useState } from 'react';
import useContract from '../../Hooks/useContract';
import useOwnVouchers from '../../Hooks/useOwnVouchers';
import { GiftVoucherAbi } from '../../ABIs/types';
import ABI from '../../ABIs/GiftVoucher.abi.json';
import { NFT_ADDRESSES } from '../../Constants/Addresses';
import Grid from '@material-ui/core/Grid';
import {Link,Button} from '@material-ui/core';
import {useEthers } from '@usedapp/core';
import NotAuthenticated from "../NotAuthenticated/NotAuthenticated"
import { BigNumber } from '@ethersproject/bignumber';
//const readContracts = useContractLoader(localProvider, contractConfig);

export default function GiftVoucherMgt() {
    const [ownedVouchers, setOwnVouchers] = useState([] as BigNumber[] | undefined);
    const { account } = useEthers();
    
    const contract = useContract<GiftVoucherAbi>(
        NFT_ADDRESSES,
        ABI
    );
    
    useOwnVouchers(account,contract,false).then(
        res => {
          setOwnVouchers(res);
        }
      )
      
    

    

    
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