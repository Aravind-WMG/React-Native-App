import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sampleSearchData } from '../data/DummyData'

export class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: '',
    };
    this.data = [];
  }

  componentDidMount() {
    this.data = sampleSearchData;
    this.setState({
      loading: false,
      dataSource: this.data,
    }, function () {
      // In this block you can do something with new state.

    });
  }

  searchFilterFunction(text) {
    if (text !== '') {
      const newData = this.data.filter(function (item) {
        const itemData = item.pdt_name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      })
      this.setState({
        dataSource: newData,
        text: text,
        activeSearch: true
      })
    }
    else {
      this.setState({
        text: '',
        activeSearch: false
      })
    }

  }
  getFlatListViewItem(pdt_name) {
    Alert.alert(pdt_name);
  }
  flatListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  noResult = () => {
    return (
      <View style={{ flex: 1, paddingTop: 0 }}>
        <Text style={styles.rowViewContainer}>No Match Found!</Text>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 0 }}>
          <ActivityIndicator />
        </View>
      );
    }
    else if (!this.state.loading && this.state.activeSearch) {
      return (
        <View style={styles.mainContainer}>
          <SearchBar
            placeholder="Search"
            containerStyle={styles.searchcontainer}
            inputStyle={styles.searchbar}
            icon={{ type: 'material', color: '#000', name: 'search' }}
            onChangeText={(text) => this.searchFilterFunction(text)}
            value={this.state.text} />
          <Icon name="barcode-scan" size={30} color='#000' style={styles.scanIcon} />
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.flatListViewItemSeparator}
            renderItem={({ item }) => <Text style={styles.rowViewContainer}
            onPress={this.getFlatListViewItem.bind(this, item.pdt_name)} >{item.pdt_name}</Text>}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 10 }}
            ListEmptyComponent={this.noResult}
          />
        </View>
      );
    }
    else {
      return (
        <View>
          <SearchBar
            placeholder="Search"
            containerStyle={styles.searchcontainer}
            inputStyle={styles.searchbar}
            icon={{ type: 'material', color: '#000', name: 'search' }}
            onChangeText={(text) => this.searchFilterFunction(text)}
            placeholderTextColor='#000'
            value={this.state.text} />
          <Icon name="barcode-scan" size={30} color='#000' style={styles.scanIcon} />
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  mainContainer: {

  },
  rowViewContainer: {
    fontSize: 16,
    padding: 10,
    color: '#000',
    fontWeight: 'bold',

  },
  searchcontainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: '#fff',
    width: "98%",
  },
  searchbar: {
    borderBottomColor: '#000',
    borderTopColor: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  scanIcon: {
    position: 'absolute',
    right: 30,
    top: 12,
  }
});