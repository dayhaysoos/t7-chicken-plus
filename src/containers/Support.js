import React, { Component } from 'react';
import styled from 'styled-components';
import { GradientTheme } from '../common/GradientTheme';
import { defaultTheme } from '../themes/defaultTheme';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

const mapStateToProps = ({subscribe}) => ({
    subscribe
});

const mapDispatchToProps = {};

const Header = styled.Text`
  font-size: 24;
  color: white;
  margin-bottom: 20;
  padding-left: 20;
`;

const P = styled.Text`
  font-size: 18;
  color: white;
  margin-bottom: 20;
  padding-left: 20;
`;

class Support extends Component {

    render() {
        return (
            <GradientTheme theme={defaultTheme}>
                <Header>Thank you for Supporting T7C+</Header>
                <P>Subscribe to our mailing list to get updates on what we're doing
                    and ways to support us!
                </P>
                <WebView source={{uri: 'http://eepurl.com/guJran'}} />
            </GradientTheme>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Support);