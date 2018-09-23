import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
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
        return <Text>Crush Properties</Text>;
    }
    hitLevel() {
        return <Text>Hit Level</Text>;
    }

    onBlock() {
        return <Text>On Block</Text>;
    }
    
    onCounterHit() {
        return <Text>On Counter Hit</Text>;
    }

    onHit() {
        return <Text>On Hit</Text>;
    }
    
    
    specialProperties() {
        return <Text>Special Properties</Text>;
    }
    
    speed() {
        return <Text>Speed</Text>;
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