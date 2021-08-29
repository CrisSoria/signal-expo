import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

// la prop navigation viene de haberlo wrappiado con <Stack.Navigator> en App.js
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // luego de que la pantalla se cargue (parecido a useEffect)
  /* useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "ABC", //no funca pero sería para cambiar el titulo de volver atras
    });
  }, [navigation]); */

  const register = () => {
    // console.log("register INICIO", email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "www.cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((e) => {
        alert(e);
        alert(e.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autofocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          // cuendo presione enter en el ultimo campo
          // onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
      {/* <View style={{ height: 100 }} /> */}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
