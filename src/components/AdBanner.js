import React from 'react';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

const Banner = firebase.admob.Banner;


const appUnitSwitcher = (screen) => {

    // uncomment below line before working on dev, I need to set up environment variables
    // screen = 'test';

    if (screen === 'test') return 'ca-app-pub-3940256099942544/2934735716';

    if (Platform.OS === 'ios' && screen === 'character-select') return 'ca-app-pub-2131722019779391/1529634550';
    if (Platform.OS === 'ios' && screen === 'character-profile') return 'ca-app-pub-2131722019779391/3197939441';
    if (Platform.OS === 'ios' && screen === 'character-move') return 'ca-app-pub-2131722019779391/2814796060';
    if (Platform.OS === 'ios' && screen === 'gif') return 'ca-app-pub-2131722019779391/5205866124';

    if (Platform.OS === 'android' && screen === 'character-select') return 'ca-app-pub-2131722019779391/4655078074';
    if (Platform.OS === 'android' && screen === 'character-profile') return 'ca-app-pub-2131722019779391/6187775302';
    if (Platform.OS === 'android' && screen === 'character-move') return 'ca-app-pub-2131722019779391/4112276304';
    if (Platform.OS === 'android' && screen === 'gif') return 'ca-app-pub-2131722019779391/3154417851';

};

const bannerSizeSwitcher = (size) => {
    if (size === 'large') {
        return 'LARGE_BANNER';
    } else {
        return 'SMALL_BANNER';
    }
};

const AdBanner = ({ size, screen }) => (
    <Banner style={{ marginLeft: '11%' }} size={bannerSizeSwitcher(size)} unitId={appUnitSwitcher(screen)} />
);

export default AdBanner;


