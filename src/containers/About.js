import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { defaultTheme } from '../themes/defaultTheme';

//components
import TeamCard from '../components/TeamCard';
import { GradientTheme } from '../common/GradientTheme';

class About extends Component {
    render() {
        return (
            <GradientTheme theme={defaultTheme}>
                <ScrollView>
                    <TeamCard
                        name={'Nick DeJesus - Lead Developer'}
                        description={'Nick started the T7C Project in hopes to inspire new players to get into competitive Tekken.'}
                        twitter={'dayhaysoos'}
                        twitch={'t7chicken'}
                    />
                </ScrollView>
            </GradientTheme>
        );
    }
}

export default About;