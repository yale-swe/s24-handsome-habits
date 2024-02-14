import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import Authentication from "./src/services/authentication";

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    const user = Authentication(response);
    if (user) console.log(user);
  }, [response]);

  return (
    <View style={styles.container}>
      <Text> This is yims.Welcome.Beware. </Text>
      <Text> Yims is a dangerous place. </Text>
      <Button title="Sign in with google" onPress={() => promptAsync()} />
      <Button title="Deleted saved users" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    alignItems: "center",
    justifyContent: "center",
  },
});
