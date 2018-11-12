import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, ScrollView } from 'react-native';
import styled, { ThemeProvider, consolidateStreamedStyles } from 'styled-components';
import { connect } from 'react-redux';

import CharacterBanner from '../components/CharacterProfile/CharacterBanner';
import ListViewCard from '../components/CharacterProfile/ListViewCard';
import SpreadSheetRow from '../components/CharacterProfile/SpreadSheetRow';
import HeaderRow from '../components/CharacterProfile/HeaderRow';


import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import { getCharacterMoveList } from '../selectors/characterSelect';

import { characterBanners } from '../constants/characterBanners';

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

const MainContainer = styled(Drawer)`

`;

const EmptyText = styled.Text`
  color: white;
  fontSize: 20;
  marginLeft: 10;
`;

class CharacterProfile extends Component {

    static navigationOptions = ({ navigation }) => navigation.navigate

    static propTypes = {
        navigation: PropTypes.object,
        toggleListView: PropTypes.func,
        listView: PropTypes.bool,
        theme: PropTypes.object
    }

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

    async resetSearch() {
        this.setState({ moveListArray: this.state.unFilteredMoveList },
            () => this.state.activeFilters.forEach(filter => this.filterMoveList(filter))
        );
    }

    async searchMoveList(input) {
        await this.resetSearch();

        if (input.includes('+')) {
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
        const { navigation, navigation: { state: { params: { name } } }, toggleListView, listView, theme } = this.props;
        const { isOpen, side } = this.state;

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
                        <MainContainer>
                            <ScrollView
                                horizontal={true}
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
                                    ListHeaderComponent={listView ? < CharacterBanner name={name.toLowerCase()} /> : <HeaderRow />}
                                    initialNumToRender={10}
                                    initialScrollIndex={0}
                                    getItemLayout={(item, index) => (
                                        { length: listView ? 120 : 100, offset: listView ? 120 : 100 * index, index }
                                    )}
                                    stickyHeaderIndices={listView ? [] : [0]}
                                />
                            </ScrollView>
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