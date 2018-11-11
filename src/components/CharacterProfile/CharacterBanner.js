import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { characterBanners } from '../../constants/characterBanners';
import { characterPortraits } from '../../constants/characterPortraits';

import * as theme from '../../themes/defaultTheme';

const Banner = styled.View`
`;

const PortraitContainer = styled.View`
`;

const PortraitImage = styled.Image`
  position: absolute;
  top: 67%;
`;


const BannerImage = styled.Image`

`;


const CharacterBanner = ({ name }) => (
    <ThemeProvider theme={theme}>
        <Banner>
            {name ? <BannerImage resizeMode={'contain'} source={characterBanners[name]} /> : null}
            {name ? <PortraitImage source={characterPortraits[name]} /> : null}
        </Banner>
    </ThemeProvider>
);

export default CharacterBanner;