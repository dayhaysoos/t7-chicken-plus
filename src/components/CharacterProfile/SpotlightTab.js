import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ListView from './ListView';


const DetailText = styled.Text`
  color: ${({ theme: { listViewText } }) => listViewText};
  font-size: 18;
`;

const Header = styled.Text`
  font-size: 32;
`;

const normalizeString = (move) => move.toLowerCase().replace(/[^\w~]/gi, ''); 

const mapDispatchToProps = {};

const mapStateToProps = ({characterData}) => ({
    characterMoves: characterData.selectedCharacterMoves
});

const favoriteMovesMap = (favoriteMoves, characterMoves) => {
    let result = [];

    for(let i = 0; i < favoriteMoves.length; i++) {
        for(let j = 0; j < characterMoves.length; j++) {
            if(normalizeString(favoriteMoves[i]) === normalizeString(characterMoves[j].notation)) {
                result.push(characterMoves[j]);
            }
        }
    }
    return result;
};

const SpotlightTab = ({playerData: {favorite_moves, name}, navigation, theme, characterMoves}) => (
    <ScrollView>
        <DetailText theme={theme}>Test</DetailText>
        <Header>{name}</Header>
        <ListView
            selectedCharacterMoves={favoriteMovesMap(favorite_moves, characterMoves)}
            theme={theme}
            navigation={navigation}
        />
        
    </ScrollView>
);

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightTab);