import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { characterPortraits } from '../../constants/characterPortraits';

const ListViewWrapper = styled.View`
  background-color: transparent;
`;
const ListViewItem = styled.TouchableOpacity`
  height: 125;
  border-top-width: 1;
  border-top-color: gray;
  border-bottom-width: 1;
  border-bottom-color: gray;
  flex-direction: row;
  justify-content: space-between;
`;
const ListViewText = styled.Text`
  color: white;
  font-size: 21;
  margin: auto;
`;
const CharacterImage = styled.Image`
  width: 85;
  height: 120;
  margin-right: 20;
`;
const StarIcon = styled(FontAwesome)`
    color: red;
    font-size: 30;
    margin-right: 15;
    margin-top: 10;
`;

const CharacterContainer = styled.View`
  flex-direction: row;
`;

const StarButton = styled.TouchableOpacity``;

const ListViewCard = ({ name, favorite, onPress, onStarPress }) => (
    <ListViewWrapper>
        <ListViewItem onPress={onPress}>
            <CharacterContainer>
                <CharacterImage source={characterPortraits[name.split(' ')[0].toLowerCase()]} />
                <ListViewText key={name}>{name.split(' ')[0]}</ListViewText>
            </CharacterContainer>

            <StarButton onPress={onStarPress}>
                <StarIcon>{favorite ? Icons.star : Icons.starO}</StarIcon>
            </StarButton>

        </ListViewItem>
    </ListViewWrapper >
);

ListViewCard.propTypes = {
    name: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    onPress: PropTypes.func,
    onStarPress: PropTypes.func,
};

export default ListViewCard;
