import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import styled from 'styled-components';

import ListViewCard from './ListViewCard';
import CharacterBanner from './CharacterBanner';

const ListView = ({selectedCharacterMoves, navigation, theme, label}) => (
    <ScrollView>
        <CharacterBanner name={label}/>
        <FlatList 
            initialNumToRender={10}
            data={selectedCharacterMoves}
            keyExtractor={({id}) => id}
            renderItem={({ item }) => (
                <ListViewCard 
                    selectedCharacterMoves={selectedCharacterMoves}
                    item={item}
                    name={item.name}
                    theme={theme}
                    navigation={navigation}
                />
            )}
        />
    </ScrollView>
);

export default ListView;