import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {defaultTheme} from '../../themes/defaultTheme';

const ComboHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 15;
  padding-top: 10;
  padding-bottom: 10;
  background-color: ${({ theme: { primary } }) => primary};
`;

const ComboText = styled.Text`
  color: ${({ theme: { listViewText } }) => listViewText};
  text-align: center;
  font-size: 15;
`;

const ComboHeaderText = styled(ComboText)`
  color: ${({ theme: { text } }) => text};
`;

const Header = () => (
    <ComboHeader>
        <ComboHeaderText style={{width: 75}}>Starter</ComboHeaderText>
        <ComboHeaderText style={{width: 150}}>Combo</ComboHeaderText>
        <ComboHeaderText>Damage</ComboHeaderText>
        <ComboHeaderText>Oki</ComboHeaderText>
    </ComboHeader>
);

const CardContainer = styled.View`
  padding-top: 10;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 2;
  border-bottom-color: #141414;
  background-color: #19181c;
  padding-right: 15;
  padding-bottom: 10;
`;

const renderCombos = ({item: { starter, combo, damage, oki }}) => (
    <CardContainer
        horitonzal={true}
        contentContainerStyle={{justifyContent: 'space-between'}}
    >
        <ComboText style={{width: 75}}>{starter}</ComboText>
        <ComboText style={{width: 150}}>{combo}</ComboText>
        <ComboText style={{width: 25}}>{damage}</ComboText>
        <ComboText>{oki}</ComboText>
    </CardContainer>
);


const ComboTab = ({combos}) => (
    <ThemeProvider theme={defaultTheme}>
        <FlatList
            keyExtractor={({combo, damage, starter}) => `${combo+damage+starter}`}
            style={{paddingBottom: 20}}
            ListHeaderComponent={<Header />}
            stickyHeaderIndices={[0]}
            data={combos}
            renderItem={renderCombos}
        />
    </ThemeProvider>
);

export default ComboTab;