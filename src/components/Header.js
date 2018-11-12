import React from 'react';
import styled from 'styled-components';


const HeaderText = styled.Text`
  color: white;
  font-size: 20;
  text-align: center;
  margin-top: 16;
`;

const HeaderContainer = styled.View`
  width: 100%;
  height: 300;
`;



const Header = ({ title }) => (
    <HeaderContainer>
        <HeaderText>
            {title}
        </HeaderText>
    </HeaderContainer>
);

export default Header;
