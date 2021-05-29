import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import Inputs from "../components/Inputs";
import Submit from "../components/Submit";
import Toast from "react-native-toast-message";

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [loaderState, setLoaderState] = useState(false);

  const handleChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormState({ password: "", email: "" });
  };

  const onSubmit = () => {
    if (!formState.email || !formState.password) {
      return;
    }
    setLoaderState(true);
    fetch("http://192.168.1.7:4000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((res) => res.json())
      .catch((error) => {
        Toast.show({
          type: "error",
          position: "top",
          text1: `${error.massage}`,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 20,
          bottomOffset: 40,
          onShow: () => {},
          onHide: () => {},
          onPress: () => {},
        });
      })
      .then((response) => {
        console.log(response);
        Toast.show({
          type: "success",
          position: "top",
          text1: `Welcome Back, ${response.fullName}`,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 20,
          bottomOffset: 40,
          onShow: () => {
            props.navigation.navigate("Advertisement");
          },
          onHide: () => {
            setLoaderState(false);
            setFormState();
            props.navigation.navigate("Advertisement");
          },
          onPress: () => {
            setLoaderState(false);
            resetForm();
            props.navigation.navigate("Advertisement");
          },
        });
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/login.png")}
          resizeMode="center"
          style={styles.image}
        />
        <Text style={{ ...FONTS.h1, ...styles.textTitle }}>Welcome Back</Text>
        <Text style={styles.textBody}>Log in to your existant account</Text>
        <Inputs
          name="email"
          placeholder="Email"
          icon="person"
          onChangeInput={handleChange}
          iconSize={SIZES.icons}
          iconColor={COLORS.gray}
        />
        <Inputs
          placeholder="Password"
          name="password"
          icon="lock"
          pass={true}
          onChangeInput={handleChange}
          iconSize={SIZES.icons}
          iconColor={COLORS.gray}
        />
        <View style={{ width: "90%" }}>
          <Text style={[styles.textBody, { alignSelf: "flex-end" }]}>
            Forget Password?
          </Text>
        </View>
        <Submit
          color="#0148a4"
          title="LOG IN"
          loader={loaderState}
          onPress={onSubmit}
        />
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.textBody}>Don't Have an account</Text>
          <Text
            style={[styles.textBody, { color: "blue" }]}
            onPress={() => props.navigation.navigate("SignUp")}
          >
            {" "}
            Sign Up
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  image: {
    width: 350,
    height: 230,
    marginVertical: 10,
  },
  textTitle: {
    color: COLORS.black,
    fontWeight: "bold",
    marginVertical: 10,
  },
  textBody: {
    marginBottom: 10,
    fontSize: 16,
  },
});
export default Login;
