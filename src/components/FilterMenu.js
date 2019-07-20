import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Text } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
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

const AccordionSectionTitle = styled.Text`
  color: white;
  font-size: 20;
  padding: 10px;
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

    state = {
        activeSections: [],
    };

    isFilterActive = (filterType) => {
        const { activeFilters } = this.props;


        for (filter in activeFilters) {
            if (activeFilters[filter].filterType === filterType) {
                return true;
            }
        }
    }

    toggleFilters = (filterProperty, filter) => {
        const { applyFilter, removeFilter } = this.props;

        const isActive = this.isFilterActive(filter);

        if (isActive) {
            removeFilter({
                filterType: filter,
                filterProperty: filterProperty
            });
        } else {
            applyFilter({
                filterType: filter,
                filterProperty: filterProperty
            });
        }
    }

    handleSections = () => filters.map(filterCategory => ({
        title: filterCategory.label,

        filterProperties: Object.keys(filterCategory.filters).map((prop) => ({
            filterLabel: filterCategory.filters[prop].filterLabel,
            filterFunction: filterCategory.filters[prop].filterFunction,
            filterType: filterCategory.filters[prop].filterType,
            filterProperty: filterCategory.filterProperty
        }))
    }))

    renderSectionHeader = (section) => (
        <AccordionSectionTitle>
            {section.title}
        </AccordionSectionTitle>
    )

    renderSectionTitle = (section) => (
        <Text>Test</Text>
    )

    renderContent = (section) => {
        const { title, filterProperties } = section;
        return filterProperties.map(prop => (
            <FilterOption
                key={prop.filterLabel}
                text={prop.filterLabel}
                isFilterActive={this.isFilterActive(prop.filterType)}
                toggleFilters={() => this.toggleFilters(prop.filterProperty, prop.filterType)}
            />
        ));
    }

    updateSections = (activeSections) => {
        this.setState({ activeSections });
    }

    render() {
        const { resetFilters } = this.props;
        const sections = this.handleSections();
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
                <Accordion
                    activeSections={this.state.activeSections}
                    sections={sections}
                    renderHeader={this.renderSectionHeader}
                    renderContent={this.renderContent}
                    onChange={this.updateSections}
                />
            </LinearGradient >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
