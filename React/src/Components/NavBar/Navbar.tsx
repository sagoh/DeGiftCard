
import {Container, Wrapper, Left, Language,SearchContainer,Input, Center,Logo, Right, MenuItem} from './Navbar.styles'
import { Search } from "@material-ui/icons";
import { Link,Button, Menu } from "@material-ui/core";
import Account from '../Account/Account';
import React from "react";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

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
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                   <Button variant="contained" {...bindTrigger(popupState)}>
                      Vouchers
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}><Link href="/voucher/new">New Voucher</Link></MenuItem>
                    <MenuItem onClick={popupState.close}><Link href="/voucher/mgmt">List</Link></MenuItem>
                  </Menu>
                 </React.Fragment>
              )}
            </PopupState>
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