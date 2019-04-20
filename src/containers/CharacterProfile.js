import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Animated, ScrollView, Dimensions, View } from 'react-native';
import styled, { ThemeProvider, consolidateStreamedStyles } from 'styled-components/native';
import { connect } from 'react-redux';

import CharacterBanner from '../components/CharacterProfile/CharacterBanner';
import ListViewCard from '../components/CharacterProfile/ListViewCard';
import SpreadSheetRow from '../components/CharacterProfile/SpreadSheetRow';
import HeaderRow from '../components/CharacterProfile/HeaderRow';
import Header from '../components/Header';
import StarWrapper from '../components/StarWrapper';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import { getCharacterMoveList, getFavoriteMoves } from '../selectors/characterSelect';
import * as favoriteActions from '../redux/actions/favoriteActions';
import * as searchActions from '../redux/actions/searchActions';

import { GradientTheme } from '../common/GradientTheme';

import Drawer from 'react-native-drawer';
import DrawerSwitcher from '../components/DrawerSwitcher';

// components
import BottomMenuBar from '../components/BottomMenuBar';
import FilterMenu from '../components/FilterMenu';
import SpreadSheet from '../components/CharacterProfile/SpreadSheet';
import firebase from 'react-native-firebase';
import AdBanner from '../components/AdBanner';

// filters
import * as filters from '../utils/filterFuncs';

//selectors
import { filterMoves, searchMoves } from '../selectors/characterProfile';

export const mapDispatcthToProps = {
    ...characterActions,
    ...settingsActions,
    ...favoriteActions,
    ...searchActions
};

export const mapStateToProps = ({
    characterData: { selectedCharacterMoves },
    favorites,
    filter: { activeFilters },
    search: { profileInput },
    theme,
    settings: { listView } }, ownProps
) => ({
    listView,
    theme,
    favorites,
    selectedCharacterMoves: searchMoves(filterMoves(selectedCharacterMoves, activeFilters), profileInput),
    // favoriteMoves: getFavoriteMoves({
    //     moves: favorites.moves,
    //     label: ownProps.navigation.getParam('label'),
    //     moveList: ownProps.navigation.getParam('moveList')
    // })
});

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const { height } = Dimensions.get('screen');

const MainContainer = styled(Drawer)`
  flex: 1;
`;

const EmptyText = styled.Text`
  color: white;
  fontSize: 20;
  marginLeft: 10;
`;

const Text = styled.Text`
    color: white;
    text-align: center;
    font-size: 18;
    margin-bottom: 15;
`;

const FILTERS_INITIAL_STATE = {
    hitLevel: {
        high: false,
        mid: false,
        low: false
    },
    onBlock: {
        active: false,
        value: '',
        operator: ''
    }
};

class CharacterProfile extends Component {

    static navigationOptions = ({ navigation: { state: { params: { name, favorite, onStarPress } } } }) => ({
        headerTransparent: false,
        title: name,
        headerBackTitle: null,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#FFFFFF'
        },
        headerRight: <StarWrapper onStarPress={onStarPress} favorite={favorite} />,
    })

    static propTypes = {
        navigation: PropTypes.object,
        toggleListView: PropTypes.func,
        listView: PropTypes.bool,
        theme: PropTypes.object,
        favorites: PropTypes.object
    }

    headerScrollView = null;
    scrollPosition = new Animated.Value(0);
    scrollEvent = Animated.event(
        [{ nativeEvent: { contentOffset: { x: this.scrollPosition } } }],
        { userNative: false },
    )


    state = {
        isRightDrawerOpen: false,
        moveListArray: [],
        side: 'right',
        unFilteredMoveList: [],
        scrollY: new Animated.Value(0),
        searchTerm: '',
        filters: { ...FILTERS_INITIAL_STATE },
        max_height: 300,
        isContentScrollable: false,
        count: 20,
        loading: false
    }


    componentDidMount() {
        const { navigation, listView } = this.props;
        //const moveListArray = navigation.getParam('moveList');
        const charName = navigation.getParam('name');
        const isFavorite = navigation.getParam('favorite');

        firebase.analytics().logEvent('Screen_Character_Profile', {
            character: charName,
            listView: listView ? 'ListView' : 'SpreadsheetView',
            isFavorite: isFavorite
        });
    }

    componentDidUpdate = (prev) => {
        const { navigation, favorites } = this.props;
        const label = navigation.getParam('label');

        if (favorites !== prev.favorites) {
            navigation.setParams({ favorite: favorites.characters[label] });
            firebase.analytics().logEvent('Screen_Character_Profile', {
                favoriteToggled: true
            });
        }
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

    searchMoveList(input, moveList) {
        return [];
    }

    onDrawerClose = () => {
        this.setState({
            isOpen: false
        });
    }

    renderMoveList = (selectedCharacterMoves) => {
        const { navigation, theme } = this.props;
        const name = navigation.getParam('name');
        return (
            selectedCharacterMoves.map((move, key) => {
                return (
                    <ListViewCard
                        key={move.id}
                        selectedCharacterMoves={selectedCharacterMoves}
                        item={move}
                        name={name}
                        theme={theme}
                        navigation={navigation}
                    />
                )
            })
        )
    }

    render() {
        const { selectedCharacterMoves,
            navigation,
            navigation: { state: { params: { label, name } } },
            toggleListView,
            listView,
            theme,
            favoriteMoves,
            searchProfileMoves
        } = this.props;

        const { isOpen, side, scrollY, searchTerm } = this.state;

        return (
            <GradientTheme theme={theme}>
                <DrawerSwitcher
                    component={
                        <FilterMenu />
                    }
                    side={side}
                    isOpen={isOpen}
                    onClose={this.onDrawerClose}
                >
                    <View style={{ flex: 1 }}>
                        <AdBanner screen={'character-profile'} />
                        {
                            listView ?
                                <ScrollView>
                                    <CharacterBanner
                                        name={label}
                                    />
                                    {this.renderMoveList(selectedCharacterMoves)}
                                </ScrollView>
                                :
                                <SpreadSheet
                                    theme={theme}
                                    selectedCharacterMoves={selectedCharacterMoves}
                                    navigation={navigation}
                                    name={name}
                                    updateMoveData={this.props.updateMoveData}
                                />
                        }
                        <BottomMenuBar
                            isListView={listView}
                            navigation={navigation}
                            onPressFilterMenu={this.openRightDrawer}
                            toggleListView={toggleListView}
                            handleSearchTextChange={(searchTerm) => searchProfileMoves(searchTerm)}
                        />
                    </View>
                </DrawerSwitcher>
            </GradientTheme>
        )
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);
