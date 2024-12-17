import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom"; // Link import

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? "#333" : "#fff")};
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    transition: background-color 0.3s, color 0.3s; 
  }
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${(props) => (props.darkMode ? "#444" : "white")};
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: inherit; /* 부모 색상 상속 */
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 색상 상속 */
`;

const Icons = styled.div`
  button {
    border: none;
    background: none;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    color: inherit;
    transition: color 0.3s;
  }
`;

const Header = ({ onPlusClick }) => {
    return (
      <HeaderContainer>
        <StyledLink to="/home">
          <Logo>TISTAR</Logo>
        </StyledLink>
        <Icons>
          <button onClick={onPlusClick}>+</button>
          <button>☀️</button>
          <Link to="/profile">
            <button>👤</button>
          </Link>
        </Icons>
      </HeaderContainer>
    );
  };
  
  export default Header;
