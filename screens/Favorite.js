import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import { colors } from "../config/colors";
import { BackSvg } from "../components/svg";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { connect } from "react-redux";
import { common_styles } from "../config/externalstyles";
const { width } = Dimensions.get("screen");

const Favorite = (props) => {
  const card_size = { width: (width - 40) / 3, height: width / 3 + 50 };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.goBack()}
        >
          <View style={styles.navigation}>
            <BackSvg />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={[
              styles.header_title,
              {
                backgroundColor: "rgba(0,0,0,.4)",
                borderRadius: 100,
                padding: 15,
                paddingVertical: 5,
                borderRadius: 100,
              },
            ]}
          >
            My Favorites
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            paddingTop: 60,
            paddingBottom: 30,
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 5,
          }}
        >
          {props?.favorites?.length > 0 ? (
            props?.favorites?.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.push("info_page", {
                    item,
                  })
                }
              >
                <View
                  style={{
                    width: card_size.width,
                    maxWidth: card_size.width,
                    margin: 5,
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "cover",
                      borderRadius: 7,
                      height: card_size.height,
                    }}
                    source={{ uri: item.image }}
                  />
                  <Text numberOfLines={2} style={styles.simple_text}>
                    {item?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={[
                styles.simple_text,
                {
                  width,
                  fontSize: 15,
                },
              ]}
            >
              There's no data loaded.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  return {
    favorites: state.favorite.favorite,
  };
};

export default connect(mapStateToProps, {})(Favorite);

const styles = StyleSheet.create({
  ...common_styles({ width }),

  header_title: {
    textAlign: "center",
    fontFamily: "montserrat_bold",
    fontSize: 25,
    color: colors.white,
  },
});
