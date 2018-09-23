import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Text, Dimensions, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import characterActions from '../redux/actions/characterActions';
import { getCharacterMoveList } from '../selectors/characterSelect';

import { GradientTheme } from '../common/GradientTheme';

import Drawer from 'react-native-drawer';
import DrawerSwitcher from '../components/DrawerSwitcher';

// components
import BottomMenuBar from '../components/BottomMenuBar';

export const mapDispatcthToProps = {
    ...characterActions
};

export const mapStateToProps = ({ characterData, theme, settings: listView }) => ({
    moveList: getCharacterMoveList(characterData),
    listView: false,
    theme
});

const { width } = Dimensions.get('window');

const MainContainer = styled(Drawer)`

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
  width: ${width / 6}
  border-width: 2;
  border-color: black;
`;

class CharacterProfile extends Component {
    state = {
        moveListArray: [],
        isRightDrawerOpen: false,
        side: 'right',
    }

    componentDidMount() {
        const moveListObject = this.props.navigation.getParam('moveList');
        const moveListKey = Object.keys(moveListObject)[0];
        const moveListArray = moveListObject[moveListKey];

        this.setState({ moveListArray });
    }

    renderListView = ({ item, key }) => (
        <ListViewCard>
            <ListViewText key={key}>{item.notation}</ListViewText>
        </ListViewCard>
    )

    testFilters = () => {
        this.filterMoveList((move) => move.speed < 15);
    }

    renderSpreadsheetView = ({ item: { notation, hit_level, damage, speed, on_block, on_ch, on_hit }, key }) => (
        <SpreadsheetRow key={key} onPress={this.testFilters}>
            <SpreadsheetCell>{notation}</SpreadsheetCell>
            <SpreadsheetCell>{hit_level}</SpreadsheetCell>
            <SpreadsheetCell>{damage}</SpreadsheetCell>
            <SpreadsheetCell>{speed}</SpreadsheetCell>
            <SpreadsheetCell>{on_block}</SpreadsheetCell>
            <SpreadsheetCell>{on_hit}</SpreadsheetCell>
            <SpreadsheetCell>{on_ch}</SpreadsheetCell>
        </SpreadsheetRow>
    )

    filterMoveList = (filterFunction) => {
        this.setState({ moveListArray: this.state.moveListArray.filter(filterFunction) });
    }

    openRightDrawer = () => {
        this.setState({
            isOpen: true,
            side: 'right'
        });
    }

    openLeftDrawer = () => {
        this.setState({
            isOpen: true,
            side: 'left'
        });
    }

    onDrawerClose = () => {
        this.setState({
            isOpen: false
        });
    }

    render() {
        const { navigation, listView, theme } = this.props;

        const { isOpen, side } = this.state;

        return (
            <DrawerSwitcher
                component={<Text>Hello</Text>}
                side={side}
                isOpen={isOpen}
                onClose={this.onDrawerClose}
            >
                <GradientTheme theme={theme}>
                    <MainContainer
                    >
                        <FlatList
                            contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                            data={this.state.moveListArray}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={listView ? this.renderListView : this.renderSpreadsheetView}
                        />
                        <BottomMenuBar onPressFilterMenu={this.openRightDrawer} />
                    </MainContainer>
                </GradientTheme>
            </DrawerSwitcher>
        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);