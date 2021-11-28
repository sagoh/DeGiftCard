import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  @media only screen and (max-width: 380px) {
     height: "50px";
    }
`;

export const Wrapper = styled.div`
  padding: 10px 20px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 380px) {
     padding: "10px 0px";
  }
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  @media only screen and (max-width: 380px) {
     display: "none";
  }
`;

export const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

export const Input = styled.input`
  border: none;
  @media only screen and (max-width: 380px) {
     width: "50px";
    }
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Logo = styled.h1`
  font-weight: bold;
  @media only screen and (max-width: 380px) {
     fontSize: "24px";
    }
`;
export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 380px) {
     flex: 2;
     justifyContent: "center";
  }
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  @media only screen and (max-width: 380px) {
     fontSize: "12px";
     marginLeft: "10px";
    }
`;