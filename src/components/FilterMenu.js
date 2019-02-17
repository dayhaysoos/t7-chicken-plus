import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FlatList, View, Text } from 'react-native';
import Accordion from '@ercpereda/react-native-accordion';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import FilterOption from './FilterOption';
import filters from '../utils/filterFuncs';

//redux
import * as filterActions from '../redux/actions/filterActions';

export const mapStateToProps = ({ characterData: { selectedCharacterMoves }, filter: { activeFilters } }) => ({
    selectedCharacterMoves,
    activeFilters
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

const ResetButton = styled.TouchableHighlight`
  justify-content: center;
  background-color: #474648;
  border-color: #FF412C;
  border-radius: 5;
  border-width: 1;
  height: 25;
`;

const ResetText = styled.Text`
  color: white;
  fontSize: 14;
  padding-horizontal: 5;
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

    isFilterActive = (filterType) => {
        const { activeFilters } = this.props;


        for (filter in activeFilters) {
            if (activeFilters[filter].filterType === filterType) {
                return true;
            }
        }
    }

    toggleFilters = (item, filter) => {
        const { applyFilter, removeFilter } = this.props;

        const isActive = this.isFilterActive(filter);

        if (isActive) {
            removeFilter({
                filterType: filter,
                filterProperty: item.filterProperty
            });
        } else {
            applyFilter({
                filterType: filter,
                filterProperty: item.filterProperty
            });
        }
    }

    renderItem = ({ item }) => {
        const { applyFilter } = this.props;
        return (
            <Accordion
                style={{
                    borderColor: '#4E4E52',
                    borderBottomWidth: 1,
                }}
                key={item.label}
                header={() => this.renderHeader(item.label)}
                content={
                    <InnerAccordion>
                        {Object.keys(item.filters)
                            .map(
                                (filter) => (
                                    <FilterOption
                                        key={item.filters[filter].filterLabel}
                                        text={item.filters[filter].filterLabel}
                                        isFilterActive={this.isFilterActive(filter)}
                                        toggleFilters={() => this.toggleFilters(item, filter)}
                                    />
                                )
                            )
                        }
                    </InnerAccordion>
                }
            />
        );
    };

    render() {
        const { resetFilters } = this.props;

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#434755', '#373a46']}
                style={{ flex: 1 }}
            >
                <MainContainer>
                    <ResetButton
                        onPress={() => resetFilters()}
                    >
                        <ResetText>Reset</ResetText>
                    </ResetButton>
                </MainContainer>
                <FlatList
                    contentContainerStyle={{ justifyContent: 'center', flexDirection: 'column' }}
                    data={filters}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                />
            </LinearGradient >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
