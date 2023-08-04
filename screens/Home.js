import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import axios_config from "../config/axios_config";
import CardList from "../components/CardList";
import { TouchableOpacity } from "react-native";
import { SearchSvg } from "../components/svg";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import { HeartListSvg } from "../components/svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { setFavorites } from "../redux";
import { common_styles } from "../config/externalstyles";

const { width, height } = Dimensions.get("screen");
const carousel_height = height - 250;

const Home = (props) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselData, setCarouselData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [recentEpisodes, setRecentEpisodes] = useState([]);
  const [popular, setPopular] = useState([]);
  const slidesRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const getFavoriteFromStorage = async () => {
    try {
      const favoriteStorage = await AsyncStorage.getItem("favorite_storage");

      if (favoriteStorage !== null) {
        let stored = JSON.parse(favoriteStorage);
        props.setFavorites([...stored]);
      }
    } catch (e) {
      console.log("Warning get in Home.js: " + e.message);
    }
  };

  const watchHandler = async (item) => {
    props.navigation.navigate({
      name: `watch_page`,
      params: { item },
      merge: true,
    });
  };
  const load = async () => {
    setIsLoading(true);
    setHasError(false);
    let count = 0;
    await axios_config
      .get("trending")
      .then((res) => {
        count += 1;
        setCarouselData(res.data?.results);
      })
      .catch((e) => {
        setHasError(true);
        console.log(e);
      });
    await axios_config
      .get("trending?page=2")
      .then((res) => {
        count += 1;
        setTrendingData(res.data?.results);
      })
      .catch((e) => {
        setHasError(true);
        console.log(e);
      });
    await axios_config
      .get("recent-episodes")
      .then((res) => {
        {
          count += 1;
          setRecentEpisodes(res.data?.results);
        }
      })
      .catch((e) => {
        setHasError(true);
        console.log(e);
      });
    await axios_config
      .get("popular")
      .then((res) => {
        count += 1;
        setPopular(res.data?.results);
      })
      .catch((e) => {
        setHasError(true);
        console.log(e);
      });
    setIsLoading(false);
    console.log(count)
    setTimeout(() => {
      if (count != 4) {
        setHasError(true);
      }
    }, 5000);
  };
  useEffect(() => {
    getFavoriteFromStorage();
    load();
  }, []);

  const Indicator = ({ scrollX, scrollTo }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            width,
            marginVertical: 10,
            marginBottom: 18,
          }}
        >
          {carouselData.map((_, i) => {
            const inputRange = [
              (i - 2) * width,
              (i - 1) * width,
              i * width,
              (i + 1) * width,
              (i + 2) * width,
            ];

            const color = scrollX.interpolate({
              inputRange,
              outputRange: [
                colors.lightgray,
                colors.lightgray,
                colors.primary,
                colors.lightgray,
                colors.lightgray,
              ],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [7, 7, 21, 7, 7],
              extrapolate: "clamp",
            });
            return (
              <View
                key={`indicator-${i}`}
                // style={styles.home.indicatorContainer}
              >
                <TouchableOpacity
                  onPress={() => {
                    scrollTo(i);
                  }}
                >
                  <Animated.View
                    style={{
                      backgroundColor: color,
                      borderRadius: 5,
                      height: 7,
                      width: scale,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <LinearGradient
        x={10}
        style={styles.header}
        colors={["rgba(0,0,0,0)", "transparent"]}
      >
        <View style={{ gap: 10, flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate("search_page")}
          >
            <View style={styles.navigation}>
              <SearchSvg />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate("favorite_page")}
          >
            <View style={styles.navigation}>
              <HeartListSvg />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.logo_text,
            {
              backgroundColor: "rgba(0,0,0,.4)",
              padding: 15,
              paddingVertical: 5,
              borderRadius: 100,
            },
          ]}
        >
          ANIME
          <Text style={[styles.logo_text, { color: colors.primary }]}>GON</Text>
        </Text>
      </LinearGradient>

      {isLoading ? (
        <View
          style={{
            height: height - 100,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 40,
          }}
        >
          <Text
            style={[
              styles.simple_text,
              {
                fontSize: 15,
                paddingTop: 60,
              },
            ]}
          >
            This takes some time to load.
          </Text>
        </View>
      ) : (
        <>
          {hasError ? (
            <View
              style={{
                height: height - 100,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 40,
              }}
            >
              <Text style={[styles.simple_text, { paddingTop: 60 }]}>
                Something went wrong. Please make sure you are connected to the
                internet.
              </Text>
              <TouchableOpacity activeOpacity={0.6} onPress={load}>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={[
                      styles.episode_text,
                      { fontSize: 15, marginTop: 10 },
                    ]}
                  >
                    Reload
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView>
              <Animated.FlatList
                ref={slidesRef}
                data={carouselData}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                showsHorizontalScrollIndicator={false}
                // keyExtractor={(item) => index}
                pagingEnabled
                renderItem={({ item }) => {
                  return (
                    <View style={styles.carousel}>
                      <View>
                        <Image
                          blurRadius={2}
                          resizeMode="cover"
                          style={{
                            position: "absolute",
                            zIndex: 0,
                            width: width,
                            height: carousel_height,
                          }}
                          source={{ uri: item?.image }}
                        />
                        <Image
                          style={{
                            width: width,
                            resizeMode: "contain",
                            height: carousel_height,
                          }}
                          source={{ uri: item?.image }}
                        />
                      </View>
                      <LinearGradient
                        x={10}
                        style={styles.gradient}
                        colors={["transparent", colors.black]}
                      />
                      <View style={styles.card_image}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => watchHandler(item)}
                        >
                          <View style={styles.play_btn}>
                            <Image
                              source={require("../assets/images/play.png")}
                              style={{
                                width: width * 0.05,
                                height: width * 0.05,
                                margin: 25,
                                resizeMode: "contain",
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          padding: 10,
                          zIndex: 2,
                          width,
                          position: "absolute",
                          bottom: 0,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.episode_text}>
                            Episode Aired: {item?.totalEpisodes}
                          </Text>
                          {item?.rating && (
                            <Text style={styles.ratings_text}>
                              Ratings:{" "}
                              <Text style={{ color: colors.primary }}>
                                {item?.rating}%
                              </Text>
                            </Text>
                          )}
                        </View>
                        <Text numberOfLines={2} style={styles.title}>
                          {item?.title?.english || item?.title?.userPreferred}
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 10,
                          }}
                        >
                          {item?.genres.map((i, _) => (
                            <Text style={styles.badge} key={_}>
                              {i}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
              <Indicator
                scrollTo={(id) =>
                  slidesRef.current.scrollToIndex({ index: id })
                }
                scrollX={scrollX}
              />
              <CardList
                title="Recently Released Anime"
                data={recentEpisodes}
                {...props}
              />
              <CardList title="Popular Anime" data={popular} {...props} />
              <CardList title="Trending Anime" data={trendingData} {...props} />
              <View
                style={{
                  padding: 15,
                }}
              />
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default connect(null, { setFavorites })(Home);

const styles = StyleSheet.create({
  ...common_styles({ width, carousel_height }),
  logo_text: {
    textAlign: "center",
    fontFamily: "montserrat_extrabold",
    fontSize: 25,
    color: colors.white,
  },
});
