import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { compose } from 'redux';

import StarWrapper from '../components/StarWrapper';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import * as favoriteActions from '../redux/actions/favoriteActions';
import * as searchActions from '../redux/actions/searchActions';

import { GradientTheme } from '../common/GradientTheme';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

// components
import BottomMenuBar from '../components/BottomMenuBar';
import FilterMenu from '../components/FilterMenu';
import firebase from 'react-native-firebase';
import AdBanner from '../components/AdBanner';
import MoveTab from '../components/CharacterProfile/MoveTab';
import ComboTab from '../components/CharacterProfile/ComboTab';
import SpotlightTab from '../components/CharacterProfile/SpotlightTab';

//selectors
import { filterMoves, searchMoves } from '../selectors/characterProfile';
import CHARACTER_COMBOS from '../constants/characterCombos';

import { withMappedNavigationParams } from 'react-navigation-props-mapper';

//assets
import playerData from '../../assets/spotlight-data/spotlights.json';


export const mapDispatcthToProps = {
    ...characterActions,
    ...settingsActions,
    ...favoriteActions,
    ...searchActions
};

export const mapStateToProps = ({
    characterData: { selectedCharacterMoves, selectedCharacterMetaData },
    favorites,
    filter: { activeFilters },
    search: { profileInput },
    theme,
    settings: { listView } },
) => ({
    listView,
    theme,
    favorites,
    selectedCharacterMoves,
    selectedCharacterMetaData,
    activeFilters,
    profileInput
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

const Spotlight = () => <View style={{backgroundColor: '#0e0f10', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{ fontSize: 16, color: '#AF8D89'}}>There is no spotlight data for this character </Text>
</View>;

const Combo = () => <View style={{backgroundColor: '#0e0f10', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{ fontSize: 16, color: '#AF8D89'}}>There is no combo data for this character </Text>
</View>;

class CharacterProfile extends Component {

    static navigationOptions = ({name, favorite, onStarPress}) => {
        return {
            headerTransparent: false,
            title: name,
            headerBackTitle: null,
            headerTitleStyle: {
                fontWeight: 'bold',
                color: '#FFFFFF'
            },
            headerRight: <StarWrapper onStarPress={onStarPress} favorite={favorite} />,
        };
    }

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
        isOnMoveTab: true,
        routes: [
            {key: 'moves', title: 'Moves'},
            {key: 'combos', title: 'Combos'},
            {key: 'spotlight', title: 'Spotlight'}
        ]
    }


    componentDidMount() {
        const { navigation, listView, selectedCharacterMetaData, toggleCharacterStar } = this.props;
        const { displayName, favorite } = selectedCharacterMetaData;

        navigation.setParams({
            name: displayName,
            favorite,
            onStarPress: toggleCharacterStar
        });

        firebase.analytics().logEvent('Screen_Character_Profile', {
            character: displayName,
            listView: listView ? 'ListView' : 'SpreadsheetView',
            isFavorite: favorite
        });
    }

    componentDidUpdate = (prev) => {
        const { navigation, favorites, selectedCharacterMetaData } = this.props;
        const { label } = selectedCharacterMetaData;

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

    onTabSwitch = (bool) => {
        this.setState({
            isOnMoveTab: bool
        });
    }

    handleIndexChange = (index) => {
        index === 0 ? this.setState({isOnMoveTab: true}) : this.setState({isOnMoveTab: false});
        this.setState({index});
    }

    render() {
        const { tabIndex } = this.state;

        const {
            selectedCharacterMoves,
            selectedCharacterMetaData: {label, displayName},
            navigation,
            toggleListView,
            listView,
            theme,
            updateMoveData,
            searchProfileMoves,
            profileInput,
            activeFilters
        } = this.props;

        const { isOpen, side} = this.state;

        const MoveTabWrapper = () => (
            <MoveTab
                listView={listView}
                selectedCharacterMoves={searchMoves(filterMoves(selectedCharacterMoves, activeFilters), profileInput)}
                navigation={navigation}
                theme={theme}
                label={label}
                updateMoveData={updateMoveData}
                name={displayName}
            />
        );

        const ComboTabWrapper = () => {
            firebase.analytics().logEvent('Combo_Lookup', {
                characterName: label
            });
            return CHARACTER_COMBOS[label] ? <ComboTab combos={CHARACTER_COMBOS[label].combos} /> : <Combo />;
        };

        const availableChars = playerData.reduce((acc, current) => 
            [...acc, current.character.toLowerCase()], []);

        const SpotlightTabWrapper = () => {
            firebase.analytics().logEvent('Spotlight_Lookup', {
                characterName: label
            });
            return availableChars.includes(label) ? 
                <SpotlightTab
                    playerData={playerData.find(player => player.character.toLowerCase() === label)}
                    navigation={navigation}
                    theme={theme}
                    label={label}
                />
                : <Spotlight />;
        };

        return (
            <GradientTheme theme={theme}>
                    <View style={{ flex: 1 }}>
                        <AdBanner screen={'character-profile'} />
                        <TabView
                            navigationState={this.state}
                            onIndexChange={index => this.handleIndexChange(index)}
                            initialLayout={{width: Dimensions.get('window').width}}
                            swipeEnabled={false}
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
                                spotlight: SpotlightTabWrapper
                            })}
                        />
                        <BottomMenuBar
                            isListView={listView}
                            navigation={navigation}
                            onPressFilterMenu={this.openRightDrawer}
                            toggleListView={toggleListView}
                            handleSearchTextChange={(searchTerm) => searchProfileMoves(searchTerm)}
                            isOnMoveTab={this.state.isOnMoveTab}
                        />
                    </View>
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

export default compose(
    withMappedNavigationParams(),
    connect(mapStateToProps, mapDispatcthToProps),
)(CharacterProfile)
