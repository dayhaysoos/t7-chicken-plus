import React, { Component } from 'react';
import { ScrollView, Modal, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';

import MoveHeader from '../components/MoveHeader';
import { GradientTheme } from '../common/GradientTheme';
import BottomMenuBar from '../components/BottomMenuBar';
import firebase from 'react-native-firebase';

import * as characterActions from '../redux/actions/characterActions';

import Button from '../common/Button';
import AdBanner from '../components/AdBanner';

import { checkMoveProperty } from '../utils/CharacterMove';

const Banner = firebase.admob.Banner;


const HeaderTitle = styled.Text`
  background-color: ${(props) => props.theme.primaryGradient2}
  color: white;
  padding-top: 20;
  padding-bottom: 20;
  font-size: 18;
  padding-left: 20
`;

const PropertyText = styled.Text`
  color: white;
  font-size: 18;
  border-bottom-width: 1;
  border-bottom-color: gray;
  height: 35;
  padding-left: 20;
`;

const NotationWrapper = styled.View`

`;

const GifButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  height: 40;
`;

const GifContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const GifButton = styled(Button)`
  position: absolute;
  top: 0;
`;

const GifImage = styled.Image`
  height: 300;
  width: 400;
  margin-top: 100;
  resizeMode: cover;
`;

const ModalView = styled.TouchableHighlight`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const ModalText = styled.Text`
  color: white;
  font-size: 16;
`;

const mapStateToProps = ({ theme, characterData: { moveData, selectedCharacterMoves, currentAttack } }) => ({
    theme,
    moveData,
    selectedCharacterMoves,
    currentAttack
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

    state = {
        modalVisible: false,
        loadingGif: true,
    }

    componentDidUpdate = (prev) => {
        const { navigation, moveData } = this.props;
        const { notation, move_name } = moveData;

        const name = navigation.getParam('name');

        if (prev.moveData !== moveData) {
            firebase.analytics().logEvent('Screen_Character_Move_PrevOrNextBtn', {
                move_name,
                notation: `${name} ${notation}`,
                character: name
            });
        }
    }

    componentDidMount = () => {
        const { navigation } = this.props;

        const moveName = navigation.getParam('move_name');
        const notation = navigation.getParam('notation');
        const name = navigation.getParam('name');

        firebase.analytics().logEvent('Screen_Character_Move', {
            moveName,
            notation: `${name} ${notation}`,
            // character: name
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

    toggleModal = (isVisible) => {
        const { modalVisible } = this.state;



        this.setState({
            modalVisible: isVisible
        });
    }


    render() {

        const { theme, navigation, currentAttack, selectedCharacterMoves, moveData } = this.props;

        const {
            speed,
            on_block,
            on_hit,
            on_ch,
            move_name,
            id,
            preview_url,
            notation,
            hit_level,
            damage,
            crush,
            jail,
            range,
            tracking,

        } = moveData;

        const { modalVisible } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    <AdBanner screen={'character-move'} />
                    <ScrollView>
                        <GifButtonContainer>
                            {preview_url ? <GifButton onPressFunc={() => this.toggleModal(true)} icon={'play'} text={'Play gif'} /> : null}
                        </GifButtonContainer>
                        {
                            modalVisible ?
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => this.toggleModal(false)}
                                >
                                    <ModalView onPress={() => this.toggleModal(false)}>
                                        <GifContainer>
                                            <AdBanner size={'large'} screen={'gif'} />
                                            <GifImage
                                                source={{ uri: preview_url }}
                                                onLoadStart={() => this.setState({ loadingGif: true })}
                                                onLoadEnd={() => this.setState({ loadingGif: false })}
                                            />
                                            <ActivityIndicator animating={this.state.loadingGif} size="large" color="red" />
                                            <ModalText>Tap screen to exit</ModalText>
                                        </GifContainer>

                                    </ModalView>
                                </Modal>
                                :
                                null
                        }
                        <NotationWrapper>
                            <PropertyText>{move_name === '-' ? '' : move_name}</PropertyText>
                            <PropertyText>
                                {notation}
                            </PropertyText>
                        </NotationWrapper>

                        {/* <HeaderTitle>
                            Special Properties
                        </HeaderTitle> */}

                        <HeaderTitle>
                            General Properties
                        </HeaderTitle>

                        {checkMoveProperty(damage) && (
                            <PropertyText>Damage: {damage}</PropertyText>
                        )}

                        {checkMoveProperty(hit_level) && (
                            <PropertyText>Hit Level: {hit_level}</PropertyText>
                        )}

                        {checkMoveProperty(range) && (
                            <PropertyText>Range: {range}</PropertyText>
                        )}
                        {checkMoveProperty(crush) && (
                            <PropertyText>Crush: {crush}</PropertyText>
                        )}
                        {checkMoveProperty(jail) && (
                            <PropertyText>Jail: {jail}</PropertyText>
                        )}
                        {checkMoveProperty(tracking) && (
                            <PropertyText>Tracking: {tracking}</PropertyText>
                        )}

                        <HeaderTitle>
                            Frame Properties
                        </HeaderTitle>

                        {checkMoveProperty(speed) && (
                            <PropertyText>Speed: {speed}</PropertyText>
                        )}
                        {checkMoveProperty(on_hit) && (
                            <PropertyText>On Hit: {on_hit}</PropertyText>
                        )}
                        {checkMoveProperty(on_block) && (
                            <PropertyText>On Block: {on_block}</PropertyText>
                        )}
                        {checkMoveProperty(on_ch) && (
                            <PropertyText>On Counter: {on_ch}</PropertyText>
                        )}
                    </ScrollView>
                    <BottomMenuBar
                        navigation={navigation}
                        onPressPreviousAttack={currentAttack.split('_')[1] <= 1 ? null : this.previousAttack}
                        onPressNextAttack={currentAttack.split('_')[1] >= Object.keys(selectedCharacterMoves).length ? null : this.nextAttack}
                    />
                </GradientTheme >
            </ThemeProvider >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMove);