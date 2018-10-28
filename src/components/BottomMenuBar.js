import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesome, { Icons } from 'react-native-fontawesome';

const MainContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
`;

const OuterContainer = styled.View`
  flex-direction: column;
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

const SearchBar = styled.TextInput`
  backgroundColor: #474550;
  border: 1px solid #797979;
  borderRadius: 10;
  color: #797979;
  marginHorizontal: 50;
  paddingLeft: 10;
  paddingVertical: 5;
`;

const SearchClearTouchable = styled.TouchableOpacity`
  position: absolute;
  right: 55;
`;

const SearchClearText = styled.Text`
  color: #797979;
  fontSize: 20;
`;

class BottomMenuBar extends Component {
    state = {
        searchText: '🔍 Search'
    }
    render() {
        const {
            isListView,
            navigation,
            onPressFavoriteFilter,
            onPressFilterMenu,
            searchFunction,
            toggleListView
        } = this.props;

        return (
            <OuterContainer>
                {searchFunction && (
                    <React.Fragment>
                        <SearchBar
                            onChangeText={(searchText) => this.setState({searchText})}
                            onFocus={() => {
                                if (this.state.searchText === '🔍 Search') {
                                    this.setState({ searchText: '' });
                                }
                            }}
                            onSubmitEditing={() => searchFunction(this.state.searchText)}
                            value={this.state.searchText}
                        />
                        <SearchClearTouchable
                            onPress={() => {
                                searchFunction('');
                                this.setState({ searchText: '🔍 Search' });

                            }}
                        >
                            <SearchClearText>✘</SearchClearText>
                        </SearchClearTouchable>
                    </ React.Fragment>
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

                    {onPressFavoriteFilter && (
                        <MenuButton onPress={onPressFilterMenu}>
                            <MenuIconText>
                                <MenuIcon>Derp</MenuIcon>
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
            </OuterContainer>
        );
    }
};

BottomMenuBar.propTypes = {
    onPressFilterMenu: PropTypes.func,
    onPressFavoriteFilter: PropTypes.func,
    toggleListView: PropTypes.func,
    navigation: PropTypes.object,
    isListView: PropTypes.bool,
    searchFunction: PropTypes.func
};

export default BottomMenuBar;