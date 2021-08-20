import styled from 'styled-components';

export const Body = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  min-height: calc(100vh - 135px);
`;

export const Center = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  min-height: calc(100vh - 135px);

  @media (max-width: 426px) {
    font-size: 2.5vw;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width || ''};
  height: ${(props) => props.height || ''};
  position: ${(props) => props.position || 'relative'};

  ${(props) => props.center && 'center'} {
    justify-content: center;
  }

  ${(props) => props.spaceAround && 'spaceAround'} {
    justify-content: space-around;
  }

  ${(props) => props.spaceBetween && 'spaceBetween'} {
    justify-content: space-between;
  }
`;

export const Image = styled.img`
  height: 40vmin;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: #61dafb;
  margin-top: 10px;
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
    height: calc(86vh - 135px);
  }

  @media (max-width: 426px) {
    font-size: 2.5vw;
  }

  @media (max-width: 375px) {
    font-size: 3vw;
  }
`;

export const Button = styled.button`
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 0.9vw;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  font-family: 'Nunito Sans', sans-serif;
  padding: 12px 24px;
  margin: ${(props) => props.margin || ' 0px 20px'};
  border-radius: 50px;
  background: ${({ theme }) => theme.buttonBackground};
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: ${(props) => props.height || ''};
  width: ${(props) => props.width || ''};

  ${(props) => props.hidden && 'hidden'} :focus {
    border: none;
    outline: none;
  }

  &:active {
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    transform: translateY(2px);
  }

  &:hover {
    background: ${({ theme }) => theme.background};
  }

  @media (max-width: 768px) {
    font-size: 1.5vw;
  }

  @media (max-width: 426px) {
    font-size: 2.5vw;
  }
`;

export const Input = styled.input`
  padding: 12px 24px;
  border-radius: 50px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text};
  border: none;
  outline: none;
  background: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.pressed};
  width: ${(props) => props.width || ''};

  @media (max-width: 768px) {
    font-size: 1.2vw;
  }

  @media (max-width: 425px) {
    font-size: 2vw;
  }
`;

export const Icon = styled.img`
  height: 30px;
  weight: 30px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonBackground};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const Pressed = styled.div`
  border-radius: ${(props) => props.BorderRadius || '50px'};
  width: ${(props) => props.width || ''};
  min-height: ${(props) => props.minHeight || ''};
  background: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.pressed};
`;

export const Convex = styled.div`
  border-radius: ${(props) => props.BorderRadius || '50px'};
  background: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: ${(props) => props.height || ''};
  width: ${(props) => props.width || ''};
`;

export const Shoe = styled.img`
  height: ${(props) => props.height || ''};
  width: ${(props) => props.width || ''};
  transform: ${(props) => props.transform || 'rotate(0deg)'};
`;

export const ShoeBox = styled.div`
  width: ${(props) => props.width || ''};
  height: ${(props) => props.height || ''};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GradientText = styled.span`
  background: -webkit-linear-gradient(180deg, #48c6ef 0%, #6f86d6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Svg = styled.svg`
  width: 16px;
  height: 16px;

  @media (max-width: 425px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 768px) {
    width: 11px;
    height: 11px;
  }
`;
