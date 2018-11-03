import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesome, { Icons } from 'react-native-fontawesome';

const MainContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
`;

const MenuButton = styled.TouchableOpacity`
  height: 60;
  width: 75;
`;

const MenuIconText = styled.Text`
  color: red;
  text-align: center;
`;

const MenuIcon = styled(FontAwesome)`
  font-size: 30;
`;

const MenuLabelText = styled.Text`
  color: white;
  font-size: 12;
  text-align: center;
`;

const BottomMenuBar = ({ isListView, onPressFilterMenu, navigation, onPressFavoriteFilter, toggleListView }) => (
    <MainContainer>
        {navigation && (
            <MenuButton onPress={() => navigation.toggleDrawer()} >
                <MenuIconText>
                    <MenuIcon>{Icons.bars}</MenuIcon>
                </MenuIconText>
                <MenuLabelText>Menu</MenuLabelText>
            </MenuButton>
        )}

        {onPressFavoriteFilter && (
            <MenuButton onPress={onPressFavoriteFilter}>
                <MenuIconText>
                    <MenuIcon>{Icons.starHalfFull}</MenuIcon>
                </MenuIconText>
                <MenuLabelText>Toggle Favorites</MenuLabelText>
            </MenuButton>
        )}

        {toggleListView && (
            <MenuButton onPress={toggleListView}>
                <MenuIconText>
                    <MenuIcon>{isListView ? Icons.th : Icons.list}</MenuIcon>
                </MenuIconText>
                <MenuLabelText>Switch View</MenuLabelText>
            </MenuButton>
        )}

        {onPressFilterMenu && (
            <MenuButton onPress={onPressFilterMenu}>
                <MenuIconText>
                    <MenuIcon>{Icons.filter}</MenuIcon>
                </MenuIconText>
                <MenuLabelText>Filter Menu</MenuLabelText>
            </MenuButton>
        )}

    </MainContainer>
);

BottomMenuBar.propTypes = {
    onPressFilterMenu: PropTypes.func,
    onPressFavoriteFilter: PropTypes.func,
    toggleListView: PropTypes.func,
    navigation: PropTypes.object,
    isListView: PropTypes.bool
};

export default BottomMenuBar;
