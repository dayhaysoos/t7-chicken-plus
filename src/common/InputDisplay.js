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

const formatInput = (notation) => {
    let str = notation.replace(/[{()}]/g, '');

    let inputs = [];

    for (let i = 0; i < str.length; i++) {

        let c = str[i];

        if (c == " " || c == ",") {
            inputs.push(str.slice(0, i));
            str = str.substr(i + 1, str.length);
            i = 0;
        }


        if (c == "+") {
            if (!str.substr(i - 1, i + 2).match(/\d+\++\d/)) {
                inputs.push(str.slice(0, i));
                str = str.substr(i + 1, str.length);
                i = 0;
            }
        }


    }
    inputs.push(str);

    return inputs
}

const InputMappings = ({ notation }) => {
    const inputs = formatInput(notation.replace(/[{()}]/g, ''))

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