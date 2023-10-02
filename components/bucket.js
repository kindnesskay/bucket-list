import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
export default function Bucket({ array, handlePress }) {
  return (
    <ScrollView style={style.scrollView}>
      <View style={style.bucket}>
        {array.map((item) => {
          return (
            <BucketItem
              key={item.id}
              text={item.text}
              handlePress={() => {
                handlePress(item.id);
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

export function BucketItem({ text, handlePress }) {
  return (
    <Pressable style={style.bucketItem} onPress={handlePress}>
      <Text style={{ color: "#000", textAlign: "center", fontSize: 18 }}>
        {text}
      </Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  bucket: {
    width: "100%",
    padding: 10,
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  bucketItem: {
    flexGrow: 1,
    height: 50,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 5,
    minWidth: "40%",
    width: "auto",
    borderRadius: 20,
  },

  scrollView: {
    width: "100%",
    maxHeight: 300,
  },
});
