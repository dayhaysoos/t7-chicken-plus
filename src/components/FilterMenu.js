import React, { Component } from 'react';
import { FlatList, View, Text, TextInput, TouchableHighlight } from 'react-native';
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
                <View>
                    <TouchableHighlight
                        // onPress={this.props.filterMoveList()}
                    >
                        <Text>Low Crush</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        // onPress={this.props.filterMoveList()}
                    >
                        <Text>High Crush</Text>
                    </TouchableHighlight>
                </View>
            )
        };
    }

    hitLevel() {
        return {
            name: 'Hit Level',
            component: (
                <View>
                    <TouchableHighlight
                        onPress={() => this.props.filterMoveList((move) => move.hit_level.includes('l'))}
                    >
                        <Text>Low</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.filterMoveList((move) => move.hit_level.includes('m'))}
                    >
                        <Text>Mid</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.props.filterMoveList((move) => move.hit_level.includes('h'))}
                    >
                        <Text>High</Text>
                    </TouchableHighlight>
                </View>
            )
        };
    }

    onBlock() {
        return {
            name: 'On Block',
            component: <FrameEntryComponent property={'on_block'} filterMoveList={this.props.filterMoveList} />
        };
    }
    
    onCounterHit() {
        return {
            name: 'On Counter Hit',
            component: <FrameEntryComponent property={'on_ch'} filterMoveList={this.props.filterMoveList} />
        };
    }

    onHit() {
        return {
            name: 'On Hit',
            component: <FrameEntryComponent property={'on_hit'} filterMoveList={this.props.filterMoveList} />
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
        // Looks like some speeds aren't just an int... need to know how to handle those
        return {
            name: 'Speed',
            component: <FrameEntryComponent property={'speed'} filterMoveList={this.props.filterMoveList} />
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

class FrameEntryComponent extends Component {
    state = {
        selectedOperator: '=',
        input: null
    }

    styles = {
        operator: {
            borderColor: 'green',
        }
    }

    applyFilter() {
        if (this.state.selectedOperator === '<') {
            this.props.filterMoveList((move) => move[this.props.property] < this.state.input);
        } else if (this.state.selectedOperator === '=') {
            this.props.filterMoveList((move) => move.speed === this.state.input);
        } else if (this.state.selectedOperator === '>') {
            this.props.filterMoveList((move) => move.speed > this.state.input);
        }
    }

    render() {
        return (
            <View>
                <View style={{ backgroundColor: 'grey', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableHighlight
                        style={[this.styles.operator, {
                            borderWidth: this.state.selectedOperator === '<' ? 1 : 0
                        }]}
                        onPress={() => this.setState({ selectedOperator: '<' })}
                    >
                        <Text>{'<'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[this.styles.operator, {
                            borderWidth: this.state.selectedOperator === '=' ? 1 : 0
                        }]}
                        onPress={() => this.setState({ selectedOperator: '=' })}
                    >
                        <Text>=</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[this.styles.operator, {
                            borderWidth: this.state.selectedOperator === '>' ? 1 : 0
                        }]}
                        onPress={() => this.setState({ selectedOperator: '>' })}
                    >
                        <Text>{'>'}</Text>
                    </TouchableHighlight>
                    <TextInput
                        style={{ backgroundColor: 'white', width: 50 }}
                        onChangeText={(text) => this.setState({ input: text })}
                    />
                </View>
                <TouchableHighlight onPress={() => this.applyFilter()} >
                    <Text>Apply</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default FilterMenu;