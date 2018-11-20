import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import FontAwesome, { Icons } from 'react-native-fontawesome';

import { Dimensions, FlatList, View } from 'react-native';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import * as favoriteActions from '../redux/actions/favoriteActions';

import { GradientTheme } from '../common/GradientTheme';
import BottomMenuBar from '../components/BottomMenuBar';
import GridViewCard from '../components/CharacterSelect/GridViewCard';
import ListViewCard from '../components/CharacterSelect/ListViewCard';
import Header from '../components/Header';

import { getFavoriteCharacters } from '../selectors/characterSelect';
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
    ...characterData,
    theme,
    characterNames: getFavoriteCharacters({ characterData, favorites }),
    listView,
    favorites,
});

const BackButton = () => (
    <Text>
        <FontAwesome>{Icons.chevronLeft}</FontAwesome>
    </Text>
);

class CharacterSelect extends Component {

    static navigationOptions = () => ({
        headerTransparent: true,
        headerBackground: <Header />,
    })

    static propTypes = {
        theme: PropTypes.object,
        characterData: PropTypes.array,
        characterNames: PropTypes.array,
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

    renderGridView = ({ item }) => (
        <GridViewCard
            name={item.name}
            favorite={item.favorite}
            onStarPress={() => this.props.toggleCharacterStar(item.label)}
            onPress={() => this.props.navigation.navigate('CharacterProfile',
                {
                    moveList: item.moveList,
                    //...item,
                    favorite: item.favorite,
                    label: item.label,
                    name: item.name,
                    onStarPress: () => this.props.toggleCharacterStar(item.label)
                })}
        />
    )


    renderListView = ({ item }) => (
        <ListViewCard
            name={item.name}
            favorite={item.favorite}
            onStarPress={() => this.props.toggleCharacterStar(item.label)}
            onPress={() => this.props.navigation.navigate('CharacterProfile',
                {
                    moveList: item.moveList,
                    //...item,
                    favorite: item.favorite,
                    label: item.label,
                    name: item.name,
                    onStarPress: () => this.props.toggleCharacterStar(item.label)
                })}
        />
    )

    toggleShowFavorites = () => this.setState((prevState) => ({ showFavorites: !prevState.showFavorites }));

    // searchCharacters(input) {
    //     this.setState({
    //         characterNames: this.props.characterNames.filter(
    //             character => Object.keys(character)[0].toLowerCase().includes(input.toLowerCase())
    //         )
    //     });
    // }

    render() {
        const { theme, navigation, listView, toggleListView, characterNames } = this.props;
        const { showFavorites, searchTerm } = this.state;

        const data = showFavorites ? characterNames.filter(char => char.favorite) : characterNames;

        const searchedData = data.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));

        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    <MainContainer>
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
