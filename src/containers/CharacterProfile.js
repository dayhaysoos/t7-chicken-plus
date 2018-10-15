import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Text, Dimensions } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import characterActions from '../redux/actions/characterActions';
import { getCharacterMoveList } from '../selectors/characterSelect';

import { GradientTheme } from '../common/GradientTheme';

export const mapDispatcthToProps = {
    ...characterActions
};

export const mapStateToProps = ({ characterData, theme, settings: listView }) => ({
    moveList: getCharacterMoveList(characterData),
    listView: false,
    theme
});

const { width } = Dimensions.get('window');

const MainContainer = styled.View`

`;

const ListViewCard = styled.TouchableOpacity`
  height: 50;
`;

const ListViewText = styled.Text`
  color: blue;
`;

const SpreadsheetRow = styled.TouchableOpacity`
  flex-direction: row;
`;

const SpreadsheetCell = styled.Text`
  height: 80;
  flex: 1;
  border-width: 2;
  border-color: black;
`;

class CharacterProfile extends Component {

    renderListView = ({ item, key }) => (
        <ListViewCard
            onPress={(navigation) => this.props.navigation.navigate('CharacterMove')}
        >
            <ListViewText key={key}>{item.notation}</ListViewText>
        </ListViewCard>
    )

    renderSpreadsheetView = ({ item, item: { notation, hit_level, damage, speed, on_block, on_ch, on_hit }, key }) => (
        <SpreadsheetRow
            key={key}
            onPress={(navigation) => this.props.navigation.navigate('CharacterMove', { ...item })}
        >
            <SpreadsheetCell>{notation}</SpreadsheetCell>
            <SpreadsheetCell>{hit_level}</SpreadsheetCell>
            <SpreadsheetCell>{damage}</SpreadsheetCell>
            <SpreadsheetCell>{speed}</SpreadsheetCell>
            <SpreadsheetCell>{on_block}</SpreadsheetCell>
            <SpreadsheetCell>{on_hit}</SpreadsheetCell>
            <SpreadsheetCell>{on_ch}</SpreadsheetCell>
        </SpreadsheetRow>
    )

    render() {
        const { navigation, listView, theme } = this.props;
        const moveListObject = navigation.getParam('moveList');
        const moveListKey = Object.keys(moveListObject)[0];
        const moveListArray = moveListObject[moveListKey];

        return (
            <GradientTheme theme={theme}>
                <MainContainer>
                    <FlatList
                        contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                        data={moveListArray}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={listView ? this.renderListView : this.renderSpreadsheetView}
                    />
                </MainContainer>
            </GradientTheme>
        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);