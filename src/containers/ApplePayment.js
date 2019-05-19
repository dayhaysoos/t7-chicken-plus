import React, { PureComponent } from 'react';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import PaymentButton from '../common/PaymentButton';
import Stripe from 'tipsi-stripe';

function testID(id) {
    return Platform.OS === 'android' ?
        { accessible: true, accessibilityLabel: id } :
        { testID: id };
}

const items = [
    {
        label: 'Remove Ads for $10',
        amount: '10.00',
    }
];

const options = {
};
  

class ApplePayment extends PureComponent {

    state = {
        loading: false,
        allowed: false,
        complete: true,
        status: null,
        token: null,
        amexAvailable: false,
        discoverAvailable: false,
        masterCardAvailable: false,
        visaAvailable: false,
    }

    async componentDidMount() {
        const allowed = await Stripe.deviceSupportsNativePay();
        const amexAvailable = await Stripe.canMakeNativePayPayments({
            networks: ['american_express'],
        });
        const discoverAvailable = await Stripe.canMakeNativePayPayments({
            networks: ['discover'],
        });
        const masterCardAvailable = await Stripe.canMakeNativePayPayments({
            networks: ['master_card'],
        });
        const visaAvailable = await Stripe.canMakeNativePayPayments({
            networks: ['visa'],
        });
        this.setState({
            allowed,
            amexAvailable,
            discoverAvailable,
            masterCardAvailable,
            visaAvailable,
        });
    }

    handleCompleteChange = complete => (
        this.setState({ complete })
    )

    handleApplePayPress = async () => {
        try {
            this.setState({
                loading: true,
                status: null,
                token: null,
            });

            const token = await Stripe.paymentRequestWithNativePay(items, options);


            this.setState({ loading: false, token });

            if (this.state.complete) {
                await Stripe.completeNativePayRequest();
                this.setState({ status: 'Apple Pay payment completed' });
            } else {
                await Stripe.cancelNativePayRequest();
                this.setState({ status: 'Apple Pay payment cenceled' });
            }
        }
        catch (error) {
            this.setState({ loading: false, status: `Error: ${error.message}` });
        }
    }

    handleSetupApplePayPress = () => (
        Stripe.openNativePaySetup()
    )

    render() {
        const {
            loading,
            allowed,
            complete,
            status,
            token,
            amexAvailable,
            discoverAvailable,
            masterCardAvailable,
            visaAvailable,
        } = this.state;
      
        const cards = {
            americanExpressAvailabilityStatus: { name: 'American Express', isAvailable: amexAvailable },
            discoverAvailabilityStatus: { name: 'Discover', isAvailable: discoverAvailable },
            masterCardAvailabilityStatus: { name: 'Master Card', isAvailable: masterCardAvailable },
            visaAvailabilityStatus: { name: 'Visa', isAvailable: visaAvailable },
        };
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
              Apple Pay Example
                </Text>
                <Text style={styles.instruction}>
              Click button to show Apple Pay dialog.
                </Text>
                <PaymentButton
                    text="Pay with Pay"
                    disabledText="Not supported"
                    loading={loading}
                    disabled={!allowed}
                    onPress={this.handleApplePayPress}
                    {...testID('applePayButton')}
                />
                <Text style={styles.instruction}>
              Complete the operation on token
                </Text>
                <Switch
                    style={styles.switch}
                    value={complete}
                    onValueChange={this.handleCompleteChange}
                    {...testID('applePaySwitch')}
                />
                <View>
                    {token &&
                <Text style={styles.instruction} {...testID('applePayToken')}>
                  Token: {token.tokenId}
                </Text>
                    }
                    {status &&
                <Text style={styles.instruction} {...testID('applePayStatus')}>
                    {status}
                </Text>
                    }
                </View>
                <View style={styles.hintContainer}>
                    <PaymentButton
                        text="Setup Pay"
                        disabledText="Not supported"
                        disabled={!allowed}
                        onPress={this.handleSetupApplePayPress}
                        {...testID('setupApplePayButton')}
                    />
                    <Text style={styles.hint}>
                Setup Pay works only on real device
                    </Text>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.status} {...testID('deviceSupportsApplePayStatus')}>
                Device {allowed ? 'supports' : 'doesn\'t support' } Pay
                    </Text>
                    {Object.entries(cards).map(([id, { name, isAvailable }]) => (
                        <Text style={styles.status} key={id} {...testID(id)}>
                            {name} is {isAvailable ? 'available' : 'not available'}
                        </Text>
                    ))}
                </View>
            </View>
        );
    }
}

export default ApplePayment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instruction: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    switch: {
        marginBottom: 10,
    },
    hintContainer: {
        marginTop: 10,
    },
    hint: {
        fontSize: 12,
        textAlign: 'center',
    },
    statusContainer: {
        margin: 20,
        alignSelf: 'stretch',
    },
    status: {
        fontWeight: '300',
        color: 'gray',
    },
});