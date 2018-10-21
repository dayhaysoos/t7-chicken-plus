import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

export default class FrameEntryComponent extends Component {
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

FrameEntryComponent.propTypes = {
    filterMoveList: PropTypes.func.isRequired
};
