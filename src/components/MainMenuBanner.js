import React from 'react';
import styled from 'styled-components';

import { Alert } from 'react-native';

import { Linking } from 'react-native';

import FontAwesome, { Icons } from 'react-native-fontawesome';


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

const TouchableSocial = styled.TouchableHighlight`
  height: 40;
  width: 50;
  margin-left: 10;
`;

const onIconPress = (url) => async () => {

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
        <SocialIconsWrapper>

            <TouchableSocial onPress={onIconPress('https://www.twitter.com/t7chicken')}>
                <SocialIcon color={'#1DA1F2'}>{Icons.twitter}</SocialIcon>
            </TouchableSocial>

            <TouchableSocial onPress={onIconPress('https://www.twitch.tv/t7chicken')}>
                <SocialIcon color={'#6441a5'}>{Icons.twitch}</SocialIcon>
            </TouchableSocial>


        </SocialIconsWrapper>
    </Container>
);

export default MainMenuBanner;