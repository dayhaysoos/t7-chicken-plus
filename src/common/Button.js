import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const ButtonWrapper = styled.TouchableOpacity`
  height: 40;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 18;
  color: white;
`;

const Button = ({ onPressFunc, icon, text }) => (
    <ButtonWrapper onPress={onPressFunc}>
        <FontAwesomeIcon size={24} color='#FF412C' icon={icon} />
    </ButtonWrapper>
);

export default Button;