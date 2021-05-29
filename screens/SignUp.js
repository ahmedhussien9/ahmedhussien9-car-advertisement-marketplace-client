import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import Input from "../components/Inputs";
import Submit from "../components/Submit";
import Toast from "react-native-toast-message";

const SignUp = (props) => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loaderState, setLoaderState] = useState(false);

  const handleChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    if (
      !formState.confirmPassword ||
      !formState.email ||
      !formState.password ||
      formState.fullName
    ) {
      return;
    }
    setLoaderState(true);
    if (formState.password !== formState.confirmPassword) {
      setFormState(false);
      alert("Please make sure that you entered same password");
      return;
    }
    fetch("http://192.168.1.7:4000/users/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((res) => res.json())
      .catch((error) => console.log("error", error))
      .then((response) => {
        Toast.show({
          type: "success",
          position: "top",
          text1: `Hello, ${response.user.fullName}`,
          text2: `${response.message}`,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 20,
          bottomOffset: 40,
          onShow: () => {
            setFormState(false);
          },
          onHide: () => {
            props.navigation.navigate("Login");
          },
          onPress: () => {
            props.navigation.navigate("Login");
          },
        });
      });
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/signup.png")}
          resizeMode="center"
          style={styles.image}
        />
        <Text style={{ ...FONTS.h1, ...styles.textTitle }}>
          Let's Get Started
        </Text>
        <Text style={styles.textBody}>
          Create an account to get all features
        </Text>
        <Input
          name="fullName"
          placeholder="Full Name"
          icon="person"
          onChangeInput={handleChange}
          iconSize={SIZES.icons}
          iconColor={COLORS.gray}
        />
        <Input
          name="email"
          placeholder="Email"
          onChangeInput={handleChange}
          icon="mail"
          iconSize={SIZES.icons}
          iconColor={COLORS.gray}
        />
        <Input
          name="password"
          onChangeInput={handleChange}
          placeholder="Password"
          iconSize={SIZES.icons}
          iconColor={COLORS.gray}
          icon="lock"
          pass={true}
        />
        <Input
          name="confirmPassword"
          onChangeInput={handleChange}
          placeholder="Confirm Password"
          iconSize={SIZES.icons}
          iconColor={COLORS.gray}
          icon="lock"
          pass={true}
        />
        <Submit
          color="#0148a4"
          title="CREATE"
          loader={loaderState}
          onPress={onSubmit}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textBody}>Already have an account </Text>
          <Text
            style={[styles.textBody, { color: "blue" }]}
            onPress={() => props.navigation.navigate("Login")}
          >
            Login here
          </Text>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 15,
  },
  image: {
    width: 300,
    height: 150,
    marginVertical: 10,
  },
  textTitle: {
    fontSize: SIZES.h1,
    color: COLORS.black,
    marginVertical: 5,
    fontWeight: "bold",
  },
  textBody: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SignUp;
