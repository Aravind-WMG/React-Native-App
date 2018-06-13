import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity,Alert,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import resolveAssetSource from 'resolveAssetSource';

export class PmpHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        let icon =  require('../images/logo_new.png'); 
        let source2 = resolveAssetSource(icon);
        let source1 = Dimensions.get('window');
        source2.width = source1.width > 200 ? 150: 100;
        source2.height = source2.height > 50 ? 27 : 27;
        this.state={
            imgWidth:source2.width,
            imgHeight:source2.height
        }
    }
   
    render() {
        return (
            <View style={styles.navBar}>
                <View style={styles.navBarLeft}>
                    <TouchableOpacity>
                        <Icon name="menu" size={30} color='#000' />
                    </TouchableOpacity>
                    <Image
                        source={require('../images/logo_new.png')}
                        style={[styles.imageStyle,{width:this.state.imgWidth,height:this.state.imgHeight}]}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.navBarRight}>
                    <Text style={styles.userName}>Hi, Daisy</Text>
                    <TouchableOpacity>
                        <Icon name="account-circle" size={40} color='#000' style={styles.accountCircle} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="shopping-cart" size={35} color='#000' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navBar: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    navBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 5,
        flex:1,
        width:'50%'
    },
    navBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10,
        flex:1,
        width:'50%'
    },
    imageStyle: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        alignSelf: 'stretch',
    },
    userName: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 5,
    },
    accountCircle: {
        paddingRight: 10,
    }
});