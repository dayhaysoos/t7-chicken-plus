import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CardContainer = styled.TouchableOpacity`
  height: 120;
  width: ${width};
  flex-direction: row;
  border-bottom-width: 1;
  border-bottom-color: ${({ theme: { primaryGradient1 } }) => primaryGradient1};
`;

const ListViewText = styled.Text`
  color: ${({ theme: { text } }) => text};
`;

const MoveNameContainer = styled.View`
  flex: 1;
  padding-left: 20;
  padding-top: 10;
`;

const MoveDetailContainer = styled.View`
  flex: 3;
  padding-left: 30;
  padding-top: 10;
`;

const MoveDetailText = styled.Text`
  color: ${({ theme: { listViewText } }) => listViewText};
  justify-content: space-between;
`;

class ListViewCard extends Component {

    static propTypes = {
        theme: PropTypes.object,
        item: PropTypes.object,
        navigation: PropTypes.object
    }

    render() {
        const { name, theme, item, navigation: { navigate }, item: { notation, speed, on_block, on_hit } } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <CardContainer
                    onPress={() => navigate('CharacterMove', { ...item, name })}
                >
                    <MoveNameContainer>
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
                </CardContainer>
            </ThemeProvider>
        );
    }
}

export default ListViewCard;
