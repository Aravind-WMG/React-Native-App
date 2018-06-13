import React from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Easing, YellowBox } from 'react-native';
import { ProductMatricsComponent } from './app/components/ProductMatricsComponent';
import { ProductDetailComponent } from './app/components/ProductDetailComponent';
import { createStackNavigator } from 'react-navigation';



YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [{ translateX }] }
    },
  }
}

const AppNavigator = createStackNavigator({
  PMP: {
    screen: ProductMatricsComponent,
    navigationOptions: {
      header: null
    }
  },
  PDP: {
    screen: ProductDetailComponent,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteName: 'PMP',
    transitionConfig,
  }
);


