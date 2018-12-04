import React from 'react';
import styled from 'styled-components';
import { AdMobBanner } from 'react-native-admob';

const BannerWrapper = styled.View`
  z-index: 100;
`;

const AdBanner = () => (
    <BannerWrapper>
        <AdMobBanner
            // adSize='fullBanner'
            adUnitID={'ca-app-pub-2131722019779391/7918522930'} //test ad unit id
            testDevices={[AdMobBanner.simulatorId]}
        />
    </BannerWrapper>
);

export default AdBanner;


