import React from 'react';
import styled from 'styled-components';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

import { characterBanners } from '../../constants/characterBanners';
import { characterPortraits } from '../../constants/characterPortraits';

const HEADER_MAX_HEIGHT = 300;

const Banner = styled(Animated.View)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: ${HEADER_MAX_HEIGHT};
`;

const PortraitImage = styled.Image`
  position: absolute;
  height: 101;
  width: 64;
  top: 67%;
`;

const BannerImage = styled(Animated.Image)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: null;
    height: ${HEADER_MAX_HEIGHT};
    resizeMode: contain;
`;

const CharacterBanner = ({ name, headerTranslate = 0, imageOpacity = 1, imageTranslate = 0 }) => (
    <Banner
        pointerEvents="none"
        style={{ transform: [{ translateY: headerTranslate }] }}
    >
        <BannerImage
            source={characterBanners[name]}
            style={{
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
            }}
        />
        <PortraitImage source={characterPortraits[name]} />
    </Banner>
);

CharacterBanner.propTypes = {
    name: PropTypes.string,
    imageOpacity: PropTypes.object,
    imageTranslate: PropTypes.object,
    headerTranslate: PropTypes.object,
};

export default CharacterBanner;
