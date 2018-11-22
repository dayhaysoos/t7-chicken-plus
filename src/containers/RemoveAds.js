import React, { Component } from 'react';
import styled from 'styled-components';
import { GradientTheme } from '../common/GradientTheme';
import { defaultTheme } from '../themes/defaultTheme';

import * as RNiap from 'react-native-iap';

const Text = styled.Text`color: white`;

const ItemList = styled.TouchableOpacity`
  flex: 1;

`;

// const ItemList = (supportItems) => (

// )

class RemoveAds extends Component {

    state = {
        supportItems: []
    }

    async componentDidMount() {
        try {
            const purchaseHistory = await RNiap.getPurchaseHistory();
            console.log('history', purchaseHistory);
            const supportItems = await RNiap.getProducts([
                'support.1',
                'support.3',
                'support.5',
                'support.ten',
            ]);
            this.setState({
                supportItems: [...supportItems]
            });
        } catch (err) {
            console.warn(err);
        }
    }


    render() {
        console.log('state', this.state.supportItems);
        return (
            <GradientTheme theme={defaultTheme}>
                <Text>hi</Text>
            </GradientTheme>
        );
    }
}

export default RemoveAds;