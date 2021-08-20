import { keyframes } from 'styled-components';

export const bounceInLeft = keyframes`
0% {
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
}

60% {
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 1;
  transform: translate3d(10px, 0, 0);
}

75% {
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: translate3d(-10px, 0, 0);
}

90% {
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: translate3d(5px, 0, 0);
}

100% {
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: none;
}
`;

export const lightToDark = keyframes`
0% {
  background-color: #e0e0e0;
}

100% {
  background-color: #202020;
}`;

export const darkToLight = keyframes`
0% {
  background-color: #202020;
}

100% {
  background-color: #e0e0e0;
}`;

export const floating = keyframes`
from { transform: rotate(10deg) translate(0,  0px); }
50%  { transform: rotate(10deg) translate(0, 8px); }
to   { transform: rotate(10deg) translate(0, -0px); }
`;
