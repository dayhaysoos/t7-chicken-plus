import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import FontAwesome, { Icons } from 'react-native-fontawesome';

import SearchBar from '../components/SearchBar';

import firebase from 'react-native-firebase';

const MainContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 70;
  padding-right: 10;
`;

const OuterContainer = styled.View`
  flex-direction: column;
  background-color: transparent;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.6);
`;

const MenuButton = styled.TouchableOpacity`
  justify-content: center;
`;

const MainMenuButton = styled(MenuButton)`
  width: 95;
  height: 100%;
  shadowColor: rgba(0, 0, 0, 0.7);
  shadowRadius: 10;
  borderColor: #791f16;
  borderStyle: solid;
  borderWidth: 1;
  border-top-right-radius: 20;
  border-bottom-right-radius: 20;
  border-left-width: 0;
`;

const MenuIconText = styled.Text`
  color: #FF412C
  text-align: center;
`;

const MenuIcon = styled(FontAwesome)`
  font-size: 30;
`;

const MainMenuIcon = styled(MenuIcon)`
  font-size: 40;
`

const MenuLabelText = styled.Text`
  color: white;
  font-size: 12;
  text-align: center;
`;

const SearchBarContainer = styled.View`
    width: 100%;
    align-self: center;
`;


class BottomMenuBar extends Component {

    state = {
        showSearch: false
    }


    renderNavButton = (navButtonFunction, icon, label) => {
        const { isCharacterMoveScreen } = this.props;
        return (
            <MenuButton onPress={navButtonFunction ? navButtonFunction : null}>
            <MenuIconText>
                <MenuIcon style={{opacity: navButtonFunction ? 1 : 0.3}}>{icon}</MenuIcon>
            </MenuIconText>
            <MenuLabelText>Next</MenuLabelText>
        </MenuButton>
        )
    }

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
            isCharacterMoveScreen,
        } = this.props;

        const { showSearch } = this.state;

        return (
            <OuterContainer>
                {handleSearchTextChange && showSearch && (
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
                        <MainMenuButton style={{ shadowOffset: { width: 0, height: 0 } }} onPress={() => navigation.toggleDrawer()} >
                            <LinearGradient
                                start={{ x: 1, y: .1 }}
                                end={{ x: .1, y: 1.5 }}
                                colors={['#791f16', '#0d0808']}
                                style={{
                                    height: '100%',
                                    justifyContent: 'center',
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                    borderLeftWidth: 0,
                                }}
                            >
                                <MenuIconText>
                                    <MainMenuIcon>{Icons.bars}</MainMenuIcon>
                                </MenuIconText>
                                <MenuLabelText>Menu</MenuLabelText>
                            </LinearGradient>
                        </MainMenuButton>
                    )}

                    {toggleListView && (
                        <MenuButton onPress={toggleListView}>
                            <MenuIconText>
                                <MenuIcon>{isListView ? Icons.th : Icons.list}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Switch View</MenuLabelText>
                        </MenuButton>
                    )}
                    
                    
                    {handleSearchTextChange && (
                        <MenuButton onPress={() => this.setState({ showSearch: !showSearch })}>
                            <MenuIconText>
                                <MenuIcon>{Icons.search}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Search</MenuLabelText>
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

                    {/* {onPressPreviousAttack && isCharacterMoveScreen && (
                        <MenuButton onPress={onPressPreviousAttack ? onPressPreviousAttack : null}>
                            <MenuIconText>
                                <MenuIcon style={{opacity: onPressPreviousAttack ? 1 : 5}}>{Icons.arrowLeft}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Previous</MenuLabelText>
                        </MenuButton>
                    )} */}

                    {isCharacterMoveScreen && this.renderNavButton(onPressPreviousAttack, Icons.arrowLeft, 'Previous')}

                    {isCharacterMoveScreen && this.renderNavButton(onPressNextAttack, Icons.arrowRight, 'Next')}

                    {/* {onPressNextAttack && isCharacterMoveScreen && (
                        <MenuButton onPress={onPressNextAttack}>
                            <MenuIconText>
                                <MenuIcon>{Icons.arrowRight}</MenuIcon>
                            </MenuIconText>
                            <MenuLabelText>Next</MenuLabelText>
                        </MenuButton>
                    )} */}

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
