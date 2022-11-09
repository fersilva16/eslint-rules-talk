import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #4b32c3;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 300px;
`;

const Name = styled.h3`
  color: #8080f3;
`;

const Cover = () => {
  return (
    <Background>
      <Container>
        <Img src="../img/eslint-logo.svg" />
        <h1>Modifying code incrementally with ESLint rules</h1>
        <Name>Fernando Silva</Name>
      </Container>
    </Background>
  );
};

export default Cover;
