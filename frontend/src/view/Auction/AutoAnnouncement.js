import { Fragment, useState, useEffect } from 'react';
import { Button } from 'components';
import Modal from 'components/Modal';
import styled from 'styled-components';

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
  margin-bottom: 2.5em;
`;

export default function AutoAnnouncement({ bountyPerBidder, refund }) {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Button margin="0px" width="100%" onClick={() => setShow(true)}>
        Auto Announcement Bounty
      </Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <ModalLayout>
          <Title>Auto Announcement Bounty</Title>
          <MText>Bounty: {bountyPerBidder} XTZ</MText>
          <Button margin="0px" width="100%" onClick={() => refund()}>
            Claim
          </Button>
        </ModalLayout>
      </Modal>
    </Fragment>
  );
}
