import React, { Component } from 'react';
import { ScrollView, Modal, Text, } from 'react-native';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import MoveHeader from '../components/MoveHeader';
import { GradientTheme } from '../common/GradientTheme';
import BottomMenuBar from '../components/BottomMenuBar';
import firebase from 'react-native-firebase';

import * as characterActions from '../redux/actions/characterActions';

import Button from '../common/Button';
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
  padding-left: 10;
  font-size: 18;
  border-bottom-width: 1;
  border-bottom-color: gray;
`;



const PropertyTextWrapper = styled.View`
  border-bottom-width: 1;
  border-bottom-color: white;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  margin-bottom: 10;
`;

const NotationWrapper = styled.View`
  border-bottom-width: 0;
  margin-bottom: 20;
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
  resizeMode: cover;
`;

const ModalView = styled.TouchableHighlight`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 2);
  opacity: 0.6;

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

    state = {
        modalVisible: false,
    }

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

    toggleModal = (isVisible) => {
        const { modalVisible } = this.state;
        this.setState({
            modalVisible: isVisible
        });
    }

    gifParser = (previewUrl) => {
        const giantAdded = previewUrl.replace(/gfycat/, 'giant.gfycat');
        const typeAdded = giantAdded.replace(/$/, '.gif');
        return typeAdded;
    }

    render() {

        const { theme, navigation, currentIndex, selectedCharacterMoves, moveData } = this.props;

        const {
            properties,
            speed,
            on_block,
            on_hit,
            move_name,
            id,
            preview_url,
            notation,
            hit_level,
            damage } = moveData;

        const { modalVisible } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    {/* <AdBanner /> */}
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
                                >
                                    <ModalView onPress={() => this.toggleModal(false)}>
                                        <GifContainer>
                                            <GifImage source={{ uri: this.gifParser(preview_url) }} />
                                        </GifContainer>

                                    </ModalView>
                                </Modal>
                                :
                                null
                        }
                        <NotationWrapper>
                            <PropertyText>{move_name ? move_name : '-'}</PropertyText>
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
                        <PropertyTextWrapper>
                            <PropertyText>
                                Damage: {damage}
                            </PropertyText>
                            <PropertyText>
                                Hit Level: {hit_level ? hit_level : '-'}
                            </PropertyText>
                        </PropertyTextWrapper>
                        <HeaderTitle>
                            Frame Properties
                        </HeaderTitle>
                        <PropertyTextWrapper>
                            <PropertyText>
                                Speed: {speed}
                            </PropertyText>
                            <PropertyText>
                                On Hit: {on_hit}
                            </PropertyText>
                            <PropertyText>
                                On Block: {on_block}
                            </PropertyText>
                        </PropertyTextWrapper>
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