import React from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createPersistoid, getStoredState } from 'redux-persist';

import styled, { ThemeProvider } from 'styled-components';

import * as characterActions from '../redux/actions/characterActions';

// styles
const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CustomButton = styled.Button`
  color: ${(props) => props.theme.redPrimary};
  font-size: 200;
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

    checkStorage = async () => {
        try {
            const value = await AsyncStorage.getAllKeys();
            console.log('value', value);
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount = createComponentDidMount(this);

    render() {
        const { theme } = this.props;
        createPersistoid({ key: 'testing' });
        console.log('this props', this.props);
        this.checkStorage();
        return (
            <ThemeProvider theme={theme}>
                <MainContainer>
                    <CustomButton
                        title="Character Select"
                        onPress={() => this.props.navigation.navigate('CharacterSelect')}
                    />
                    <CustomButton
                        title="Sponsors"
                        onPress={() => this.props.navigation.navigate('Sponsors')}
                    />
                    <CustomButton
                        title="Support"
                        onPress={() => this.props.navigation.navigate('Support')}
                    />
                    <CustomButton
                        title="About"
                        onPress={() => this.props.navigation.navigate('About')}
                    />
                </MainContainer>
            </ThemeProvider>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);