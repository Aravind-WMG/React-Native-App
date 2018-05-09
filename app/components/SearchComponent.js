import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

let sampleData = [{"id":"1","pdt_name":"Women"},{"id":"2","pdt_name":"Men"},{"id":"3","pdt_name":"Kids"},{"id":"4","pdt_name":"Juniors "},{"id":"5","pdt_name":"Baby"},{"id":"6","pdt_name":"Toy"},{"id":"7","pdt_name":"Shoes"},{"id":"8","pdt_name":"Beauty"},{"id":"9","pdt_name":"Bed and Bath"},{"id":"10","pdt_name":"Furniture"},{"id":"11","pdt_name":"Cloudberry"},{"id":"12","pdt_name":"Swim"},{"id":"13","pdt_name":"Clearance"},{"id":"14","pdt_name":"Jewelry"},{"id":"15","pdt_name":"Sports"}];
export class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: '',
      focus: false,
    };
    this.data = [];
  }

  componentDidMount() {
    this.data = sampleData;
    this.setState({
      loading: false,
      dataSource: this.data,
    }, function () {
      // In this block you can do something with new state.

    });
  }

  SearchFilterFunction(text) {
    if (text !== '') {
      const newData = this.data.filter(function (item) {
        const itemData = item.pdt_name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      })
      this.setState({
        dataSource: newData,
        text: text
      })
    }
    else {
      this.setState({
        text: '',
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
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  noResult = () => {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text>No Match</Text>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    else if (!this.state.loading && this.state.activeSearch) {
      return (
        <View style={styles.MainContainer}>
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
            clearIcon={this.state.focus}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.text} />

          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.flatListViewItemSeparator}
            renderItem={({ item }) => <Text style={styles.rowViewContainer}
            onPress={this.getFlatListViewItem.bind(this, item.pdt_name)} >{item.pdt_name}</Text>}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 10 }}
            ListEmptyComponent={this.noResult.bind(this)}
          />
        </View>
      );
    }
    else {
      return (
        <SearchBar
          placeholder="Type Here...."
          lightTheme
          round
          clearIcon={{ color: 'red' }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.text} />
      )
    }

  }
}

const styles = StyleSheet.create({
  MainContainer: {
    paddingVertical:10
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },
});