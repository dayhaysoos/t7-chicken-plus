import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MainMenuBanner from '../components/MainMenuBanner';

import styled, { ThemeProvider } from 'styled-components';

import * as characterActions from '../redux/actions/characterActions';

import { GradientTheme } from '../common/GradientTheme';

// styles
const MainContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const CustomButtonWrapper = styled.TouchableOpacity`
  background-color: transparent;
  height: 75;
  width: 100%;
  padding-top: 25;
  padding-left: 25;
  border-bottom-width: 1;
  border-bottom-color: ${({ theme }) => theme.primaryGradient1};
`;

const CustomButtonText = styled.Text`
  color: ${({ theme }) => theme.primaryGradient1};
  font-size: 24;
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
};

class HomeScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object,
        theme: PropTypes.object
    }


    componentDidMount = createComponentDidMount(this);

    render() {
        const { theme } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <GradientTheme
                    theme={theme}
                >
                    <MainContainer>
                        <MainMenuBanner />
                        <CustomButtonWrapper
                            onPress={() => this.props.navigation.navigate('CharacterSelect')}
                        >
                            <CustomButtonText>Character Select</CustomButtonText>
                        </CustomButtonWrapper>
                        <CustomButtonWrapper
                            onPress={() => this.props.navigation.navigate('Sponsors')}
                        >
                            <CustomButtonText>Sponsors</CustomButtonText>
                        </CustomButtonWrapper>
                        <CustomButtonWrapper
                            onPress={() => this.props.navigation.navigate('Support')}
                        >
                            <CustomButtonText>Support Us!</CustomButtonText>
                        </CustomButtonWrapper>
                        <CustomButtonWrapper
                            onPress={() => this.props.navigation.navigate('About')}
                        >
                            <CustomButtonText>About</CustomButtonText>
                        </CustomButtonWrapper>
                    </MainContainer>
                </GradientTheme>
            </ThemeProvider>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);