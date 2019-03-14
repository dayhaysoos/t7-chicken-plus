import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesome, { Icons } from 'react-native-fontawesome';

import SearchBar from '../components/SearchBar';

import firebase from 'react-native-firebase';

const MainContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10;
`;

const OuterContainer = styled.View`
  flex-direction: column;
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

const FadedMenuIconText = styled.Text`
  opacity: 0.7;
`;

const MenuIcon = styled(FontAwesome)`
  font-size: 30;
`;

const MenuLabelText = styled.Text`
  color: white;
  font-size: 12;
  text-align: center;
`;

const SearchBarContainer = styled.View`
    width: 85%;
    align-self: center;
    margin-bottom: 20;
`;

const LegendIcon = styled(FontAwesome)`
  font-size: 30;
`;

const LegendLabelText = styled.Text`
  color: white;
  font-size: 12;
  text-align: center;
`;


class BottomMenuBar extends Component {
    render() {
        const {
            isListView,
            navigation,
            onPressFavoriteFilter,
            onPressFilterMenu,
            handleSearchTextChange,
            toggleListView,
            onPressPreviousAttack,
            onPressNextAttack,
            onPressOpenLegendDrawer,
        } = this.props;

        return (
            <OuterContainer>
                {handleSearchTextChange && (
                    <SearchBarContainer>
                        <SearchBar
                            onClosePress={() => handleSearchTextChange('')}
                            onChangeText={handleSearchTextChange}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                        />
                    </SearchBarContainer>
                )}

                <MainContainer>
                    {navigation && (
                        <MenuButton onPress={() => navigation.toggleDrawer()} >
                            <MenuIconText>
                                <MenuIcon>{Icons.bars}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Menu</MenuLabelText>
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

                    {onPressFavoriteFilter && (
                        <MenuButton onPress={onPressFavoriteFilter}>
                            <MenuIconText>
                                <MenuIcon>{Icons.star}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Toggle Favorites</MenuLabelText>
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

                    {onPressPreviousAttack && (
                        <MenuButton onPress={onPressPreviousAttack}>
                            <MenuIconText>
                                <MenuIcon>{Icons.arrowLeft}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Previous</MenuLabelText>
                        </MenuButton>
                    )}

                    {onPressNextAttack && (
                        <MenuButton onPress={onPressNextAttack}>
                            <MenuIconText>
                                <MenuIcon>{Icons.arrowRight}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Next</MenuLabelText>
                        </MenuButton>
                    )}

                    {onPressOpenLegendDrawer && (
                        <MenuButton onPress={onPressOpenLegendDrawer}>
                            <MenuIconText>
                                <MenuIcon>{Icons.book}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Legend</MenuLabelText>
                        </MenuButton>
                    )}

                </MainContainer>
            </OuterContainer>
        );
    }
}

BottomMenuBar.propTypes = {
    onPressFilterMenu: PropTypes.func,
    onPressFavoriteFilter: PropTypes.func,
    toggleListView: PropTypes.func,
    navigation: PropTypes.object,
    isListView: PropTypes.bool,
    handleSearchTextChange: PropTypes.func,
    onPressPreviousAttack: PropTypes.func,
    onPressNextAttack: PropTypes.func
};

export default BottomMenuBar;
