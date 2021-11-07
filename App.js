import React, { useRef } from "react";
import styled from "styled-components/native";
import { Animated, PanResponder, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00aaff;
`;

const AnimatedCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

export default function App() {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -320) {
          console.log("dismiss left");
          Animated.spring(position, {
            toValue: -500,
            useNativeDriver: true,
          }).start();
        } else if (dx > 320) {
          console.log("dismiss right");
          Animated.spring(position, {
            toValue: 500,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "clamp",
  });
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  return (
    <Container>
      <AnimatedCard
        {...panResponder.panHandlers}
        style={{
          transform: [
            { scale },
            { translateX: position },
            { rotateZ: rotation },
          ],
        }}
      >
        <Ionicons name="pizza" color="tomato" size={98} />
      </AnimatedCard>
    </Container>
  );
}
