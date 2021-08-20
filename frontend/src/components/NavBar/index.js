import { useContext } from 'react';
import { ThemeContext } from 'contexts/Theme';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import darkLogo from 'assets/logo/darkLogo.png';
import lightLogo from 'assets/logo/lightLogo.png';
import Burger from './Burger';

const Header = styled.header`
  min-height: 135px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  z-index: 1;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 8vw;
`;

// const Right = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

const Logo = styled.img`
  height: 40px;
`;

export default function NavBar() {
  const { theme } = useContext(ThemeContext);

  return (
    <Header>
      <Left>
        <Link to="/">
          <Logo src={theme === 'light' ? darkLogo : lightLogo}></Logo>
        </Link>
      </Left>
      <Burger />
    </Header>
  );
}
