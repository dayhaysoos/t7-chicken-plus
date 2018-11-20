import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Animated, ScrollView } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import CharacterBanner from '../components/CharacterProfile/CharacterBanner';
import ListViewCard from '../components/CharacterProfile/ListViewCard';
import SpreadSheetRow from '../components/CharacterProfile/SpreadSheetRow';
import HeaderRow from '../components/CharacterProfile/HeaderRow';
import Header from '../components/Header';
import StarWrapper from '../components/StarWrapper';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import { getCharacterMoveList } from '../selectors/characterSelect';
import * as favoriteActions from '../redux/actions/favoriteActions';

import { GradientTheme } from '../common/GradientTheme';

import Drawer from 'react-native-drawer';
import DrawerSwitcher from '../components/DrawerSwitcher';

// components
import BottomMenuBar from '../components/BottomMenuBar';
import FilterMenu from '../components/FilterMenu';

import firebase from 'react-native-firebase';

export const mapDispatcthToProps = {
    ...characterActions,
    ...settingsActions,
    ...favoriteActions
};

export const mapStateToProps = ({ favorites, characterData, theme, settings: { listView } }) => ({
    moveList: getCharacterMoveList(characterData),
    listView,
    theme,
    favorites
});

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const MainContainer = styled(Drawer)`
  flex: 1;
`;

const EmptyText = styled.Text`
  color: white;
  fontSize: 20;
  marginLeft: 10;
`;

class CharacterProfile extends Component {

    static navigationOptions = ({ navigation: { state: { params: { name, favorite, onStarPress } } } }) => ({
        headerTransparent: false,
        title: name,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#FFFFFF'
        },
        //headerBackground: <Header title={name} />,
        headerRight: <StarWrapper onStarPress={onStarPress} favorite={favorite} />,
    })

    static propTypes = {
        navigation: PropTypes.object,
        toggleListView: PropTypes.func,
        listView: PropTypes.bool,
        theme: PropTypes.object,
        favorites: PropTypes.object
    }

    headerIsScrolling = false;
    dataIsScrolling = false;

    state = {
        activeFilters: [],
        moveListArray: [],
        isRightDrawerOpen: false,
        side: 'right',
        unFilteredMoveList: [],
        scrollY: new Animated.Value(0),
        searchTerm: ''
    }

    componentDidMount() {
        const { navigation, listView } = this.props;
        const moveListArray = navigation.getParam('moveList');
        const charName = navigation.getParam('name');
        const isFavorite = navigation.getParam('favorite');

        this.setState({ moveListArray, unFilteredMoveList: moveListArray });

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

    searchMoveList(input, moveList) {
        if (input.includes('+')) {
            return moveList.filter(
                ({ notation }) => notation.replace(/[ ,]/g, '').includes(input.replace(/[ ,]/g, ''))
            );
        } else {
            return moveList.filter(
                ({ notation }) => notation.replace(/[ ,+]/g, '').includes(input.replace(/[ ,+]/g, ''))
            );
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
        const { isOpen, side, scrollY } = this.state;

        const data = this.searchMoveList(this.state.searchTerm, this.state.moveListArray);

        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });
        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 4, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

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
                            <CharacterBanner
                                name={name.toLowerCase()}
                                imageOpacity={imageOpacity}
                                headerTranslate={headerTranslate}
                                imageTranslate={imageTranslate}
                            />
                            <Animated.ScrollView
                                stickyHeaderIndices={listView ? [] : [0]}
                                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                                    { useNativeDriver: true }
                                )}
                                scrollEventThrottle={16}
                            >

                                {!listView &&
                                    <ScrollView
                                        bounces={false}
                                        horizontal
                                        scrollEventThrottle={300}
                                        style={{ flex: 1 }}
                                        ref={scrollView => { this._headerScrollView = scrollView; }}
                                        onScroll={e => {
                                            if (!this.headerIsScrolling) {
                                                this.dataIsScrolling = true;
                                                const scrollX = e.nativeEvent.contentOffset.x;
                                                this._dataScrollView.scrollTo({ x: scrollX, animated: true });
                                            }
                                            this.headerIsScrolling = false;
                                        }}
                                    >
                                        <HeaderRow />
                                    </ScrollView>}

                                <ScrollView
                                    bounces={false}
                                    horizontal={!listView}
                                    scrollEventThrottle={300}
                                    ref={scrollView => { this._dataScrollView = scrollView; }}
                                    onScroll={e => {
                                        if (!this.dataIsScrolling) {
                                            this.headerIsScrolling = true;
                                            const scrollX = e.nativeEvent.contentOffset.x;
                                            this._headerScrollView.scrollTo({ x: scrollX, animated: true });
                                        }
                                        this.dataIsScrolling = false;
                                    }}
                                >
                                    <FlatList
                                        scrollEnabled={false}
                                        style={{ flex: 1 }}
                                        contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column', zIndex: 999 }}
                                        data={data}
                                        numColumns={1}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (listView ?
                                            <ListViewCard item={item} name={name} theme={theme} navigation={navigation} />
                                            :
                                            <SpreadSheetRow item={item} name={name} theme={theme} navigation={navigation} />
                                        )}
                                        ListEmptyComponent={() => <EmptyText>No results for this combination of Search and Filters</EmptyText>}
                                        initialNumToRender={5}
                                        initialScrollIndex={0}
                                        getItemLayout={(item, index) => (
                                            { length: listView ? 120 : 100, offset: listView ? 120 : 100 * index, index }
                                        )}
                                    />
                                </ScrollView>
                            </Animated.ScrollView>
                            <BottomMenuBar
                                isListView={listView}
                                navigation={navigation}
                                onPressFilterMenu={this.openRightDrawer}
                                searchFunction={(input) => this.searchMoveList(input)}
                                toggleListView={toggleListView}
                                handleSearchTextChange={(searchTerm) => this.setState({ searchTerm })}
                            />
                        </MainContainer>
                    </GradientTheme>
                </DrawerSwitcher>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);
