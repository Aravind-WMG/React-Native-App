import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Picker,
  Alert,
  Platform,
  measure
} from "react-native";
import { PdpHeaderComponent } from "./PdpHeaderComponent";
import { PdpCarouselComponent } from "./PdpCarouselComponent";
import { PdpCarouselFooterComponent } from "./PdpCarouselFooterComponent";
import {
  sampleSingleProductDetail,
  sampleColorOptions,
  sampleSizeOptions
} from "../data/DummyData";
import { Rating } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { default as Icons } from "react-native-vector-icons/Ionicons";
import ModalDropdown from "react-native-modal-dropdown";

export class ProductDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: sampleSingleProductDetail,
      qty: 1,
      sizeDropdowList: sampleSizeOptions,
      colorDropdowList: sampleColorOptions,
      sizeDropdowListDefault: "select a size",
      colorDropdowListDefault: sampleColorOptions[0] || "No Options Available",
      showAddToCart: false,
      viewport: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      }
    };
  }
  decrementQty = () => {
    if (this.state.qty !== 1) {
      this.setState({
        qty: this.state.qty - 1
      });
    }
  };
  incrementQty = () => {
    this.setState({
      qty: this.state.qty + 1
    });
  };
  onClickDropDown = selectedVal => {
    this.setState({
      sizeDropdowListDefault: ""
    });
    Alert.alert(selectedVal);
  };
  sizeDropdownRenderRow(rowData, rowID, highlighted) {
    return (
      <View style={styles.dropdownStyle}>
        <Text style={styles.dropdownTextStyle}> {rowData} </Text>
      </View>
    );
  }
  colorDropdownRenderRow(rowData, rowID, highlighted) {
    return (
      <View style={styles.dropdownStyle}>
        <Text style={styles.dropdownTextStyle}> {rowData} </Text>
      </View>
    );
  }
  onScroll = event => {
    let currentOffset = event.nativeEvent.contentOffset.y;
    let viewPortHeight = this.state.viewport.height;
    this.refs.Marker.measure((x, y, width, height, pageX, pageY) => {
      if (pageY + 150 < currentOffset + viewPortHeight) {
        this.setState({
            showAddToCart:true
        })
      }
    });
    //console.log(this.state.viewport.height+"Height");
  };
  dropdownRenderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    let key = rowID;
    return <View style={styles.dropdownSeparator} key={key} />;
  }
  //   layoutMeasure=()=>{
  //     this.refs.Marker.measure(
  //         (x, y, width, height, pageX, pageY) => {
  //           //console.log(pageY+"YY");
  //         }
  //       );
  //   }
  addToCart = () => {
    if (this.state.sizeDropdowListDefault != "") {
      Alert.alert("Please Select Size");
    } else {
      Alert.alert("Added to Cart");
    }
  };
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("title", "NO-ID");
    return (
      <View style={styles.container}>
        <PdpHeaderComponent navProps={navigation} />
        <ScrollView onScroll={this.onScroll.bind(this)}>
          <View style={{ marginTop: 75 }}>
            <PdpCarouselComponent />
          </View>
          <View style={styles.contentWrap}>
            <Text style={styles.pdtTitle}>
              {this.state.datasource[0].singlePdtDetail.pdt_name}
            </Text>
            <Text style={styles.salePrice}>
              SALE {this.state.datasource[0].singlePdtDetail.sale_price}
            </Text>
            <Text style={styles.regPrice}>
              Reg {this.state.datasource[0].singlePdtDetail.reg_price}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 10,
                marginVertical: 6,
                paddingBottom: 20
              }}
            >
              <Rating
                imageSize={20}
                readonly
                startingValue={this.state.datasource[0].singlePdtDetail.star}
              />
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                ({this.state.datasource[0].singlePdtDetail.star_count})
              </Text>
            </View>
            <View style={styles.offerStack}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#000"
                }}
              >
                Offer Stack
              </Text>
            </View>
            <View
              style={styles.dropdownWrap}
              ref="Marker"
              //   onLayout={this.layoutMeasure}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: "#000"
                }}
              >
                Size
              </Text>
              <ModalDropdown
                options={this.state.sizeDropdowList}
                defaultValue={this.state.sizeDropdowListDefault}
                textStyle={styles.dropdownTextStyle}
                dropdownStyle={styles.dropdownStyle}
                renderRow={this.sizeDropdownRenderRow.bind(this)}
                renderSeparator={this.dropdownRenderSeparator.bind(this)}
                dropdownTextStyle={styles.dropdownTextStyle}
                onSelect={(index, value) => {
                  this.onClickDropDown(value);
                }}
              />
            </View>
            <View style={styles.dropdownWrap}>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: "#000"
                }}
              >
                Color
              </Text>
              <ModalDropdown
                options={this.state.colorDropdowList}
                defaultValue={this.state.colorDropdowListDefault}
                textStyle={styles.dropdownTextStyle}
                dropdownStyle={styles.dropdownStyle}
                renderRow={this.colorDropdownRenderRow.bind(this)}
                renderSeparator={this.dropdownRenderSeparator.bind(this)}
                dropdownTextStyle={styles.dropdownTextStyle}
                onSelect={(index, value) => {
                  this.onClickDropDown(value);
                }}
              />
            </View>
            <View style={styles.qtyWrap}>
              <Text style={styles.qtyStyle}>Quantity</Text>
              <View style={styles.qtyDropdown}>
                <TouchableOpacity>
                  <Icon
                    name="minus"
                    size={30}
                    color="#000"
                    onPress={this.decrementQty.bind(this)}
                    style={
                      this.state.qty == 1
                        ? styles.buttonInValid
                        : styles.buttonValid
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{this.state.qty}</Text>
                <TouchableOpacity>
                  <Icon
                    name="plus"
                    size={30}
                    color="#000"
                    onPress={this.incrementQty.bind(this)}
                    style={{ paddingRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={styles.tabWrap}>
                <Text style={styles.tabText}>Questions & Answers</Text>
                <Icons
                  name="ios-arrow-forward"
                  size={30}
                  color="#000"
                  style={styles.tabIcon}
                />
              </View>
              <View style={styles.tabWrap}>
                <Text style={styles.tabText}>Product Details</Text>
                <Icons
                  name="ios-arrow-forward"
                  size={30}
                  color="#000"
                  style={styles.tabIcon}
                />
              </View>
              <View style={styles.tabWrap}>
                <Text style={styles.tabText}>Return Policy</Text>
                <Icons
                  name="ios-arrow-forward"
                  size={30}
                  color="#000"
                  style={styles.tabIcon}
                />
              </View>
            </View>
            <View style={styles.shareWrap}>
              <TouchableOpacity style={styles.shareInnerWrap}>
                <Icon
                  name="share"
                  size={30}
                  color="#000"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.shareTitle}>{"share".toUpperCase()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.shareInnerWrap, { paddingHorizontal: 25 }]}
              >
                <Icon
                  name="gift"
                  size={30}
                  color="#000"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.shareTitle}>
                  {"registry".toUpperCase()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareInnerWrap}>
                <Icon
                  name="wunderlist"
                  size={30}
                  color="#000"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.shareTitle}>{"list".toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.findStoreWrap}>
              <TouchableOpacity>
                <Text style={styles.findStore}>Find in Store</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "#000",
                  marginBottom: 15,
                  marginLeft: 10
                }}
              >
                YOU MAY LIKE THESE
              </Text>
              <PdpCarouselFooterComponent />
            </View>
          </View>
        </ScrollView>
        {this.state.showAddToCart && (
          <View style={styles.fixedWrap}>
            <View style={styles.bottomView}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                height: 45,
                width: "100%"
              }}
              onPress={this.addToCart.bind(this)}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  buttonValid: {
    opacity: 1,
    paddingRight: 10
  },
  buttonInValid: {
    opacity: 0.2,
    paddingRight: 10
  },
  contentWrap: {
    flex: 1,
    justifyContent: "flex-start"
  },
  pdtTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10
  },
  salePrice: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    marginLeft: 10
  },
  regPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    marginLeft: 10
  },
  offerStack: {
    paddingVertical: 20,
    width: "100%",
    borderBottomWidth: 1,
    flex: 1,
    borderTopWidth: 1
  },
  qtyWrap: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1
  },
  qtyDropdown: {
    justifyContent: "flex-end",
    flexDirection: "row",
    width: 170,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    marginRight: 10
  },
  qtyStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    justifyContent: "flex-start",
    flex: 1,
    marginLeft: 10
  },
  qtyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginHorizontal: 20,
    width: 30
  },
  shareWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20
  },
  shareInnerWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  shareTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000"
  },
  findStoreWrap: {
    marginBottom: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  findStore: {
    height: 45,
    width: 320,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    paddingVertical: 9
  },
  tabWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: "#000"
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000"
  },
  tabIcon: {
    marginRight: 15
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: "#000"
  },
  dropdownWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingRight: 10
  },
  dropdownTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  dropdownStyle: {
    width: 100,
    paddingVertical: 3
  },
  fixedWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  addToCartText: {
    color: "#fff",
    fontSize: 22
  }
});
