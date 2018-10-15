import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import MoveHeader from '../components/MoveHeader';
import { GradientTheme } from '../common/GradientTheme';

const HeaderTitle = styled.Text`
  background-color: ${(props) => props.theme.primaryGradient2}
  color: white;
  padding-top: 20;
  padding-bottom: 10;
  padding-left: 10;
  font-size: 18;
`;

const PropertyContainer = styled.View`
`;

const PropertyText = styled.Text`
  color: white;
  border-bottom-width: 1;
  border-bottom-color: white;
  padding-left: 10;
`;

const PropertyTextWrapper = styled.View`
  border-bottom-width: 1;
  border-bottom-color: white;
  height: 50;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
`;

const mapStateToProps = ({ theme }) => ({
    theme
});

const mapDispatchToProps = {};

class CharacterMove extends Component {
    static navigationProps = (navigation) => navigation;
    render() {

        const { theme } = this.props;
        const {
            damage,
            hit_level,
            move_name,
            notation,
            notes,
            on_block,
            on_ch,
            on_hit,
            preview_url,
            properties,
            speed
        } = this.props.navigation.state.params;

        console.log('wtf', theme);
        return (
            <ThemeProvider theme={theme}>
                <GradientTheme theme={theme}>
                    <ScrollView>
                        <MoveHeader
                            moveName={move_name}
                            notation={notation}
                        />
                        <PropertyContainer>
                            <HeaderTitle>Special Properties</HeaderTitle>
                            <PropertyTextWrapper>
                                <PropertyText>{properties[0] ? properties[0] : 'No Property'}</PropertyText>
                            </PropertyTextWrapper>
                        </PropertyContainer>
                        <PropertyContainer>
                            <HeaderTitle>General Properties</HeaderTitle>
                            <PropertyTextWrapper>
                                <PropertyText>Damage: {damage}</PropertyText>
                            </PropertyTextWrapper>
                            <PropertyTextWrapper>
                                <PropertyText>Orientation: {hit_level}</PropertyText>
                            </PropertyTextWrapper>
                        </PropertyContainer>
                        <PropertyContainer>
                            <HeaderTitle>Frame Properties</HeaderTitle>
                            <PropertyTextWrapper>
                                <PropertyText>Speed {speed}</PropertyText>
                            </PropertyTextWrapper>
                            <PropertyTextWrapper>
                                <PropertyText>On Hit: {on_hit}</PropertyText>
                            </PropertyTextWrapper>
                            <PropertyTextWrapper>
                                <PropertyText>On Block:{on_block}</PropertyText>
                            </PropertyTextWrapper>
                        </PropertyContainer>
                    </ScrollView>
                </GradientTheme >
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMove);