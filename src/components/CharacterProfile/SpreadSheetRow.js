import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components/native';

import * as characterActions from '../../redux/actions/characterActions';

const SpreadsheetRow = styled.TouchableOpacity`
  flex-direction: row;
`;

const SpreadsheetCell = styled.Text`
  flex-wrap: wrap;
  border-width: 1;
  color: ${({ theme: { text } }) => text};
  padding-top: 10;
  padding-left: 10;
  padding-bottom: 5;
  padding-right: 5;
`;

const NotationCell = styled(SpreadsheetCell)`
  width: 150;
  min-height: 40;
  max-height: 100%;
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
        const { updateMoveData, navigation, selectedCharacterMoves } = this.props;

        updateMoveData(id);
        navigation.navigate('CharacterMove', { name, id, item, selectedCharacterMoves });
    }

    render() {
        const { name, theme, item, navigation: { navigate }, item: { notation, damage, speed, on_block, on_hit, on_ch, hit_level, move_name, id } } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <SpreadsheetRow
                    onPress={() => this.navigateToCharacterMove(item, name, id)}
                >
                    <NotationCell>{notation}</NotationCell>
                    <SpreadsheetCell>{speed}</SpreadsheetCell>
                    <SpreadsheetCell>{on_block}</SpreadsheetCell>
                    <SpreadsheetCell>{on_hit}</SpreadsheetCell>
                    <SpreadsheetCell>{on_ch}</SpreadsheetCell>
                    <SpreadsheetCell>{hit_level}</SpreadsheetCell>
                    <SpreadsheetCell>{damage}</SpreadsheetCell>
                </SpreadsheetRow>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpreadSheetRow);
