import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SpreadsheetRow = styled.TouchableOpacity`
  flex-direction: row;
`;

const SpreadsheetCell = styled.Text`
  height: 80;
  width: 75;
  border-width: 1;
  color: ${({ theme: { text } }) => text};
`;

const NotationCell = styled(SpreadsheetCell)`
  width: 200;
`;

class SpreadSheetRow extends Component {
    constructor(props) {
        super();
    }
    render() {
        const { theme, navigation, item, item: { notation, damage, speed, on_block, on_hit, on_ch, hit_level } } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <SpreadsheetRow
                    onPress={(navigation) => this.props.navigation.navigate('CharacterMove', { ...item })}
                >
                    <NotationCell>{notation}</NotationCell>
                    <SpreadsheetCell>{hit_level}</SpreadsheetCell>
                    <SpreadsheetCell>{damage}</SpreadsheetCell>
                    <SpreadsheetCell>{speed}</SpreadsheetCell>
                    <SpreadsheetCell>{on_block}</SpreadsheetCell>
                    <SpreadsheetCell>{on_hit}</SpreadsheetCell>
                    <SpreadsheetCell>{on_ch}</SpreadsheetCell>
                </SpreadsheetRow>
            </ThemeProvider>
        );
    }
}

export default SpreadSheetRow;
