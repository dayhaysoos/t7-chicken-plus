import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import { Dimensions, FlatList, View } from 'react-native';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import * as favoriteActions from '../redux/actions/favoriteActions';

import { characterPortraits } from '../constants/characterPortraits';

import { GradientTheme } from '../common/GradientTheme';
import BottomMenuBar from '../components/BottomMenuBar';
import GridViewCard from '../components/CharacterSelect/GridViewCard';
import ListViewCard from '../components/CharacterSelect/ListViewCard';
import Header from '../components/Header';

import { getFavoriteCharacters } from '../selectors/characterSelect';

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

class CharacterSelect extends Component {

    static navigationOptions = {
        headerTransparent: true,
        headerBackground: <Header />,
        headerStyle: {
        }
    }

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
        characterNames: this.props.characterNames,
        charName: '',
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
        showFavorites: false
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
                    moveList: item,
                    ...item,
                    favorite: item.favorite,
                    label: item.label,
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
                    moveList: item,
                    ...item,
                    favorite: item.favorite,
                    label: item.label,
                    onStarPress: () => this.props.toggleCharacterStar(item.label)
                })}
        />
    )

    toggleShowFavorites = () => this.setState((prevState) => ({ showFavorites: !prevState.showFavorites }));

    searchCharacters(input) {
        this.setState({
            characterNames: this.props.characterNames.filter(
                character => Object.keys(character)[0].toLowerCase().includes(input.toLowerCase())
            )
        });
    }

    render() {
        const { theme, navigation, listView, toggleListView, characterNames } = this.props;
        const { showFavorites } = this.state;

        const data = showFavorites ? characterNames.filter(char => char.favorite) : characterNames;

        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    <MainContainer>
                        <CharacerSelectBanner>
                            <BannerText>
                                Select a Character
                            </BannerText>
                        </CharacerSelectBanner>
                        <View style={{ flex: 1, flexDirection: 'row' }} onLayout={this.onLayout} >
                            <FlatList
                                contentContainerStyle={{ flexDirection: 'column', justifyContent: 'center', alignItems: listView ? 'stretch' : 'center', paddingTop: 15 }}
                                data={data}
                                numColumns={listView ? 1 : Math.floor(this.state.screenWidth / 85)} // should prolly be 1 : 4 I think
                                keyExtractor={(item, index) => `list-item-${index}`}
                                renderItem={listView ? this.renderListView : this.renderGridView}
                                key={listView ? 'listView' : 'gridView'}
                                ListEmptyComponent={() => <EmptyText>No results</EmptyText>}
                            />
                        </View>
                        <BottomMenuBar
                            navigation={navigation}
                            toggleListView={toggleListView}
                            isListView={listView}
                            onPressFavoriteFilter={this.toggleShowFavorites}
                            searchFunction={(input) => this.searchCharacters(input)}
                        />
                    </MainContainer>
                </GradientTheme>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect);
