import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MainContainer = styled.View`
  background-color: #1D212C
  flex: 1;
`;

export const GradientTheme = ({ theme, children }) => {

    const { primary, primaryGradient2, primaryGradient1, locations } = theme;
    return (
        <MainContainer
        >
            {children}
        </MainContainer>
    );
};

GradientTheme.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    theme: PropTypes.object
};