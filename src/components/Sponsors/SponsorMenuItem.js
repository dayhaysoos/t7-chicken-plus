import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '../../themes/defaultTheme';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { GradientTheme } from '../../common/GradientTheme';

const MenuItem = styled.TouchableOpacity`
  background-color: ${({bg}) => bg};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50;
  padding-left: 20;
  padding-right: 20;
`;

const MenuItemText = styled.Text`
  color: white;
  font-size: 24;
`;

const SponsorMenuItem = ({ name, navOnPress }) => {

    return (
            <MenuItem bg={defaultTheme.primary} onPress={navOnPress}>
                <MenuItemText>{name}</MenuItemText>
                <FontAwesomeIcon size={24} color={'#FF412C'} icon={'chevron-right'} />
            </MenuItem>
    )
}

export default SponsorMenuItem;