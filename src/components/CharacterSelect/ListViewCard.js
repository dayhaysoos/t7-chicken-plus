import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { characterPortraits } from '../../constants/characterPortraits';

const ListViewWrapper = styled.View`
  background-color: #0e0f10;
`;
const ListViewItem = styled.TouchableOpacity`
  height: 103;
  border-top-width: 1;
  border-top-color: #141414;
  border-bottom-width: 1;
  border-bottom-color: #141414;
  flex-direction: row;
  justify-content: space-between;
`;
const ListViewText = styled.Text`
  color: white;
  font-size: 21;
  margin: auto;
`;
const CharacterImage = styled.Image`
  width: 64;
  height: 101;
  margin-right: 20;
`;
const StarIcon = styled(FontAwesomeIcon)`
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
                <FontAwesomeIcon style={{opacity: favorite ? 1 : 0.7}} size={32} color='#FF412C' icon={favorite ? 'star' : ['far', 'star']} />
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
