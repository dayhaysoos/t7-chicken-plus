import React from 'react';
import { ImageBackground, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styled from 'styled-components';


const ButtonWrapper = styled.TouchableOpacity`
  height: 130;
  width: 100%;
  border-bottom-width: 1;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
`;

const MenuItemText = styled.Text`
 color: white;
 font-size: 24;
`;


const ChevronRed = styled(FontAwesomeIcon)`
  color: #FF412C
  font-size: 18;
  margin-left: 10;
  padding-bottom: 4;
`;

const MenuItem = ({ text, imageUrl, navigateTo }) => (
    <ButtonWrapper onPress={navigateTo}>
        <ImageBackground
            style={{
                height: '100%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}
            imageStyle={{
                opacity: 0.9
            }}
            source={imageUrl}
        >
            <TextWrapper>
                <MenuItemText>{text}</MenuItemText>
                <FontAwesomeIcon icon="star" />
            </TextWrapper>
        </ImageBackground>
    </ButtonWrapper>
);

export default MenuItem;