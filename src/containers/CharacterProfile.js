import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import StarWrapper from '../components/StarWrapper';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import * as favoriteActions from '../redux/actions/favoriteActions';
import * as searchActions from '../redux/actions/searchActions';

import { GradientTheme } from '../common/GradientTheme';
import DrawerSwitcher from '../components/DrawerSwitcher';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

// components
import BottomMenuBar from '../components/BottomMenuBar';
import FilterMenu from '../components/FilterMenu';
import firebase from 'react-native-firebase';
import AdBanner from '../components/AdBanner';
import MoveTab from '../components/CharacterProfile/MoveTab';
import ComboTab from '../components/CharacterProfile/ComboTab';

//selectors
import { filterMoves, searchMoves } from '../selectors/characterProfile';
import CHARACTER_COMBOS from '../constants/characterCombos';

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
    settings: { listView } },
) => ({
    listView,
    theme,
    favorites,
    selectedCharacterMoves: searchMoves(filterMoves(selectedCharacterMoves, activeFilters), profileInput)
});

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

const Combos = () => <View style={{backgroundColor: 'gray', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Combos coming soon!</Text>
</View>;

const Spotlight = () => <View style={{backgroundColor: 'gray', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Stay Tuned for Player Spotlights!</Text>
</View>;
  
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
        loading: false,
        index: 0,
        routes: [
            {key: 'moves', title: 'Moves'},
            {key: 'combos', title: 'Combos'},
            //{key: 'spotlight', title: 'Spotlight'}
        ]
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

    onDrawerClose = () => {
        this.setState({
            isOpen: false
        });
    }

    render() {
        const { tabIndex } = this.state;

        const { selectedCharacterMoves,
            navigation,
            navigation: { state: { params: { label } } },
            toggleListView,
            listView,
            theme,
            updateMoveData,
            searchProfileMoves
        } = this.props;
        const name = navigation.getParam('name');
        const { isOpen, side} = this.state;

        const MoveTabWrapper = () => (
            <MoveTab
                listView={listView}
                selectedCharacterMoves={selectedCharacterMoves}
                navigation={navigation}
                theme={theme}
                label={label}
                updateMoveData={updateMoveData}
                name={name}
            />
        );

        const ComboTabWrapper = () => (
            CHARACTER_COMBOS[label] ? <ComboTab combos={CHARACTER_COMBOS[label].combos} /> : <Combos/>
        );

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
                        <TabView
                            navigationState={this.state}
                            onIndexChange={index => this.setState({index})}
                            initialLayout={{width: Dimensions.get('window').width}}
                            renderTabBar={props =>
                                <TabBar 
                                    {...props}
                                    style={{backgroundColor: '#19181c'}}
                                    indicatorStyle={styles.indicator}
                                />
                            }
                            renderScene={SceneMap({
                                moves: MoveTabWrapper,
                                combos: ComboTabWrapper,
                                //spotlight: Spotlight
                            })}
                        />
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
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: '#FF412C',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 5,
    },
});

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);
