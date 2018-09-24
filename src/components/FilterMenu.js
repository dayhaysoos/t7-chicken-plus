import React, { Component } from 'react';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import styled from 'styled-components';

class FilterMenu extends Component {
    state = {
        filtersArray: []
    }

    componentDidMount() {
        this.setState({ filtersArray: this.composeFiltersArray() });
    }

    composeFiltersArray() {
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

    crushProperties() {
        return {
            name: 'Crush Properties',
            component: (
                <TouchableHighlight
                    // onPress={this.props.filterMoveList()}
                >
                    <Text>Crush Properties</Text>
                </TouchableHighlight>
            )
        };
    }

    hitLevel() {
        return {
            name: 'Hit Level',
            component: (
                <TouchableHighlight
                    // onPress={this.props.filterMoveList()}
                >
                    <Text>Hit Level</Text>
                </TouchableHighlight>
            )
        };
    }

    onBlock() {
        return {
            name: 'On Block',
            component: (
                <TouchableHighlight
                    // onPress={this.props.filterMoveList()}
                >
                    <Text>On Block</Text>
                </TouchableHighlight>
            )
        };
    }
    
    onCounterHit() {
        return {
            name: 'On Counter Hit',
            component: (
                <TouchableHighlight
                    // onPress={this.props.filterMoveList()}
                >
                    <Text>On Counterhit</Text>
                </TouchableHighlight>
            )
        };
    }

    onHit() {
        return {
            name: 'On Hit',
            component: (
                <TouchableHighlight
                    // onPress={this.props.filterMoveList()}
                >
                    <Text>On Hit</Text>
                </TouchableHighlight>
            )
        };
    }
    
    
    specialProperties() {
        return {
            name: 'Special Properties',
            component: (
                <TouchableHighlight
                    // onPress={this.props.filterMoveList()}
                >
                    <Text>Special Properties</Text>
                </TouchableHighlight>
            )
        };
    }
    
    speed() {
        return {
            name: 'Speed',
            component: (
                <TouchableHighlight
                    onPress={() => this.props.filterMoveList((move) => move.speed < 15)}
                >
                    <View style={{backgroundColor: 'blue'}}><Text>Speed</Text></View>
                </TouchableHighlight>
            )
        };
    }

    renderHeader(filterName) {
        return <View><Text>{filterName}</Text></View>;
    }

    renderItem = ({ item }) => (
        <Accordion
            header={() => this.renderHeader(item.name)}
            content={item.component}
            easing="easeOutCubic"
            underlayColor="#FF1493"
        />
    )

    render() {
        return (
            <View>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                    data={this.state.filtersArray}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

export default FilterMenu;