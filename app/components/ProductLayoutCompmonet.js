import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  Alert,
  YellowBox,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Imageprogressive from "react-native-image-progress";
import ProgressBar from "react-native-progress/Bar";
import { sampleProductDetail } from "../data/DummyData";
import { Rating } from "react-native-elements";
import { NavigationActions } from "react-navigation";

export class ProductLayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: sampleProductDetail[0].product_details,
      dropDownValForFilter: this.props.dropDownValForFilter,
      navigation: this.props.nav1
    };
    // YellowBox.ignoreWarnings([
    //     'Warning: componentWillMount is deprecated',
    //     'Warning: componentWillReceiveProps is deprecated',
    // ]);
  }

  getItem(pdt_name) {
    const navigateAction = NavigationActions.navigate({
      routeName: "PDP",
      params: {
        title: pdt_name
      }
    });
    this.state.navigation.dispatch(navigateAction);
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
          marginVertical: 20
        }}
      />
    );
  };

  filterCall = () => {
    let localCopy = sampleProductDetail[0].product_details;
    if (
      this.state.dropDownValForFilter == "" ||
      this.state.dropDownValForFilter == "Show all"
    ) {
      this.setState({
        dataSource: localCopy
      });
    } else if (this.state.dropDownValForFilter == "Today Free Pickup") {
      let a = localCopy.filter(item => {
        return item.bopos == true;
      });
      this.setState({
        dataSource: a
      });
    } else if (this.state.dropDownValForFilter == "Ship to Store") {
      let b = localCopy.filter(item => {
        return item.boss == true;
      });
      this.setState({
        dataSource: b
      });
    } else if (this.state.dropDownValForFilter == "Ship to Home") {
      let c = localCopy.filter(item => {
        return item.ship == true;
      });
      this.setState({
        dataSource: c
      });
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.dropDownValForFilter !== state.dropDownValForFilter) {
      return {
        dropDownValForFilter: props.dropDownValForFilter
      };
    }
    return null;
  }

  colorChange = colorIndex => {
    console.log(colorIndex);
  };
  componentDidMount() {
    // return fetch(
    //   "https://r18-7-qa.lle-mcommerce.kohls.com/api/browse/v2/browse/product?skuCode=94343235",
    //   {
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //       "User-Agent":
    //         "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
    //       "x-correlation-id": "asfsef4243sdf",
    //       "x-channel": "android"
    //     },
    //     method: "GET", // *GET, POST, PUT, DELETE, etc.
    //   }
    // )
    //   .then(response => {
    //     console.log("got json" + response);
    //     response.json();
    //   })
    //   .then(responseJson => {
    //     console.log("Hey = "+responseJson);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // return fetch(
    //   "https://r18-7-qa.lle-mcommerce.kohls.com/api/browse/v2/browse/product?skuCode=94343235",
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "x-correlation-id": "sdfd234",
    //       "x-channel": "android"
    //     },
    //     method: "GET",
    //   }
    // )
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dropDownValForFilter !== this.state.dropDownValForFilter) {
      this.filterCall();
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.wrapper,
                index % 2 == 0 && {
                  borderRightWidth: 1,
                  borderRightColor: "#000"
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Imageprogressive
                  source={{ uri: item.pdt_image }}
                  indicator={ProgressBar.Pie}
                  indicatorProps={{
                    size: "large",
                    borderWidth: 0,
                    color: "rgba(150, 150, 150, 1)",
                    unfilledColor: "rgba(200, 200, 200, 0.2)"
                  }}
                  style={styles.imageView}
                />
                {/* <View style={{ flex: 1 }}>
                  <FlatList
                    data={item.color_tile}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <View>
                        <TouchableOpacity
                          onPress={this.colorChange.bind(this, index)}
                        >
                          <Imageprogressive
                            source={{ uri: item.color_preview }}
                            indicator={ProgressBar.Pie}
                            indicatorProps={{
                              size: "small",
                              borderWidth: 0,
                              color: "rgba(150, 150, 150, 1)",
                              unfilledColor: "rgba(200, 200, 200, 0.2)"
                            }}
                            style={styles.imagePreView}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View> */}
                <Text style={styles.salePrice}>Sale {item.sale_price}</Text>
                <Text style={styles.originalPrice}>Reg {item.reg_price}</Text>
                <Text
                  onPress={this.getItem.bind(this, item.pdt_name)}
                  style={styles.textView}
                >
                  {item.pdt_name}
                </Text>
                <View
                  style={{ flex: 1, flexDirection: "row", marginVertical: 6 }}
                >
                  <Rating imageSize={20} readonly startingValue={+item.star} />
                  <Text>({item.star_count})</Text>
                </View>
                <View>
                  {item.bopos && (
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#000"
                      }}
                    >
                      Today Free Pick up{" "}
                    </Text>
                  )}
                </View>
                <View>
                  {item.boss && (
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#000"
                      }}
                    >
                      Ship to store Free
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {
    width: 155,
    height: 155,
    margin: 7,
    borderRadius: 7
  },
  imagePreView: {
    width: 20,
    height: 20,
    marginRight: 3,
    marginVertical: 4
  },
  textView: {
    width: "100%",
    textAlign: "center",
    padding: 10,
    color: "#000"
  },
  salePrice: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "red"
  },
  originalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000"
  },
  wrapper: {
    flex: 1
  }
});
