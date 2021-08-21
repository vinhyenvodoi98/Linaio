import { useState } from 'react';
import styled from 'styled-components';

const CollapseButton = styled.div`
  max-height: 45px;
  width: ${(props) => props.width || ''};
  background: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 25px;
  padding: 12px 24px;
  cursor: pointer;
  overflow: hidden;
  transition: all 1s;
  ${({ rotate }) => rotate && `max-height: 500px`};

  @media (max-width: 426px) {
    max-height: 30px;
    ${({ rotate }) => rotate && `max-height: 500px`};
  }
`;

const Box = styled.div`
  margin: 10px;
`;

const Text = styled.p`
  margin: ${(props) => props.margin || '8px 0px'};
`;

export default function Collapse({ title, content }) {
  const [isDrop, setIsDrop] = useState(false);
  return (
    <Box>
      <CollapseButton width="80vw" rotate={isDrop} onClick={() => setIsDrop(!isDrop)}>
        <Text>{title}</Text>
        <Text margin="20px 0px" style={{ fontSize: '0.7em' }}>
          {content}
        </Text>
      </CollapseButton>
    </Box>
  );
}
