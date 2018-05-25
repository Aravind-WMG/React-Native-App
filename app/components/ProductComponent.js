import React, { Component } from 'react';
import { StyleSheet, View, Platform, Alert } from 'react-native';
import { PmpCarouselComponent } from './PmpCarouselComponent';
import { DropdownComponent } from './DropdownComponent'
import { ProductLayoutComponent } from './ProductLayoutCompmonet'

export class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal: 0,
    }
  }

  handleDropDownChange = (langValue) => {
    this.setState({ dropDownVal: langValue });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropdownContainer}>
          <DropdownComponent onDropDownSelect={this.handleDropDownChange} />
        </View>
        <View style={styles.crouselContainer}>
          <PmpCarouselComponent />
        </View>
        <View style={styles.productContainer}>
          <ProductLayoutComponent nav1={this.props.nav} dropDownValForFilter={this.state.dropDownVal}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    marginTop: 20,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  dropdownContainer:{
    width:'98%',
    margin:5,
    marginTop:10
  }
});