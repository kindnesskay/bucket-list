import { StyleSheet } from "react-native";
import { Pressable, Text } from "react-native";
export default function Button({ text, onPress }) {
  return (
    <Pressable style={styles.input} onPress={onPress}>
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontWeight: 800,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 40,
    backgroundColor: "#f00",
    width: 250,
    borderRadius: 20,
  },
});
