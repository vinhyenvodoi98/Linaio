import styled from 'styled-components';
import { Card, ShoeBox, Shoe, GradientText } from 'components';
import { floating } from 'components/Animation';
import { CountDown } from 'components/CountDown';
import { Link } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useFactory } from 'hooks/useFactory';
import { useAuction } from 'hooks/useAuction';
import { useFA2 } from 'hooks/useFA2';

const QALayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: calc(10px + 2vmin);
  min-height: calc(100vh - 135px);
`;

const RCard = styled(Card)`
  padding: 10px;
  margin: 1vw;
  height: 35vh;

  @media (max-width: 424px) {
    min-width: calc(91%);
  }
  @media (min-width: 425px) {
    min-width: calc(42.9%);
  }
  @media (min-width: 760px) {
    min-width: calc(28.6%);
  }
  @media (min-width: 1024px) {
    min-width: calc(21.02%);
  }
  @media (min-width: 1440px) {
    min-width: calc(21.5%);
  }
  @media (min-width: 2560px) {
    min-width: calc(17.2%);
  }
`;

const ImgBox = styled.div`
  height: 70%;
  width: 100%;
  position: relative;
`;

const ShoeStyles = styled(Shoe)`
  animation: ${floating} 3s infinite;
`;

const SText = styled.p`
  font-weight: 600;
  margin: 0.5em 1.8em;

  @media (max-width: 768px) {
    margin: 0.5em 1.3em;
  }

  @media (max-width: 375px) {
    margin: 0.5em 2.7em;
  }
`;

function StallCard({ auction }) {
  const { FA2adr, tokenId, highestBid, openingPrice, endTime, purchased } = useAuction(auction);
  const { name, image, fetchTokenFA2Info } = useFA2();

  const fetchFA2Info = useCallback(
    (FA2adr, tokenId) => {
      if (!!FA2adr && tokenId !== null) {
        fetchTokenFA2Info(FA2adr, tokenId);
      }
    },
    [fetchTokenFA2Info]
  );

  useEffect(() => {
    fetchFA2Info(FA2adr, tokenId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FA2adr, tokenId]);

  return (
    <Link to={`/auction/${auction}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ImgBox>
        <ShoeBox width="100%" height="100%" style={{ position: 'absolute', top: '0' }}>
          <ShoeStyles width="70%" src={image} />
        </ShoeBox>
      </ImgBox>
      <>
        <SText>{name}</SText>
        <SText>
          {/* if auction start with no one bid */}
          {!highestBid ? 'Openning Price' : ' Highest bid'}{' '}
          <GradientText>{!highestBid ? openingPrice : highestBid} XTZ</GradientText>
        </SText>
        {new Date().getTime() < endTime ? (
          <CountDown end={endTime} />
        ) : purchased ? (
          <SText>Sold !!</SText>
        ) : (
          <SText>Let's Buy now !</SText>
        )}
      </>
    </Link>
  );
}

export default function Stall() {
  const { auctions } = useFactory();

  return (
    <QALayout>
      {auctions
        .slice(0)
        .reverse()
        .map((auction, index) => (
          <RCard key={index}>
            <StallCard auction={auction} />
          </RCard>
        ))}
    </QALayout>
  );
}
