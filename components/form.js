import React from "react";
import Button from "./Button";
import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function Form({ onClickAdd }) {
  const [inputValue, setInputValue] = useState("");
  const updateValue = (text) => {
    setInputValue(text);
  };

  const handlePress = () => {
    if (!inputValue) return false;
    onClickAdd(inputValue);
    setInputValue("");
  };
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={updateValue}
      />
      <Button text={"Add"} onPress={handlePress} />
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    gap: 10,
  },
  input: {
    padding: 10,
    height: 40,
    backgroundColor: "#fff",
    width: 250,
    borderRadius: 20,
    fontSize: 18,
  },
});
