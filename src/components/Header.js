import React from 'react';
import styled from 'styled-components';


const HeaderText = styled.Text`
  color: white;
  font-size: 20;
  text-align: center;
`;

const HeaderContainer = styled.View`
  height: 100; 
`;



const Header = ({ title }) => (
    <HeaderContainer>
        <HeaderText>
            {title}
        </HeaderText>
    </HeaderContainer>
);

export default Header;
