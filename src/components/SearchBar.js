import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  background-color: #474550;
  border-radius: 8;
  border: 1px solid #797979;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-left: 6;
  padding-right: 10;
  justify-content: space-between;
`;

const Input = styled.TextInput`
  flex: 1;
  align-self: center;
  color: #797979;
  padding-vertical: 7;
  padding-horizontal: 7;
`;

const SearchIcon = styled.Text`
  color: #797979;
  text-align: left;
  font-size: 18;
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

    onClosePress = () => {
        this.props.onClosePress();
        this.input.setNativeProps({ text: '' });
    }

    render (){
        return (
            <Container>
                <SearchIcon>🔍</SearchIcon>

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
