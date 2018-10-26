import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import * as theme from '../../themes/defaultTheme';

const Banner = styled.View`
  height: 175; 
  flex-direction: row;
`;

const PortraitContainer = styled.View`
  width: 100;
`;

const NameContainer = styled.View`
 width: 230;
 flex-wrap: wrap;
`;

const NameText = styled.Text`
  padding-top: 20;
  font-size: 40;
  color: ${({ theme: { defaultTheme } }) => defaultTheme.text}
`;

const CharacterBanner = () => (
    <ThemeProvider theme={theme}>
        <Banner>
            <PortraitContainer>
            </PortraitContainer>
            <NameContainer>
                <NameText>Kazuyer Meeshamer</NameText>
            </NameContainer>
        </Banner>
    </ThemeProvider>
);

export default CharacterBanner;