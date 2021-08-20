import styled from 'styled-components';
import facebook from 'assets/icons/facebook.svg';
import github from 'assets/icons/github.svg';
import telegram from 'assets/icons/telegram.svg';
import twitter from 'assets/icons/twitter.svg';
import youtube from 'assets/icons/youtube.svg';
import tiktok from 'assets/icons/tiktok.svg';

const ContactBox = styled.div`
  margin-top: 100px;
  height: 90px;
  width: 25vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  @media (max-width: 1024px) {
    width: 40vw;
  }

  @media (max-width: 768px) {
    width: 55vw;
  }

  @media (max-width: 425px) {
    width: 60vw;
  }
`;

const ContactDetail = styled.img`
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 40px;
  width: 40px;
  border-radius: 10px;
  cursor: pointer;
  object-fit: cover;

  @media (max-width: 1024px) {
    height: 35px;
    width: 35px;
  }

  @media (max-width: 425px) {
    height: 30px;
    width: 30px;
  }
`;

export default function Contact() {
  return (
    <ContactBox BorderRadius="15px">
      <ContactDetail src={twitter} />
      <ContactDetail src={telegram} />
      <ContactDetail src={facebook} />
      <ContactDetail src={youtube} />
      <ContactDetail src={github} />
      <ContactDetail src={tiktok} />
    </ContactBox>
  );
}
