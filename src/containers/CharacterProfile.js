import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { View, Text, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';

import CharacterBanner from '../components/CharacterProfile/CharacterBanner';

import * as characterActions from '../redux/actions/characterActions';
import * as settingsActions from '../redux/actions/settingsActions';
import { getCharacterMoveList } from '../selectors/characterSelect';

import { GradientTheme } from '../common/GradientTheme';

import Drawer from 'react-native-drawer';
import DrawerSwitcher from '../components/DrawerSwitcher';

// components
import BottomMenuBar from '../components/BottomMenuBar';
import FilterMenu from '../components/FilterMenu';

export const mapDispatcthToProps = {
    ...characterActions,
    ...settingsActions
};

export const mapStateToProps = ({ characterData, theme, settings: { listView } }) => ({
    moveList: getCharacterMoveList(characterData),
    listView,
    theme
});

const { width } = Dimensions.get('window');

const MainContainer = styled(Drawer)`

`;

// list view

const ListViewCard = styled.TouchableOpacity`
  height: 120;
  width: ${width};
  flex-direction: row;
  border-bottom-width: 1;
  border-bottom-color: ${({ theme: { primaryGradient1 } }) => primaryGradient1};
`;

const ListViewText = styled.Text`
  color: ${({ theme: { text } }) => text};
`;

const MoveNameContainer = styled.View`
  flex: 1;
  padding-left: 20;
  padding-top: 10;
`;

const MoveDetailContainer = styled.View`
  flex: 3;
  padding-left: 30;
  padding-top: 10;
`;

const MoveDetailText = styled.Text`
  color: ${({ theme: { listViewText } }) => listViewText};
  justify-content: space-between;
`;

// spreadsheet 
const SpreadsheetRow = styled.TouchableOpacity`
  flex-direction: row;
`;

const NotationRow = styled.View`
  flex-direction: row;
`;

const SpreadsheetCell = styled.Text`
  height: 80;
  width: 75;
  border-width: 1;
  color: ${({ theme: { text } }) => text};
`;

const NotationCell = styled(SpreadsheetCell)`
  width: 200;
`;

const HeaderNotationCell = styled(NotationCell)``;

const HeaderNotationRow = () => (
    <View>
        <NotationRow>
            <HeaderNotationCell>Notation</HeaderNotationCell>
            <SpreadsheetCell>Damage</SpreadsheetCell>
            <SpreadsheetCell>Hit Level(s)</SpreadsheetCell>
            <SpreadsheetCell>Speed</SpreadsheetCell>
            <SpreadsheetCell>On Block</SpreadsheetCell>
            <SpreadsheetCell>On Hit</SpreadsheetCell>
            <SpreadsheetCell>Counter Hit</SpreadsheetCell>
        </NotationRow>
    </View>
);

const EmptyText = styled.Text`
  fontSize: 20;
  marginLeft: 10;
`;

class CharacterProfile extends Component {

    static navigationOptions = ({ navigation }) => navigation.navigate

    state = {
        activeFilters: [],
        moveListArray: [],
        isRightDrawerOpen: false,
        side: 'right',
        unFilteredMoveList: []
    }

    componentDidMount() {
        const moveListObject = this.props.navigation.getParam('moveList');
        const moveListKey = Object.keys(moveListObject)[0];
        const moveListArray = moveListObject[moveListKey];

        this.setState({ moveListArray, unFilteredMoveList: moveListArray });
    }

    renderListView = ({ item, item: { notation, speed, on_block, on_hit } }, key) => {
        const { theme } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <ListViewCard
                    onPress={(navigation) => this.props.navigation.navigate('CharacterMove', { ...item })}
                >
                    <MoveNameContainer>
                        <ListViewText key={key}>{notation}</ListViewText>
                    </MoveNameContainer>
                    <MoveDetailContainer>
                        <MoveDetailText>
                            Speed: {speed}
                        </MoveDetailText>
                        <MoveDetailText>
                            On Block: {on_block}
                        </MoveDetailText>
                        <MoveDetailText>
                            On Hit: {on_hit}
                        </MoveDetailText>
                    </MoveDetailContainer>
                </ListViewCard>
            </ThemeProvider>
        );
    }

    renderSpreadsheetView = ({ item, item: { notation, hit_level, damage, speed, on_block, on_ch, on_hit }, key }) => {
        const { theme } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <SpreadsheetRow
                    key={key}
                    onPress={(navigation) => this.props.navigation.navigate('CharacterMove', { ...item })}
                >
                    <NotationCell>{notation}</NotationCell>
                    <SpreadsheetCell>{hit_level}</SpreadsheetCell>
                    <SpreadsheetCell>{damage}</SpreadsheetCell>
                    <SpreadsheetCell>{speed}</SpreadsheetCell>
                    <SpreadsheetCell>{on_block}</SpreadsheetCell>
                    <SpreadsheetCell>{on_hit}</SpreadsheetCell>
                    <SpreadsheetCell>{on_ch}</SpreadsheetCell>
                </SpreadsheetRow>
            </ThemeProvider>
        );
    }

    setCharacterProfileState = (obj) => {
        this.setState(obj);
    }

    openRightDrawer = () => {
        this.setState({
            isOpen: true,
            side: 'right'
        });
    }

    openLeftDrawer = () => {
        this.setState({
            isOpen: true,
            side: 'left'
        });
    }

    searchMoveList(input) {
        if (input === '') {
            this.setState({ moveListArray: this.state.unFilteredMoveList },
                () => this.state.activeFilters.forEach(filter => this.filterMoveList(filter))
            );
        } else if (input.includes('+')) {
            this.setState({
                moveListArray: this.state.moveListArray.filter(
                    ({ notation }) => notation.replace(/[ ,]/g, '').includes(input.replace(/[ ,]/g, ''))
                )
            });
        } else {
            this.setState({
                moveListArray: this.state.moveListArray.filter(
                    ({ notation }) => notation.replace(/[ ,+]/g, '').includes(input.replace(/[ ,+]/g, ''))
                )
            });
        }
    }

    filterMoveList(filterFunction) {
        this.setState({ moveListArray: this.state.moveListArray.filter(filterFunction) });
    }

    onDrawerClose = () => {
        this.setState({
            isOpen: false
        });

        if (this.state.activeFilters.length) {
            this.state.activeFilters.forEach(filter => this.filterMoveList(filter));
        } else {
            this.setState({ moveListArray: this.state.unFilteredMoveList });
        }
    }

    render() {
        const { name } = this.props.navigation.state.params;
        const { navigation, toggleListView, listView, theme } = this.props;
        const { isOpen, side, scrollY } = this.state;

        return (
            <ThemeProvider>
                <DrawerSwitcher
                    component={
                        <FilterMenu
                            activeFilters={this.state.activeFilters}
                            moveListArray={this.state.moveListArray}
                            setCharacterProfileState={this.setCharacterProfileState}
                            unFilteredMoveList={this.state.unFilteredMoveList}
                        />
                    }
                    side={side}
                    isOpen={isOpen}
                    onClose={this.onDrawerClose}
                >
                    <GradientTheme theme={theme}>
                        <MainContainer
                        >
                            <FlatList
                                contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                                data={this.state.moveListArray}
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={listView ? this.renderListView : this.renderSpreadsheetView}
                                ListEmptyComponent={() => <EmptyText>No results for this combination of Search and Filters</EmptyText>}
                                ListHeaderComponent={listView ? null : <HeaderNotationRow />}
                                initialNumToRender={10}
                                initialScrollIndex={0}
                                getItemLayout={(item, index) => (
                                    { length: listView ? 120 : 100, offset: listView ? 120 : 100 * index, index }
                                )}
                            />
                            <BottomMenuBar
                                isListView={listView}
                                navigation={navigation}
                                onPressFilterMenu={this.openRightDrawer}
                                searchFunction={(input) => this.searchMoveList(input)}
                                toggleListView={toggleListView}
                            />
                        </MainContainer>
                    </GradientTheme>
                </DrawerSwitcher>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);