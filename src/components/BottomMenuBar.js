import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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


const MenuIconWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const MenuLabelText = styled.Text`
  color: white;
  font-size: 12;
  text-align: center;
`;

const SearchBarContainer = styled(Animated.View)`
    width: 100%;
    align-self: center;
    opacity: ${({ opacity }) => opacity._value}
`;


class BottomMenuBar extends Component {

    state = {
        showSearch: false,
        fadeAnim: new Animated.Value(0)
    }


    renderNavButton = (navButtonFunction, icon, label) => (
        <MenuButton onPress={navButtonFunction ? navButtonFunction : null}>
            <MenuIconWrapper>
                <FontAwesomeIcon size={36} color='#FF412C' style={{opacity: navButtonFunction ? 1 : 0.3}} icon={icon}/>
            </MenuIconWrapper>
            <MenuLabelText>{label}</MenuLabelText>
        </MenuButton>
    )

    handleFade = (fromValue) => {
        const { fadeAnim } = this.state;
        Animated.timing(
            fadeAnim,
            {
                toValue: fromValue === 0 ? 1 : 0,
                duration: 500
            }
        ).start();
    }

    handleSearchBar = async () => {
        const { showSearch } = this.state;

        if(!showSearch) {
            this.handleFade(0);
            this.setState({showSearch: true});
        }

        if(showSearch) {
            this.handleFade(1);
            setTimeout(() => {
                this.setState({showSearch: false});
            }, 500);
        }
    }


    confirmIsTrue = (isOnMoveTab, isCharacterSelectScreen) => {
        if(isOnMoveTab === true || isCharacterSelectScreen === true) {
            return true;
        } else { 
            return false;
        }
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
            isCharacterSelectScreen,
            isOnMoveTab
        } = this.props;

        const { showSearch, fadeAnim } = this.state;

        return (
            <OuterContainer>
                {handleSearchTextChange && showSearch && (
                    <SearchBarContainer opacity={fadeAnim}>
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
                                <MenuIconWrapper>
                                    <FontAwesomeIcon size={36} color='#FF412C' icon='bars' />
                                    <MenuLabelText>Menu</MenuLabelText>
                                </MenuIconWrapper>
                            </LinearGradient>
                        </MainMenuButton>
                    )}


                    { this.confirmIsTrue(isOnMoveTab, isCharacterSelectScreen) && (
                        <MenuButton onPress={toggleListView}>
                            <MenuIconWrapper>
                                <FontAwesomeIcon size={36} color='#FF412C' icon={isListView ? 'th' : 'list'} />
                            </MenuIconWrapper>
                            <MenuLabelText>Switch View</MenuLabelText>
                        </MenuButton>
                    )}
                    
                    
                    { this.confirmIsTrue(isOnMoveTab, isCharacterSelectScreen) && (
                        <MenuButton onPress={() => this.handleSearchBar()}>
                            <MenuIconWrapper>
                                <FontAwesomeIcon size={36} color='#FF412C' icon={'search'} />
                            </MenuIconWrapper>
                            <MenuLabelText>Search</MenuLabelText>
                        </MenuButton>
                    )}

                    {onPressFavoriteFilter && (
                        <MenuButton onPress={onPressFavoriteFilter}>
                            <MenuIconWrapper>
                                <FontAwesomeIcon size={36} color='#FF412C' icon={'star'} />
                            </MenuIconWrapper>
                            <MenuLabelText>Toggle Favorites</MenuLabelText>
                        </MenuButton>
                    )}

                    {isOnMoveTab && onPressFilterMenu && (
                        <MenuButton onPress={onPressFilterMenu}>
                            <MenuIconWrapper>
                                <FontAwesomeIcon size={36} color='#FF412C' icon={'filter'} />
                            </MenuIconWrapper>
                            <MenuLabelText>Filter Menu</MenuLabelText>
                        </MenuButton>
                    )}

                    {isCharacterMoveScreen && this.renderNavButton(onPressPreviousAttack, 'arrow-left', 'Previous')}

                    {isCharacterMoveScreen && this.renderNavButton(onPressNextAttack, 'arrow-right', 'Next')}


                    {onPressOpenLegendDrawer && (
                        <MenuButton onPress={onPressOpenLegendDrawer}>
                            <MenuIconWrapper>
                                <FontAwesomeIcon size={36} color='#FF412C' icon={isListView ? 'th' : 'book-open'} />
                            </MenuIconWrapper>
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
