import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {defaultTheme} from '../../themes/defaultTheme';

const ComboHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 15;
`;

const ComboText = styled.Text`
color: ${({ theme: { listViewText } }) => listViewText};
  text-align: center;
  font-size: 18;
`;

const Header = () => (
    <ComboHeader>
        <ComboText style={{width: 70}}>Starter</ComboText>
        <ComboText style={{width: 150}}>Combo</ComboText>
        <ComboText>Damage</ComboText>
        <ComboText>Oki</ComboText>
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
  padding-left: 10;
`;

const Combos = () => <View style={{backgroundColor: 'gray', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Combos coming soon!</Text>
</View>;

const renderCombos = ({item: { starter, combo, damage, oki }}) => (
    <CardContainer
        horitonzal={true}
        contentContainerStyle={{justifyContent: 'space-between'}}
    >
        <ComboText style={{width: 50}}>{starter}</ComboText>
        <ComboText style={{width: 150}}>{combo}</ComboText>
        <ComboText style={{width: 25}}>{damage}</ComboText>
        <ComboText>{oki}</ComboText>
    </CardContainer>
);


const ComboTab = ({combos}) => (
    <ThemeProvider theme={defaultTheme}>
        <FlatList
            keyExtractor={({combo, damage, starter}) => `${combo+damage+starter}`}
            style={{marginTop: 20}}
            ListHeaderComponent={<Header />}
            data={combos}
            renderItem={renderCombos}
        />
    </ThemeProvider>
);

export default ComboTab;