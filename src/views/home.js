import React, {useState} from "react";
import styled from "styled-components";
import Typed from "react-typed";
import background from "../assests/picture.svg";
import { useIdentityContext } from "react-netlify-identity"
import {FaGithub, FaBitbucket, FaGoogle } from 'react-icons/fa'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
  @media(max-width:800px){
    flex-direction:column;
    
  }
`;
const Hero = styled.div`
  width: 40%;
  margin: 0 5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
  h1 {
    color: rgb(74, 74, 125);
    font-size: 3em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 0;
    text-align: center;
    @media(max-width:800px){
        font-size:2.5em;
      }
  }
  p {
    font-size: 1.5em;
    margin-bottom: 5%;
  }
  @media(max-width:800px){
    width:90%;
  }
`;
const Icon = styled.div`
  background: url(${background});
  background-size: contain;
  background-repeat: no-repeat;
  width: 40%;
  margin: 0 5%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  background-position: center;
  @media(max-width:800px){
    order:-1;
    height:25%;
    width:90%;
  }
`;
const Details = styled.div`
  height: 30vh;
  width: 90%;
  margin-bottom:10%;
  display: flex;
  flex-direction:column; 
  text-align: center;
  margin-bottom: 2%;
  p {
    height: 100%;
  }
  @media(max-width:800px){
      height:40vh;
  }
`;
const Sign = styled.div`
 width:80%;
 margin-top:3vh;
 height:30%;
 border-radius:10px;
 display:flex;
 flex-direction:column;
 justify-content:center;
 border: 2px solid rgb(30, 20, 93);
 align-items:center;
 h2{
     color:rgb(74, 74, 125);
     font-size:1.5em;
 }
 @media(max-width:800px){
    height:25%;
}
`
const Socials = styled.div`
    display:flex;
    width:100%;
    margin-bottom:10%;
    justify-content:center;
    svg{
        font-size:2em;
       margin:0 3%;
       color: rgb(30, 20, 93);
`;

const Home = () => {
    const [show, setShow] = useState(false)
    const clicked = () => {
        setShow(true)
    }
    const authenticate = (value) => {
      loginProvider(value)
      Window.location = '/'
    }
    
    const {settings,loginProvider,acceptInviteExternalUrl , isLoggedIn, isConfirmedUser ,user, logoutUser} = useIdentityContext()
  return (
    <Container>
      <Hero>
        <Details>
        <h1>PrizeMi </h1>
          <Typed
            strings={[
              `<p>Get your client needs <p>`,
              `<p>Break it down into features</p>`,
              `<p>Set your price rate based on features with PrizeMi</p>`,
              `<p>A feature-based price management system for freelance software developers </p>`
            ]}
            typespeed={200}
            fadeOut={true}
            fadeOutDelay={100}
            //   backDelay={200}
            startDelay={1000}
            showCursor={false}
            onComplete={clicked}
          />
        </Details>
     {show && <Sign>
            {!isLoggedIn &&
            <div>
            <h2>SIGN UP WITH </h2>
            <Socials>
            {console.log(settings)}
            {settings && settings.external.github &&   <FaGithub onClick={() => authenticate('github')}/>}
            {settings && settings.external.bitbucket &&   <FaBitbucket onClick={() => authenticate('bitbucket')}/>}
            </Socials>
            </div>
            }
            {isLoggedIn &&
            <div>
              <p>You have signed up on PrizeMi. Kindly check your email for further steps</p>
            <p>INVITE A DEVELOPER</p>
            <Socials>
            {settings && settings.external.google &&   <FaGoogle onClick={() => acceptInviteExternalUrl('google')}/>}
            {settings && settings.external.github &&   <FaGithub onClick={() => acceptInviteExternalUrl('github')}/>}
            {settings && settings.external.bitbucket &&   <FaBitbucket onClick={() => acceptInviteExternalUrl('bitbucket')}/>}
            </Socials>
            </div>
            }
        </Sign>}
      </Hero>
      <Icon>
      </Icon>
    </Container>
  );
};

export default Home;
