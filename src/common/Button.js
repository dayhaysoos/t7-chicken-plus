import React from 'react';
import styled from 'styled-components';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const ButtonWrapper = styled.TouchableOpacity`
  height: 40;
  border-radius: 10;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10;
  border: 1px solid #FF412C
`;

const FA = styled(FontAwesome)`
  color: #FF412C
  padding-left: 10;
  margin-left: 10;
  height: 20;
  width: 20;
  border-radius: 10;
  margin-right: 5;
  margin-left: 5;
`;



const Text = styled.Text`
  font-size: 18;
  color: white;
`;

const Button = ({ onPressFunc, icon, text }) => (
    <ButtonWrapper onPress={onPressFunc}>
        <Text>{text}</Text>
        <FA>{Icons[icon]}</FA   >
    </ButtonWrapper>
);

export default Button;