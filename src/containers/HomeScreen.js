import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import MainMenuBanner from '../components/MainMenuBanner';
import styled from 'styled-components';
import * as characterActions from '../redux/actions/characterActions';
import * as paidActions from '../redux/actions/paidActions';
import firebase from 'react-native-firebase';
import characterSelectBackground from '../../assets/images/mainMenu/character-select-background.png';
import aboutTheTeam from '../../assets/images/mainMenu/about-the-team.png';
import removeAds from '../../assets/images/mainMenu/remove-ads.png';

import MenuItem from '../components/HomeScreen/MenuItem';

import Stripe from 'tipsi-stripe';


Stripe.setOptions({
    publishableKey: 'pk_test_yNV17SRP9KHKMwl24gvfCRDL00lSTnaRri',
    merchantId: 'merchant.com.apps.humblemagnificent', // Optional
    androidPayMode: 'test', // Android only
});



// styles
const MainContainer = styled.View`
  flex: 1;
  background-color: #000000;
`;

export const mapDispatchToProps = {
    ...characterActions,
    ...paidActions
};

export const mapStateToProps = ({ characterData, theme, paid }) => ({
    ...characterData,
    theme,
    paid
});

export const createComponentDidMount = (instance) => async () => {
    const { getCharacterData, getPurchaseHistory } = instance.props;

    try {
        await getPurchaseHistory();
        await getCharacterData();
        await firebase.analytics().logEvent('Screen_Home', {});
        setTimeout(() => {
            SplashScreen.hide();
        }, 200);
    } 

    catch(error) {
        console.log('err', error);
    }
};




class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    };


    static propTypes = {
        navigation: PropTypes.object,
        theme: PropTypes.object,
        paid: PropTypes.object
    }

    componentDidMount = async () => {
        const { getCharacterData, getPurchaseHistory } = this.props;

        try {
            await getCharacterData();
            await firebase.analytics().logEvent('Screen_Home', {});
            setTimeout(() => {
                SplashScreen.hide();
            }, 200);
        } 
    
        catch(error) {
            console.log('err', error);
        }
    }

    render() {
        const { navigation, paid: {hasPaid} } = this.props;

        return (
            <MainContainer>
                <StatusBar
                    barStyle="light-content"
                />
                <MainMenuBanner />
                <MenuItem
                    navigateTo={() => navigation.navigate('CharacterSelect')}
                    text={'Character Select'}
                    imageUrl={characterSelectBackground}
                />
                {hasPaid ? 
                    (
                        <MenuItem
                            navigateTo={() => navigation.navigate('Support')}
                            text={'Support Us!'}
                            imageUrl={removeAds}
                        />
                    )
                    :                 
                    (
                        <MenuItem
                            navigateTo={() => navigation.navigate('RemoveAds')}
                            text={'Ad Removal coming soon'}
                            imageUrl={removeAds}
                        />
                    )
                }
                {/* <MenuItem
                    navigateTo={() => navigation.navigate('Sponsors')}
                    text={'Sponsors'}
                    imageUrl={aboutTheTeam}
                /> */}
                <MenuItem
                    navigateTo={() => navigation.navigate('About')}
                    text={'About the team'}
                    imageUrl={aboutTheTeam}
                />

            </MainContainer>

        );
    }
}

HomeScreen.screenName = 'Home';


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);