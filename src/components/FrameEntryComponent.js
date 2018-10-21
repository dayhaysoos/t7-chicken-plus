import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

export default class FrameEntryComponent extends Component {
  state = {
      activeFilter: false,
      selectedOperator: '=',
      input: null
  }

  styles = {
      operator: {
          justifyContent: 'center',
          backgroundColor: '#474648',
          borderColor: '#FF412C',
          borderRadius: 5,
          borderWidth: 1,
          height: 25,
          marginVertical: 10
      },
      operatorText: {
          color: 'white',
          fontSize: 14,
          paddingHorizontal: 5
      },
      wrapper: {
          alignItems: 'center',
          flexDirection: 'column',
          marginHorizontal: 10
      }
  }

  componentDidUpdate(prevProps) {
      if (this.props.noActiveFilters && !prevProps.noActiveFilters) {
          this.setState({ activeFilter: false });
      }
  }

  applyFilter() {
      if (this.state.selectedOperator === '<') {
          this.props.addToActiveFilters((move) => move[this.props.property] < this.state.input);
      } else if (this.state.selectedOperator === '=') {
          this.props.addToActiveFilters((move) => move[this.props.property] === this.state.input);
      } else if (this.state.selectedOperator === '>') {
          this.props.addToActiveFilters((move) => move[this.props.property] > this.state.input);
      }
  }

  removeFilter() {
      if (this.state.selectedOperator === '<') {
          this.props.removeFromActiveFilters((move) => move[this.props.property] < this.state.input);
      } else if (this.state.selectedOperator === '=') {
          this.props.removeFromActiveFilters((move) => move[this.props.property] === this.state.input);
      } else if (this.state.selectedOperator === '>') {
          this.props.removeFromActiveFilters((move) => move[this.props.property] > this.state.input);
      }
  }

  render() {
      return (
          <View style={{}}>
              <View style={{ backgroundColor: '#19181C', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableHighlight
                      style={[this.styles.operator, {
                          borderWidth: this.state.selectedOperator === '<' ? 1 : 0
                      }]}
                      onPress={() => this.setState({ selectedOperator: '<' })}
                  >
                      <Text style={this.styles.operatorText}>{'<'}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                      style={[this.styles.operator, {
                          borderWidth: this.state.selectedOperator === '=' ? 1 : 0
                      }]}
                      onPress={() => this.setState({ selectedOperator: '=' })}
                  >
                      <Text style={this.styles.operatorText}>=</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                      style={[this.styles.operator, {
                          borderWidth: this.state.selectedOperator === '>' ? 1 : 0
                      }]}
                      onPress={() => this.setState({ selectedOperator: '>' })}
                  >
                      <Text style={this.styles.operatorText}>{'>'}</Text>
                  </TouchableHighlight>
                  <TextInput
                      style={{ backgroundColor: 'white', width: 50, marginVertical: 10, paddingLeft: 5 }}
                      onChangeText={(text) => this.setState({ input: text })}
                  />
              </View>
              <TouchableHighlight
                  style={[this.styles.operator,
                      {
                          alignItems: 'center',
                          flexDirection: 'column',
                          marginHorizontal: 10
                      }]}
                  onPress={() => {
                      if (this.state.activeFilter) {
                          this.removeFilter();
                          this.setState({ activeFilter: false });
                      } else if (this.state.input) {
                          this.applyFilter();
                          this.setState({ activeFilter: true });
                      }
                  }}
              >
                  <Text style={this.styles.operatorText}>{this.state.activeFilter ? 'Remove' : 'Apply'}</Text>
              </TouchableHighlight>
          </View>
      );
  }
}

FrameEntryComponent.propTypes = {
    addToActiveFilters: PropTypes.func.isRequired,
    noActiveFilters: PropTypes.bool.isRequired,
    property: PropTypes.string.isRequired,
    removeFromActiveFilters: PropTypes.func.isRequired
};
