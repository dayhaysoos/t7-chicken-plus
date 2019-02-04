import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import FilterOption from './FilterOption';
import filters from '../utils/filterFuncs';

//redux
import * as filterActions from '../redux/actions/filterActions';

export const mapStateToProps = ({ characterData: { selectedCharacterMoves } }) => ({
    selectedCharacterMoves
});

export const mapDispatchToProps = {
    ...filterActions
};

const MainContainer = styled.View`
  align-items: center;
  background-color: #474648;
  flex-direction: row;
  justify-content: space-between;
`;

const InnerAccordion = styled.View`
    background-color: #19181C;
`;

const FilterAccordion = styled(Accordion)`
  border-color: #4E4E52;
  border-bottom-width: 1;
`;

class FilterMenu extends Component {
    styles = {
        innerAccordion: {
            backgroundColor: '#19181C'
        },
        filterTouchable: {
            borderColor: '#4E4E52',
            borderBottomWidth: 1,
            padding: 10,
        }
    }

    renderHeader(filterName) {
        return <View><Text style={{ color: 'white', fontSize: 20, padding: 10 }}>{filterName}</Text></View>;
    }

    renderItem = ({ item }) => {
        const { applyFilter } = this.props;
        return (
            <FilterAccordion
                key={item.label}
                header={() => this.renderHeader(item.label)}
                content={
                    <InnerAccordion>
                        {Object.keys(item.filters)
                            .map(
                                (filter) => {
                                    console.log('fitter');
                                    return (
                                        <FilterOption
                                            key={item.filters[filter].filterLabel}
                                            text={item.filters[filter].filterLabel}
                                            onPress={() => applyFilter({
                                                filterType: item.filters[filter].filterType,
                                                filterProperty: item.filterProperty
                                            })}
                                        />
                                    );
                                }
                            )
                        }
                    </InnerAccordion>
                }
            />
        );
    };

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#434755', '#373a46']}
                style={{ flex: 1 }}
            >
                <MainContainer>
                    <TouchableHighlight
                        style={{
                            justifyContent: 'center',
                            backgroundColor: '#474648',
                            borderColor: '#FF412C',
                            borderRadius: 5,
                            borderWidth: 1,
                            height: 25
                        }}
                        onPress={this.props.resetFilters}
                    >
                        <Text style={{ color: 'white', fontSize: 14, paddingHorizontal: 5 }}>Reset</Text>
                    </TouchableHighlight>
                </MainContainer>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                    data={filters}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />
            </LinearGradient>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
