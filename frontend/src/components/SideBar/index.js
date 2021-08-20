import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
`;

export const Sider = styled.div`
  min-height: calc(100vh - 135px);
  width: 20%;
  z-index: 1;
  color: ${({ theme }) => theme.text};
`;

export const Content = styled.div`
  min-height: calc(100vh - 135px);
  padding: 0px 60px;
  width: 80%;
  color: ${({ theme }) => theme.text};
`;
