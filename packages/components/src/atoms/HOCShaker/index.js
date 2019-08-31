import React, {
  memo,
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { Animated } from "react-native";
import { platform, vibrate } from "@react-cross/utility";

export const HOCShaker = WrappedComponent => {
  const AnimatedWrappedComponent = Animated.createAnimatedComponent(
    WrappedComponent,
  );
  const Shaker = ({ style, allowShake = false, ...props }, ref) => {
    const currentRef = useRef({ isMounted: false }).current;
    const shakeAnimate = useRef(new Animated.Value(0)).current;
    const shake = useCallback(({ wirhVibrate = true } = {}) => {
      shakeAnimate.setValue(0);
      Animated.spring(shakeAnimate, {
        toValue: 1,
        friction: 3,
        tension: 10,
        ...platform.select({
          web: {},
          default: {
            useNativeDriver: true,
          },
        }),
      }).start(() => {
        shakeAnimate.setValue(0);
      });
      wirhVibrate && vibrate.shock();
    }, []);
    useImperativeHandle(
      ref,
      () => ({
        shake,
      }),
      [],
    );
    const animatedStyle = useMemo(
      () => ({
        transform: [
          {
            translateX: shakeAnimate.interpolate({
              inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              outputRange: [0, 2, -3, 4, -4, 3, -3, 4, -5, 2, 0],
            }),
          },
        ],
      }),
      [shakeAnimate._value],
    );
    useEffect(() => {
      currentRef.isMounted && allowShake && shake();
      currentRef.isMounted = true;
    }, [allowShake]);
    useEffect(() => {
      return () => shakeAnimate.stopAnimation();
    }, []);
    return (
      <AnimatedWrappedComponent {...props} style={[animatedStyle, style]} />
    );
  };
  Shaker.displayName = `WrappedShake(${getDisplayName(WrappedComponent)})`;
  return memo(forwardRef(Shaker));
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
