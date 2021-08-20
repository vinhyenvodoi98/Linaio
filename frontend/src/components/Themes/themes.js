import styled from 'styled-components';
import { lightToDark, darkToLight } from 'components/Animation';
import { useContext } from 'react';
import { ThemeContext } from 'contexts/Theme';

export const darkTheme = {
  body: '#FFF',
  text: '#FAFAFA',
  toggleBorder: '#FFF',
  background: ' #202020',
  buttonBackground: 'linear-gradient(145deg, #1d1d1d, #222222);',
  boxShadow: '20px 20px 47px #0d0d0d, -20px -20px 47px #333333',
  pressed: 'inset 20px 20px 60px #1b1b1b, inset -20px -20px 60px #252525',
};

export const lightTheme = {
  body: '#363537',
  text: '#363537',
  toggleBorder: '#6B8096',
  background: '#e0e0e0',
  buttonBackground: 'linear-gradient(145deg, #f0f0f0, #cacaca)',
  boxShadow: '17px 17px 33px #bebebe, -17px -17px 33px #ffffff',
  pressed: 'inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff',
};

const BGLtoD = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  animation: 0.2s ${lightToDark};
`;

const BGDtoL = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  animation: 0.2s ${darkToLight};
`;

const BG = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

var count = 0;

export const BackGroundProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  count += 1;
  if (count > 4)
    if (theme === 'light') {
      return <BGDtoL>{children}</BGDtoL>;
    } else {
      return <BGLtoD>{children}</BGLtoD>;
    }
  else return <BG>{children}</BG>;
};
