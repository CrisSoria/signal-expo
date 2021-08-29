import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //cuando  se monte el componente
  useEffect(() => {
    //es un event listener
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //replace porque no quiero que esté la opcion de regresar
        navigation.replace("Home");
      }
    });
    return unsuscribe;
  }, []);

  const signIn = () => {
    //en el useEffect de arriba ya trato con el usuario asi que aqui ya no me hace falta usar la respuesta de la promesa
    auth.signInWithEmailAndPassword(email, password).catch((e) => Alert(e));
  };

  return (
    <KeyboardAvoidingView behavior="padding " style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://blog.mozilla.org/internetCitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autofocus
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="Email"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      {/* containerStyle en vez de style por ser un react-elrmrnt */}
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() =>
          navigation.navigate(
            "Register" /* es el nombre que le puse a la screen */
          )
        }
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
