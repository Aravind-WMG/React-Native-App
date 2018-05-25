import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sampleYouMayLikeThisDetail } from '../data/DummyData';
import Imageprogressive from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { Rating } from 'react-native-elements';

export class PdpCarouselFooterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselData: sampleYouMayLikeThisDetail,
            activeSlide: 0,
            viewport: {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            }
        }
    }

    componentDidMount() {
        //Alert.alert("Hey");
        
    }
    get pagination() {
        const { carouselData, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={carouselData[0].youMayLikeThisDetail.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={1}
                containerStyle={{paddingTop:0,marginBottom:50}}
            />
        );
    }
    renderItem = ({ item, index }) => {
        return (
            <View style={styles.carouselWrapper}>
                <Imageprogressive
                    style={styles.logoStyle}
                    source={{ uri: item.imageUrl }}
                    indicator={ProgressBar.Pie}
                    indicatorProps={{
                        size: 40,
                        borderWidth: 0,
                        color: 'rgba(150, 150, 150, 1)',
                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                    }}
                />
                <View style={{width:175}}>
                    <Text style={styles.salePrice}>SALE {item.sale_price}</Text>
                    <Text style={styles.pdtTitle}>{item.pdt_name}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, marginVertical: 6, paddingBottom: 20 }}>
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={item.star}
                        />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>({item.star_count})</Text>
                    </View>
                </View>
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
                <Carousel
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    firstItem={0}
                    sliderWidth={this.state.viewport.width}
                    itemWidth={this.state.viewport.width / 2}
                    activeSlideAlignment={'start'}
                    data={this.state.carouselData[0].youMayLikeThisDetail}
                    renderItem={this.renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                {this.pagination}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    carouselWrapper: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    mainWrapper: {
        paddingVertical: 0,
        flex: 1
    },
    logoStyle: {
        width: 155,
        height: 155,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 2,
        backgroundColor: 'red'
    },
    pdtTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
        textAlign:'left'
    },
    salePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
        marginLeft: 10,
        textAlign:'left'
    },

});