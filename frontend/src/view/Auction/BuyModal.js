import { Fragment, useState, useContext } from 'react';
import { Button } from 'components';
import Modal from 'components/Modal';
import styled from 'styled-components';
import { TezosContext } from 'contexts/Taquito';

const ModalLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 1.5em;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const MText = styled.p`
  color: #888888;
  font-weight: 600;
  font-size: 0.9em;
`;

export default function BuyModal({ getAuctions, buy, openingPrice }) {
  const [show, setShow] = useState(false);
  const { userBalance } = useContext(TezosContext);

  const onClickBuy = async () => {
    // bidding
    await buy(openingPrice);

    // update auction info
    await getAuctions();
  };

  return (
    <Fragment>
      <Button margin="0px" width="100%" onClick={() => setShow(true)}>
        Buy
      </Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <ModalLayout>
          <Title>Buy Now!</Title>
          <MText>Price: {openingPrice} XTZ</MText>
          <MText style={{ marginBottom: '30px' }}>Your balance: {userBalance} XTZ</MText>
          {userBalance < openingPrice ? (
            <Button
              margin="0px"
              width="100%"
              onClick={() =>
                window.open(
                  'https://www.binance.com/vi/trade/XTZ_USDT',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              Get some XTZ
            </Button>
          ) : (
            <Button margin="0px" width="100%" onClick={() => onClickBuy()}>
              Buy
            </Button>
          )}
        </ModalLayout>
      </Modal>
    </Fragment>
  );
}
