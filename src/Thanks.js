import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 400px;
  border: 6px solid #fff;
  border-radius: 20px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #fff;

  &:hover {
    text-decoration: underline;
  }
`;

const Thanks = () => {
  return (
    <>
      <h1>Thanks</h1>
      <h2>We are hiring!</h2>
      <Img src="./img/hiring-qrcode.png" />
      <Link href="https://woovi.com/jobs" target="_blank">
        <h2>woovi.com/jobs</h2>
      </Link>
    </>
  );
};

export default Thanks;
