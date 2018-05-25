import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class PdpHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navProps;
        return (
            <View style={styles.container}>
                <View style={styles.leftNav}>
                    <TouchableOpacity>
                        <Icon name="keyboard-arrow-left" size={45} color='#000' onPress={() => navigate('PMP')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rightNav}>
                    <TouchableOpacity>
                        <Icon name="search" size={40} color='#000' style={{paddingRight:10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="shopping-cart" size={40} color='#000' style={{paddingRight:10}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position:'absolute',
        width: '100%',
        top:0,
        zIndex: 100, 
    },
    leftNav:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        flex:1,
    },
    rightNav:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        flex:1,
    }
});