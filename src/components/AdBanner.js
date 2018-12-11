import React from 'react';
import styled from 'styled-components';
import { AdMobBanner } from 'react-native-admob';
import firebase from 'react-native-firebase';

const Banner = firebase.admob.Banner;

const BannerWrapper = styled.View`
  margin: auto;
  z-index: 100;
`;

const AdBanner = () => (
    <BannerWrapper>
        <Banner size={'SMALL_BANNER'} unitId={'ca-app-pub-3940256099942544/2934735716'} />
    </BannerWrapper>
);

export default AdBanner;


