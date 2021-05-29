import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const Submit = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.color }]}
      onPress={props.onPress}
    >
      {props.loader ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Text style={styles.submitText}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    borderColor: "blue",
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default Submit;
