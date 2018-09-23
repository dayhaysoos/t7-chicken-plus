import React, { Component } from 'react';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';
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
        return (
            <TouchableHighlight
                // onPress={this.props.filterMoveList()}
            >
                <Text>Crush Properties</Text>
            </TouchableHighlight>
        );
    }
    hitLevel() {
        return (
            <TouchableHighlight
                // onPress={this.props.filterMoveList()}
            >
                <Text>Hit Level</Text>
            </TouchableHighlight>
        );
    }

    onBlock() {
        return (
            <TouchableHighlight
                // onPress={this.props.filterMoveList()}
            >
                <Text>On Block</Text>
            </TouchableHighlight>
        );
    }
    
    onCounterHit() {
        return (
            <TouchableHighlight
                // onPress={this.props.filterMoveList()}
            >
                <Text>On Counterhit</Text>
            </TouchableHighlight>
        );
    }

    onHit() {
        return (
            <TouchableHighlight
                // onPress={this.props.filterMoveList()}
            >
                <Text>On Hit</Text>
            </TouchableHighlight>
        );
    }
    
    
    specialProperties() {
        return (
            <TouchableHighlight
                // onPress={this.props.filterMoveList()}
            >
                <Text>Special Properties</Text>
            </TouchableHighlight>
        );
    }
    
    speed() {
        return (
            <TouchableHighlight
                onPress={() => this.props.filterMoveList((move) => move.speed < 15)}
            >
                <View style={{backgroundColor: 'blue'}}><Text>Speed</Text></View>
            </TouchableHighlight>
        );
    }

    renderItem = ({ item }) => <View>{item}</View>;

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