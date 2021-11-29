
import {Container, Wrapper, Left, Language,SearchContainer,Input, Center,Logo, Right, MenuItem} from './Navbar.styles'
import { Search } from "@material-ui/icons";
import { Link } from "@material-ui/core";
import Account from '../Account/Account';

const Navbar = () => {
  
    return (
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link href="/">
              <Logo>Shopping Mall.</Logo>
            </Link>
          </Center>
          <Right>
            <MenuItem>
              <Link href="/voucher/new">
              Buy Voucher
              </Link>
            </MenuItem>
            <MenuItem>
              <Account />
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>
    );
  };
  
  export default Navbar;