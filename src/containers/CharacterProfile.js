import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { View, Text, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import CharacterBanner from '../components/CharacterProfile/CharacterBanner';
import ListViewCard from '../components/CharacterProfile/ListViewCard';
import SpreadSheetRow from '../components/CharacterProfile/SpreadSheetRow';
import HeaderRow from '../components/CharacterProfile/HeaderRow';


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

const EmptyText = styled.Text`
  fontSize: 20;
  marginLeft: 10;
`;

class CharacterProfile extends Component {

    static navigationOptions = ({ navigation }) => navigation.navigate

    state = {
        activeFilters: [],
        moveListArray: [],
        isRightDrawerOpen: false,
        side: 'right',
        unFilteredMoveList: []
    }

    componentDidMount() {
        const moveListObject = this.props.navigation.getParam('moveList');
        const moveListKey = Object.keys(moveListObject)[0];
        const moveListArray = moveListObject[moveListKey];

        this.setState({ moveListArray, unFilteredMoveList: moveListArray });
    }

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

    searchMoveList(input) {
        if (input === '') {
            this.setState({ moveListArray: this.state.unFilteredMoveList },
                () => this.state.activeFilters.forEach(filter => this.filterMoveList(filter))
            );
        } else if (input.includes('+')) {
            this.setState({
                moveListArray: this.state.moveListArray.filter(
                    ({ notation }) => notation.replace(/[ ,]/g, '').includes(input.replace(/[ ,]/g, ''))
                )
            });
        } else {
            this.setState({
                moveListArray: this.state.moveListArray.filter(
                    ({ notation }) => notation.replace(/[ ,+]/g, '').includes(input.replace(/[ ,+]/g, ''))
                )
            });
        }
    }

    filterMoveList(filterFunction) {
        this.setState({ moveListArray: this.state.moveListArray.filter(filterFunction) });
    }

    onDrawerClose = () => {
        this.setState({
            isOpen: false
        });

        if (this.state.activeFilters.length) {
            this.state.activeFilters.forEach(filter => this.filterMoveList(filter));
        } else {
            this.setState({ moveListArray: this.state.unFilteredMoveList });
        }
    }

    render() {
        const { name } = this.props.navigation.state.params;
        const { navigation, toggleListView, listView, theme } = this.props;
        const { isOpen, side, scrollY } = this.state;

        return (
            <ThemeProvider theme={theme}>
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
                                renderItem={({ item }) => (listView ?
                                    <ListViewCard item={item} theme={theme} navigation={navigation} />
                                    :
                                    <SpreadSheetRow item={item} theme={theme} navigation={navigation} />
                                )}
                                ListEmptyComponent={() => <EmptyText>No results for this combination of Search and Filters</EmptyText>}
                                ListHeaderComponent={listView ? null : <HeaderRow />}
                                initialNumToRender={10}
                                initialScrollIndex={0}
                                getItemLayout={(item, index) => (
                                    { length: listView ? 120 : 100, offset: listView ? 120 : 100 * index, index }
                                )}
                                stickyHeaderIndices={listView ? [] : [0]}
                            />
                            <BottomMenuBar
                                isListView={listView}
                                navigation={navigation}
                                onPressFilterMenu={this.openRightDrawer}
                                searchFunction={(input) => this.searchMoveList(input)}
                                toggleListView={toggleListView}
                            />
                        </MainContainer>
                    </GradientTheme>
                </DrawerSwitcher>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);