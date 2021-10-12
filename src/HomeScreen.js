import React, { useEffect, useState, useRef } from "react";
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
  PermissionsAndroid,
  AppState,
} from "react-native";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import RNSimData from "react-native-sim-data";
import { useNavigation } from "@react-navigation/native";
import NotificationModal from "./NotificationModal";

const { width, height } = Dimensions.get("window");
export default HomeScreen = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [modalVisible, setModalVisible] = useState("");
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigation = useNavigation();

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage
      );
      //
    });
    
    messaging().getToken((token) => {
      console.log(token, "token");
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.data
          );
          navigation.navigate(remoteMessage.data.type);
        }
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("FCM Message Data:", remoteMessage);
      setTitle(remoteMessage.notification.title);
      setBody(remoteMessage.notification.body);
      setModalVisible(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });
    return () => {
      subscription.remove();
    };
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
      <NotificationModal
        modalVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        title={title}
        body={body}
      />
      <Text>Home Screen</Text>
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
          console.log("caa");
          setModalVisible(true);
          // getPermissions();
          // onClickNotify(
          //   "Hey , Manohar Kharvi",
          //   "How are you",
          //   "https://brandlogovector.com/wp-content/uploads/2021/02/Swiggy-Logo.png"
          // );
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Get permissions
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
