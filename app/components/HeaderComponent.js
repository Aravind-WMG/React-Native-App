import React from 'react';
import {Text, View, StyleSheet, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class HeaderComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.navBar}>
                <View style={styles.navBarLeft}>
                    <TouchableOpacity>
                        <Icon name="menu" size={40}/>
                    </TouchableOpacity>
                    <Image 
                        source={require('../images/logo_kohls.png')} 
                        style={{width:180,height:27,backgroundColor:'#000'}}
                    />
                </View>
                <View style={styles.navBarRight}>
                    <Text style={styles.userName}>Hi, UserName</Text>
                    <TouchableOpacity>
                        <Icon name="account-circle" size={40}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="shopping-cart" size={40}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navBar: {
      height: 75,
      backgroundColor: '#fff',
      elevation:3,
      flexDirection:'row',
      alignItems:'center',
      
    },
    navBarLeft: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    navBarRight: {
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        justifyContent:'space-between',
    },
    userName:{
        color:'#000',
        fontSize: 14,
        fontWeight: 'bold',
    }
  });