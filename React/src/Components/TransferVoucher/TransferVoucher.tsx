import React, {  useState } from 'react';
import PropTypes from 'prop-types';
// Helpers
// Styles
import { BigNumber } from '@ethersproject/bignumber';
import { Button } from "@material-ui/core";
import { Wrapper, Content } from './TransferVoucher.styles';

type Props = {
    transferVoucher: (address: string) => void;
    transferState: string;

};

const TransferVoucher: React.FC<Props> = ({transferVoucher, transferState }) => {
    const [address, setAddress] = useState<string>( "");
    
    return (
        <>
        { transferState ? 
        (
            <div>{transferState}</div>
        ) :
        (
        <Wrapper>
            <Content>
                <div><p>Transfer To:</p></div>
                <div>
                    <p>
                        Address : <input
                                        type='text'
                                        placeholder='Address'
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address}
                                    />
                    </p>
                </div>
                <div>
                    <p>
                        <Button onClick={() => transferVoucher(address)}>Transfer</Button>
                    </p>
                </div>
            </Content>
        </Wrapper>)
        }
        </>
    );
};

export default TransferVoucher;