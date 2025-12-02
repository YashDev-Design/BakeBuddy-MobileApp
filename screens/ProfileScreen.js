import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { account } from "../appwrite/config";

export default function ProfileScreen({ navigation }) {
  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      alert("Logged out!");

      // Do nothing else. App.js will handle redirect.
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff7f2",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#d17b5f",
  },
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: "#d17b5f",
    borderRadius: 12,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
