import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
// Components
import Item from './Components/Item/Item';
import Cart from './Components/Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/NavBar/Navbar";
import Newsletter from "./Components/Newsletter/Newsletter";
import Slider from "./Components/Slider/Slider";
import Home from "./Pages/Home/Home";
import GiftVoucher from "./Pages/GiftVoucher/GiftVoucher";
import NotFound from "./Pages/NotFound/NotFound";
import GiftVoucherMgt from './Pages/GiftVoucherMgmt/GiftVoucherMgmt';
import GiftVoucherDetails from './Pages/GiftVoucherDetails/GiftVoucherDetails'
// Styles
import { Wrapper, StyledButton } from './App.styles';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);



  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Router>
      <Wrapper>
        <Navbar />
                
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
        
        <Routes>
          <Route path='/' element={<Home handleAddToCart={handleAddToCart} />} />
          <Route path='/voucher/new' element={<GiftVoucher />} />
          <Route path='/voucher/mgmt' element={<GiftVoucherMgt/>} />
          <Route path='/voucher/details/:voucherID' element={<GiftVoucherDetails/>} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      
      </Wrapper>
    </Router>
  );
};

export default App;
