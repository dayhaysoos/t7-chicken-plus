import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import { FlatList, View } from 'react-native';

import * as characterActions from '../redux/actions/characterActions';

import { GradientTheme } from '../common/GradientTheme';

import { getCharacterMoveList } from '../selectors/characterSelect';

// styles

const Text = styled.Text`
    color: ${(props) => props.theme.primaryGradient1};
`;

const CharacterCard = styled.TouchableOpacity`
    marginLeft: 5;
    marginRight: 5;
    height: 150;
    width: 85;
    border-top-width: 2px;
    border-top-color: white;
    border-bottom-width: 2px;
    border-bottom-color: black;
`;

export const mapDispatcthToProps = {
    ...characterActions
};

export const mapStateToProps = ({ characterData, theme }) => ({
    ...characterData,
    theme,
    characterNames: getCharacterMoveList(characterData)
});

class CharacterSelect extends Component {

    static propTypes = {
        theme: PropTypes.object,
        characterData: PropTypes.array,
        characterNames: PropTypes.array,
        navigation: PropTypes.object
    }

    state = {
        charName: ''
    }

    renderCharacterCard = ({ item }) => {
        const name = Object.keys(item)[0];
        return (
            <CharacterCard
                onPress={() => this.props.navigation.navigate('CharacterProfile', { moveList: item })}
            >
                <Text key={Math.random()}>{name}</Text>
            </CharacterCard>
        );
    }

    render() {
        const { theme, characterNames } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <FlatList
                            contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                            data={characterNames}
                            numColumns={4}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderCharacterCard}
                        />
                    </View>
                </GradientTheme>
            </ThemeProvider>

        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterSelect);