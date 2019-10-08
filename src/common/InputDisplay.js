import React from 'react';
import { View, Image } from 'react-native';
import { INPUT } from '../constants/inputMap';

const InputMappings = ({ notation }) => {
    inputs = notation.split(/(?<=[a-zA-Z])\+|[\s,]+/)

    return (
        inputs.map((input, index) => {
            return <Image key={index} source={INPUT[input]} />
        })
    )
}

const InputDisplay = ({ notation }) => {
    return (
        <View>
            <InputMappings notation={notation} />
        </View>
    )
}

export default InputDisplay;