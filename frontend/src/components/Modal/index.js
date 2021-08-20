import { useEffect, Fragment, useRef } from 'react';
import styles from './modal.module.css';

import useOutsideClick from 'hooks/useOutsideClick';
import styled from 'styled-components';

const ModalCard = styled.div`
  background: ${({ theme }) => theme.background};
  // box-shadow: ${({ theme }) => theme.boxShadow};
`;

const MobileMargin = styled.div`
  margin: 0px;
  @media (max-width: 425px) {
    margin: 28px;
  }
`;

export default function Modal({ modalStyle, children, show, onClose, backdropStyle }) {
  const modalRef = useRef(null);
  const ref = useRef();

  useOutsideClick(ref, () => {
    if (show) {
      onClose();
    }
  });

  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);

  return (
    <Fragment>
      <div ref={modalRef} style={backdropStyle} className={styles.modal}>
        <ModalCard ref={ref} style={modalStyle} className={styles.modal__wrap}>
          <MobileMargin>{children}</MobileMargin>
        </ModalCard>
      </div>
    </Fragment>
  );
}
