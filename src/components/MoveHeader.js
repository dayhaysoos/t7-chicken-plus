import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const View = styled.View`
`;

const Text = styled.Text`
  color: white;
`;

const MoveHeader = ({ notation, moveName }) => (

    <View>
        <Text>{moveName ? moveName : ''}</Text>
        <Text>{notation}</Text>
    </View>
);

MoveHeader.propTypes = {
    notation: PropTypes.string,
    moveName: PropTypes.string
};


export default MoveHeader;
