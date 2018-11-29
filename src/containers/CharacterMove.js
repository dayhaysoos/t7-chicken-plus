import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import MoveHeader from '../components/MoveHeader';
import { GradientTheme } from '../common/GradientTheme';
import BottomMenuBar from '../components/BottomMenuBar';
import firebase from 'react-native-firebase';

import * as characterActions from '../redux/actions/characterActions';
import AdBanner from '../components/AdBanner';


const HeaderTitle = styled.Text`
  background-color: ${(props) => props.theme.primaryGradient2}
  color: white;
  padding-top: 20;
  padding-bottom: 10;
  padding-left: 10;
  font-size: 18;
`;

const PropertyContainer = styled.View`
`;

const PropertyText = styled.Text`
  color: white;
  border-bottom-width: 1;
  border-bottom-color: white;
  padding-left: 10;
`;

const PropertyTextWrapper = styled.View`
  border-bottom-width: 1;
  border-bottom-color: white;
  height: 50;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
`;

const mapStateToProps = ({ theme, characterData: { moveData, selectedCharacterMoves, currentIndex } }) => ({
    theme,
    moveData,
    selectedCharacterMoves,
    currentIndex
});

const mapDispatchToProps = {
    ...characterActions
};

class CharacterMove extends Component {

    static navigationOptions = ({ navigation: { state: { params: { name } } } }) => ({
        headerTransparent: false,
        title: name,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#FFFFFF'
        },
    })

    componentDidMount = () => {
        const { navigation } = this.props;

        const moveName = navigation.getParam('move_name');
        const notation = navigation.getParam('notation');
        const name = navigation.getParam('name');

        firebase.analytics().logEvent('Screen_Character_Move', {
            moveName,
            notation,
            character: name
        });
    }

    nextAttack = () => {
        const { incrementMoveIndex } = this.props;
        incrementMoveIndex();
    }

    previousAttack = () => {
        const { decrementMoveIndex } = this.props;
        decrementMoveIndex();
    }

    render() {

        const { theme, navigation, currentIndex, selectedCharacterMoves, moveData } = this.props;
        const {
            damage,
            hit_level,
            move_name,
            notation,
            notes,
            on_block,
            on_ch,
            on_hit,
            preview_url,
            properties,
            speed,
            name
        } = this.props.navigation.state.params;

        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    {/* <AdBanner /> */}
                    <ScrollView>
                        <MoveHeader
                            moveName={move_name}
                            notation={notation}
                        />
                        <Text>Welp</Text>
                    </ScrollView>
                    <BottomMenuBar
                        navigation={navigation}
                        onPressPreviousAttack={currentIndex <= 0 ? null : this.previousAttack}
                        onPressNextAttack={currentIndex >= selectedCharacterMoves.length - 1 ? null : this.nextAttack}
                    />
                </GradientTheme >
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMove);