import React, { Component } from 'react';
import styled from 'styled-components/native';
import { GradientTheme } from '../common/GradientTheme';
import { defaultTheme } from '../themes/defaultTheme';

import * as RNiap from 'react-native-iap';

const Text = styled.Text`
  color: white;
  font-size: 32;
`;

const ListItemContainer = styled.View`
  flex: 1;
  margin-top: 20;
  flex-wrap: wrap;
`;

const ListItem = styled.Text`
  font-size: 16;
  color: white;
  
`;

class RemoveAds extends Component {
    render() {
        return (
            <GradientTheme theme={defaultTheme}>
                <Text>
                    The app is still under construction! We'll have a system here to pay to remove ads eventually.
                   Things we're focusing on right now:
                </Text>
                <ListItemContainer>
                    <ListItem>-Filters (they're currently broken)</ListItem>
                    <ListItem>-Styling the spreadsheet mode</ListItem>
                    <ListItem>-Ad Removal payment system</ListItem>
                    <ListItem>-Completing character data (almost there)</ListItem>
                </ListItemContainer>
            </GradientTheme>
        );
    }
}

export default RemoveAds;