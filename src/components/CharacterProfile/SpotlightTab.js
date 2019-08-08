import React from 'react';
import { ScrollView, Linking } from 'react-native'
import styled from 'styled-components';
import { connect } from 'react-redux';
import ListView from './ListView';
import firebase from 'react-native-firebase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const SpotlightWrapper = styled.View`
  padding-left: 10;
  padding-right: 10;
`;

const DetailText = styled.Text`
  color: ${({ theme: { listViewText } }) => listViewText};
  font-size: 18;
  margin-top: 10;
`;

const Header = styled.Text`
  font-size: 32;
  color: white;
  margin-bottom: 10;
`;

const H2 = styled(Header)`
  font-size: 24;
`;

const BioText = styled.Text`
  color: white;
  font-size: 18;
  margin-bottom: 20;
  line-height: 24;
`;

const SocialIconsWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20;
`;

const TouchableSocial = styled.TouchableHighlight`
  background-color: ${({bgColor}) => bgColor}
  height: 40;
  width: 50;
  margin-left: 10;
  justify-content: center;
  align-items: center;
`;

const normalizeString = (move) => move.toLowerCase().replace(/[^\w~]/gi, '');

const mapDispatchToProps = {};

const mapStateToProps = ({ characterData }) => ({
    characterMoves: characterData.selectedCharacterMoves
});

const favoriteMovesMap = (favoriteMoves, characterMoves) => {
    let result = [];

    for (let i = 0; i < favoriteMoves.length; i++) {
        for (let j = 0; j < characterMoves.length; j++) {
            if (normalizeString(favoriteMoves[i]) === normalizeString(characterMoves[j].notation)) {
                result.push(characterMoves[j]);
            }
        }
    }
    return result;
};

const onIconPress = (url) => async () => {

    firebase.analytics().logEvent('Go_To_Social', {
        url
    });

    try {
        await Linking.openURL(url);
    }
    catch (error) {
        Alert.alert({ title: 'error' }, { message: 'Error Opening link' }, { buttons: ['Ok'] });
    }

};

const SpotlightTab = ({ playerData: { favorite_moves, name, bio, sponsor, twitch, twitter, instagram }, navigation, theme, characterMoves }) => (
    <ScrollView>
        <SpotlightWrapper>
            <DetailText theme={theme}>Player Spotlight</DetailText>
            <Header>{name}</Header>
            <H2>Sponsor: {sponsor}</H2>
            <BioText>{bio}</BioText>
        </SpotlightWrapper>
        <SocialIconsWrapper>
            <TouchableSocial bgColor={'#1DA1F2'} onPress={onIconPress(twitter)}>
                <FontAwesomeIcon size={24} style={{color: 'white'}} icon={['fab', 'twitter']} />
            </TouchableSocial>

            <TouchableSocial bgColor={'#6441A5'} onPress={onIconPress(twitch)}>
                <FontAwesomeIcon size={24} style={{color: 'white'}} icon={['fab', 'twitch']} />
            </TouchableSocial>
            <TouchableSocial bgColor={'#E1306C'} onPress={onIconPress(instagram)}>
                <FontAwesomeIcon size={24} style={{color: 'white'}} icon={['fab', 'instagram']} />
            </TouchableSocial>
        </SocialIconsWrapper>

        <H2>Favorite Moves</H2>
        <ListView
            selectedCharacterMoves={favoriteMovesMap(favorite_moves, characterMoves)}
            theme={theme}
            navigation={navigation}
        />
    </ScrollView>
);

export default connect(mapStateToProps, mapDispatchToProps)(SpotlightTab);