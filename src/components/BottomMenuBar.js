import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContainer = styled.View`
  background-color: transparent;
`;

const MenuButton = styled.TouchableOpacity`
  height: 75;
  width: 75;
`;

const MenuButtonText = styled.Text`
  color: red;
`;

const BottomMenuBar = ({ onPressFilterMenu }) => (
    <MainContainer>
        <MenuButton onPress={onPressFilterMenu}>
            <MenuButtonText>Filter Menu</MenuButtonText>
        </MenuButton>
    </MainContainer>
);

BottomMenuBar.propTypes = {
    onPressFilterMenu: PropTypes.func
};

export default BottomMenuBar;