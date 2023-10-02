import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Prompt({ question, item, handleYes, handleNo }) {
  return (
    <View style={styles.prompt}>
      <Text style={styles.text}>{question}</Text>
      <Text style={styles.text}>{item}</Text>
      <View style={styles.confirmation}>
        <Pressable style={styles.confirmation.button} onPress={handleYes}>
          <Text style={styles.confirmation.text}>Yes</Text>
        </Pressable>

        <Pressable style={styles.confirmation.button} onPress={handleNo}>
          <Text style={styles.confirmation.text}>No</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  prompt: {
    backgroundColor: "#25292e",
    position: "absolute",
    marginTop: 300,
    borderColor: "#fff",
    borderWidth: 1,
    height: 150,
    width: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  confirmation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
    position: "relative",
    button: {
      justifyContent: "center",
      borderWidth: 1,
      backgroundColor: "#fff",
      width: "50%",
      height: "100%",
    },
    text: {
      textAlign: "center",
      color: "#000",
      fontSize: 20,
    },
  },

  text: {
    color: "#fff",
    fontSize: 25,
  },
});
