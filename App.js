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
  PermissionsAndroid,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notification from "./src/Notification";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get("window");
export default App = () => {
  const [initialRoute, setInitialRoute] = useState("Home");

  // const navigation = useNavigation();

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
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "600",
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//   },
//   highlight: {
//     fontWeight: "700",
//   },
// });
