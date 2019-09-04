import React from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import firebase from 'react-native-firebase';

const Container = styled.View`
  flex-direction: column;
`;

const GiantText = styled.Text`
  color: white;
  font-size: 32;
  margin-bottom: 10;
  margin-left: 10;
`;

const SocialIconsWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const TouchableSocial = styled.TouchableHighlight`
  background-color: ${({bgColor}) => bgColor}
  height: 40;
  width: 50;
  margin-left: 10;
  justify-content: center;
  align-items: center;
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
        <SocialIconsWrapper>
            <TouchableSocial bgColor={'#1DA1F2'} onPress={onIconPress('https://www.twitter.com/t7chicken')}>
                <FontAwesomeIcon size={24} color='white' icon={['fab', 'twitter']} />
            </TouchableSocial>

            <TouchableSocial bgColor={'#6441A5'} onPress={onIconPress('https://www.twitch.tv/t7chicken')}>
                <FontAwesomeIcon size={24} color='white' icon={['fab', 'twitch']} />
            </TouchableSocial>
            <TouchableSocial bgColor={'#7289DA'} onPress={onIconPress('https://discord.gg/79KyRwT')}>
                <FontAwesomeIcon size={24} color='white' icon={['fab', 'discord']} />
            </TouchableSocial>
        </SocialIconsWrapper>
    </Container>
);

export default MainMenuBanner;