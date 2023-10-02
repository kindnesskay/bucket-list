import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import Form from "./components/form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bucket from "./components/bucket";
import Prompt from "./components/prompt";
const db = "Bucket-list-v-1.0.0";
export default function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState(null);
  const [id, setId] = useState(1);
  const [showPrompt, setShowPrompt] = useState(false);

  const storeData = async (value) => {
    value = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("testDb", value);
    } catch (e) {
      // saving error
      console.log("an error occured");
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("testDb");
      if (value === null) return { error: "no items in database" };
      return JSON.parse(value);
    } catch (e) {
      // error reading value
      return false;
    }
  };
  function handleClick(id) {
    let selected_item = list.filter((value) => {
      return value.id == id;
    });
    setItem(selected_item[0]);
    setShowPrompt(true);
  }
  function handleDelete() {
    let items = list.filter((value) => {
      return value.id != item.id;
    });
    setList(items);
    setItem(null);
  }
  function addToList(item) {
    setId(id + 1);
    let date = new Date();
    data = date.toLocaleDateString();
    let item1 = [{ text: item, id: id, date: date }];
    console.log(item1);
    console.log(list);
    setList([...list, ...item1]);
    setItem(item1);
    setShowPrompt(false);
  }

  useEffect(() => {
    async function fetchData() {
      let data = await getData();
      if (data.error) return setList([]);
      setId(data.id);
      setList(data.list);
    }
    fetchData();
  }, []);

  function handleNo() {
    setItem(null);
  }

  useEffect(() => {
    if (!item) return;
    async function sendData() {
      await storeData({ id: id, list: list });
    }
    sendData();
  }, [list]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={{ color: "#FFF", fontSize: 20, fontWeight: 900 }}>
          Add To bucket list
        </Text>
      </View>
      <Form onClickAdd={addToList} />
      {list && <Bucket array={list} handlePress={handleClick} />}
      {item && showPrompt && (
        <Prompt
          question={"Delete"}
          item={item.text}
          handleNo={handleNo}
          handleYes={handleDelete}
        />
      )}
      <View style={styles.bucket}></View>

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    gap: 5,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  top: {
    display: "flex",
    justifyContent: "center",
    height: 50,
  },
});
