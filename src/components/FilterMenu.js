import React, { Component } from 'react';
import { FlatList, View, Text, TextInput, TouchableHighlight } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

const WhiteText = styled.Text`
  color: white;
`;

class FilterMenu extends Component {
    state = {
        filtersToDisplay: [],
        noActiveFilters: true,
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

    componentDidUpdate(prevProps) {
        if(this.props.noActiveFilters && !prevProps.noActiveFilters) {
            this.setState({
                filtersToDisplay: this.composeFiltersToDisplay(),
                noActiveFilters: true
            });
        } else if (!this.props.noActiveFilters && prevProps.noActiveFilters) {
            this.setState({
                filtersToDisplay: this.composeFiltersToDisplay(),
                noActiveFilters: false
            });
        }
    }

    setNoActiveFilters = (input) => {
        this.setState({ noActiveFilters: input });
    }

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

    crushProperties() {
        return {
            name: 'Crush Properties',
            component: (
                <View style={this.styles.innerAccordion}>
                    <TouchableHighlight
                        // onPress={this.props.filterMoveList()}
                        style={this.styles.filterTouchable}
                    >
                        <WhiteText>Low Crush</WhiteText>
                    </TouchableHighlight>
                    <TouchableHighlight
                        // onPress={this.props.filterMoveList()}
                        style={this.styles.filterTouchable}
                    >
                        <WhiteText>High Crush</WhiteText>
                    </TouchableHighlight>
                </View>
            )
        };
    }

    hitLevel() {
        return {
            name: 'Hit Level',
            component: (
                <View style={this.styles.innerAccordion}>
                    <FilterOption
                        text='High'
                        filter={(move) => move.hit_level.includes('h')}
                        addToActiveFilters={this.props.addToActiveFilters}
                        removeFromActiveFilters={this.props.removeFromActiveFilters}
                        noActiveFilters={this.state.noActiveFilters}
                        setNoActiveFilters={this.setNoActiveFilters}
                    />
                    <FilterOption
                        text='Mid'
                        filter={(move) => move.hit_level.includes('m')}
                        addToActiveFilters={this.props.addToActiveFilters}
                        removeFromActiveFilters={this.props.removeFromActiveFilters}
                        noActiveFilters={this.state.noActiveFilters}
                        setNoActiveFilters={this.setNoActiveFilters}
                    />
                    <FilterOption
                        text='Low'
                        filter={(move) => move.hit_level.includes('l')}
                        addToActiveFilters={this.props.addToActiveFilters}
                        removeFromActiveFilters={this.props.removeFromActiveFilters}
                        noActiveFilters={this.state.noActiveFilters}
                        setNoActiveFilters={this.setNoActiveFilters}
                    />
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
                <View style={this.styles.innerAccordion}>
                    <TouchableHighlight
                        // onPress={this.props.filterMoveList()}
                        style={this.styles.filterTouchable}
                    >
                        <WhiteText>Special Properties</WhiteText>
                    </TouchableHighlight>
                </View>
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
        return <View><Text style={{ color: 'white', fontSize: 20, padding: 10 }}>{filterName}</Text></View>;
    }

    renderItem = ({ item }) => {
        return (
            <Accordion
                header={() => this.renderHeader(item.name)}
                content={item.component}
                easing="easeOutCubic"
                style={{ borderBottomWidth: 1, borderColor: this.styles.filterTouchable.borderColor }}
            />
        );
    }

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
                            this.props.resetFilters();
                            this.setState({
                                noActiveFilters: true,
                                reset: true,
                                filtersToDisplay: this.composeFiltersToDisplay(),
                            });
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 14, paddingHorizontal: 5 }}>Reset</Text>
                    </TouchableHighlight>
                </View>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                    data={this.state.filtersToDisplay}
                    extraData={this.state.noActiveFilters}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />
            </LinearGradient>
        );
    }
}

class FilterOption extends Component {
    state = {
        active: false
    }

    styles = {
        check: {
            color: '#2bbd27',
            fontSize: 20
        },
        filterTouchable: {
            borderColor: '#4E4E52',
            borderBottomWidth: 1,
        },
        innerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
        },
        text: {
            fontSize: 20
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.noActiveFilters && !prevProps.noActiveFilters) {
            this.setState({ active: false });
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={() => {
                    // If clicking the filter will make it active
                    if (!this.state.active) {
                        this.props.addToActiveFilters(this.props.filter);
                        this.props.setNoActiveFilters(false);
                    } else {
                        this.props.removeFromActiveFilters(this.props.filter);
                    }

                    this.setState({ active: !this.state.active });
                }}
                style={this.styles.filterTouchable}
            >
                <View style={this.styles.innerContainer}>
                    <WhiteText style={this.styles.text}>{this.props.text}</WhiteText>
                    {this.state.active && <Text style={this.styles.check}>✓</Text>}
                </View>
            </TouchableHighlight>
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
            this.props.filterMoveList((move) => move[this.props.property] === this.state.input);
        } else if (this.state.selectedOperator === '>') {
            this.props.filterMoveList((move) => move[this.props.property] > this.state.input);
        }
    }

    render() {
        return (
            <View style={this.styles.innerAccordion}>
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