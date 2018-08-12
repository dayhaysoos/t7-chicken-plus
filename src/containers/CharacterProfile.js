import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import characterActions from '../redux/actions/characterActions';
import { getCharacterMoveList } from '../selectors/characterSelect';

export const mapDispatcthToProps = {
    ...characterActions
};

export const mapStateToProps = ({ characterData }) => ({
    moveList: getCharacterMoveList(characterData)
});

class CharacterProfile extends Component {
    render() {
        const { navigation } = this.props;
        const moveList = navigation.getParam('moveList');
        console.log('move list', moveList);
        return (
            <View>
                <Text>
                    Some data
                </Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatcthToProps)(CharacterProfile);