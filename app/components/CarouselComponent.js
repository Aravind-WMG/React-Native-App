import React from 'react';
import {Text, View , StyleSheet, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { height, width } = Dimensions.get('window');

export class CarouselComponent extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        images: [{"id":"1","pdt_name":"Kidz Jeans"},
        {"id":"2","pdt_name":"Mens Jeans"},
        {"id":"3","pdt_name":"Womens Jeans"},
        {"id":"4","pdt_name":"Junior Jeans"},
        {"id":"5","pdt_name":"Pluz size Jeans"}
    ]
    };

    renderItem = ({item, index}) => {
        return (
            <View style={styles.carouselWrapper}>
                <Image style={styles.logoStyle} source={require('../images/jeans-carousel.jpg')} />
                <Text style={styles.logoTitle}>{item.pdt_name}</Text>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.mainWrapper}>
                <Text style={styles.carouselTitle}>Shop By Fit</Text>
                <Carousel
                      inactiveSlideOpacity={1}
                      inactiveSlideScale={0.95}
                      firstItem={0}
                      sliderWidth={width}
                      itemWidth={width/2.5}
                      activeSlideAlignment={'start'}
                      activeAnimationType={'spring'}
                      data={this.state.images}
                      renderItem={this.renderItem}
                    />
            </View>
 
        )
    }
}

const styles = StyleSheet.create({
    carouselWrapper:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#000',
    },
    mainWrapper:{
        paddingVertical: 20
    },
    carouselTitle: {
      color:'#000',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center', 
      paddingBottom:15
    },
    logoStyle: {
        width: 50,
        height: 50,
        borderRadius:10,
    },
    logoTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width:75
    }
  });