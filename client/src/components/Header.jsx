import React from 'react'
import styled from 'styled-components';
import logo from '../assets/logo.png';


export default function Header(props) {

  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
padding: 0 4rem;
.logo {
  img {
    height: 15rem;
  }
}
`;
