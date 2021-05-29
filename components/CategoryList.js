import React, { Component, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";

const CategoryList = (props) => {
  return (
    <View style={styles.container}>
      {props.categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => props.setCategoryIndex(index)}
        >
          <Text
            style={[
              styles.categoryText,
              props.catergoryIndex === index && styles.categoryTextSelected,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.primary,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
  },
});

export default CategoryList;
