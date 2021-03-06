import React, { Component } from 'react';
import { ScrollView, Modal, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';

import { GradientTheme } from '../common/GradientTheme';
import Legend from '../components/Legend';
import BottomMenuBar from '../components/BottomMenuBar';
import firebase from 'react-native-firebase';

import * as characterActions from '../redux/actions/characterActions';

import Button from '../common/Button';
import AdBanner from '../components/AdBanner';
import InputDisplay from '../common/InputDisplay'

import { checkMoveProperty } from '../utils/CharacterMove';

const MainContainer = styled.View`
  flex: 1;
`;

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
  padding-top: 20;
  justify-content: flex-end;
  align-items: flex-end;
  height: 40;
  width: 95%;
`;

const GifContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const GifButton = styled(Button)`
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

const InputContainer = styled.View`
  padding-left: 20;
`

const mapStateToProps = ({ theme, characterData: { moveData, selectedCharacterMoves, selectedCharacterLabel, currentAttack } }) => ({
    theme,
    moveData,
    selectedCharacterMoves,
    selectedCharacterLabel,
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
        selectedIndex: 0,
        isDrawerOpen: false,
    }

    componentDidMount = () => {
        const { navigation } = this.props;

        const item = navigation.getParam('item');

        const { notation, move_name, name, id } = item;

        const selectedCharacterMoves = navigation.getParam('selectedCharacterMoves');

        const selectedIndex = selectedCharacterMoves.findIndex((move) => move.id === id);

        this.setState({
            selectedIndex
        });

        firebase.analytics().logEvent('Screen_Character_Move', {
            move_name: move_name,
            notation: `${name} ${notation}`,
            character: name
        });
    }

    nextAttack = () => {
        const { selectedIndex } = this.state;
        this.setState({
            selectedIndex: selectedIndex + 1
        });
    }

    previousAttack = () => {
        const { selectedIndex } = this.state;
        this.setState({
            selectedIndex: selectedIndex - 1
        });
    }

    toggleModal = (isVisible) => {

        this.setState({
            modalVisible: isVisible
        });
    }

    onDrawerClose = () => {
        this.setState({
            isDrawerOpen: false
        });
    }

    openRightDrawer = () => {
        this.setState({
            isDrawerOpen: true,
        });
    }

    renderGeneralProperties = (moves) => moves.map(move => <PropertyText>{checkMoveProperty(move)}</PropertyText>)

    render() {

        const { theme, navigation, selectedCharacterLabel } = this.props;
        const { selectedIndex } = this.state;

        const selectedCharacterMoves = navigation.getParam('selectedCharacterMoves');

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
            in_air,
            natural,
            on_whiff,
            pushback,

        } = selectedCharacterMoves[this.state.selectedIndex];

        const { modalVisible, isDrawerOpen } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    <MainContainer>
                        <AdBanner screen={'character-move'} />
                        <ScrollView>
                            <GifButtonContainer>
                                {preview_url ? <GifButton onPressFunc={() => this.toggleModal(true)} icon={'video'} text={'Play'} /> : null}
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
                                                <ActivityIndicator animating={this.state.loadingGif} size="large" color="#FF412C" />
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
                                <InputContainer>
                                    <InputDisplay notation={notation} />
                                </InputContainer>
                            </NotationWrapper>

                            {/* <HeaderTitle>
                            Special Properties
                        </HeaderTitle> */}
                            <HeaderTitle>
                                Frame Properties
                                </HeaderTitle>

                            {checkMoveProperty(speed) && (
                                <PropertyText>Speed: {speed}</PropertyText>
                            )}
                            {checkMoveProperty(on_hit) && (
                                <PropertyText>On Hit: {on_hit}</PropertyText>
                            )}
                            {checkMoveProperty(on_ch) && (
                                <PropertyText>On Counter: {on_ch}</PropertyText>
                            )}
                            {checkMoveProperty(on_block) && (
                                <PropertyText>On Block: {on_block}</PropertyText>
                            )}
                            {checkMoveProperty(on_whiff) && (
                                <PropertyText>On Whiff: {on_whiff}</PropertyText>
                            )}


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
                            {checkMoveProperty(in_air) && (
                                <PropertyText>In Air: {in_air}</PropertyText>
                            )}
                            {checkMoveProperty(tracking) && (
                                <PropertyText>Tracking: {tracking}</PropertyText>
                            )}
                            {checkMoveProperty(natural) && (
                                <PropertyText>Natural: {natural}</PropertyText>
                            )}
                            {checkMoveProperty(pushback) && (
                                <PropertyText>Push Back: {pushback}</PropertyText>
                            )}
                        </ScrollView>
                        <BottomMenuBar
                            navigation={navigation}
                            onPressPreviousAttack={selectedIndex <= 0 ? null : this.previousAttack}
                            onPressNextAttack={selectedCharacterMoves.length - 1 <= selectedIndex ? null : this.nextAttack}
                            onPressOpenLegendDrawer={this.openRightDrawer}
                            isCharacterMoveScreen={true}
                        />
                    </MainContainer>
                </GradientTheme >
            </ThemeProvider >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMove);