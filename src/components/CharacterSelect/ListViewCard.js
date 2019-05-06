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
  border-top-color: white;
  border-bottom-width: 1;
  border-bottom-color: white;
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
    color: #FF412C
    font-size: 30;
    margin-right: 15;
    margin-top: 10;
`;

const CharacterContainer = styled.View`
  flex-direction: row;
`;

const StarButton = styled.TouchableOpacity``;

const ListViewCard = ({ label, favorite, onPress, onStarPress, displayName }) => (
    <ListViewWrapper>
        <ListViewItem onPress={onPress}>
            <CharacterContainer>
                <CharacterImage source={characterPortraits[label]} />
                <ListViewText key={label}>{displayName}</ListViewText>
            </CharacterContainer>

            <StarButton onPress={onStarPress}>
                <StarIcon>{favorite ? Icons.star : Icons.starO}</StarIcon>
            </StarButton>

        </ListViewItem>
    </ListViewWrapper >
);

ListViewCard.propTypes = {
    label: PropTypes.string,
    favorite: PropTypes.bool,
    onPress: PropTypes.func,
    onStarPress: PropTypes.func,
    displayName: PropTypes.string,
};

export default ListViewCard;
