import React, { useState } from "react";
import { Button, Overlay } from "react-native-elements";

const OverlayComponent = (props) => {
  return (
    <View>
      <Overlay isVisible={props.visible} onBackdropPress={props.toggleOverlay}>
        <Text>Hello from Overlay!</Text>
      </Overlay>
    </View>
  );
};
