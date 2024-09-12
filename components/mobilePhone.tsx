import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  description: undefined;
};

type MobilePhoneScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "description"
>;

type Props = {
  navigation: MobilePhoneScreenNavigationProp;
};

const MobilePhone: React.FC<Props> = ({ navigation }) => {
  const [mobilePhone, setMobilePhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(true);
  const [telConfirm, setTelConfirm] = useState<string>("");

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{2})(\d{3})(\d{2})$/);
    if (match) {
      return `+${match[1]}-${match[2]}-${match[3]}-${match[4]}-${match[5]}`;
    }
    return cleaned;
  };

  const handleTextChange = (text: string) => {
    const formattedText = formatPhoneNumber(text);
    setMobilePhone(formattedText);
  };

  const handleTextCodeChange = (text: string) => {
    setTelConfirm(text);
  };

  const handleConfirm = () => {
    const cleanedNumber = mobilePhone.replace(/\D/g, "");
    if (cleanedNumber.length !== 12) {
      setError("must be a 12 digits");
    } else {
      setConfirm(false);
      setError("");
    }
  };

  const handleContinueToNextPage = () => {
    if (telConfirm === "1111") {
      navigation.navigate("description");
    } else {
      setError("wrong code");
    }
  };

  return (
    <View style={styles.container}>
      {confirm ? (
        <>
          <View style={styles.containerInput}>
            <TextInput
              placeholder="+380-xx-xx-xxx-xx"
              style={styles.textInput}
              value={mobilePhone}
              onChangeText={handleTextChange}
              keyboardType="numeric"
              maxLength={12}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSignUp}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Go back</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.containerInput}>
            <Text style={styles.textCode}>Write a Code</Text>
            <TextInput
              placeholder="xxxx"
              style={styles.textInput}
              value={telConfirm}
              onChangeText={handleTextCodeChange}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={handleContinueToNextPage}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

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
    marginBottom: 10,
  },
  textCode: {
    fontSize: 24,
  },
});

export default MobilePhone;
