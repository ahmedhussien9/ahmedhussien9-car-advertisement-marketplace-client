import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import { COLORS, FONTS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";

class Inputs extends Component {
  state = { isFocused: false };

  onFocusChange = () => {
    this.setState({ isFocused: true });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            borderColor: this.state.isFocused ? "#0779ef" : "#eee",
          },
        ]}
      >
        <Icon
          name={this.props.icon}
          size={this.props.iconSize}
          color={this.state.isFocused ? COLORS.primary : this.props.iconColor}
        ></Icon>
        <TextInput
          style={styles.input}
          placeholder={this.props.placeholder}
          name={this.props.name}
          onFocus={this.onFocusChange}
          secureTextEntry={this.props.pass}
          onChangeText={(val) => this.props.onChangeInput(this.props.name, val)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 100,
    marginHorizontal: 0,
    marginVertical: 8,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    flex: 1,
    color: COLORS.primary,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: "#0779e4",
    // paddingLeft: 5,
    fontSize: SIZES.inputSize,
  },
});

export default Inputs;
