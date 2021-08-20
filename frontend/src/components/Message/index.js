import { useEffect, Fragment, useRef, useState, useContext } from 'react';
import styles from './modal.module.css';

import CloseIcon from './CloseIcon';
import styled from 'styled-components';
import { MessageContext } from 'contexts/Message';

const ClIcon = styled(CloseIcon)`
  width: 20px;
  heigh: 20px;
  fill: ${({ theme }) => theme.text};
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
  font-weight: 600;
  font-size: 2em;
`;

const Content = styled.p`
  margin: 0;
  font-size: 1.8em;
`;

export default function Message({ type, content }) {
  const [show] = useState(true);
  const { setStatus } = useContext(MessageContext);
  return (
    <MessageComponent show={show} type={type} onClose={() => setStatus(null)}>
      <Title>
        <ClIcon onClick={() => setStatus(null)} />
        <div>
          {type === 'success'
            ? 'Transaction successful'
            : type === 'process'
            ? 'Transaction processing'
            : 'Oops something went wrong'}
        </div>
      </Title>
      <Content style={{ margin: '0' }}>{content}</Content>
    </MessageComponent>
  );
}

export function MessageComponent({ modalStyle, children, show, backdropStyle, type, onClose }) {
  const messageRef = useRef(null);

  useEffect(() => {
    if (type === 'success' || type === 'error') {
      let timer1 = setTimeout(() => onClose(), 5000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [onClose, type]);

  useEffect(() => {
    if (show) {
      messageRef.current.classList.add(styles.visible);
    } else {
      messageRef.current.classList.remove(styles.visible);
    }
  }, [show]);

  return (
    <Fragment>
      <div ref={messageRef} style={backdropStyle} className={styles.message}>
        <div
          style={modalStyle}
          className={`${styles.message__wrap} ${
            type === 'success'
              ? styles.bgSuccess
              : type === 'process'
              ? styles.bgProcess
              : styles.bgError
          }`}
        >
          {children}
        </div>
      </div>
    </Fragment>
  );
}
