import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import axios_config from "../config/axios_config";
import { colors } from "../config/colors";
import { common_styles } from "../config/externalstyles";
import { BackSvg, CastSvg } from "../components/svg";
import { setFavorites } from "../redux";
import { connect } from "react-redux";
import { ToastAndroid } from "react-native";
import { badges } from "../var";
import { FlatList } from "react-native";
import WebView from "react-native-webview";

const { width, height } = Dimensions.get("screen");
const Watch = (props) => {
  const [player, setPlayer] = useState({
    image: null,
    video: null,
    quality: null,
    episode_number: null,
  });
  const [error, setError] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [watchData, setWatchData] = useState(null);

  const load = async (id) => {
    let count = 0;
    await axios_config
      .get("info/" + id)
      .then(async (res) => {
        count += 1;
        let sorted = res.data?.episodes.sort((a, b) => {
          if (a.number < b.number) return 1;
          if (a.number > b.number) return -1;
          return 0;
        });
        setAnimeInfo(res.data);
        console.log("ANIMEINFO:", res.data.episodes);
        setPlayer({
          ...player,
          image: sorted[0]?.image,
          episode_number: sorted[0]?.number,
        });

        watchHandler(sorted[0]);
      })
      .catch((e) => {
        if (e?.message != "Network Error") {
          setError(1);
        } else {
          setError(2);
        }
      });

    setTimeout(() => {
      if (count != 1) {
        setError(true);
      }
    }, 3000);
  };
  const watchHandler = async (item) => {
    if (player?.episode_number != item?.number) {
      setPlayer({ image: null, video: null });
      setWatchData(null);
      await axios_config
        .get("watch/" + item?.id)
        .then((res) => {
          setWatchData(res.data);
          setPlayer({
            image: item?.image,
            video: res.data?.sources[0].url,
            quality: res.data?.sources[0].quality,
            episode_number: item?.number,
          });
        })
        .catch((e) => {
          if (e?.message != "Network Error") {
            setError(1);
          } else {
            setError(2);
          }
          console.log(e);
        });
    }
  };
  useEffect(() => {
    const data = props.route.params?.item;
    load(data.id);
  }, []);
  const WatchHeader = () => {
    return (
      <View style={{ backgroundColor: colors.black }}>
        <View
          style={{
            paddingTop: 60,
          }}
        />
        {player.video == null && player.image == null ? (
          <View
            style={{
              width,
              aspectRatio: 16 / 9,
              backgroundColor: colors.black,
            }}
          />
        ) : (
          // <></>
          <WebView
            scrollEnabled={false}
            style={{ width, aspectRatio: 16 / 9 }}
            source={{
              uri: `https://marvskiee.github.io/my_player/?video_source=${player?.video}&poster_source=${player?.image}`,
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/517.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/517.36",
              },
            }}
            allowsFullscreenVideo={true}
          />
        )}
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>
              {player?.episode_number != null
                ? `Episode ${player?.episode_number}`
                : "Now Loading..."}
            </Text>

            {animeInfo?.rating && (
              <Text style={styles.ratings_text}>
                Ratings:{" "}
                <Text style={{ color: colors.primary }}>
                  {animeInfo?.rating}%
                </Text>
              </Text>
            )}
          </View>
          <Text numberOfLines={2} style={styles.title}>
            {animeInfo?.title?.english || animeInfo?.title?.romaji}
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {badges?.map((keys, index) => (
              <Text style={styles.badge} key={index}>
                {animeInfo[keys]}
                {"duration" == keys ? "mins" : ""}
              </Text>
            ))}
          </View>
        </View>
        <Text style={[styles.label, { paddingHorizontal: 10 }]}>Quality</Text>

        <View
          style={{
            width,
            padding: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {watchData?.sources?.length > 0 ? (
            watchData?.sources?.map((item, key) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={key}
                onPress={() =>
                  setPlayer({
                    ...player,
                    video: item?.url,
                    quality: item?.quality,
                  })
                }
              >
                <Text
                  style={[
                    styles.quality_text,
                    {
                      fontSize: 15,
                    },
                    ...[
                      item?.quality == player?.quality && {
                        backgroundColor: colors.primary,
                        color: colors.black,
                      },
                    ],
                  ]}
                >
                  {item?.quality}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.label}>Now Loading...</Text>
          )}
        </View>
        <Text style={[styles.label, { paddingHorizontal: 10 }]}>
          Other Episode's
        </Text>
      </View>
    );
  };
  const EpisodeCard = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => watchHandler(item)}>
        <View style={{ flexDirection: "row", gap: 10, padding: 10 }}>
          <Image style={styles.episode_image} source={{ uri: item?.image }} />
          <View style={{}}>
            <Text style={styles.episode_number}>Episode {item?.number}</Text>
            <Text
              numberOfLines={3}
              style={[styles.episode_title, { width: (width - 20) * 0.6 }]}
            >
              {item?.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {animeInfo ? (
        <>
          <View
            style={styles.header}
            x={10}
            colors={["rgba(0,0,0,0)", "transparent"]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => props.navigation.goBack()}
            >
              <View style={styles.navigation}>
                <BackSvg />
              </View>
            </TouchableOpacity>
            <View style={{ gap: 10, flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  ToastAndroid.show(
                    "This feature will implemented soon.",
                    ToastAndroid.SHORT
                  );
                }}
              >
                <View style={styles.navigation}>
                  <CastSvg />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            maxToRenderPerBatch={5}
            // initialNumToRender={5}
            stickyHeaderIndices={[0]}
            overScrollMode="never"
            keyExtractor={(item) => item?.id}
            nestedScrollEnabled={true}
            data={animeInfo?.episodes}
            ListHeaderComponent={<WatchHeader />}
            renderItem={({ item }) => <EpisodeCard item={item} />}
          />
        </>
      ) : (
        <View style={styles.error_card}>
          {error > 0 ? (
            <View>
              {error == 1 ? (
                <>
                  <Text style={styles.simple_text}>
                    Sorry but server is too busy as of now.{"\n"} Try again
                    after 1 minute!
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => props.navigation.goBack()}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={[
                          styles.episode_text,
                          { fontSize: 15, marginTop: 10 },
                        ]}
                      >
                        Go Back
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={[styles.simple_text, { margin: 30 }]}>
                    Something went wrong. Please make sure you are connected to
                    the internet.
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
                </>
              )}
            </View>
          ) : (
            <Text style={styles.simple_text}>Fetching Data. Please Wait.</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  return {
    favorite: state.favorite.favorite,
  };
};

export default connect(mapStateToProps, { setFavorites })(Watch);

const styles = StyleSheet.create({
  ...common_styles({ width, height }),
  episode_image: {
    borderRadius: 10,
    width: width * 0.4,
    height: width * 0.25,
    resizeMode: "cover",
  },
  episode_number: {
    paddingVertical: 5,
    fontFamily: "smooch_extrabold",
    color: colors.white,
    borderRadius: 30,
    fontSize: 30,
    padding: 10,
  },
  episode_title: {
    fontFamily: "montserrat_bold",
    color: colors.white,
    opacity: 0.85,
    borderRadius: 30,
    padding: 10,
  },
  quality_text: {
    fontFamily: "montserrat_bold",
    color: colors.white,
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    textTransform: "capitalize",
    borderRadius: 10,
    backgroundColor: colors.lightgray,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
