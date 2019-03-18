import React from "react"
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import HeaderRow from '../CharacterProfile/HeaderRow';
import SpreadSheetRow from '../CharacterProfile/SpreadSheetRow';
import styled, { ThemeProvider } from 'styled-components';


const NUM_COLS = 7
const NUM_ROWS_STEP = 20
const CELL_WIDTH = 150
const CELL_HEIGHT = 60

const black = "#000"
const white = "#fff"

const SpreadsheetCell = styled.View`
  border-width: 1;
  background-color: ${({ theme: { primaryGradient2 } }) => primaryGradient2};
  height: 40;
  width: 75;
`;

const SpreadsheetCellText = styled.Text`
  color: ${({ theme: { text } }) => text};
`;

const NotationCell = styled.View`
  border-width: 1;
  background-color: ${({ theme: { primaryGradient2 } }) => primaryGradient2};
  height: 40;
  width: 150;
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
    constructor(props: {}) {
        super(props)

        this.headerScrollView = null
        this.scrollPosition = new Animated.Value(0)
        this.scrollEvent = Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollPosition } } }],
            { useNativeDriver: false },
        )

        this.state = { count: NUM_ROWS_STEP, loading: false }
    }

    handleScroll = e => {
        if (this.headerScrollView) {
            let scrollX = e.nativeEvent.contentOffset.x
            this.headerScrollView.scrollTo({ x: scrollX, animated: false })
        }
    }

    scrollLoad = () => this.setState({ loading: false, count: this.state.count + NUM_ROWS_STEP })

    handleScrollEndReached = () => {
        if (!this.state.loading) {
            this.setState({ loading: true }, () => setTimeout(this.scrollLoad, 500))
        }
    }

    formatCell(value) {
        return (
            <SpreadsheetCell key={value}>
                <SpreadsheetCellText>{value}</SpreadsheetCellText>
            </SpreadsheetCell>
        )
    }

    formatNotationCell(notation, id) {
        return (
            <NotationCell key={id}>
                <NotationCellText>{notation}</NotationCellText>
            </NotationCell>

        )
    }

    formatNotationColumn() {
        const { selectedCharacterMoves } = this.props;

        const notations = selectedCharacterMoves.map((move, k) => this.formatNotationCell(move.notation, move.id))

        return <View style={styles.identity} >{notations}</View>
    }

    formatColumn = (section) => {
        const { selectedCharacterMoves } = this.props;
        const columnData = ['speed', 'on_block', 'on_hit', 'on_ch', 'hit_level', 'damage'];
        let { item, index } = section
        let cells = []

        for (let i = 0; i < this.state.count; i++) {
            cells.push(this.formatCell(selectedCharacterMoves[i][item.key]))
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

        const { selectedCharacterMoves } = this.props;

        return (
            <ThemeProvider theme={this.props.theme}>
                <View style={styles.container}>
                    {this.formatHeader()}
                    <FlatList
                        data={data}
                        renderItem={this.formatRowForSheet}
                        onEndReached={this.handleScrollEndReached}
                        onEndReachedThreshold={.005}
                    />
                    {this.state.loading && <ActivityIndicator />}
                    <Text>Testing</Text>
                </View>
            </ThemeProvider>
        )
    }
}

export default Sheet
