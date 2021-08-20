import { Fragment, useState, useContext } from 'react';
import { Button, Input } from 'components';
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
  margin-bottom: 0.5em;
`;

export default function BidModal({ minimum, totalBidAmount, bidding, getAuctions }) {
  const [show, setShow] = useState(false);
  const { userBalance } = useContext(TezosContext);

  // eth unit
  const [amount, setAmount] = useState(0);
  // auction contract address

  const placeAbid = async () => {
    // bidding
    await bidding(amount);

    // update auction info
    await getAuctions();
  };

  return (
    <Fragment>
      <Button margin="0px" width="100%" onClick={() => setShow(true)}>
        Place a Bid
      </Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <ModalLayout>
          <div>
            <Title>Place a Bid</Title>
            <MText>You need to bid bigger than {minimum} XTZ</MText>
            <MText style={{ marginBottom: '30px' }}>Your balance: {userBalance} XTZ</MText>
          </div>
          <Input
            style={{ marginBottom: '15px' }}
            placeholder="Enter bid"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div>
            <MText style={{ marginBottom: '30px' }}>
              Your bidding balace: {totalBidAmount} XTZ
            </MText>
            {userBalance < minimum ? (
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
              <Button margin="0px" width="100%" onClick={() => placeAbid()}>
                Place a bid
              </Button>
            )}
          </div>
        </ModalLayout>
      </Modal>
    </Fragment>
  );
}
