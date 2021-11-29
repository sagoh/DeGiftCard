
import {Container, Wrapper, Left, Language,SearchContainer,Input, Center,Logo, Right, MenuItem} from './Navbar.styles'
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge,Button,Link } from "@material-ui/core";
import { shortenIfAddress, useEthers } from '@usedapp/core';
import React, { useEffect, useState } from 'react';
import Account from '../Account/Account';

const Navbar = () => {
    const { activateBrowserWallet, account, library } = useEthers();
	const [ens, setEns] = useState<string | null | undefined>(null);
	const [newTransaction, setNewTransaction] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		const isEns = async () => {
			if (account && library) {
				const _ens = await library?.lookupAddress(account);
				setEns(_ens);
			}
		};

		isEns();
	}, [account, library]);

    const doLogin = () => {
        //const navigate = useNavigate();
        activateBrowserWallet();
        /*if (accountVar)
        {
            sessionStorage.setItem('account',JSON.stringify(account));
        }*/
    }

	const formatAddress = () => {
		return ens ?? shortenIfAddress(account);
	};
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