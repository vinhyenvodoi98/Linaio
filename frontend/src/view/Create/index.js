import styled from 'styled-components';
import { ShoeBox, Shoe, Pressed, Button, Input } from 'components';
import { floating } from 'components/Animation';
import { useEffect, useCallback, useState } from 'react';

import image1 from 'assets/shoe/shoe6.png';
import Tooltip from 'components/Tooltip';
import { useFA2 } from 'hooks/useFA2';
import { useFactory } from 'hooks/useFactory';

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
    height: 35vh;
    width: 100%;
  }

  @media (max-width: 425px) {
    height: 25vh;
    width: 100%;
  }
`;

const BidBox = styled(Pressed)`
  margin: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 65vh;
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
`;

const BidPrice = styled.div`
  margin: 20px 30px 2vh 30px;
`;

const ShoeStyles = styled(Shoe)`
  animation: ${floating} 3s infinite;
`;

const Btext = styled.p`
  color: #888888;
  font-weight: 600;
  margin-bottom: 0.5em;
`;

const InputTitle = styled.div`
  display: flex;
`;

const CreShoeBox = styled(ShoeBox)`
  position: absolute;
  top: 0;
  min-height: 80vh;

  @media (min-width: 1440px) {
    min-height: 65vh;
  }

  @media (max-width: 768px) {
    min-height: 35vh;
  }

  @media (max-width: 425px) {
    min-height: 25vh;
  }
`;

export const Card = styled.div`
  border-radius: 50px;
  font-size: 0.9vw;
  color: ${({ theme }) => theme.text};
  margin: ${(props) => props.margin || '0px 10px'};
  height: ${(props) => props.height || ''};
  width: ${(props) => props.width || ''};
  padding: ${(props) => props.padding || '12px 24px'};
  background: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.boxShadow};

  @media (max-width: 768px) {
    font-size: 1.5vw;
  }

  @media (max-width: 426px) {
    font-size: 2.5vw;
  }

  @media (max-width: 375px) {
    font-size: 3vw;
  }
`;

export default function Create() {
  // auction contract address
  const [FA2adr, setFA2adr] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [openningPrice, setOpenningPrice] = useState(null);
  const [auctionTime, setAuctionTime] = useState(null);
  const { image, fetchTokenFA2Info, updateOperator } = useFA2();
  const { getAuctions, createNewAuction } = useFactory();

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

  const openAuction = async () => {
    const isUpdate = await updateOperator(FA2adr, tokenId);
    if (isUpdate) await createNewAuction(FA2adr, tokenId, openningPrice, auctionTime);
    await getAuctions();
  };

  return (
    <Card margin="auto" width="80vw">
      <ContainerWrap>
        <ImgBox>
          <CreShoeBox width="100%">
            <ShoeStyles width="60%" src={image ? image : image1} />
          </CreShoeBox>
        </ImgBox>
        <BidBox>
          <BidInfo>
            <InputTitle>
              <Btext>Nft Address</Btext>
              <Tooltip content="Please input your nft address" />
            </InputTitle>
            <Input
              width="100%"
              placeholder="KT1LCJLiG....ZtDfgiYBRM"
              onChange={(e) => setFA2adr(e.target.value)}
            />

            <InputTitle>
              <Btext>Token Id</Btext>
              <Tooltip content="Please input token id of your nft" />
            </InputTitle>
            <Input width="100%" placeholder="0" onChange={(e) => setTokenId(e.target.value)} />

            {/* <InputTitle>
              <Btext>Fungible Token Address</Btext>
              <Tooltip content="Please input token address use in auction" />
            </InputTitle>
            <Input width="100%" placeholder="KT1LCJLiG....ZtDfgiYBRM" /> */}

            <InputTitle>
              <Btext>Input Open Price</Btext>
              <Tooltip content="This is the openning price which minimum price user have to bid" />
            </InputTitle>
            <Input
              width="100%"
              placeholder="1"
              onChange={(e) => setOpenningPrice(e.target.value)}
            />

            <InputTitle>
              <Btext>Auction Time</Btext>
              <Tooltip content="Time will be converted into how many minutes the auction will be end" />
            </InputTitle>
            <Input
              width="100%"
              placeholder="3600"
              onChange={(e) => setAuctionTime(e.target.value)}
            />

            {/* <InputTitle>
              <Btext>Bidder Bonus</Btext>
              <Tooltip content="The percentage of the highest bidder price then divided equally among unsuccessful bidders who will be awarded more after refunding their bid ." />
            </InputTitle>
            <Input width="100%" placeholder="2" /> */}
          </BidInfo>

          <BidPrice>
            <Button
              margin="0px"
              width="100%"
              onClick={() => openAuction()}
              style={{ textAlign: 'center' }}
            >
              Open Auction !!
            </Button>
          </BidPrice>
        </BidBox>
      </ContainerWrap>
    </Card>
  );
}
