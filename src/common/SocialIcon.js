import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { Linking, Alert } from 'react-native';

const TouchableWrapper = styled.TouchableOpacity`
  height: 40;
  width: 50;
  margin-left: 10;
`;

const FA = styled(FontAwesome)`
  background-color: ${({ color }) => color}
  color: white;
  font-size: 18;
  text-align: center;
  height: 40;
  width: 50;
  padding-top: 12;
`;

const handleMediaColor = (media) => {
    if (media === 'twitter') return '#1DA1F2';
    if (media === 'twitch') return '#6441a5';
};

const handleMediaUrl = (media, handle) => {
    if (media === 'twitter') return `https://www.twitter.com/${handle}`;
    if (media === 'twitch') return `https://www.twitch.tv/${handle}`;
};

const onIconPress = (media, handle) => async () => {

    const url = handleMediaUrl(media, handle);
    try {
        await Linking.openURL(url);
    }
    catch (error) {
        Alert.alert({ title: 'error' }, { message: 'Error Opening link' }, { buttons: ['Ok'] });
    }

};

const SocialIcon = ({ media, handle }) => (
    <TouchableWrapper onPress={onIconPress(media, handle)}>
        <FA color={handleMediaColor(media)}>
            {Icons[media]}
        </FA>
    </TouchableWrapper>
);

SocialIcon.propTypes = {
    media: PropTypes.string,
    handle: PropTypes.string,
};

export default SocialIcon;