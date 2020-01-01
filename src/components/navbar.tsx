import React, { useContext, useState } from 'react';
import { LoginContext, ScrollContext } from '../state/context';
import { NavLink } from 'react-router-dom';
import { useIdentityContext } from "react-netlify-identity";
import { FaUser, FaArrowRight } from 'react-icons/fa'
import styled from 'styled-components';
// import logo from '../assests/logo.svg';
import Modal from './modal'

const Navbar = () => {
    const UseLoginContext = useContext(LoginContext)
    const [isMobile, setIsMobile] = useState(false)
    const UseScrollContext = useContext(ScrollContext)
    const { isLoggedIn } = useIdentityContext()
    const AuthClicked = (value : string) => {
        UseLoginContext.dispatch({ type: 'open', payload: value  })
        setIsMobile(false)

    }
    const hamBurgerClicked = () => {
        setIsMobile(!isMobile)
        !isMobile && UseLoginContext.dispatch({ type: 'stopScroll'})
    
    }
    const OtherLinksClicked = ()=> {
        setIsMobile(false)
        UseLoginContext.dispatch({type:'close'})

    }

    return (
        <Container scroll={UseScrollContext.state.scrollTop} height={UseScrollContext.state.scrollHeight}>
            <Logo className='actions' isModalOpen={UseLoginContext.state.isModalOpen}>
                <p>PrizeMi</p>
                <Hamburger className='actions' >
    {!isMobile ? <Button3 onClick={() => hamBurgerClicked()} > Menu </Button3>  :<Button3 onClick={() => OtherLinksClicked()} > Close </Button3> }</Hamburger>
             
            </Logo >
            <Actions className='actions' isModalOpen={UseLoginContext.state.isModalOpen} mobile={isMobile}>
                <NavLink to='/' onClick={() => OtherLinksClicked()}>Home</NavLink>
                <NavLink to='/features' className='alternate' onClick={() => OtherLinksClicked()}>Features</NavLink>
                <NavLink to='/contact' onClick={() => OtherLinksClicked()}>Contact</NavLink>
                <NavLink to='/contact' className='alternate' onClick={() => OtherLinksClicked()} >Feedback</NavLink>
            </Actions>
            {!isLoggedIn  && <Button isLoggedIn={isLoggedIn} mobile={isMobile} isModalOpen={UseLoginContext.state.isModalOpen} onClick={() => AuthClicked('Signup on PrizeMi') }>Sign Up</Button>}
            {!isLoggedIn  && <Button2 isLoggedIn={isLoggedIn} mobile={isMobile} className='login' isModalOpen={UseLoginContext.state.isModalOpen} onClick={() => AuthClicked('Login to Prizemi')}><span>Log In</span><FaArrowRight/></Button2>}
            {isLoggedIn && <Button isLoggedIn ={isLoggedIn} mobile={isMobile} isModalOpen={UseLoginContext.state.isModalOpen}>Dashboard</Button> }
            {isLoggedIn  && <Button2  isLoggedIn ={isLoggedIn} mobile={isMobile} className='login' isModalOpen={UseLoginContext.state.isModalOpen}><span>Profile</span><FaArrowRight/></Button2>}
            {/* <Button onClick={logoutUser}>Log Out</Button>} */}
            {UseLoginContext.state.isModalOpen && <Modal />}
        </Container>
    )
}

export default Navbar

const Container = styled.div<{ scroll: number, height: number }>`
 ${props => (props.scroll > props.height / 52 ? `margin-top: 0%` : `margin-top:5%`)};
  ${props => (props.scroll > props.height / 52 ? `position: fixed` : `position:absolute`)};
  ${props => (props.scroll > props.height / 52 && `background-color: #6554C0`)};
  ${props => (props.scroll > props.height / 52 && `box-shadow: -1px 3px 5px -1px rgba(0,0,0,0.3)`)};
  opacity:1;
    height:10vh;
    z-index:4;
    width:100%;
    display:flex;
    justify-content:center;
    .actions{
        a ,p, svg{
            color: #091E42;
        } 
    }
    @media(max-width:800px) and (min-height:401px){
        display:flex;
        flex-direction:column;
    }
    @media(max-height:400px){
        height:15vh;
    }
`
const Button3 = styled.button`
    font-size:1rem;
    background-color:#fff;
    border-radius:5px;
    outline:none;
    border:none;
    color: #091E42;
`;
const Logo = styled.div<{ isModalOpen: boolean }>`
    display:flex;
    z-index:6;
    justify-content:space-evenly;
    ${props => (props.isModalOpen && `pointer-events: none`)};
    ${props => (props.isModalOpen && `opacity: 0.5`)};
    align-items:center;
    width:25%;
    margin-left:10%;
    height:100%;
 
    @media(max-width:800px) and (min-height:401px){
        margin-left:0;
        width:100%;
    }
    @media(max-height:400px){
        width:15%;
    }
    p{  z-index:6;
        font-size:2rem;
        font-weight:bold;
        @media(max-height:450px){
            font-size:1.5rem;
        }
        @media(max-width:800px) and (min-height:401px){
            width:90%;
            text-align:center;
        }

    }
`;
const Actions = styled.div<{ mobile: boolean ,isModalOpen:boolean }>`
    display:flex;
    justify-content:space-evenly;
    width:30%;
    margin-left:10%;
    align-items:center;
    ${props => (props.isModalOpen && `pointer-events: none`)};
    ${props => (props.isModalOpen && `opacity: 0.3`)};
    font-weight:bold;
    font-size:1.2rem;
    @media(max-height:450px){
        font-size:0.9rem;
        width:60%;
    }
    a{  
        text-decoration:none;
    }
  
    @media(max-width:800px) and (min-height:401px){
    ${props => (props.mobile ? `flex-direction: column ` : `display:none`)};
    width:90%;
    height:50vh;
    margin-left:0;
    position:fixed;
    align-items:flex-start;
    margin:0 5%;
    top:14.8vh;
    background-color:#ffffff;
    a{
        width:100%;
        height:12.5vh;
        padding-left:10%;
        display:flex;
        align-items:center;
      
    }
    .alternate{
        background-color:#f2f2f2;
    }
    }
`;

const Hamburger = styled.div`
display:none;
@media(max-width:800px) and (min-height:401px){
display:flex;
align-items:center;
font-size:1.5rem;
margin-right:5%;

}
`;
const Button = styled.button<{ mobile: boolean , isModalOpen?:boolean , isLoggedIn:boolean }>`
    display:none;
    ${props => (props.isModalOpen && `pointer-events: none`)};
    ${props => (props.isModalOpen && `opacity: 0.3`)};
    color: #091E42;
    background-color: #ffffff
    font-weight:bold;
    font-size:1rem;
    width:8%;
    outline:none;
    border-radius:5px;
    height:50%;
    background-color:#ffffff;
    z-index:6;
    @media(max-width:800px) and (min-height:401px){
        width:90%;
        ${props => (props.mobile ? `display:flex` : `display:none`)};
        position:fixed;
        height:12.5vh;
        top:64.8vh;
        align-items:center;
        margin:0 5%;
        font-size:1.2rem;
        padding-left:10%;
        border-radius:0;
      
    }
    
`;
const Button2 = styled.button<{ isModalOpen?: boolean, mobile: boolean , isLoggedIn:boolean}>`
    display:flex;
    outline:none;
    margin-top:1.5%;
    margin-right:20%;
    border:none;
    font-weight:bold;
    font-size:1rem;
    width:8%;
    justify-content:center;
    border-radius:5px;
    height:50%;
    ${props => (props.isModalOpen && `pointer-events: none`)};
    ${props => (props.isModalOpen && `opacity: 0.7`)};
    ${props => (props.isLoggedIn ? `color: #ffffff`: ` color: #091E42;`)};
    ${props => (props.isLoggedIn ? `background-color:inherit`: ` background-color: #ffffff`)};
    span{
        margin-right:10%;
    }
    @media(max-height:400px){
        font-size:0.9rem;
        width:20%;
        margin-right:17%;
    }
    @media(max-width:800px) and (min-height:401px){
        ${props => (props.mobile ? `display: flex `:`display:none`)};
        flex-direction:row;
        outline:none;
        border:none;
        font-weight:bold;
        color: #ffffff;
        border-radius:5px;
        width:90%;
        position:fixed;
        height:12.5vh;
        top:77.3vh;
        align-items:center;
        justify-content:flex-start;
        margin:0 5%;
        font-size:1.2rem;
        padding-left:10%;
        border-radius:0;
        background-color:#6554C0;
        span{
            margin-right:5%;
        }
    }
 `;
    
