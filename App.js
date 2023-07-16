import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Landing from "./screens/Landing";
import Home from "./screens/Home";
import Watch from "./screens/Watch";
import Favorite from "./screens/Favorite";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Info from "./screens/Info";
import Search from "./screens/Search";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [initialPage, setInitialPage] = useState("landing_page");
  const checkSession = async () => {
    try {
      const user_session = await AsyncStorage.getItem("user");
      if (Boolean(user_session)) {
        setInitialPage("home_page");
      } else {
        await AsyncStorage.setItem("user", "true");
        setInitialPage("landing_page");
      }
    } catch (e) {
      console.log("Warning Occur in App.js: " + e.message);
    }
  };
  useEffect(() => {
    const load = async () => {
      checkSession();
    };
    load();
  }, []);

  const [loaded] = useFonts({
    montserrat_bold: require("./assets/fonts/Montserrat-Bold.ttf"),
    montserrat_extrabold: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    montserrat_medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    smooch_extrabold: require("./assets/fonts/SmoochSans-ExtraBold.ttf"),
  });

  const Stack = createNativeStackNavigator();

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialPage}>
          <Stack.Screen
            name="landing_page"
            component={Landing}
            options={(props) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="home_page"
            component={Home}
            options={(props) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="watch_page"
            component={Watch}
            options={(props) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="favorite_page"
            component={Favorite}
            options={(props) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="info_page"
            component={Info}
            options={(props) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="search_page"
            component={Search}
            options={(props) => ({
              headerShown: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
