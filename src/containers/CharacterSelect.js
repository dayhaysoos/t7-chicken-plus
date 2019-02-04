import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components/native';

import { Dimensions, FlatList, View } from 'react-native';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import * as favoriteActions from '../redux/actions/favoriteActions';

import { GradientTheme } from '../common/GradientTheme';
import BottomMenuBar from '../components/BottomMenuBar';
import GridViewCard from '../components/CharacterSelect/GridViewCard';
import ListViewCard from '../components/CharacterSelect/ListViewCard';
import Header from '../components/Header';
import AdBanner from '../components/AdBanner';

import { getFavoriteCharacters, getCharacterMoveList } from '../selectors/characterSelect';
import firebase from 'react-native-firebase';

const MainContainer = styled.View`
  flex: 1
  margin-top: 80;
`;

const CharacerSelectBanner = styled.View`
  flex-direction: row;
  padding-bottom: 20;
`;

const BannerText = styled.Text`
  padding-left: 20;
  font-size: 65;
  color: white;
  flexWrap: wrap;
`;

const EmptyText = styled.Text`
  color: white;
  fontSize: 20;
  marginLeft: 10;
`;

export const mapDispatchToProps = {
    ...characterActions,
    ...settingsActions,
    ...favoriteActions
};

export const mapStateToProps = ({ characterData, theme, settings: { listView }, favorites }) => ({
    theme,
    //characterData: getFavoriteCharacters({ characterData, favorites }),
    characterData: getFavoriteCharacters({ characterData: getCharacterMoveList(characterData), favorites }),
    listView,
    favorites,
});


class CharacterSelect extends Component {

    static navigationOptions = () => ({
        headerTransparent: true,
        headerBackground: <Header />,
    })

    static propTypes = {
        theme: PropTypes.object,
        characterData: PropTypes.array,
        // characterNames: PropTypes.array,
        navigation: PropTypes.object,
        listView: PropTypes.bool,
        toggleListView: PropTypes.func,
        toggleCharacterStar: PropTypes.func
    }

    state = {
        // characterNames: this.props.characterNames,
        // charName: '',
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
        showFavorites: false,
        searchTerm: ''
    }

    componentDidUpdate = () => {
        const { listView } = this.props;
        const { showFavorites } = this.state;

        firebase.analytics().logEvent('Screen_Character_Select', {
            listView: listView ? 'ListView' : 'GridView',
            favoritesOnly: showFavorites
        });
    }

    onLayout = () => {
        const { screenHeight, screenWidth } = this.state;
        const { listView, toggleListView } = this.props;

        const newWidth = screenWidth;
        const newHeight = screenHeight;

        if (newWidth > newHeight && !listView) {
            toggleListView();
        }

        if (newWidth !== this.state.screenWidth) {
            this.setState({ screenWidth: newWidth });
        }
    }

    navigateToCharacterProfile = (item) => {
        const { navigation, updateSelectedCharacterMoves, toggleCharacterStar } = this.props;
        const { favorite, label, name } = item;
        updateSelectedCharacterMoves(label);

        navigation.navigate('CharacterProfile', {
            favorite,
            label,
            name,
            onStarPress: () => toggleCharacterStar(label)
        });

    }

    renderGridView = ({ item }) => (
        <GridViewCard
            label={item.label}
            displayName={item.displayName}
            favorite={item.favorite}
            onStarPress={() => this.props.toggleCharacterStar(item.label)}
            onPress={() => this.navigateToCharacterProfile(item)}
        />
    )


    renderListView = ({ item }) => (<ListViewCard
        label={item.label}
        displayName={item.displayName}
        favorite={item.favorite}
        onStarPress={() => this.props.toggleCharacterStar(item.label)}
        onPress={() => this.navigateToCharacterProfile(item)}
    />)

    toggleShowFavorites = () => this.setState((prevState) => ({ showFavorites: !prevState.showFavorites }));

    render() {
        const { theme, navigation, listView, toggleListView, characterData, } = this.props;
        const { showFavorites, searchTerm } = this.state;

        const data = showFavorites ? characterData.filter(char => char.favorite) : characterData;

        const searchedData = data.filter(({ label }) => label.includes(searchTerm.toLowerCase()));

        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    <MainContainer>
                        <AdBanner screen={'character-select'} />
                        <View style={{ flex: 1, flexDirection: 'row' }} onLayout={this.onLayout} >
                            <FlatList
                                contentContainerStyle={{ flexDirection: 'column', justifyContent: 'center', alignItems: listView ? 'stretch' : 'center', paddingTop: 15 }}
                                data={searchedData}
                                numColumns={listView ? 1 : Math.floor(this.state.screenWidth / 85)} // should prolly be 1 : 4 I think
                                keyExtractor={(item, index) => `list-item-${index}`}
                                renderItem={listView ? this.renderListView : this.renderGridView}
                                key={listView ? 'listView' : 'gridView'}
                                ListEmptyComponent={() => <EmptyText>No results</EmptyText>}
                                ListHeaderComponent={(
                                    <CharacerSelectBanner>
                                        <BannerText>
                                            Select a Character
                                        </BannerText>
                                    </CharacerSelectBanner>
                                )}
                            />
                        </View>
                        <BottomMenuBar
                            navigation={navigation}
                            toggleListView={toggleListView}
                            isListView={listView}
                            onPressFavoriteFilter={this.toggleShowFavorites}
                            handleSearchTextChange={searchTerm => this.setState({ searchTerm })}
                        />
                    </MainContainer>
                </GradientTheme>
            </ThemeProvider>
        );
    }
}

CharacterSelect.screenName = 'Character Select';

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect);
