import React, { Component } from 'react';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import FilterOption from './FilterOption';
import FrameEntryComponent from './FrameEntryComponent';



class FilterMenu extends Component {
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

    composeFiltersToDisplay() {
        return [
            this.hitLevel(),
            this.onBlock()
        ];
    }

    hitLevel = () => ({
        name: 'Hit Level',
        component: (
            <View style={this.styles.innerAccordion}>
                <FilterOption
                    text='High'
                    active={this.props.activeFilters.hitLevel.high}
                    onPress={() => this.props.toggleHitLevelChange('high')}
                />
                <FilterOption
                    text='Mid'
                    active={this.props.activeFilters.hitLevel.mid}
                    onPress={() => this.props.toggleHitLevelChange('mid')}
                />
                <FilterOption
                    text='Low'
                    active={this.props.activeFilters.hitLevel.low}
                    onPress={() => this.props.toggleHitLevelChange('low')}
                />
            </View>
        )
    })

    frameEntryComponent({ property, onChange, turnOn, turnOff }) {
        return (
            <View style={this.styles.innerAccordion}>
                <FrameEntryComponent
                    //   property={property}
                    //   addToActiveFilters={this.addToActiveFilters}
                    //   removeFromActiveFilters={this.removeFromActiveFilters}
                    //   noActiveFilters={!!this.props.activeFilters.length}

                    onChange={onChange}
                    turnOn={turnOn}
                    turnOff={turnOff}
                />
            </View>
        );
    }

    onBlock() {
        const { onBlockChange, turnOnBlockFilter, turnOffBlockFilter } = this.props;
        return {
            name: 'On Block',
            component: this.frameEntryComponent({ property: 'on_block', onChange: onBlockChange, turnOn: turnOnBlockFilter, turnOff: turnOffBlockFilter })
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
                    <Text style={{ color: 'white', fontSize: 14 }}>Filters Coming Soon</Text>
                    <TouchableHighlight
                        style={{
                            justifyContent: 'center',
                            backgroundColor: '#474648',
                            borderColor: '#FF412C',
                            borderRadius: 5,
                            borderWidth: 1,
                            height: 25
                        }}
                        onPress={this.props.resetFilters}
                    >
                        <Text style={{ color: 'white', fontSize: 14, paddingHorizontal: 5 }}>Reset</Text>
                    </TouchableHighlight>
                </View>
                {/* <FlatList
                    contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                    data={this.composeFiltersToDisplay()}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                /> */}
            </LinearGradient>
        );
    }
}

export default FilterMenu;
