import React from 'react';
import { ScrollView, FlatList } from 'react-navigation';
import ListViewCard from './ListViewCard';
import CharacterBanner from './CharacterBanner';
import {useState} from 'react';

const ListView = ({selectedCharacterMoves, navigation, theme, label}) => {

    const [position, setState] = useState({y: 0});

    const handleScroll = (event) => {
        setState({
            y: event.nativeEvent.contentOffset.y
        });
    };

    return (
        <ScrollView
            onScrollEndDrag={handleScroll}
            onMomentumScrollEnd={handleScroll}
            showsVerticalScrollIndicator={true}
            indicatorStyle={'white'}
        >
            {label ? <CharacterBanner name={label}/> : null } 
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
};

export default ListView;