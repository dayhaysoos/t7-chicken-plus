import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import firebase from 'react-native-firebase';

export default class FilterOption extends Component {
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
            backgroundColor: '#19181C'
        },
        text: {
            color: 'white',
            fontSize: 20
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.noActiveFilters && !prevProps.noActiveFilters) {
            this.setState({ active: false });
        }
    }

    render() {
        const { isFilterActive } = this.props;
        return (
            <TouchableHighlight
                onPress={this.props.toggleFilters}
                style={this.styles.filterTouchable}
            >
                <View style={this.styles.innerContainer}>
                    <Text style={this.styles.text}>{this.props.text}</Text>
                    {isFilterActive && <Text style={this.styles.check}>✓</Text>}
                </View>
            </TouchableHighlight>
        );
    }
}

FilterOption.propTypes = {
    addToActiveFilters: PropTypes.func,
    filter: PropTypes.func,
    noActiveFilters: PropTypes.bool,
    removeFromActiveFilters: PropTypes.func,
    text: PropTypes.string,
};
