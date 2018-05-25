import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { PmpHeaderComponent } from './PmpHeaderComponent';
import { SearchComponent } from './SearchComponent';
import { ProductComponent } from './ProductComponent';

export class ProductMatricsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <PmpHeaderComponent />
                    <SearchComponent />
                    <ProductComponent nav={this.props.navigation}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      backgroundColor: '#fff',
    },
  });