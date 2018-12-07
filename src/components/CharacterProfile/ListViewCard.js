import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Dimensions } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import * as characterActions from '../../redux/actions/characterActions';

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

export const mapStateToProps = ({ moveData }) => ({
    moveData
});

export const mapDispatchToProps = {
    ...characterActions
};

const StarButton = styled.TouchableOpacity``;
const StarIcon = styled(FontAwesome)`
    color: red;
    font-size: 30;
    margin-right: 15;
    margin-top: 10;
`;

class ListViewCard extends Component {

    static propTypes = {
        theme: PropTypes.object,
        item: PropTypes.object,
        navigation: PropTypes.object
    }

    navigateToCharacterMove = (item, name) => {
        const { updateMoveData, navigation, index } = this.props;
        updateMoveData(index);
        navigation.navigate('CharacterMove', { name });
    }

    render() {
        const { name, theme, item, item: { notation, speed, on_block, on_hit, move_name } } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <CardContainer
                    onPress={() => this.navigateToCharacterMove(item, name)}
                >
                    <MoveNameContainer>
                        {move_name ? <ListViewText >{move_name}</ListViewText> : null}
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
                    <StarButton onPress={this.props.onStarPress}>
                        <StarIcon>{item.favorite ? Icons.star : Icons.starO}</StarIcon>
                    </StarButton>
                </CardContainer>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListViewCard);
