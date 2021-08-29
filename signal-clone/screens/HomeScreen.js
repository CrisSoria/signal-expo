import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView /* es para que no se toquen accidentalmente los bordes a cada rato */,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIconsj } from "@expo/vector-icons";

import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const singOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          //doc.id && doc.data() son los datos de firebase firestone database
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      // headerTitleStyle: { color: "#000" }, no funca uso lo de abajo
      headerTintColor: "black",
      headerLeft: () => (
        //si hay alguien logiado poner su foto a un costado del home
        // console.log(" la imagen es ", auth?.currentUser?.photoURL);
        <View>
          <TouchableOpacity onPress={singOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={singOutUser} activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
