import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { colors } from "../config/colors";
import { bg_text } from "../var";
const { width, height } = Dimensions.get("screen");
const Landing = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.bg}>
        <Text style={styles.bg_text}>{bg_text}</Text>
      </View>
      <View style={styles.note_reminder_card}>
        <Text style={styles.note_reminder_text}>
          This application is not profitable. It is for entertainment purposes
          only.
        </Text>
      </View>

      <View style={styles.bottom_wrapper}>
        {/* phone display  */}
        <View style={styles.phone}>
          <Image
            style={{
              width: width - 100,
              height: 200,
              resizeMode: "contain",
            }}
            source={require("../assets/images/landing.jpg")}
          />
        </View>
        <Text style={styles.logo_text}>
          ANIME
          <Text style={[styles.logo_text, { color: colors.primary }]}>GON</Text>
        </Text>
        <Text style={styles.description}>
          is a mobile application that offers a vast and impressive selection of
          anime.
        </Text>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate("home_page")}
          >
            <Text style={styles.watch_btn}>Watch Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.credit_card}>
          <Image
            style={styles.credit}
            source={require("../assets/images/consumet_logo.png")}
          />
          <Image
            style={styles.credit}
            source={require("../assets/images/marubi_logo.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: colors.black,
    flex: 1,
    alignItems: "center",
  },
  note_reminder_card: {
    width,
    top: 0,
    padding: 10,
    backgroundColor: colors.primary,
  },
  note_reminder_text: {
    flexDirection: "row",
    textAlign: "center",
    fontSize: height * 0.015,
    fontFamily: "montserrat_medium",
    color: colors.black,
  },
  phone: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo_text: {
    textAlign: "center",
    fontFamily: "montserrat_extrabold",
    fontSize: 0.1 * width,
    color: colors.white,
  },
  description: {
    textAlign: "center",
    fontFamily: "montserrat_medium",
    color: colors.white,
    paddingHorizontal: 0.05 * width,
    fontSize: 0.04 * width,
    // opacity: 0.8,
  },
  watch_btn: {
    padding: 10,
    paddingTop: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    fontFamily: "montserrat_bold",
    textAlign: "center",
    fontSize: 0.05 * width,
    color: colors.black,
    borderWidth: 4,
    backgroundColor: colors.primary,
    borderColor: "#208017",
  },

  credit: {
    width: width * 0.063,
    borderRadius: 100,
    height: width * 0.063,
    backgroundColor: colors.white,
  },
  credit_card: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  upper_wrapper: {
    flex: 0.1,
  },
  bottom_wrapper: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    position: "absolute",
    width: width * 2,
    transform: [{ scale: width * 0.005 }],
  },
  bg_text: {
    color: "#232020",
    transform: [{ rotate: "-17.51deg" }],
    fontFamily: "montserrat_extrabold",
    fontSize: width * 0.05,
  },
});
