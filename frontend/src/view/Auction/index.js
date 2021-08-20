import styled from 'styled-components';
import { Card, ShoeBox, Shoe, Pressed, Row, GradientText } from 'components';
import { floating } from 'components/Animation';
import { CountDown } from 'components/CountDown';
import CopyClipBroad from 'components/CopyClipBroad';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuction } from 'hooks/useAuction';
import AutoAnnouncement from './AutoAnnouncement';
import BuyModal from './BuyModal';
import BidModal from './BidModal';
import { useFA2 } from 'hooks/useFA2';
import { TezosContext } from 'contexts/Taquito';

const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  min-height: calc(100vh - 135px);
  font-family: 'Raleway', sans-serif;
`;

const ContainerWrap = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImgBox = styled.div`
  height: 100%;
  width: 70%;
  position: relative;

  @media (max-width: 768px) {
    height: 60%;
    width: 100%;
  }
`;

const BidBox = styled(Pressed)`
  margin: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 769px) {
    width: 30%;
  }

  @media (max-width: 768px) {
    height: 40%;
  }

  @media (max-width: 425px) {
    margin: 8px 0px;
  }
`;

const BidInfo = styled.div`
  margin: 30px 30px 0px 30px;
  overflow: auto;
`;

const BidPrice = styled.div`
  margin: 0px 30px 2vh 30px;
`;

const ShoeStyles = styled(Shoe)`
  animation: ${floating} 3s infinite;
`;

const NftName = styled.p`
  color: #888888;
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 0.5em;
  margin-top: 0;
`;

const Center = styled.div`
  font-weight: 600;
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vh;
`;

const Btext = styled.p`
  color: #888888;
  font-weight: 600;
  margin-bottom: 0.5em;
`;

const Ptitle = styled(Btext)`
  text-align: center;
`;

const ContractInfo = styled.div`
  color: #888888;
  font-weight: 600;
  margin-bottom: 0.5em;
  font-size: 0.8vw;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    font-size: 1.2vw;
  }

  @media (max-width: 425px) {
    font-size: 2vw;
  }
`;

export default function Auction() {
  const { address } = useContext(TezosContext);
  const { name, image, description, fetchTokenFA2Info } = useFA2();

  // auction contract address
  let { auctionAddress } = useParams();
  const {
    FA2adr,
    tokenId,
    partner,
    highestBid,
    openingPrice,
    totalBidAmount,
    endTime,
    bountyPerBidder,
    isAuctionEnd,
    purchased,
    isCanBuy,
    getAuctions,
    checkAuctionEnd,
    bidding,
    getBountyPerBidder,
    checkCanBuy,
    checkPurchased,
    refund,
    buy,
  } = useAuction(auctionAddress);

  useEffect(() => {
    getBountyPerBidder();
    checkAuctionEnd();
    checkPurchased();
    checkCanBuy();
  }, [getBountyPerBidder, checkAuctionEnd, checkPurchased, checkCanBuy]);

  useEffect(() => {
    if (!!FA2adr && tokenId !== null) {
      fetchTokenFA2Info(FA2adr, tokenId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FA2adr, tokenId]);

  return (
    <Layout>
      <Card margin="4vh 0px" height="calc(86vh - 135px)" width="80vw">
        <ContainerWrap>
          <ImgBox>
            <ShoeBox width="100%" height="100%" style={{ position: 'absolute', top: '0' }}>
              <ShoeStyles width="60%" src={image} />
            </ShoeBox>
          </ImgBox>
          <BidBox>
            <BidInfo>
              <NftName>{name}</NftName>
              <Btext>
                {!highestBid ? 'Openning Price' : 'Highest bid'}{' '}
                <GradientText>{!highestBid ? openingPrice : highestBid} XTZ</GradientText>
              </Btext>
              <div style={{ marginBottom: '15px', fontWeight: '500' }}>{description}</div>
              <ContractInfo>
                <span>Contract Address:</span>
                <CopyClipBroad address={FA2adr} />
              </ContractInfo>
              <ContractInfo>
                <span>Token ID:</span> <span>{tokenId}</span>
              </ContractInfo>
              <ContractInfo>
                <span>Artist:</span>
                <CopyClipBroad address={partner} />
              </ContractInfo>
            </BidInfo>

            <BidPrice>
              <Row>
                <Center>
                  <Ptitle>Highest bid</Ptitle>
                  <div>{highestBid} XTZ</div>
                </Center>
                <Center>
                  <Ptitle>Auction ends in</Ptitle>
                  <CountDown end={endTime} />
                </Center>
              </Row>
              {isAuctionEnd ? (
                isCanBuy ? (
                  <BuyModal
                    getAuctions={getAuctions}
                    owner={address}
                    buy={buy}
                    openingPrice={openingPrice}
                  />
                ) : purchased ? (
                  <NftName style={{ textAlign: 'center' }}>Sold!!</NftName>
                ) : (
                  <AutoAnnouncement bountyPerBidder={bountyPerBidder} refund={refund} />
                )
              ) : (
                <BidModal
                  minimum={!highestBid ? openingPrice : highestBid}
                  totalBidAmount={totalBidAmount}
                  bidding={bidding}
                  owner={address}
                  getAuctions={getAuctions}
                />
              )}
            </BidPrice>
          </BidBox>
        </ContainerWrap>
      </Card>
    </Layout>
  );
}
