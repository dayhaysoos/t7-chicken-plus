import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { defaultTheme } from '../themes/defaultTheme';
import { GradientTheme } from '../common/GradientTheme';

// components
import SponsorMenuItem from '../components/Sponsors/SponsorMenuItem';

import sponsorList from '../../assets/sponsors.json'


class Sponsors extends Component {

    renderSponsorList = () => {

        const { navigation } = this.props;

        return (
            sponsorList.sponsors.map(sponsor => (
                <SponsorMenuItem
                    key={sponsor.name}
                    name={sponsor.name}
                    navOnPress={() => navigation.navigate('SponsorScreen', { sponsorInfo: sponsor })}
                />
            ))
        )
    }

    render() {

        return (
            <GradientTheme theme={defaultTheme}>
                <View>
                    {this.renderSponsorList()}
                </View>
            </GradientTheme>
        );
    }
}

export default Sponsors;