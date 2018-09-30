import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Image, TouchableOpacity } from 'react-native';
import headshots from '../img/headshots';
import icons from '../img/icons';

import { FlatList, View } from 'react-native';

import * as characterActions from '../redux/actions/characterActions';

import { GradientTheme } from '../common/GradientTheme';

import { getCharacterMoveList } from '../selectors/characterSelect';

// styles

const Text = styled.Text`
  color: ${props => props.theme.primaryGradient1};
`;

const CharacterCard = styled.TouchableOpacity`
  margin-left: 5;
  margin-right: 5;
  height: 150;
  width: 85;
  border-top-width: 2px;
  border-top-color: white;
  border-bottom-width: 2px;
  border-bottom-color: black;
`;

export const mapDispatcthToProps = {
    ...characterActions,
};

export const mapStateToProps = ({ characterData, theme }) => ({
    ...characterData,
    theme,
    characterNames: getCharacterMoveList(characterData),
});

class CharacterSelect extends Component {
  static propTypes = {
      theme: PropTypes.object,
      characterData: PropTypes.array,
      characterNames: PropTypes.array,
      navigation: PropTypes.object,
  };

  state = {
      charName: '',
  };

  renderCharacterCard = ({ item }) => {
      //const name = Object.keys(item)[0];
      const name = item.name;
      const moveList = { [item.name]: item.data };
      return (
          <CharacterCard
              onPress={() => this.props.navigation.navigate('CharacterProfile', { moveList })}
          >
              <TouchableOpacity
                  style={{
                      width: 25,
                      height: 25,
                      zIndex: 10,
                      position: 'absolute',
                      top: -10,
                      right: -10,
                  }}
                  onPress={() => this.props.toggleCharacterStar(item.label)}
              >
                  <Image
                      source={item.starred ? icons.starFilled : icons.starOutline}
                      style={{ width: null, height: null, flex: 1 }}
                  />
              </TouchableOpacity>

              <View style={{ width: '100%', height: '75%' }}>
                  <Image source={headshots.akuma} style={{ width: null, height: null, flex: 1 }} />
              </View>
              <Text key={Math.random()}>{name}</Text>
          </CharacterCard>
      );
  };

  render() {
      const { theme, characterNames, characterData } = this.props;

      const sortedData = characterData.sort((a, b) => {
      // Check Starred / Unstarred first.
          if (a.starred && !b.starred) return -1;
          if (!a.starred && b.starred) return 1;

          // If both are starred, or if both are unstarred,
          // then compare the two names to sort alphabetically.
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;

          return 0;
      });

      return (
          <ThemeProvider theme={theme}>
              <GradientTheme theme={theme}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                      <FlatList
                          contentContainerStyle={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingTop: 15,
                          }}
                          //data={characterNames}
                          data={sortedData}
                          numColumns={4}
                          keyExtractor={(item, index) => index}
                          renderItem={this.renderCharacterCard}
                      />
                  </View>
              </GradientTheme>
          </ThemeProvider>
      );
  }
}

export default connect(
    mapStateToProps,
    mapDispatcthToProps
)(CharacterSelect);
