import React from 'react';
import PropTypes from 'prop-types';
// Helpers
// Styles
import { Wrapper, Content } from './VoucherDetails.styles';
import { BigNumber } from '@ethersproject/bignumber';

type Props = {
    deadline: string,
    amount: string,
    voucherName: string,
    isAvailable: boolean,
    usedBy: string,
    boughtBy: string,
    ownBy: string
  };

const VoucherDetails: React.FC<Props> = ({ deadline, amount, voucherName, isAvailable,usedBy, boughtBy, ownBy }) => (
  <Wrapper>
    <Content>
      <div className='column'>
        <p>Deadline: {deadline}</p>
      </div>
      <div className='column'>
        <p>Amount: {amount}</p>
      </div>
      <div className='column'>
        <p>Voucher Name: {voucherName}</p>
      </div>
      <div className='column'>
        <p>UsedBy: {isAvailable? "" : usedBy}</p>
      </div>
      <div className='column'>
        <p>Brought by: {boughtBy}</p>
      </div>
      <div className='column'>
        <p>Owner: {ownBy}</p>
      </div>
    </Content>
  </Wrapper>
);




export default VoucherDetails;
