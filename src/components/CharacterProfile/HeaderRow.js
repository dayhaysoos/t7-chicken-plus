import React from 'react';
import styled from 'styled-components';
import theme from '../../themes/defaultTheme'

const NotationRow = styled.View`
  flex-direction: row;
`;

const SpreadsheetCell = styled.Text`
  height: 50;
  width: 80;
  padding-top: 15;
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