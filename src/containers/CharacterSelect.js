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

import { getCharacterMoveList, getCharacterNames, getFavoriteCharacters } from '../selectors/characterSelect';

import BottomMenuBar from '../components/BottomMenuBar';

import FontAwesome, { Icons } from 'react-native-fontawesome';


// styles
const StarButton = styled.TouchableOpacity`
`;

const StarIcon = styled(FontAwesome)`
    color: red;
    font-size: 30;
`;

const Text = styled.Text`
    color: ${(props) => props.theme.primaryGradient1};
    text-align: center;
`;

const CharacterCard = styled.TouchableOpacity`
    marginLeft: 5;
    marginRight: 5;
    height: 150;
    width: 85;
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

// list view styles

const ListViewWrapper = styled.View`
  background-color: transparent;
`;

const ListViewItem = styled.TouchableOpacity`
  height: 125;
  border-top-width: 1;
  border-top-color: gray;
  border-bottom-width: 1;
  border-bottom-color: gray;
  flex-direction: row;
  align-items: center;
`;

const ListViewText = styled.Text`
  color: white;
  font-size: 21;
`;

const CharacterImage = styled.View`
  background-color: pink;
  width: 85;
  height: 120;
  margin-right: 20;
`;

export const mapDispatchToProps = {
    ...characterActions,
    ...settingsActions,
    ...favoriteActions
};

export const mapStateToProps = ({ characterData, theme, settings: { listView }, favorites }) => ({
    ...characterData,
    theme,
    //characterNames: getCharacterMoveList(characterData),
    characterNames: getFavoriteCharacters({characterData, favorites}),
    listView,
    favorites,
});

class CharacterSelect extends Component {

    static navigationOptions = ({ navigation }) => navigation.navigate;

    static propTypes = {
        theme: PropTypes.object,
        characterData: PropTypes.array,
        characterNames: PropTypes.array,
        navigation: PropTypes.object,
        listView: PropTypes.bool,
        toggleListView: PropTypes.func
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

    renderGridView = ({ item }) => {
        const name = Object.keys(item)[0];
        return (
            <View>
                <CharacterCard
                    onPress={() => this.props.navigation.navigate('CharacterProfile', { moveList: item })}
                >
                </CharacterCard>
                <Text key={name}>{name.split(' ')[0]}</Text>
            </View>
        );
    }

    renderListView = ({ item }) => {

        const name = item.name;

        return (
            <ListViewWrapper>
                <ListViewItem
                    onPress={() => this.props.navigation.navigate('CharacterProfile', { moveList: item, name })}
                >
                    <CharacterImage />
                    <ListViewText key={name}>{name.split(' ')[0]}</ListViewText>

                    <StarButton  onPress={() => this.props.toggleCharacterStar(item.label)}>
                        <StarIcon>
                            {item.favorite ? Icons.star: Icons.starO}
                        </StarIcon>
                    </StarButton>

                </ListViewItem>
            </ListViewWrapper>
        );
    }

    toggleShowFavorites = () => this.setState((prevState) => ({showFavorites: !prevState.showFavorites}));

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
                    <CharacerSelectBanner>
                        <BannerText>
                            Select a Character
                        </BannerText>
                    </CharacerSelectBanner>
                    <View style={{ flex: 1, flexDirection: 'row' }} onLayout={this.onLayout} >
                        <FlatList
                            contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                            data={data}
                            numColumns={listView ? 1 : Math.floor(this.state.screenWidth / 85)}
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
                </GradientTheme>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelect);
