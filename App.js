import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import Form from "./components/form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bucket from "./components/bucket";

const db = "Bucket-list-v-1.0.0";
export default function App() {
  const [list, setList] = useState([]);
  const [newItem, setNewitem] = useState(null);
  const [id, setId] = useState(0);
  const [ready, setReady] = useState(false);
  const storeData = async (value) => {
    value = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("testDb", value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("testDb");
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      // error reading value
      return false;
    }
  };

  function handleDelete(id) {
    let item = list.filter((item) => {
      return item.id != id;
    });
    setList(item);
  }
  function addToList(item) {
    setId(id + 1);
    let date = new Date();
    data = date.toLocaleDateString();
    let item1 = [{ text: item, id: id, date: date }];
    setList([...list, ...item1]);
  }

  useEffect(() => {
    async function fetchData() {
      let data = await getData();
      let { id, list } = data;
      setId(id);
      setList(list);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!newItem) return;
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
      {list && <Bucket array={list} handlePress={handleDelete} />}
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
    height: 100,
  },
});
