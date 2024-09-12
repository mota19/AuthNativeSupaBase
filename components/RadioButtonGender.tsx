import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const RadioButtonDemo: React.FC = () => {
  const [selected, setSelected] = useState("");
  const options = ["male", "female"];
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text>Select your gender</Text>
        {options.map((option) => {
          return (
            <TouchableOpacity
              key={option}
              style={styles.singleOptionContainer}
              onPress={() => setSelected(option)}
            >
              <View style={styles.outerCircle}>
                {selected === option ? (
                  <View style={styles.innerCircle} />
                ) : null}
              </View>
              <Text>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default RadioButtonDemo;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  questionContainer: {
    width: "100%",
  },
  singleOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    margin: 5,
  },
  outerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "blue",
  },
});
