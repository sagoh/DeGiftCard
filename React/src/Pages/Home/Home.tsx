import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from '../../Components/Item/Item';
import Cart from '../../Components/Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/NavBar/Navbar";
import Newsletter from "../../Components/Newsletter/Newsletter";
import Slider from "../../Components/Slider/Slider";
import { CartItemType } from '../../App';
import { Wrapper, StyledButton } from './Home.styles';


const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

type Props = {
    handleAddToCart:(clickedItem: CartItemType) => void;
}
 
const Home : React.FC<Props> = ({ handleAddToCart })  => {
    const { data, isLoading, error } = useQuery<CartItemType[]>(
        'products',
        getProducts
      );
      console.log(data);
  
    return (
        <Wrapper>
          <Slider />
          <Grid container spacing={3}>
            {data?.map(item => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
          <Newsletter/>
          <Footer/>
        
        </Wrapper>
    );
  };
  
  export default Home;
    