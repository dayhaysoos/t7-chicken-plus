import React from 'react';
import styled from 'styled-components';

import LinearGradient from 'react-native-linear-gradient';

import legend from '../../assets/legend';

const LegendContainer = styled.ScrollView`
  flex: 1;
  padding-left: 20;
  flex-wrap: wrap;
`;

const LegendItemWrapper = styled.View`
  border-color: white;
  height: 40;
  flex-direction: row;
  justify-content: space-around;
`;

const LegendItem = styled.Text`
  color: white;
  font-size: 14;
  flex-wrap: wrap;
  height: 50;
`;

const LegendDefinition = styled(LegendItem)`
  text-align: left;
  width: 70%;
`;

const LegendHeader = styled.Text`
  color: white;
  font-size: 24;
  margin-bottom: 10;
  text-align: center;
`;


const renderCharacterLegend = (label) => (

  legend[label].map((item, key) => (
    <LegendItemWrapper key={item.notation}>
      <LegendItem>
        {item.notation}
      </LegendItem>
      <LegendDefinition>
        {item.definition}
      </LegendDefinition>
    </LegendItemWrapper>
  ))
);

const renderGeneralLegend = (label) => (

  legend.general.map((item, key) => (
    <LegendItemWrapper key={item.notation}>
      <LegendItem>
        {item.notation}
      </LegendItem>
      <LegendDefinition>
        {item.definition}
      </LegendDefinition>
    </LegendItemWrapper>
  ))
);


const Legend = ({ label }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={['#434755', '#373a46']}
    style={{ flex: 1 }}
  >
    <LegendContainer>
      {legend[label] ?
        <LegendHeader>
          Character Specific
          </LegendHeader>
        :
        null
      }

      {legend[label] ? renderCharacterLegend(label) : null}
      <LegendHeader>
        General
      </LegendHeader>
      {renderGeneralLegend(label)}
    </LegendContainer>
  </LinearGradient>
);

export default Legend;