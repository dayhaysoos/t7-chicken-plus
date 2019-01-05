import React from 'react';
import { ImageBackground, Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import styled from 'styled-components';


const ButtonWrapper = styled.TouchableOpacity`
  flex: 3;
  width: 100%;
  border-bottom-width: 1;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: black;
  height: 60;
  width: 100%;
  opacity: 0.9;
`;

const MenuItemText = styled.Text`
 color: white;
 font-size: 24;
`;


const ChrevronRed = styled(FontAwesome)`
  color: red;
  font-size: 18;
  margin-left: 10;
  padding-bottom: 4;
`;

const MenuItem = ({ text, imageUrl, navigateTo }) => (
    <ButtonWrapper onPress={navigateTo}>
        <ImageBackground
            style={{
                backgroundColor: 'black',
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
                <ChrevronRed>{Icons.chevronRight}</ChrevronRed>
            </TextWrapper>
        </ImageBackground>
    </ButtonWrapper>
);

export default MenuItem;