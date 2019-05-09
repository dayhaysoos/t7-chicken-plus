import React, { Component } from 'react';
import { Platform, View, Alert, FlatList } from 'react-native';
import styled from 'styled-components';
import { GradientTheme } from '../common/GradientTheme';
import { defaultTheme } from '../themes/defaultTheme';

import * as RNIap from 'react-native-iap';

const SubscriptionButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100;
  width: 100%;
  background-color: #19181C;
  border-color: #FF412C
  border-top-width: 2;
`;

const SubscriptionButtonText = styled.Text`
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

const itemSubs = Platform.select({
    ios: [
        'hide_ads_5'
    ],
    android: [
        'hide_ads_5',
    ]
});

const SubButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;
`;

const GoalList = styled.View`
`;

const GoalItem = styled.Text`
  text-align: left;
`;

class RemoveAds extends Component {

  state = {
      subscriptions: [],
      receipt: '',
      purchaseHistory: [],
      availablePurchases: [],
      err: '',
      goals: [
          { key: 'Continue to work on and improve the app' },
          { key: 'Donate to local and major tournament pots' },
          { key: 'Provide staple combos for each character with gifs' },
          { key: 'Global filter functions' },
          { key: 'Provide info on TWT events and more' },
          { key: 'Players to watch for each character' },
          { key: 'Provide a spot for content creators and streamers' },
          { key: 'Giveaway events (Chicken Sticks and Merch)' },
          { key: 'Sponsor players' }
      ]
  }

  async componentDidMount() {
      try {
          const purchaseHistory = await RNIap.getPurchaseHistory();
          const availablePurchases = await RNIap.getAvailablePurchases();
          const subscriptions = await RNIap.getSubscriptions(itemSubs);
          this.setState({ subscriptions, purchaseHistory, availablePurchases });
      } catch (err) {
          console.log(err);
          this.setState({err});
      }
  }

  handleAfterPurchase = () => {
      this.props.navigation.navigate('Receipt', {
          receipt: this.state.receipt,
      });
  }

  getAvailablePurchases = async () => {
      try {
          const purchases = await RNIap.getAvailablePurchases();
          if (purchases && purchases.length > 0) {
              this.setState({
                  availableItemsMessage: `Got ${purchases.length} items.`,
                  receipt: purchases[0].transactionReceipt,
              });
          }
      } catch (err) {
          Alert.alert(err.message);
      }
  }

  buySubscribeItem = async (sku) => {
      try {
          const purchase = await RNIap.buySubscription(sku);
          this.setState({ receipt: purchase.transactionReceipt });
      } catch (err) {
          console.log('err', err);
          Alert.alert(err.message);
      }
  }

  renderSubscriptionItems = (subs) => subs.map((sub) => (
      <View key={sub.productId} style={{ flexDirection: 'column' }}>
          <SubscriptionButton
              onPress={() => this.buySubscribeItem(sub.productId)}
          >
              <SubscriptionButtonText>Subscribe for {sub.localizedPrice}/mo</SubscriptionButtonText>
          </SubscriptionButton>
      </View>
  ))

  renderGoalList = () => {
      const { goals } = this.state;
      return goals.map(goal => <GoalItem key={goal}>{goal}</GoalItem>);
  }

  render() {
      const { subscriptions, purchaseHistory, availablePurchases, err } = this.state;

      console.log('state', this.state);
      console.log('availablePurchases', availablePurchases);
      return (
          <GradientTheme theme={defaultTheme}>
              <WhySubscribeContainer>
                  <HeaderText>Why Subscribe?</HeaderText>
              </WhySubscribeContainer>
              <View style={{ paddingLeft: 20 }}>
                  <Text>
            T7 Chicken has been providing frame data to the Tekken community for years. It was always free
            and it was always just a frame data app. With this iteration of our service, we would love to take things
            to the next level. Of course, that would only be possible with the full support from the community.

            With enough support, here is a list of things we would love to provide for the Tekken community:
                  </Text>
                  <FlatList
                      style={{ marginTop: 15 }}
                      data={this.state.goals}
                      renderItem={({ item }) => <Text>- {item.key}</Text>}
                  />
              </View>
              {err === '' && (
                  <SubButtonContainer>
                      {this.renderSubscriptionItems(subscriptions)}
                  </SubButtonContainer>
              )}

              {err !== '' && (
                  <SubButtonContainer>
                      <Text>There seems to be an error</Text>
                  </SubButtonContainer>
              )}
          </GradientTheme>
      );
  }
}

export default RemoveAds;