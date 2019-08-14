import React from 'react'
import { Linking, Clipboard } from 'react-native';
import { GradientTheme } from '../common/GradientTheme';
import { defaultTheme } from '../themes/defaultTheme';
import { sponsorImages } from '../constants/sponsorImages';
import styled from 'styled-components';
import firebase from 'react-native-firebase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Img = styled.Image`
  width: 100%;
`;

const MainContainer = styled.View`
  padding-left: 10;
  padding-right: 10;
`;

const DescriptionText = styled.Text`
  color: ${({ color }) => color};
  font-size: 18;
  margin-top: 10;
  margin-bottom: 10;
  text-align: center;
`;

const DiscountCodeWrapper = styled.TouchableOpacity`
  background-color: ${({ bg }) => bg}
  width: 100%;
  height: 40;
  border-color: ${({ border }) => border}
  border-width: 2;
  justify-content: center;
  align-items: center;
  border-radius: 5;
  margin-top: 20;
  margin-bottom: 20;
`;

const DiscountCode = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14;
  text-align: center;
`;

const WebsiteButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ bg }) => bg}
  border-color: ${({ border }) => border}
  border-width: 1;
  flex-direction: row;
  margin-top: 20;
  height: 40;
  justify-content: space-between;
  align-items: center;
  padding-left: 15;
  padding-right: 15;
`;

const WebsiteButtonText = styled.Text`
  color: white;
  font-size: 14;
`;


const onSponsorSitePress = (url, name) => async () => {

    firebase.analytics().logEvent('Go_To_Sponsor', {
        name,
        url
    });

    try {
        await Linking.openURL(url);
    }
    catch (error) {
        Alert.alert({ title: 'error' }, { message: 'Error Opening link' }, { buttons: ['Ok'] });
    }

};

const onDiscountSitePress = (discountCode) => {

    firebase.analytics().logEvent('Copy_Discount_To_Clipboard', {
        name,
        discountCode
    });

    Clipboard.setString(discountCode)
}


const SponsorScreen = ({ navigation }) => {

    const sponsorInfo = navigation.getParam('sponsorInfo')

    const { description, discountCode, image_id, name, url } = sponsorInfo;

    return (
        <GradientTheme theme={defaultTheme}>

            <Img resizeMode={'cover'} source={sponsorImages[image_id]} />
            <MainContainer>
                <DescriptionText color={defaultTheme.listViewText}>{description}</DescriptionText>

                <DescriptionText color={defaultTheme.listViewText}>
                    Tap the discount code to copy it to your clipboard
                </DescriptionText>

                <DiscountCodeWrapper
                    bg={defaultTheme.primaryGradient2}
                    border={defaultTheme.icon}
                    onPress={onDiscountSitePress(discountCode)}>
                    <DiscountCode>
                        {discountCode}
                    </DiscountCode>
                </DiscountCodeWrapper>
            </MainContainer>

            <WebsiteButton
                border={defaultTheme.icon}
                bg={defaultTheme.primary}
                onPress={onSponsorSitePress(url, name)}
            >
                <WebsiteButtonText>Go to {name} website</WebsiteButtonText>
                <FontAwesomeIcon size={24} color={'#FF412C'} icon={'arrow-right'} />
            </WebsiteButton>
        </GradientTheme>
    )
}

export default SponsorScreen;