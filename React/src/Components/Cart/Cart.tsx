import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../../App';
import { BigNumber } from '@ethersproject/bignumber';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useGetEthPrice from '../../Hooks/useGetEthPrice';
import {useEthers } from '@usedapp/core';
import useContract from '../../Hooks/useContract';
import useOwnVouchers from '../../Hooks/useOwnVouchers';
import { SelectChangeEvent } from "@mui/material";
import { GiftVoucherAbi } from '../../ABIs/types';
import { NFT_ADDRESSES } from '../../Constants/Addresses';
import ABI from '../../ABIs/GiftVoucher.abi.json';
import { DiscFullOutlined } from '@material-ui/icons';
import { Button } from "@material-ui/core";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const { account } = useEthers();
  const [selVoucher, setSelVoucher] = useState('' as string | undefined);
  const [voucherEthDisc, setVoucherEthDisc] = useState(0 as number);
  const [voucherDollarDisc, setVoucherDollarDisc] = useState(0 as number);
  const [ownedVouchers, setOwnVouchers] = useState([] as BigNumber[] | undefined);
    
  const contract = useContract<GiftVoucherAbi>(
      NFT_ADDRESSES,
      ABI
  );
  
  useOwnVouchers(account,contract,false).then(
      (res )  => {
        setOwnVouchers(res);
      }
    )

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ((ack + item.amount * item.price)), 0);
  
  // should calculate total be in effect? if not will it load when the value change .
  /*useEffect(() => {
    const calculateTotal = (items: CartItemType[]) =>
          items.reduce((ack: number, item) => (ack + item.amount * item.price) - voucherDollarDisc , 0);

    //()s

  }, [cartItems,voucherDollarDisc])*/
  //event: SelectChangeEvent(string)

  const calculateAftDisc = (total: number, discount : number) : number => 
  {
     if(total >= discount)
     {
       return total - discount;
     }
     else
     {
       return 0;
     }
  }

  const ethPrice = 4000;
 //const ethPrice = 123;
  
  const handleChange = (event: SelectChangeEvent<string>) => {   
    if(event.target.value  == "Select")
    {
      setSelVoucher(""); 
      setVoucherDollarDisc(0);
      setVoucherEthDisc(0);
    }
    else
    {
      setSelVoucher("" + event.target.value); 
      console.log("ethPrice :" + ethPrice); 
      console.log("SelVoucher:"+selVoucher);
      setVoucherDollarDisc(ethPrice * 0.1);
      setVoucherEthDisc(0.1);
    }
     //since we assume all voucher is 0.1 eth
    //for real life example will need to pull th voucher value
    
    // use chainlink get eth in dollar dollar 
    
  };

  /*const handleChange = (event) => {
    setSelVoucher(event.target.value);
  };*/

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <hr />
      <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gift Voucher</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selVoucher}
            label="Gift Voucher"
            onChange={handleChange}
          >
          <MenuItem key="-1" value="Select">
            Select
          </MenuItem>
          {
              ownedVouchers?.map(item => (
                  <MenuItem key={item.toNumber()} value={item.toString()}>
                  {"" + item }
                  </MenuItem>
                )

              )
            }
          </Select>
        </FormControl>
      </Box>
      </>
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <h2>Voucher Discount: ${voucherDollarDisc}</h2>
      <h2>Total ex Discount: ${calculateAftDisc(calculateTotal(cartItems),voucherDollarDisc).toFixed(2)}</h2>
      <Button variant="contained">Pay</Button>
    </Wrapper>
  );
};

export default Cart;
