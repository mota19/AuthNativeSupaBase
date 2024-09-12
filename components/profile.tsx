import { View, Text, StyleSheet } from "react-native";

const Profile: React.FC = () => {
  return (
    <View>
      <Text>You entered in acc</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
