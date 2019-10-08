import React from 'react';
import { View, Image } from 'react-native';
import { INPUT } from '../constants/inputMap';
import styled from 'styled-components'

const InputContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justify-content: flex-start;
  margin-top: 20;
  margin-bottom: 10;
`;

const InputImage = styled.Image`
  height: 20;
  width: 20;
  margin-right: 5;
`;

const InputMappings = ({ notation }) => {
    inputs = notation.replace(/[{()}]/g, '').split(/(?<=[a-zA-Z])\+|[\s,]+/)

    return (
        inputs.map((input, index) => {
            return (
                !INPUT[input] ? null : <InputImage key={index} source={INPUT[input]} />
            )
        })
    )
}

const InputDisplay = ({ notation }) => {
    return (
        <InputContainer>
            <InputMappings notation={notation} />
        </InputContainer>
    )
}

export default InputDisplay;