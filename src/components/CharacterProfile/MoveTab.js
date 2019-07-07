import React from 'react';
import ListView from './ListView';
import SpreadSheet from './SpreadSheet';
import PropTypes from 'prop-types';

const MoveTab = ({listView, selectedCharacterMoves, navigation, theme, label, updateMoveData, name}) => (
    <React.Fragment>
        {
            listView ?
                <ListView
                    selectedCharacterMoves={selectedCharacterMoves}
                    navigation={navigation}
                    theme={theme}
                    label={label}
                />
                :
                <SpreadSheet
                    theme={theme}
                    selectedCharacterMoves={selectedCharacterMoves}
                    navigation={navigation}
                    name={name}
                    updateMoveData={updateMoveData}
                />
        }
    </React.Fragment>
);

MoveTab.propTypes = {
    listView: PropTypes.bool,
    selectedCharacterMoves: PropTypes.array,
    navigation: PropTypes.object,
    theme: PropTypes.object,
    label: PropTypes.string,
    updateMoveData: PropTypes.func
};

export default MoveTab;