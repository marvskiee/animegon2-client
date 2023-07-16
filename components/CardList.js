import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { colors } from "../config/colors";
import { TouchableOpacity } from "react-native";
const { width } = Dimensions.get("screen");

const CardList = (props) => {
  const { data, title } = props;
  const scrollX = useRef(new Animated.Value(0)).current;

  const card_size = { width: width / 3, height: width / 3 + 50 };

  const infoHandler = async (item) => {
    await props.navigation.push("info_page", {
      item,
    });
  };
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text style={styles.title}>{title}</Text>
      <Animated.FlatList
        horizontal
        keyExtractor={(item) =>
          `${title}-${item?.id}-${Math.floor(Math.random() * 100000)}`
        }
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        // pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],

          { useNativeDriver: false }
        )}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => infoHandler(item)}
            >
              <View
                style={{
                  borderRadius: 10,
                  minWidth: card_size.width,
                  maxWidth: card_size.width,
                  margin: 5,
                  marginLeft: index == 0 ? 0 : 5,
                }}
              >
                <View
                  style={{
                    position: "relative",
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "cover",
                      borderRadius: 7,
                      height: card_size.height,
                      width: card_size.width,
                      maxWidth: card_size.width,
                      maxHeight: card_size.height,
                    }}
                    source={{ uri: item?.image }}
                  />
                  {item?.episodeNumber && (
                    <Text
                      style={{
                        borderRadius: 7,
                        fontFamily: "montserrat_bold",
                        position: "absolute",
                        minWidth: card_size.width,
                        backgroundColor: colors.episode_card,
                        color: colors.white,
                        padding: 10,
                        fontSize: width * 0.03,
                        paddingVertical: 5,
                        bottom: 0,
                        textAlign: "center",
                        zIndex: 1,
                      }}
                    >
                      Episode {item?.episodeNumber}
                    </Text>
                  )}
                </View>
                <Text numberOfLines={2} style={styles.card_title}>
                  {item?.title?.english || item?.title?.userPreferred}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat_bold",
    color: colors.white,
    fontSize: 0.045 * width,
    paddingBottom: 15,
  },
  card_title: {
    paddingVertical: 10,
    fontFamily: "montserrat_medium",
    color: colors.white,
    fontSize: 0.035 * width,
    textAlign: "center",
  },
});
