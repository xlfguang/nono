// Header.js

import { Link } from "react-router-dom";
import styled from "styled-components";
import nono from "@/assets/img/no-no.webp";

// Styled components
const HeaderWrapper = styled.header`
  background-color: #000;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
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
      <img src={nono} alt="" />
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">DashBoard</NavLink>
        <NavLink to="/whitepaper">WhitePaper</NavLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
