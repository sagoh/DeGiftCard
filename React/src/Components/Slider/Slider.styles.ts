import React from 'react';
import styled, { StyledFunction } from 'styled-components';



export const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
position: relative;
overflow: hidden;
@media only screen and (max-width: 380px) {
     display: "none";
}
`;

export const LeftArrow=  styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
left: 10px;
margin: auto;
cursor: pointer;
opacity: 0.5;
z-index: 2;
`;

export const RightArrow=  styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom: 0;
right: 10px;
margin: auto;
cursor: pointer;
opacity: 0.5;
z-index: 2;
`;

export const Wrapper = styled.div<{ slideIndex: number}>`
height: 100%;
display: flex;
transition: all 1.5s ease;
transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

export const Slide = styled.div<{bg: string}>`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color: #${(props) => props.bg};
`;

export const ImgContainer = styled.div`
height: 100%;
flex: 1;
`;

export const Image = styled.img`
height: 80%;
`;

export const InfoContainer = styled.div`
flex: 1;
padding: 50px;
`;

export const Title = styled.h1`
font-size: 70px;
`;

export const Desc = styled.p`
margin: 50px 0px;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;
`;

export const Button = styled.button`
padding: 10px;
font-size: 20px;
background-color: transparent;
cursor: pointer;
`;