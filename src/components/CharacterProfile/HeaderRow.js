import React from 'react';
import styled from 'styled-components';

const NotationRow = styled.View`
  flex-direction: row;
`;

const SpreadsheetCell = styled.Text`
  height: 80;
  width: 75;
  border-width: 1;
  color: ${({ theme: { text } }) => text};
  background-color: ${({ theme: { primaryGradient2 } }) => primaryGradient2}
`;

const NotationCell = styled(SpreadsheetCell)`
  width: 200;
`;

const HeaderNotationCell = styled(NotationCell)`
`;

const HeaderRow = () => (
    <NotationRow>
        <HeaderNotationCell>Notation</HeaderNotationCell>
        <SpreadsheetCell>Hit Level(s)</SpreadsheetCell>
        <SpreadsheetCell>Damage</SpreadsheetCell>
        <SpreadsheetCell>Speed</SpreadsheetCell>
        <SpreadsheetCell>On Block</SpreadsheetCell>
        <SpreadsheetCell>On Hit</SpreadsheetCell>
        <SpreadsheetCell>Counter Hit</SpreadsheetCell>
    </NotationRow>
);

export default HeaderRow;