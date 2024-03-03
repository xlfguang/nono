// Header.js

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled components
const HeaderWrapper = styled.header`
  background-color: #000;
  padding: 20px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: end;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
  transition: color 0.3s ease;

  &:hover {
    color: lightgray;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">DashBoard</NavLink>
        <NavLink to="/whitepaper">WhitePaper</NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
