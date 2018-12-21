import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components/native';

import * as characterActions from '../../redux/actions/characterActions';

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


export const mapStateToProps = ({ moveData }) => ({
    moveData
});

export const mapDispatchToProps = {
    ...characterActions
};
class SpreadSheetRow extends Component {

    static propTypes = {
        theme: PropTypes.object,
        item: PropTypes.object,
        navigation: PropTypes.object
    }

    navigateToCharacterMove = (item, name, id) => {
        const { updateMoveData, navigation } = this.props;

        updateMoveData(id);
        navigation.navigate('CharacterMove', { name, id });
    }

    render() {
        const { name, theme, item, navigation: { navigate }, item: { notation, damage, speed, on_block, on_hit, on_ch, hit_level, move_name, id } } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <SpreadsheetRow
                    onPress={() => this.navigateToCharacterMove(item, name, id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SpreadSheetRow);
