import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class PmpHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
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
                        style={styles.imageStyle}
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
        paddingLeft: 5
    },
    navBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    imageStyle: {
        width: 180,
        height: 27,
        backgroundColor: '#fff',
        marginHorizontal: 20,
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