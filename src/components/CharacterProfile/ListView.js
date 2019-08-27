import React, { PureComponent } from 'react';
import { ScrollView, FlatList, VirtualizedList } from 'react-navigation';
import ListViewCard from './ListViewCard';
import CharacterBanner from './CharacterBanner';

class ListView extends PureComponent {

    renderCard = ({item}) => {
        const { selectedCharacterMoves, theme, navigation } = this.props;

        return (
            <ListViewCard
                selectedCharacterMoves={selectedCharacterMoves}
                item={item}
                name={item.name}
                theme={theme}
                navigation={navigation}
            />
        )
    }

    render() {
        const { selectedCharacterMoves, navigation, theme, label } = this.props;
        return (
            <ScrollView
            showsVerticalScrollIndicator={true}
            indicatorStyle={'white'}
        >
            {label ? <CharacterBanner name={label} /> : null}
            <FlatList
                data={selectedCharacterMoves}
                keyExtractor={({ id }) => id}
                renderItem={this.renderCard}
            />
        </ScrollView>
        )
    }
}

export default ListView;