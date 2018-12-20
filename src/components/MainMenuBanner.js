import React from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import discordPng from '../../assets/images/discord.png';

import firebase from 'react-native-firebase';

const Container = styled.View`
  flex-direction: column;
  padding-top: 50;
`;

const GiantText = styled.Text`
  color: white;
  font-size: 32;
  margin-bottom: 10;
`;


const SocialIconsWrapper = styled.View`
  height: 40;
  flex-direction: row;
  justify-content: flex-end;
`;

const SocialIcon = styled(FontAwesome)`
  background-color: ${({ color }) => color};
  color: white;
  font-size: 18;
  text-align: center;
  height: 40;
  width: 50;
  padding-top: 12;
`;

const IconPngWrapper = styled.TouchableHighlight`
  height: 40;
  width: 50;
  background-color: #7289DA;
  margin-left: 10;
  justify-content: center;
  align-items: center;
`;

const IconPng = styled.Image`
  padding-top: 12;
  resize-mode: contain;
`;


const TouchableSocial = styled.TouchableHighlight`
  margin-left: 10;
`;

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

const MainMenuBanner = () => (
    <Container >
        <GiantText>T7 Chicken Plus</GiantText>
        {console.log(discordPng)}
        <SocialIconsWrapper>
            <TouchableSocial onPress={onIconPress('https://www.twitter.com/t7chicken')}>
                <SocialIcon color={'#1DA1F2'}>{Icons.twitter}</SocialIcon>
            </TouchableSocial>

            <TouchableSocial onPress={onIconPress('https://www.twitch.tv/t7chicken')}>
                <SocialIcon color={'#6441a5'}>{Icons.twitch}</SocialIcon>
            </TouchableSocial>
            <IconPngWrapper onPress={onIconPress('https://www.twitch.tv/t7chicken')}>
                <IconPng source={discordPng} />
            </IconPngWrapper>
        </SocialIconsWrapper>
    </Container>
);

export default MainMenuBanner;