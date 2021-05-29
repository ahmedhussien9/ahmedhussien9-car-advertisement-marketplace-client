import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Inputs from "../components/Inputs";
import { COLORS, FONTS, cars, SIZES } from "../constants";
import { config } from "../config";
const width = Dimensions.get("window").width / 2 - 30;
const Advertisement = ({ navigation }) => {
  const categories = ["ALL", "FOR SALE", "FOR RENT", "OTHERS"];
  const carsData = cars;
  const [catergoryIndex, setCategoryIndex] = React.useState(0);
  const [loader, setLoaderState] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const _keyExtractor = (item, index) => item._id.toString();

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (name, value) => {
    fetchData(value);
  };

  async function fetchData(sellerFullName = "") {
    console.log(sellerFullName);
    try {
      const response = await fetch(
        `${config.baseUrl}items?seller=${sellerFullName}`
      );
      const json = await response.json();
      setItemsData(json.items);
      setLoaderState(false);
    } catch (e) {
      console.error(e);
    }
  }

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ car }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", car)}
      >
        <View style={styles.card}>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="favorite" size={18} />
            </View>
          </View>

          <View
            style={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: car.image }}
              style={{
                flex: 1,
                resizeMode: "contain",
                width: 150,
                height: 100,
              }}
            />
          </View>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              marginTop: 10,
              fontFamily: "Roboto-Regular",
              color: COLORS.black,
            }}
          >
            {car.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                fontFamily: "Roboto-Regular",
                color: COLORS.primary,
              }}
            >
              {car.seller[0].fullName}
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* 
           Start Header View
        */}
        <View>
          <Text style={{ ...FONTS.h2, ...styles.headerText }}>Welcome to</Text>
          <Text style={{ ...FONTS.h1, ...styles.headerTitle }}>Cars Shop</Text>
        </View>
      </View>
      {/* 
        END header view 
        */}

      <View style={styles.searchContainer}>
        <Inputs
          placeholder="Search"
          name="search"
          icon="search"
          onChangeInput={handleChange}
          iconSize={SIZES.largeIcon}
          iconColor={COLORS.black}
        />
      </View>

      <CategoryList />

      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={itemsData}
        renderItem={({ item }) => {
          return <Card car={item} />;
        }}
        keyExtractor={_keyExtractor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  headerText: {
    color: COLORS.black,
    fontWeight: "bold",
    marginTop: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  searchContainer: {
    marginTop: 20,
  },
  categoryText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },
  categoryTextSelected: {
    color: COLORS.primary,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
  },

  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});
export default Advertisement;
