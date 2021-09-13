import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";

import messaging from "@react-native-firebase/messaging";

const { width, height } = Dimensions.get("window");
export default App = () => {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onClickNotify = (title = "", body = "", imageUrl = "") => {
    if (title && body)
      fetch("https://fedb-157-45-0-78.ngrok.io/notifications", {
        method: "POST",
        body: JSON.stringify({
          token,
          title,
          body,
          imageUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("sent successfully", data);
        })
        .catch((err) => {
          console.log("err==>", err);
        });
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
        setToken(token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView
      style={[
        backgroundStyle,
        {
          justifyContent: "center",
          alignItems: "center",
          width,
          height,
          backgroundColor: "white",
          marginTop: Platform.OS === "android" ? 10 : 0,
        },
      ]}
    >
      <View
        style={{
          width,
          height: height * 0.7,
          backgroundColor: "white",
        }}
      >
        <TextInput
          style={{
            width: width * 0.9,
            height: 40,
            margin: 12,
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Enter Title"
          placeholderTextColor="black"
          onChangeText={(text) => {
            setTitle(text);
            console.log("tex", text);
          }}
          value={title}
        ></TextInput>
        <TextInput
          style={{
            width: width * 0.9,
            height: 40,
            margin: 12,
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Enter Body"
          placeholderTextColor="black"
          onChangeText={(text) => {
            setBody(text);
          }}
          value={body}
        ></TextInput>
        <Text
          style={{
            marginLeft: 20,
            color: "grey",
          }}
        >
          ( Optional)
        </Text>
        <TextInput
          style={{
            width: width * 0.9,
            height: 40,
            margin: 12,
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Enter Image Url"
          placeholderTextColor="black"
          onChangeText={(text) => {
            setImageUrl(text);
          }}
          value={imageUrl}
        ></TextInput>
      </View>
      <Pressable
        style={{
          height: 40,
          width: 200,
          backgroundColor: "dodgerblue",
          elevation: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        android_ripple={{
          color: "lightgrey",
          borderRadius: 10,
        }}
        onPress={() => {
          onClickNotify(
            "Hey , Manohar Kharvi",
            "How are you",
            "https://brandlogovector.com/wp-content/uploads/2021/02/Swiggy-Logo.png"
          );
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Notify Me
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
