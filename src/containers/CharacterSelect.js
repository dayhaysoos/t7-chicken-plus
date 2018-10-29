import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import { Dimensions, FlatList, View } from 'react-native';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';

import { GradientTheme } from '../common/GradientTheme';

import { getCharacterMoveList } from '../selectors/characterSelect';

import BottomMenuBar from '../components/BottomMenuBar';

// styles

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

export const mapDispatcthToProps = {
    ...characterActions,
    ...settingsActions
};

export const mapStateToProps = ({ characterData, theme, settings: { listView } }) => ({
    ...characterData,
    theme,
    characterNames: getCharacterMoveList(characterData),
    listView
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
        screenHeight: Dimensions.get('window').height
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
        const name = Object.keys(item)[0];
        return (
            <ListViewWrapper>
                <ListViewItem
                    onPress={() => this.props.navigation.navigate('CharacterProfile', { moveList: item })}
                >
                    <CharacterImage />
                    <ListViewText key={name}>{name.split(' ')[0]}</ListViewText>
                </ListViewItem>
            </ListViewWrapper>
        );
    }

    searchCharacters(input) {
        this.setState({ characterNames: this.props.characterNames.filter(
            character => Object.keys(character)[0].toLowerCase().includes(input.toLowerCase())
        )});
    }

    render() {
        const { theme, navigation, listView, toggleListView } = this.props;
        const { characterNames } = this.state;

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
                            data={characterNames}
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
                        searchFunction={(input) => this.searchCharacters(input)}
                    />
                </GradientTheme>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterSelect);