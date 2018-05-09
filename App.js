import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {CarouselComponent} from './app/components/CarouselComponent';
import {HeaderComponent} from './app/components/HeaderComponent';
import {SearchComponent} from './app/components/SearchComponent';
import {ProductComponent} from './app/components/ProductComponent';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <HeaderComponent />
            <SearchComponent />
            <CarouselComponent />
            <ProductComponent/>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
