import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import RadioButtonDemo from "./RadioButtonGender";

type RootStackParamList = {
  SignUp: undefined;
};

type DescriptionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

type Props = {
  navigation: DescriptionScreenNavigationProp;
};

const DescriptionInfo: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    secondName?: string;
    birthday?: string;
  }>({});

  const formatBirthday = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
    if (match) {
      return `${match[1]}/${match[2]}/${match[3]}`;
    }
    return cleaned;
  };

  const handleTextChange = (text: string) => {
    const formattedText = formatBirthday(text);
    setBirthday(formattedText);
  };

  const handleConfirm = () => {
    const newErrors: {
      firstName?: string;
      secondName?: string;
      birthday?: string;
    } = {};

    if (!firstName) {
      newErrors.firstName = "First Name is required.";
    }
    if (!secondName) {
      newErrors.secondName = "Second Name is required.";
    }
    if (!birthday) {
      newErrors.birthday = "Birth Date is required.";
    }
    if (
      birthday &&
      !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(birthday)
    ) {
      newErrors.birthday = "format dd/mm/yyyy";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      navigation.navigate("SignUp");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="First Name"
          style={styles.textInput}
          value={firstName}
          onChangeText={setFirstName}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}

        <TextInput
          placeholder="Second Name"
          style={styles.textInput}
          value={secondName}
          onChangeText={setSecondName}
        />
        {errors.secondName && (
          <Text style={styles.errorText}>{errors.secondName}</Text>
        )}

        <TextInput
          placeholder="Day of Birth"
          style={styles.textInput}
          value={birthday}
          onChangeText={handleTextChange}
          maxLength={8}
        />
        {errors.birthday && (
          <Text style={styles.errorText}>{errors.birthday}</Text>
        )}
        <RadioButtonDemo></RadioButtonDemo>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonLogin} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSignUp}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DescriptionInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  containerInput: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginTop: 20,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonLogin: {
    width: "80%",
    backgroundColor: "purple",
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonSignUp: {
    width: "80%",
    backgroundColor: "gray",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});
