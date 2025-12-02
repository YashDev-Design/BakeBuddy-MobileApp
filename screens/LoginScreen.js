import React, { useState } from "react";
import { account } from "../appwrite/config";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>BakeBuddy</Text>
      <Text style={styles.subtitle}>
        Freshly baked treats, just a tap away!
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8e8e8e"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8e8e8e"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            // Create Appwrite session
            await account.createEmailPasswordSession(email, password);

            alert("Login successful!");
            navigation.replace("MainTabs"); // Redirect to home
          } catch (error) {
            console.log(error);
            alert(error.message);
          }
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Navigation */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7f2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#d17b5f",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#a6785a",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e2c6b3",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#d17b5f",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    fontSize: 14,
    color: "#6e6e6e",
  },
  signupLink: {
    color: "#d17b5f",
    fontWeight: "bold",
  },
});
