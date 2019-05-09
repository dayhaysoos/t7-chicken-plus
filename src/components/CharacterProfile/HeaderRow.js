import React from 'react';
import styled from 'styled-components';
import theme from '../../themes/defaultTheme';

const NotationRow = styled.View`
  flex-direction: row;
  height: 28;
`;

const SpreadsheetCell = styled.Text`
  height: 28;
  width: 80;
  text-align: center;
  border-width: 1;
  color: ${({ theme: { text } }) => text};
  background-color: ${({ theme: { primaryGradient2 } }) => primaryGradient2};
`;

const HeaderRow = () => (
    <NotationRow>
        <SpreadsheetCell>Speed</SpreadsheetCell>
        <SpreadsheetCell>On Block</SpreadsheetCell>
        <SpreadsheetCell>On Hit</SpreadsheetCell>
        <SpreadsheetCell>Counter Hit</SpreadsheetCell>
        <SpreadsheetCell>Hit Level(s)</SpreadsheetCell>
        <SpreadsheetCell>Damage</SpreadsheetCell>
    </NotationRow>
);

export default HeaderRow;