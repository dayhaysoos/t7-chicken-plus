import React from 'react';
import { Text, View, Animated } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled(Animated.View)`
  background-color: #484550;
  border: 1px solid #797979;
  flex-direction: row;
  align-items: center;
  padding-left: 6;
  padding-right: 10;
  height: 40;
  width: 100%;
  opacity: ${({ opacity }) => opacity._value}
`;

const Input = styled.TextInput`
  flex: 1;
  color: #797979;
  width: 100 %;
`;

const SearchClearTouchable = styled.TouchableOpacity`
  text-align: right;
  font-size: 30;
`;

const SearchClearText = styled.Text`
  color: #797979;
  font-size: 20;
`;

class SearchBar extends React.Component {

  state = {
      fadeAnim: new Animated.Value(0)
  }

  componentDidMount = () => {
      const { fadeAnim } = this.state;
      Animated.timing(
          fadeAnim,
          {
              toValue: 1,
              duration: 500
          }
      ).start();
  }

  componentWillUnmount = () => {
      const { fadeAnim } = this.state;
      Animated.timing(
          fadeAnim,
          {
              toValue: 0,
              duration: 500
          }
      ).start();
  }

  onClosePress = () => {
      this.props.onClosePress();
      this.input.setNativeProps({ text: '' });
  }

  render() {

      const { fadeAnim } = this.state;
      return (
          <Container opacity={fadeAnim}>

              <Input
                  ref={input => this.input = input}
                  placeholder={'Search'}
                  placeholderTextColor="#797979"
                  {...this.props}
              />

              <SearchClearTouchable onPress={this.onClosePress}>
                  <SearchClearText>✘</SearchClearText>
              </SearchClearTouchable>
          </Container>
      );
  }
}


SearchBar.propTypes = {
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onClosePress: PropTypes.func
};

export default SearchBar;
