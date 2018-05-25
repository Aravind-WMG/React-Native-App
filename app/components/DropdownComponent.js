import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Alert } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { sampleDropdownOptions, sampleProductDetail } from '../data/DummyData';

export class DropdownComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: sampleProductDetail,
            dropdowList:sampleDropdownOptions
        }
    }

    dropdownRenderRow(rowData, rowID, highlighted) {
        if (rowID == 1) {
            return (
                <View style={styles.dropdownStyle}>
                    <Icon name="store" size={30} color='#000' />
                    <Text style={styles.dropdownTextStyle}>
                    <Text style={{fontWeight: "bold"}}> {rowData} </Text>
                    ({this.state.dataSource[0].product.bopos}){"\n"}
                    at <Icon name="star" size={20} color='#000' /> StoreName
              </Text>
                </View>
            );
        }
        else if (rowID == 2) {
            return (
                <View style={styles.dropdownStyle}>
                    <Icon name="store" size={30} color='#000' />
                    <Text style={styles.dropdownTextStyle}>
                    <Text style={{fontWeight: "bold"}}> {rowData} </Text>
                    Free ({this.state.dataSource[0].product.boss})
              </Text>
                </View>
            );
        }
        else if (rowID == 3) {
            return (
                <View style={styles.dropdownStyle}>
                    <Icon name="local-shipping" size={30} color='#000' />
                    <Text style={styles.dropdownTextStyle}>
                    <Text style={{fontWeight: "bold"}}> {rowData} </Text>
                     ({this.state.dataSource[0].product.ship}){"\n"}
                        Free at $75
              </Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.dropdownStyle}>
                    <Text style={styles.dropdownTextStyle}>
                        {rowData} ({this.state.dataSource[0].product.product_count})
              </Text>
                </View>
            );
        }
    }
    onClickDropDown=(selectedVal)=>{
        //Alert.alert(selectedVal)
        this.props.onDropDownSelect(selectedVal);
        //return selectedVal;
    }
    dropdownRenderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        if (rowID == 4) return true;
        let key = rowID;
        return (
            <View style={styles.dropdownSeparator} key={key} />);
    }

    componentDidMount() {
        this.dropdowList = sampleDropdownOptions;
        this.dropdowListDefault = "Pickup & Shipping";
        this.setState({
            dropdowList: this.dropdowList,
            dropdowListDefault: this.dropdowListDefault
        }, function () {
            // In this block you can do something with new state.
        });
    }

    render() {
        return (
            <View>
                <Text style={styles.productHeader}>{this.state.dataSource[0].product.search_term} ({this.state.dataSource[0].product.product_count})</Text>
                <TouchableOpacity>
                    <View style={{ height: 40, alignItems: 'center', flexDirection: 'row' }}>
                        <ModalDropdown ref={(el) => { this.dropDown = el }}
                            options={this.state.dropdowList}
                            defaultValue={this.state.dropdowListDefault}
                            style={styles.buttonStyle}
                            textStyle={styles.textStyle}
                            dropdownStyle={styles.dropdownStyle}
                            renderRow={this.dropdownRenderRow.bind(this)}
                            renderSeparator={this.dropdownRenderSeparator.bind(this)}
                            dropdownTextStyle={styles.dropdownTextStyle}
                            onSelect = {(index,value)=>{this.onClickDropDown(value)}}
                        />
                        <View style={{ position: "absolute", right: 20, top: 10 }}><Text>▼</Text></View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    buttonStyle: {
        width: '98%',
        paddingVertical: 10,
        backgroundColor: '#bec1c6',
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 16,
        paddingLeft: 5,
        color: '#000'
    },
    dropdownStyle: {
        width: '94%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        height: 'auto'
    },
    dropdownTextStyle: {
        textAlign: 'left',
        fontSize: 16,
        paddingVertical: 10,
        color: '#000',
        paddingLeft: 10,
        
    },
    dropdownContainer: {
        marginTop: 25,
    },
    productHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 5,
        color: '#000',
    },
    dropdownSeparator: {
        height: 1,
        backgroundColor: '#000',
    }
})