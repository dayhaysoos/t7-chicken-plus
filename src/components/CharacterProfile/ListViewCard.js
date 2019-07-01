import React, { Component } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components/native';
import { Dimensions } from 'react-native';
import Button from '../../common/Button';
import AdBanner from '../../components/AdBanner';

import * as characterActions from '../../redux/actions/characterActions';

const { width } = Dimensions.get('window');

const CardContainer = styled.TouchableOpacity`
  width: ${width};
  padding-top: 10;
  flex-direction: row;
  align-items: flex-start;
  border-bottom-width: 2;
  border-bottom-color: #141414;
  background-color: #19181c;
`;

const ListViewText = styled.Text`
  color: ${({ theme: { text } }) => text};
  font-size: 16;
`;

const MoveNameText = styled(ListViewText)`
  font-weight: 900;
  margin-bottom: 15;
`;

const MoveNameContainer = styled.View`
  width: 33%;
  padding-left: 20;
  margin-bottom: 15;
`;

const MoveDetailContainer = styled.View`
  width: 33%;
  padding-left: 30;
  margin-bottom: 15;
`;

const MoveDetailText = styled.Text`
  color: ${({ theme: { listViewText } }) => listViewText};
  justify-content: space-between;
`;

const MoveGifContainer = styled.View`
  width: 33%;
  padding-left: 20;
  justify-content: center;
  align-items: center;
`;

const GifButtonContainer = styled.View`
  justify-content: center;
  height: 60;
`;

const GifContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const GifButton = styled(Button)`
  padding-left: 10;
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

export const mapStateToProps = ({ moveData }) => ({
    moveData
});

export const mapDispatchToProps = {
    ...characterActions
};

class ListViewCard extends Component {

    static propTypes = {
        theme: PropTypes.object,
        item: PropTypes.object,
        navigation: PropTypes.object
    }

    state = {
        modalVisible: false,
        loadingGif: true,
    }

    toggleModal = (isVisible) => {

        this.setState({
            modalVisible: isVisible
        });
    }

    navigateToCharacterMove = (item, name, id) => {
        const { updateMoveData, navigation, selectedCharacterMoves } = this.props;
        updateMoveData(id);
        navigation.navigate('CharacterMove', { name, id, item, selectedCharacterMoves });
    }

    render() {
        const { name, theme, item, item: { notation, speed, on_block, on_hit, move_name, id, preview_url } } = this.props;
        const { modalVisible } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <CardContainer
                    onPress={() => this.navigateToCharacterMove(item, name, id)}
                >
                    <MoveNameContainer>
                        {move_name ? <MoveNameText >{move_name}</MoveNameText> : null}
                        <ListViewText >{notation}</ListViewText>
                    </MoveNameContainer>
                    <MoveDetailContainer>
                        <MoveDetailText>
                            Speed: {speed}
                        </MoveDetailText>
                        <MoveDetailText>
                            On Block: {on_block}
                        </MoveDetailText>
                        <MoveDetailText>
                            On Hit: {on_hit}
                        </MoveDetailText>
                    </MoveDetailContainer>
                    <MoveGifContainer>
                        <GifButtonContainer>
                            {preview_url ? <GifButton onPressFunc={() => this.toggleModal(true)} icon={'play'} text={'Play'} /> : null}
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
                    </MoveGifContainer>
                </CardContainer>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListViewCard);
