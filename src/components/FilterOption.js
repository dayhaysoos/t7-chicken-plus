import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

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
      },
      text: {
          color: 'white',
          fontSize: 20
      }
  }

  componentDidUpdate(prevProps) {
      if (this.props.noActiveFilters && !prevProps.noActiveFilters) {
          this.setState({ active: false });
          this.props.removeFromActiveFilters(this.props.filter);
      }
  }

  render() {
      return (
          <TouchableHighlight
              onPress={() => {
                  // If clicking the filter will make it active
                  if (!this.state.active) {
                      this.props.addToActiveFilters(this.props.filter);
                  } else {
                      this.props.removeFromActiveFilters(this.props.filter);
                  }

                  this.setState({ active: !this.state.active });
              }}
              style={this.styles.filterTouchable}
          >
              <View style={this.styles.innerContainer}>
                  <Text style={this.styles.text}>{this.props.text}</Text>
                  {this.state.active && <Text style={this.styles.check}>✓</Text>}
              </View>
          </TouchableHighlight>
      );
  }
}

FilterOption.propTypes = {
    addToActiveFilters: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    noActiveFilters: PropTypes.func.isRequired,
    removeFromActiveFilters: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};
