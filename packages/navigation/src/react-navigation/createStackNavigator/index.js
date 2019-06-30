import { createStackNavigator as RNcreateStackNavigator } from "react-navigation-stack";
import { I18nManager, Easing, Animated, StyleSheet } from "react-native";

export default function createStackNavigator(routeConfigMap, stackConfig = {}) {
  function transitionConfig() {
    return {
      transitionSpec: {
        duration: 400,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;
        const width = (I18nManager.isRTL ? -1 : 1) * layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        });

        return {
          transform: [{ translateX }],
        };
      },
    };
  }
  stackConfig.cardStyle = {
    ...StyleSheet.absoluteFillObject,
    ...stackConfig.cardStyle,
  };
  stackConfig.transitionConfig = stackConfig.transitionConfig
    ? stackConfig.transitionConfig
    : transitionConfig;
  return RNcreateStackNavigator(routeConfigMap, {
    transitionConfig,
  });
}
