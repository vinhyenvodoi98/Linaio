import { Pressed, Convex, Row, Button, Card, Center, ShoeBox, Shoe } from 'components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import shoe1 from 'assets/shoe/shoe5.png';
import shoe2 from 'assets/shoe/shoe2.png';
import shoe3 from 'assets/shoe/shoe4.png';
// import Contact from 'components/Contact';

const NJY = styled.p`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.8em;
  font-weight: 600;
  color: #888888;
  margin-bottom: 0;
`;
const IMGNT = styled.p`
  font-family: 'Raleway', sans-serif;
  color: #888888;
  font-weight: 600;
  margin-bottom: 0;
`;
const PPC = styled.p`
  font-family: 'Oswald', sans-serif;
  color: #9c9c9e;
`;

const Crypto = styled.span`
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa;
`;

const TextBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ResPessed = styled(Pressed)`
  min-height: 45vh;
  width: 85%;

  @media (max-width: 768px) {
    height: 80vh;
  }

  @media (width: 768px) {
    height: 110vh;
    margin-bottom: 20px;
  }
`;

const LayRow = styled(Row)`
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ResCovex = styled(Convex)`
  height: 60vh;
  width: 60vh;

  @media (max-width: 768px) {
    height: 60vw;
    width: 60vw;
  }
`;

const TextRow = styled(Row)`
  width: 37%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const GetOneButton = styled(Button)`
  margin: 12px 0px;
  width: 190px;
  height: 50px;

  @media (max-width: 760px) {
    width: 120px;
    height: 40px;
  }

  @media (width: 2560px) {
    width: 250px;
    height: 80px;
  }
`;

const DecorationCard = styled(Card)`
  width: 20vw;
  height: 20vw;

  @media (min-width: 1024px) {
    width: 20vh;
    height: 20vh;
  }
`;

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <Center>
        <ResPessed />
        <LayRow spaceBetween width="80%" position="absolute">
          <ResCovex BorderRadius="50%" style={{ position: 'relative' }}>
            <ShoeBox
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '-50px' }}
            >
              <Shoe
                width="100%"
                src={shoe2}
                transform="rotate(15deg)"
                style={{ filter: 'blur(1px)', left: '-25px' }}
              />
            </ShoeBox>

            <ShoeBox width="100%" height="100%" style={{ position: 'absolute', top: '0' }}>
              <Shoe width="135%" transform="rotate(-23deg)" src={shoe1} />
            </ShoeBox>
          </ResCovex>

          <TextRow>
            <TextBox>
              <NJY>NOT JUST YOUR</NJY>
              <IMGNT>IMAGINATION</IMGNT>
              <PPC>
                Past, Present, <Crypto>Crypto</Crypto>
              </PPC>
              <Row spaceAround width="100%">
                <Link to="/stall">
                  <GetOneButton>Get one Now !</GetOneButton>
                </Link>
                <DecorationCard padding="0" style={{ position: 'relative' }}>
                  <ShoeBox
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: '0', left: '-25px' }}
                  >
                    <Shoe width="105%" src={shoe3} />
                  </ShoeBox>
                </DecorationCard>
              </Row>
            </TextBox>
          </TextRow>
        </LayRow>
      </Center>

      {/* <div style={{ position: 'absolute', bottom: '15px', right: '8vw' }}>
        <Contact />
      </div> */}
    </div>
  );
}
