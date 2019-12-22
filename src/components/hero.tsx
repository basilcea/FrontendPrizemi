import React, { useContext } from "react";
import { LoginContext } from '../state/context';
import styled from "styled-components";
import { useIdentityContext } from "react-netlify-identity";
import banner from '../assests/banner.svg';
import banner2 from '../assests/banner2.svg';
import {useHistory} from 'react-router'


const Hero = () => {
  const history = useHistory()
  const { isLoggedIn } = useIdentityContext()
  const UseLoginContext = useContext(LoginContext)
  const getStarted = () => {
    !isLoggedIn ? UseLoginContext.dispatch({ type: 'open', payload: 'Signup on PrizeMi' }) : history.push('/dashboard')
  }
  return (
    <Container isModalOpen={UseLoginContext.state.isModalOpen} isInactive={UseLoginContext.state.inactive}>
      <Details>
        <p>
          Feature-based price management system for developers
        </p>
        <Button onClick={getStarted}>Get Started </Button>
      </Details>
    </Container>
  )
}

export default Hero




const Container = styled.div<{ isInactive: boolean , isModalOpen:boolean }>`
  width: 100%;
  display: flex;
  background:url(${banner}) white;
  ${props => (props.isInactive && `pointer-events: none`)};
  ${props => (props.isModalOpen && `opacity: 0.5`)};
  height:96vh;
  background-repeat:no-repeat;
  background-size:95%;
  flex-direction: column;
  @media(max-width:800px) and (min-height:401px){
    height:100vh;
    background-image:url(${banner2}) ;
    background-position:top right;
    background-size:220%;
    background-color:#6554C0;
  }
  @media(max-height:401px){
    width:100%;
    background:url(${banner}) white;
    heigth:100vh;
    background-repeat:no-repeat;
    background-size:95%;
    flex-direction: column;
  }
`;
const Details = styled.div`
  width:30%;
  margin-left:15%;
  height:80%;
  display: flex;
  flex-direction:column;
  justify-content:center; 
  align-items:center;
  text-align:center;
  @media(max-width:800px) and (min-height:401px){
    width:90%;
    margin-left:5%;
    margin-top:65%;
  }
  p {
    font-size:2.5rem;
    color:white;
    line-height:6vh;
    background-size:95%;
    @media(max-width:800px) and (min-height:401px){
     font-size:1.8rem;
    }
    @media(max-height:400px){
      font-size:1.3rem;
      margin-top:25%;
    }
  
  }
 
`;
const Button = styled.button`
margin-top:5%;
background: #091E42;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 30px;
border:none;
outline:none;
width:13rem;
height:3rem;
font-size:1.5rem;
color:white;
@media(max-height:400px){
  width:8rem;
  height:2.5rem;
  font-size:1.2rem;
}
`;