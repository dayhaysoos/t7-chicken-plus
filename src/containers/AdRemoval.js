import React, { Component } from 'react';
import { Platform, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { GradientTheme } from '../common/GradientTheme';
import { defaultTheme } from '../themes/defaultTheme';
import ApplePayment from './ApplePayment';
import AndroidPayment from './AndroidPayment';

const PaymentButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100;
  width: 100%;
  background-color: #19181C;
  border-color: #FF412C
  border-top-width: 2;
`;

const PaymentButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;
`;

const PaymentButtonText = styled.Text`
  font-size: 16;
  color: white;
`;

const Text = styled.Text`
  font-size: 16;
  color: white;
`;

const ThanksText = styled(Text)`
  padding-top: 20;
  font-size: 24;
  text-align: center;
`;

const HeaderText = styled(Text)`
  font-size: 36;
`;

const WhySubscribeContainer = styled(View)`
  padding-left: 20;
  padding-right: 20;
  background-color: #19181C;
  height: 100;
  justify-content: flex-end;
  padding-bottom: 20;
  margin-bottom: 15;
`;


class AdRemoval extends Component {

    state = {
        data: ''
    };

    handlePaymentClick = () => {
        const {navigation} = this.props;
        const Payment = Platform.OS === 'ios' ? 'ApplePayment' : 'AndroidPayment';

        navigation.navigate(Payment);
    }

    render() {
  
        return (
            <GradientTheme theme={defaultTheme}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <PaymentButton onPress={this.handlePaymentClick}>
                        <PaymentButtonText>Give us money</PaymentButtonText>
                    </PaymentButton>
                </View>
            </GradientTheme>
        );
    }
}

export default AdRemoval;