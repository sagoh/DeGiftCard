import { GiftVoucherAbi } from '../ABIs/types';
import { useEthers } from '@usedapp/core';
import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';


const useOwnVouchers = async(account : string | null | undefined,contract : GiftVoucherAbi | null, onlyUsable : boolean ) : Promise<BigNumber[] | undefined>=> {
    const { library, chainId } = useEthers();
    try 
    {
        const signer: JsonRpcSigner | undefined = library?.getSigner();
        console.log("giftvouchermgmt:"+account);
        if (signer) {

            const voucherTokenIDs = await contract
            ?.connect(signer)
            .getOwnedVoucher("" + account,onlyUsable);
            
            return voucherTokenIDs;
            //setOwnVouchers(voucherTokenIDs);
            
            }
        return [];
    } catch (err)
    {
        console.log(err);
        return [];
    }

  };

  export default useOwnVouchers;