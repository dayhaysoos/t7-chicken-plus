import React from 'react';
import { View, Text, SectionList, FlatList } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../themes/defaultTheme';


const ComboHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 10;
  padding-bottom: 10;
  background-color: ${({ theme: { primary } }) => primary};
`;

const ComboText = styled.Text`
  color: ${({ theme: { listViewText } }) => listViewText};
  text-align: center;
  font-size: 18;
  margin-bottom: 5;
  line-height: 30;
`;

const ComboHeaderText = styled(ComboText)`
  color: ${({ theme: { text } }) => text};
  font-size: 24;
  padding-bottom: 10;
`;

const ComboStarterLabel = styled(ComboText)`
  background-color: ${({ theme: { primary } }) => primary};
  font-size: 14;
  margin-bottom: 0;
`;

const ComboDetailsContainer = styled.View`
  
`;

const CardContainer = styled.View`
  padding-top: 10;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 2;
  border-bottom-color: #141414;
  background-color: #19181c;
  padding-bottom: 10;
  padding-right: 10;
`;

const renderComboSection = ({ section: { data } }) => {

  return (
    data.map(combo => (
      <CardContainer key={combo.input}>
        <ComboText style={{ width: '50%' }}>{combo.input}</ComboText>
        <ComboDetailsContainer>
          {combo.damage !== '-' && <ComboText>Damage: {combo.damage}</ComboText>}
          {combo.oki !== '-' && <ComboText>Oki: {combo.oki}</ComboText>}
        </ComboDetailsContainer>
      </CardContainer>
    ))
  )
}

const renderComboHeader = ({ section: { title, data } }) => {
  return (
    <ComboHeader>
      <ComboHeaderText>{title}</ComboHeaderText>
    </ComboHeader>
  )
}


const ComboTab = ({ combos }) => {

  let sectionedData = Object.keys(combos).map(key => ({ title: key, data: combos[key] }))
  sectionedData = sectionedData.filter(section => {
    for (combo in section.data) {
      return section.data[combo].input !== '-'
    }
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <View>
        <ComboStarterLabel>Combo Starter</ComboStarterLabel>
        <SectionList
          renderItem={renderComboSection}
          sections={sectionedData}
          renderSectionHeader={renderComboHeader}
          keyExtractor={(item, index) => item + index}
          initialNumToRender={10}
          stickySectionHeadersEnabled={true}
        />
      </View>
    </ThemeProvider>
  )
}

export default ComboTab;