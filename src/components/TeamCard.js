import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SocialIcon from '../common/SocialIcon';

const TeamCardContainer = styled.View`
  flex: 1;
  border-bottom-width: 1;
  border-bottom-color: gray;
  margin-bottom: 10;
  padding-right: 20;
  padding-left: 20;
  padding-bottom: 20;
`;

const NameText = styled.Text`
  color: white;
  font-size: 18;
  font-weight: bold;
`;

const DescriptionText = styled.Text`
  color: white;
  flex-wrap: wrap;
  margin-bottom: 20;
`;

const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const renderSocialIcons = (props) => Object.keys(props).map((prop) => {
    if (prop === 'twitter') return <SocialIcon key={prop} media={prop} handle={props[prop]} />;
    if (prop === 'twitch') return <SocialIcon key={prop} media={prop} handle={props[prop]} />;
});


const TeamCard = (props) => (
    <TeamCardContainer>
        <NameText>{props.name}</NameText>
        <DescriptionText>
            {props.description}
        </DescriptionText>
        <SocialContainer>
            {renderSocialIcons(props)}
        </SocialContainer>
    </TeamCardContainer>
);

TeamCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
};

export default TeamCard;