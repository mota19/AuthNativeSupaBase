import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { supabase } from "../lib/supabase";

type RootStackParamList = {
  mobilePhone: undefined;
  Profile: undefined;
};

type MobilePhoneScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "mobilePhone"
>;

type Props = {
  navigation: MobilePhoneScreenNavigationProp;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const confirmLogin = () => {
    signInWithEmail();
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setError("Invalid email or password");
      Alert.alert("Login Error", error.message);
    } else {
      navigation.navigate("Profile");
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="e-mail"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <TextInput
          placeholder="password"
          style={styles.textInput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        ></TextInput>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buttonLogin} onPress={confirmLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSignUp}
          onPress={() => navigation.navigate("mobilePhone")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
