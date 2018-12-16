import React, { Component } from 'react';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import FilterOption from './FilterOption';
import FrameEntryComponent from './FrameEntryComponent';


class FilterMenu extends Component {
    state = {
        filtersToDisplay: [],
    }

    styles = {
        innerAccordion: {
            backgroundColor: '#19181C'
        },
        filterTouchable: {
            borderColor: '#4E4E52',
            borderBottomWidth: 1,
            padding: 10,
        }
    }

    componentDidMount() {
        this.setState({ filtersToDisplay: this.composeFiltersToDisplay() });
    }

    resetFilters = () => {
        this.props.setCharacterProfileState({
            activeFilters: [],
            moveListArray: this.props.unFilteredMoveList
        });
    }

    addToActiveFilters = (filter) => {
        this.props.setCharacterProfileState({ activeFilters: this.props.activeFilters.concat(filter) });
    }

    removeFromActiveFilters = (inputFilter) => {
        const indexToRemove = this.props.activeFilters.findIndex(
            filter => filter.toString() === inputFilter.toString()
        );
        const newActiveFilters = this.props.activeFilters;

        newActiveFilters.splice(indexToRemove, 1);

        this.props.setCharacterProfileState({ activeFilters: newActiveFilters });
    }

    // Add filters that you want to display in the menu here
    composeFiltersToDisplay() {
        return [
            this.crushProperties(),
            this.hitLevel(),
            this.onBlock(),
            this.onCounterHit(),
            this.onHit(),
            this.specialProperties(),
            this.speed(),
        ];
    }

    // Creates a filter option
    filterOption({ text, filter }) {
        return (
            <FilterOption
                text={text}
                filter={filter}
                addToActiveFilters={this.addToActiveFilters}
                removeFromActiveFilters={this.removeFromActiveFilters}
                noActiveFilters={!!this.props.activeFilters.length}
            />
        );
    }

    // Creates a frame entry component
    frameEntryComponent({ property }) {
        return (
            <View style={this.styles.innerAccordion}>
                <FrameEntryComponent
                    property={property}
                    addToActiveFilters={this.addToActiveFilters}
                    removeFromActiveFilters={this.removeFromActiveFilters}
                    noActiveFilters={!!this.props.activeFilters.length}
                />
            </View>
        );
    }

    // Filter definitions

    crushProperties() {
        // I can't find any crush properties in the properies array
        // The filters for this need to be done
        return {
            name: 'Crush Properties',
            component: (
                <View style={this.styles.innerAccordion}>
                    {this.filterOption({
                        text: 'Low Crush',
                        filter: (move) => move // filter goes here
                    })}
                    {this.filterOption({
                        text: 'High Crush',
                        filter: (move) => move // filter goes here
                    })}
                </View>
            )
        };
    }

    hitLevel() {
        return {
            name: 'Hit Level',
            component: (
                <View style={this.styles.innerAccordion}>
                    {this.filterOption({
                        text: 'High',
                        filter: (move) => move.hit_level.includes('h')
                    })}
                    {this.filterOption({
                        text: 'Mid',
                        filter: (move) => move.hit_level.includes('m')
                    })}
                    {this.filterOption({
                        text: 'Low',
                        filter: (move) => move.hit_level.includes('l')
                    })}
                </View>
            )
        };
    }

    onBlock() {
        return {
            name: 'On Block',
            component: this.frameEntryComponent({ property: 'on_block' })
        };
    }

    onCounterHit() {
        return {
            name: 'On Counter Hit',
            component: this.frameEntryComponent({ property: 'on_ch' })
        };
    }

    onHit() {
        return {
            name: 'On Hit',
            component: this.frameEntryComponent({ property: 'on_hit' })
        };
    }


    specialProperties() {
        // I can't find any crush properties in the properies array
        // The filters for this need to be done
        return {
            name: 'Special Properties',
            component: (
                <View style={this.styles.innerAccordion}>
                    {this.filterOption({
                        text: 'Special Properties',
                        filter: (move) => move // filter goes here
                    })}
                </View>
            )
        };
    }

    speed() {
        return {
            name: 'Speed',
            component: this.frameEntryComponent({ property: 'speed' })
        };
    }

    renderHeader(filterName) {
        return <View><Text style={{ color: 'white', fontSize: 20, padding: 10 }}>{filterName}</Text></View>;
    }

    renderItem = ({ item }) => (
        <Accordion
            header={() => this.renderHeader(item.name)}
            content={item.component}
            easing="easeOutCubic"
            style={{ borderBottomWidth: 1, borderColor: this.styles.filterTouchable.borderColor }}
        />
    );


    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#434755', '#373a46']}
                style={{ flex: 1 }}
            >
                <View style={{
                    alignItems: 'center',
                    backgroundColor: '#474648',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                }}>
                    <Text style={{ color: 'white', fontSize: 34 }}>Filters</Text>
                    <TouchableHighlight
                        style={{
                            justifyContent: 'center',
                            backgroundColor: '#19181C',
                            borderColor: '#FF412C',
                            borderRadius: 5,
                            borderWidth: 1,
                            height: 25
                        }}
                        onPress={() => {
                            this.resetFilters();
                            this.setState({ filtersToDisplay: this.composeFiltersToDisplay() });
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 14, paddingHorizontal: 5 }}>Reset</Text>
                    </TouchableHighlight>
                </View>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                    data={this.state.filtersToDisplay}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />
            </LinearGradient>
        );
    }
}

FilterMenu.propTypes = {
    activeFilters: PropTypes.arrayOf(PropTypes.func),
    moveListArray: PropTypes.arrayOf(PropTypes.object),
    setCharacterProfileState: PropTypes.func,
    unFilteredMoveList: PropTypes.arrayOf(PropTypes.object)
};

export default FilterMenu;
