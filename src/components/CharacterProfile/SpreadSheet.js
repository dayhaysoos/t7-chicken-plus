import React from "react"
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from "react-native"
import HeaderRow from '../CharacterProfile/HeaderRow';
import SpreadSheetRow from '../CharacterProfile/SpreadSheetRow';
import styled, { ThemeProvider } from 'styled-components';
const { height } = Dimensions.get('window');

const NUM_COLS = 7
const NUM_ROWS_STEP = 40
const CELL_WIDTH = 150
const CELL_HEIGHT = 60

const black = "#000"
const white = "#fff"

const SpreadsheetCell = styled.View`
  border-width: 1;
  background-color: ${({ index, theme: { primaryGradient2, primary } }) => index % 2 === 0 ? primary : primaryGradient2};
  height: 50;
  width: 80;
  justify-content: center;
  align-items: center;
`;


const SpreadsheetCellText = styled.Text`
  color: ${({ theme: { text } }) => text};
`;

const NotationCell = styled.TouchableOpacity`
  border-width: 1;
  background-color: ${({ index, theme: { primaryGradient2, primary } }) => index % 2 === 0 ? primary : primaryGradient2};
  height: 50;
  width: 150;
  justify-content: center;
  align-items: center;
`;

const NotationCellText = styled.Text`
  color: ${({ theme: { text } }) => text};
`;

const styles = StyleSheet.create({
    container: { backgroundColor: white, marginVertical: 40, marginBottom: 80 },
    header: { flexDirection: "row", borderTopWidth: 1, borderColor: black },
    identity: { position: "absolute", width: CELL_WIDTH },
    body: { marginLeft: CELL_WIDTH },
    cell: {
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: black,
    },
    column: { flexDirection: "column" },
})

class Sheet extends React.Component {

    static getDerivedStateFromProps(props, state) {
        if (props.selectedCharacterMoves.length < state.count && props.selectedCharacterMoves.length > 40) {
            return {
                ...state,
                count: 15
            }
        } else if (props.selectedCharacterMoves.length < state.count && props.selectedCharacterMoves.length < 40) {
            return {
                ...state,
                count: props.selectedCharacterMoves.length
            }
        } else if (props.selectedCharacterMoves.length > state.count && props.selectedCharacterMoves.length < 40) {
            return {
                ...state,
                count: props.selectedCharacterMoves.length
            }
        } else {
            return {
                ...state,
            }
        }
    }


    constructor(props: {}) {
        super(props)

        this.headerScrollView = null
        this.scrollPosition = new Animated.Value(0)
        this.scrollEvent = Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollPosition } } }],
            { useNativeDriver: false },
        )

        this.state = {
            count: 15,
            loading: false,
            steps: 40,
            hasRendered: false,
        }
    }

    handleScroll = e => {
        if (this.headerScrollView) {
            let scrollX = e.nativeEvent.contentOffset.x
            this.headerScrollView.scrollTo({ x: scrollX, animated: false })
        }
    }

    scrollLoad = () => {

        this.setState({
            loading: false,
            count: this.state.count + this.state.steps
        })

    }

    handleScrollEndReached = () => {
        const { selectedCharacterMoves } = this.props;
        const { count, steps } = this.state;

        const remainingSteps = selectedCharacterMoves.length - count;

        if (steps > remainingSteps) {
            this.setState({
                steps: remainingSteps
            })
        }

        if (!this.state.loading && steps > 0 && count < selectedCharacterMoves.length) {
            this.setState({ loading: true }, () => setTimeout(this.scrollLoad, 200))
        }

        if (!this.state.loading && steps === 0 && remainingSteps <= 40 && count !== selectedCharacterMoves.length) {
            this.setState({
                loading: true,
                steps: remainingSteps
            },
                () => setTimeout(this.scrollLoad, 200))
        }

        if (!this.state.loading && steps === 0 && remainingSteps > 40) {
            this.setState({
                loading: true,
                steps: 40
            },
                () => setTimeout(this.scrollLoad, 200))
        }

        if (!this.state.loading && steps <= 0) {
            return null
        }
    }

    navigateToCharacterMove = (item, name, id) => {
        const { updateMoveData, navigation, selectedCharacterMoves } = this.props;
        updateMoveData(id);
        navigation.navigate('CharacterMove', { name, id, item, selectedCharacterMoves });
    }

    formatCell(value, id, i) {

        return (
            <SpreadsheetCell index={i} key={id}>
                <SpreadsheetCellText>{value}</SpreadsheetCellText>
            </SpreadsheetCell>
        )
    }

    formatNotationCell(notation, id, item, i) {
        const { name } = this.props;
        return (
            <NotationCell
                index={i}
                onPress={() => this.navigateToCharacterMove(item, name, id)}
                key={id}
            >
                <NotationCellText>{notation}</NotationCellText>
            </NotationCell>

        )
    }


    formatNotationColumn() {
        const { count } = this.state;
        const { selectedCharacterMoves, name, updateMoveData } = this.props;

        let notations = [];

        for (let i = 0; i < count; i++) {
            notations.push(this.formatNotationCell(selectedCharacterMoves[i].notation, selectedCharacterMoves[i].id, selectedCharacterMoves[i], i))
        }

        return (
            <View
                style={styles.identity} >{notations}
            </View>
        )
    }

    formatColumn = (section) => {
        const { count } = this.state;
        const { selectedCharacterMoves } = this.props;
        let { item, index } = section
        let cells = []

        for (let i = 0; i < count; i++) {
            cells.push(this.formatCell(selectedCharacterMoves[i][item.key], `move-${i}`, i))
        }

        return <View style={styles.column}>{cells}</View>
    }

    formatHeader() {
        let cols = []

        return (
            <ThemeProvider theme={this.props.theme}>
                <View style={styles.header}>
                    {this.formatNotationCell('Notation')}
                    <ScrollView
                        ref={ref => (this.headerScrollView = ref)}
                        horizontal={true}
                        scrollEnabled={false}
                        scrollEventThrottle={16}
                    >
                        <HeaderRow />
                    </ScrollView>
                </View>
            </ThemeProvider>
        )
    }

    formatBody() {
        const { selectedCharacterMoves } = this.props;
        const columnData = ['speed', 'on_block', 'on_hit', 'on_ch', 'hit_level', 'damage'];
        let data = []
        for (let i = 0; i < NUM_COLS - 1; i++) {
            data.push({ key: `${columnData[i]}` })
        }

        return (
            <View>
                {this.formatNotationColumn(selectedCharacterMoves)}
                <FlatList
                    style={styles.body}
                    horizontal={true}
                    data={data}
                    renderItem={this.formatColumn}
                    stickyHeaderIndices={[0]}
                    onScroll={this.scrollEvent}
                    scrollEventThrottle={16}
                    extraData={this.state}
                    bounces={false}
                />
            </View>
        )
    }


    formatRowForSheet = (section) => {
        let { item } = section

        return item.render
    }

    componentDidMount() {

        this.listener = this.scrollPosition.addListener(position => {
            this.headerScrollView.scrollTo({ x: position.value, animated: false })
        })
    }

    render() {
        let body = this.formatBody()

        let data = [{ key: "body", render: body }]

        return (
            <ThemeProvider theme={this.props.theme}>
                <View style={{ height: '70%' }}>
                    {this.formatHeader()}
                    <FlatList
                        data={data}
                        renderItem={this.formatRowForSheet}
                        onEndReached={this.handleScrollEndReached}
                        onEndReachedThreshold={.005}
                        bounces={true}
                    />
                    {this.state.loading && <ActivityIndicator color={'red'} />}
                </View>
            </ThemeProvider>
        )
    }
}

export default Sheet
