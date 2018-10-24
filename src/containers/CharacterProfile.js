import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View, Text, Dimensions, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import { getCharacterMoveList } from '../selectors/characterSelect';

import { GradientTheme } from '../common/GradientTheme';

import Drawer from 'react-native-drawer';
import DrawerSwitcher from '../components/DrawerSwitcher';

// components
import BottomMenuBar from '../components/BottomMenuBar';
import FilterMenu from '../components/FilterMenu';

export const mapDispatcthToProps = {
    ...characterActions,
    ...settingsActions
};

export const mapStateToProps = ({ characterData, theme, settings: { listView } }) => ({
    moveList: getCharacterMoveList(characterData),
    listView,
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
  flex: 1;
  border-width: 2;
  border-color: black;
`;

class CharacterProfile extends Component {

    static navigationOptions = ({ navigation }) => navigation.navigate

    state = {
        activeFilters: [],
        moveListArray: [],
        isRightDrawerOpen: false,
        side: 'right',
        unFilteredMoveList: [],
    }

    componentDidMount() {
        const moveListObject = this.props.navigation.getParam('moveList');
        const moveListKey = Object.keys(moveListObject)[0];
        const moveListArray = moveListObject[moveListKey];

        this.setState({ moveListArray, unFilteredMoveList: moveListArray });
    }

    renderListView = ({ item, key }) => (
        <ListViewCard
            onPress={(navigation) => this.props.navigation.navigate('CharacterMove', { ...item })}
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

    setCharacterProfileState = (obj) => {
        this.setState(obj);
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

    filterMoveList(filterFunction)  {
        this.setState({ moveListArray: this.state.moveListArray.filter(filterFunction) });
    }

    onDrawerClose = () => {
        this.setState({
            isOpen: false
        });

        if (this.state.activeFilters.length) {
            this.state.activeFilters.forEach(filter => this.filterMoveList(filter));
        } else {
            this.setState({ moveListArray: this.state.unFilteredMoveList});
        }
    }

    render() {
        const { navigation, toggleListView, listView, theme } = this.props;

        const { isOpen, side } = this.state;

        return (
            <DrawerSwitcher
                component={
                    <FilterMenu
                        activeFilters={this.state.activeFilters}
                        moveListArray={this.state.moveListArray}
                        setCharacterProfileState={this.setCharacterProfileState}
                        unFilteredMoveList={this.state.unFilteredMoveList}
                    />
                }
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
                        <BottomMenuBar
                            isListView={listView}
                            navigation={navigation}
                            onPressFilterMenu={this.openRightDrawer}
                            toggleListView={toggleListView}
                        />
                    </MainContainer>
                </GradientTheme>
            </DrawerSwitcher>
        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);