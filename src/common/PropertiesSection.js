import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const Header = styled.View`
  flex: 1;
  height: 40;
`;

const HeaderTitle = styled.Text`
  height: 40;
  font-size: 18;
`;

const PropertyContainer = styled.View`
  flex: 1;
`;

const PropertyText = styled.Text`
  color: white;
`;


const PropertiesSection = ({ type, properties }) => (
  <MainContainer>
    <Header>
      <HeaderTitle>
        {`${type} properties`}
      </HeaderTitle>

    </Header>
  </MainContainer>
);

PropertiesSection.propTypes = {
  type: PropTypes.string,
  properties: PropTypes.array,
};

export default PropertiesSection;