import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome, { Icons } from 'react-native-fontawesome';

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
  align-items: center;
`;
const ListViewText = styled.Text`
  color: white;
  font-size: 21;
`;
const CharacterImage = styled.View`
  background-color: pink;
  width: 85;
  height: 120;
  margin-right: 20;
`;
const StarIcon = styled(FontAwesome)`
    color: red;
    font-size: 30;
`;
const StarButton = styled.TouchableOpacity``;

const ListViewCard  = ({name, favorite, onPress, onStarPress}) => (
    <ListViewWrapper>
        <ListViewItem onPress={onPress}>
            <CharacterImage />
            <ListViewText key={name}>{name.split(' ')[0]}</ListViewText>

            <StarButton onPress={onStarPress}>
                <StarIcon>{ favorite ? Icons.star: Icons.starO }</StarIcon>
            </StarButton>

        </ListViewItem>
    </ListViewWrapper>
);

ListViewCard.propTypes = {
    name: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    onPress: PropTypes.func,
    onStarPress: PropTypes.func,
};

export default ListViewCard;
