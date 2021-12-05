import { GiftVoucherAbi } from '../ABIs/types';
import { useEthers } from '@usedapp/core';
import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import {NETWORKS} from "../Constants/Addresses"


const useGetEthPrice = () : number => {
  const { library, chainId } = useEthers();
  try 
    {
      const signer: JsonRpcSigner | undefined = library?.getSigner();
      const { ethers } = require("ethers");
      const targetNetwork = NETWORKS.rinkeby; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
      const infuraID = "1406b6d9dc5f4683b64a286e6b002052";
      const infuraPath = "https://mainnet.infura.io/v3/" + infuraID;
      console.log("infuraPath" + infuraPath);

    const scaffoldEthProvider = navigator.onLine
      ? new ethers.providers.StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544")
      : null;
    const poktMainnetProvider = navigator.onLine
      ? new ethers.providers.StaticJsonRpcProvider(
          "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
        )
      : null;
    const mainnetInfura = navigator.onLine
      ? new ethers.providers.StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + process.env.InfuraID)
      : null;
    
      const mainnetProvider =
      poktMainnetProvider && poktMainnetProvider._isProvider
        ? poktMainnetProvider
        : scaffoldEthProvider && scaffoldEthProvider._network
        ? scaffoldEthProvider
        : mainnetInfura;

      const price = useExchangeEthPrice(targetNetwork, mainnetProvider);
      console.log("price: "+ price);
      
      return price;
    }
    catch (err)
    {
      console.log(err);
      return 0;
    }
  };

  export default useGetEthPrice;