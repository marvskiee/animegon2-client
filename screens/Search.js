import { Image, Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import axios_config from "../config/axios_config";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { colors } from "../config/colors";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { BackSvg, SearchSvg } from "../components/svg";
import { Dimensions } from "react-native";
import { common_styles } from "../config/externalstyles";
const { width, height } = Dimensions.get("screen");
const Search = (props) => {
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef("");
  const pageRef = useRef(1);
  const dataRef = useRef();
  const searchHandler = async () => {
    let count = 0;
    Keyboard.dismiss();
    searchRef.current = searchText;
    setIsLoading(true);
    await axios_config
      .get(searchText.toLowerCase() + "?page=" + pageRef.current)
      .then((res) => {
        count = 1;
        dataRef.current = res?.data;
        setSearchData(res.data?.results);
      })
      .catch((e) => {
        setError(true);
        console.log("huy");
        console.log(e);
      });
    setIsLoading(false);
    setTimeout(() => {
      if (count != 1) {
        setError(true);
      }
    }, 5000);
  };
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
          <TextInput
            onChangeText={(e) => setSearchText(e)}
            placeholderTextColor={colors.white}
            style={styles.searchbar}
            placeholder="Search here"
          />
          <TouchableOpacity activeOpacity={0.7} onPress={searchHandler}>
            <View style={styles.search_btn}>
              <SearchSvg color={true} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{ padding: 30 }} /> */}
      {isLoading ? (
        <Text
          style={[
            styles.simple_text,
            {
              fontSize: 15,
              paddingTop: 60,
            },
          ]}
        >
          Searching in progress...
        </Text>
      ) : (
        <ScrollView>
          {error ? (
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
              <TouchableOpacity activeOpacity={0.6} onPress={searchHandler}>
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
            <>
              {searchData?.length > 0 && (
                <View style={{ paddingHorizontal: 10 }}>
                  <Text
                    style={[
                      styles.simple_text,
                      {
                        textAlign: "left",
                        marginTop: 60,
                        fontSize: 15,
                      },
                    ]}
                  >
                    Search: {searchRef.current}
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: 5,
                }}
              >
                {searchData?.map((item, index) => (
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
                        {item?.title?.english || item?.title?.userPreferred}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {dataRef.current?.currentPage > 1 && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      pageRef.current = pageRef.current - 1;
                      searchHandler();
                    }}
                  >
                    <Text style={styles.page_btn}>Prev</Text>
                  </TouchableOpacity>
                )}
                {dataRef.current?.hasNextPage && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      pageRef.current = pageRef.current + 1;
                      searchHandler();
                    }}
                  >
                    <Text style={styles.page_btn}>Next</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  ...common_styles({ width, height }),
  searchbar: {
    position: "relative",
    padding: 10,
    minWidth: width * 0.45,
    maxWidth: width * 0.45,
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    minHeight: 35,
    backgroundColor: colors.darkgray,
    fontFamily: "montserrat_medium",
    paddingRight: width * 0.1,
    color: colors.white,
  },
  search_btn: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    fontFamily: "montserrat_bold",
    padding: 5,
    borderTopRightRadius: 10,
    minHeight: 35,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primary,
  },
  page_btn: {
    backgroundColor: colors.primary,
    fontFamily: "montserrat_bold",
    fontSize: 15,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
});
