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
                        name={'Nick DeJesus AKA OffInBed - Lead Developer'}
                        description={'Nick started the T7C Project in hopes to inspire new players to get into competitive Tekken'}
                        twitter={'dayhaysoos'}
                        twitch={'t7chicken'}
                    />
                    <TeamCard
                        name={'Ray Mills - UX / Visual Designer'}
                        description={'Ray is a passionate designer who laid out the interface and aesthetic of T7C'}
                        twitter={'TheRealRayMills'}
                        twitch={'TheRealRayMills'}
                    />
                    <TeamCard
                        name={'Jon Lassiter - Community Manager/Social Media'}
                        description={'AKA Twitter Fingers, Jon handles Social Media, Collaborations, and Giveaways'}
                        twitter={'neoxianwu'}
                        twitch={'neoxianwu'}
                    />
                    <TeamCard
                        name={'Sneaky Coyote - Warlock'}
                        description={'Sneaky Coyote is the reason why you have up-to-date data and extra information'}
                        twitter={'sneaky_coyote'}
                        twitch={'sneaky_coyote_'}
                    />
                    <TeamCard
                        name={'Quentin Ross - Logo Designer | Illustrator '}
                        description={'Dynamic Hero!'}
                        twitter={'OverlordRokuda'}
                        twitch={'OverlordRokuda'}
                    />
                    <TeamCard
                        name={'Kaijubrothers- Banner artist'}
                        description={'KaijuBrothers worked hard to bring the beautiful banners on the character screens'}
                        twitter={'Kaijubrothers'}
                        twitch={'theScrubzilla'}
                    />
                    <TeamCard
                        name={'Konnestra - Chicken Artist'}
                        description={'Konnestra is the talented artist who brought you the chicken portraits!'}
                        twitter={'Konnestra'}
                        twitch={'Konnestra'}
                    />
                    <TeamCard
                        name={'Will Lacy - CoDeveloper'}
                        description={'Will is a Soul Calibur player who will be working on the SC version of this app'}
                        twitter={'Phragonist'}

                    />
                    <TeamCard
                        name={'Shaheer Mir - CoDeveloper'}
                        description={'Shamir worked hard to push forward the development of the app!'}
                        twitter={'@shaheermir'}
                    />
                    <TeamCard
                        name={'Whiskeyjack - Video Capture and Gif magician'}
                        description={'WhiskeyJack is the reason why you all have animated gifs for each character!'}
                        twitter={'Whiskeyjack_CFL'}
                        twitch={'Whiskeyjack_CFL'}
                    />
                    <TeamCard
                        name={'Brian Jones (BIGWORM) - Video capture/editing'}
                        description={'The other half video capture!'}
                        twitter={'tzBIGWORM'}
                        twitch={'tzBIGWORM'}
                    />

                </ScrollView>
            </GradientTheme>
        );
    }
}

export default About;