import React, { Component } from 'react';
import { StyleSheet, Platform, View, ActivityIndicator, FlatList, Text, Image, Alert, YellowBox } from 'react-native';

let sampleData = [{"id":"1","pdt_name":"Women's Rock & Republic® Fever Denim Rx™ Pull-On Jean Leggings","original_price":"10$","sale_price":"5$"},{"id":"2","pdt_name":"Men's Levi's® 505™ Regular Jeans","original_price":"10$","sale_price":"5$"},{"id":"3","pdt_name":"Men's Wrangler Regular-Fit Jeans","original_price":"10$","sale_price":"5$"},{"id":"4","pdt_name":"Men's Wrangler Relaxed-Fit Jeans","original_price":"10$","sale_price":"5$"},{"id":"5","pdt_name":"Men's Wrangler Loose-Fit Jeans","original_price":"10$","sale_price":"5$"},{"id":"6","pdt_name":"Men's Levi's® 505™ Regular Jeans","original_price":"10$","sale_price":"5$"},{"id":"7","pdt_name":"Men's Wrangler Relaxed-Fit Jeans","original_price":"10$","sale_price":"5$"},{"id":"8","pdt_name":"Men's Wrangler Regular-Fit Jeans","original_price":"10$","sale_price":"5$"},{"id":"9","pdt_name":"Men's Wrangler Loose-Fit Jeans","original_price":"10$","sale_price":"5$"},{"id":"10","pdt_name":"Women's Rock & Republic® Fever Denim Rx™ Pull-On Jean Leggings"}];

export class ProductComponent extends Component {
 constructor(props) {
   super(props);
   this.state = {
     isLoading: true
   }
   YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
  ]);
 }

  GetItem (pdt_name) {
    Alert.alert(pdt_name);
  }
  
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: "100%",
         backgroundColor: "#000"
       }}
     />
   );
 }


 componentDidMount(){
    this.dataSource=sampleData;
    this.setState({
      isLoading: false,
      dataSource: this.dataSource
    }, function() {
      // In this block you can do something with new state.
    });
 }
 
 render() {
   if (this.state.isLoading) {
     return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <ActivityIndicator size="large" />
       </View>
     );
   }
   return (
     <View style={styles.MainContainer}>
       <FlatList
        data={ this.state.dataSource }
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        numColumns={2}
        renderItem={({item}) => 
            <View style={{flex:1, flexDirection: 'row',marginBottom:30}}>
              <View style={{flex:1, flexDirection: 'column'}}>
              <Image source={require('../images/pdt-image.jpg')} style={styles.imageView} />
              <Text onPress={this.GetItem.bind(this, item.pdt_name)} 
              style={styles.textView} >
              {item.pdt_name}
              </Text>
              <Text style={styles.salePrice}>Sale Price : {item.sale_price}</Text>
              <Text style={styles.originalPrice}>Original Price {item.original_price}</Text>
              </View>
            </View>
          }
        keyExtractor={(item, index) => index.toString()}
        />
     </View>
   );
 }
}
 
const styles = StyleSheet.create({
MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop:20,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
},
imageView: {
    width: '100%',
    margin: 7,
    borderRadius : 7
},
textView: {
    width:'100%', 
    textAlign:'center',
    padding:10,
    color: '#000'
},
salePrice:{
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  color:'red'
},
originalPrice:{
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  color:'#000'
}
});