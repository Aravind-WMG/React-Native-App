import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sampleCarouselData } from '../data/DummyData';
import Imageprogressive from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

//const { height, width } = Dimensions.get('window');

export class PmpCarouselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselData: sampleCarouselData,
            viewport: {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            }
        }
    }

    componentDidMount() {
        //Alert.alert("Hey");
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.carouselWrapper}>
                <Imageprogressive
                    style={styles.logoStyle}
                    source={{ uri: item.imageUrl }}
                    indicator={ProgressBar.Pie}
                    resizeMode='cover'
                    indicatorProps={{
                        size: 20,
                        borderWidth: 0,
                        color: 'rgba(150, 150, 150, 1)',
                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                    }}
                />
                <Text style={styles.logoTitle}>{item.navLabel}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.mainWrapper} 
                onLayout={() => {
                    this.setState({
                        viewport: {
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height
                        }
                    });
                }}>
                <Text style={styles.carouselTitle}>Shop By Fit</Text>
                <Carousel
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    firstItem={0}
                    sliderWidth={this.state.viewport.width}
                    itemWidth={this.state.viewport.width / 2.5}
                    activeSlideAlignment={'start'}
                    data={this.state.carouselData[0].visualNavTiles.visualNavTile}
                    renderItem={this.renderItem}
                    enableMomentum={true}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    carouselWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 8
    },
    mainWrapper: {
        paddingVertical: 20,
        flex: 1
    },
    carouselTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 15
    },
    logoStyle: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    logoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '75%',
        flex: 1, 
        flexWrap: 'wrap'
    }
});