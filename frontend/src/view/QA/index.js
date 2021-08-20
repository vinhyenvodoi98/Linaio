import Collapse from 'components/Collapse';
import styled from 'styled-components';
import { qandas } from './Question';

const QALayout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  min-height: calc(100vh - 135px);
`;

const Title = styled.div`
  color: #888888;
  font-size: 3.5em;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: ${({ theme }) => theme.boxShadow};
  position: relative;

  &:before,
  &::after {
    position: absolute;
    background: ${({ theme }) => theme.background};
    content: '';
    border-radius: 10%;
  }
`;

export default function QA() {
  return (
    <QALayout>
      <Title>Q&A</Title>
      {qandas.map((qanda, index) => (
        <Collapse key={index} title={qanda.question} content={qanda.answer} />
      ))}
    </QALayout>
  );
}
