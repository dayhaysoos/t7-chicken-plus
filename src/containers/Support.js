import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import AdBanner from '../components/AdBanner';

class Support extends Component {
    render() {
        return (
            <View>
                <Text>Support Page</Text>
                <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://gfycat.com/WindyTatteredBantamrooster' }}></Image>
            </View>
        );
    }
}

export default Support;