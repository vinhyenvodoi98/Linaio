import styled from 'styled-components';
import { Button } from 'components';
import WalletButton from 'components/WalletButton';
import Toggle from 'components/Themes/Toggler';
import { Link, useLocation } from 'react-router-dom';
import { TezosContext } from 'contexts/Taquito';
import { useContext, Fragment } from 'react';
import { ThemeContext } from 'contexts/Theme';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin: 0px;
  li {
    padding: 18px 0px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    z-index: 10;
    padding-top: 5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const Address = styled.div`
  background: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 50px;
  font-size: 0.9vw;
  padding: 12px 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0px 20px;

  @media (max-width: 768px) {
    font-size: 1.5vw;
    width: 40%;
  }

  @media (max-width: 426px) {
    font-size: 2.5vw;
  }
`;

const RightNav = ({ open }) => {
  const { address, connectWallet, disconnectWallet } = useContext(TezosContext);
  const { theme, themeToggler } = useContext(ThemeContext);
  const location = useLocation();

  const noNeedWallet = ['/', '/QA'];

  return (
    <Ul open={open}>
      <li>
        <Link to="/QA">
          <Button>Q&A</Button>
        </Link>
      </li>
      <li>
        <Link to="/stall">
          <Button>Shop</Button>
        </Link>
      </li>
      {noNeedWallet.includes(location.pathname) ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <li>
            {!!address && address.length !== 0 ? (
              <Address margin="0px 20px">{`${address.slice(0, 8)}...${address.slice(
                address.length - 6,
                address.length
              )}`}</Address>
            ) : (
              <></>
            )}
          </li>
          <li>
            <WalletButton
              address={address}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
            />
          </li>
        </Fragment>
      )}

      <li>
        <Toggle theme={theme} toggleTheme={themeToggler} />
      </li>
    </Ul>
  );
};

export default RightNav;
