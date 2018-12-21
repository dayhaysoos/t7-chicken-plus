import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import MainMenuBanner from '../components/MainMenuBanner';
import styled, { ThemeProvider } from 'styled-components/native';
import * as characterActions from '../redux/actions/characterActions';
import { GradientTheme } from '../common/GradientTheme';
import firebase from 'react-native-firebase';
import characterSelectBackground from '../../assets/images/mainMenu/character-select-background.png';
import aboutTheTeam from '../../assets/images/mainMenu/about-the-team.png';
import removeAds from '../../assets/images/mainMenu/remove-ads.png';

import MenuItem from '../components/HomeScreen/MenuItem';


// styles
const MainContainer = styled.View`
  flex: 1;
`;

export const mapDispatchToProps = {
    ...characterActions
};

export const mapStateToProps = ({ characterData, theme }) => ({
    ...characterData,
    theme
});

export const createComponentDidMount = (instance) => () => {
    const { getCharacterData } = instance.props;
    getCharacterData();

    firebase.analytics().logEvent('Screen_Home', {});
    setTimeout(() => {
        SplashScreen.hide();
    }, 200);
};




class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    };


    static propTypes = {
        navigation: PropTypes.object,
        theme: PropTypes.object
    }


    componentDidMount = createComponentDidMount(this);

    render() {
        const { theme, navigation } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <GradientTheme
                    theme={theme}
                >
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
                        <MenuItem
                            navigateTo={() => navigation.navigate('RemoveAds')}
                            text={'Ad Removal coming soon'}
                            imageUrl={removeAds}
                        />
                        <MenuItem
                            navigateTo={() => navigation.navigate('About')}
                            text={'About the team'}
                            imageUrl={aboutTheTeam}
                        />

                    </MainContainer>
                </GradientTheme>
            </ThemeProvider >
        );
    }
}

HomeScreen.screenName = 'Home';


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);