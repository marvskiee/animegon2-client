import { colors } from "./colors";

export const common_styles = (data) => {
  let width = data?.width || 0;
  let carousel_height = data?.carousel_height || 0;

  return {
    title: {
      color: colors.white,
      fontFamily: "smooch_extrabold",
      fontSize: 40,
      paddingBottom: 5,
    },
    container: {
      position: "relative",
      flex: 1,
      backgroundColor: colors.black,
    },
    badge: {
      textTransform: "capitalize",
      fontSize: 14,
      paddingVertical: 5,
      fontFamily: "montserrat_bold",
      backgroundColor: colors.badge_color,
      borderRadius: 30,
      padding: 10,
      paddingVertical: 4,
    },
    gradient: {
      width,
      zIndex: 1,
      position: "absolute",
      top: 200,
      left: 0,
      height: carousel_height - 200,
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      width,
      zIndex: 1,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    navigation: {
      borderRadius: 50,
      padding: 7,
      fontFamily: "montserrat_medium",
      backgroundColor: "rgba(0,0,0,.5)",
    },
    ratings_text: {
      backgroundColor: colors.lightgray,
      borderRadius: 30,
      padding: 10,
      paddingVertical: 5,
      fontFamily: "montserrat_bold",
      color: colors.white,
    },
    episode_text: {
      paddingVertical: 5,
      fontFamily: "montserrat_bold",
      color: colors.black,
      backgroundColor: colors.primary,
      borderRadius: 30,
      padding: 10,
    },
    card_image: {
      position: "absolute",
      zIndex: 5,
      flex: 1,
      width,
      height: carousel_height - 100,
      alignItems: "center",
      justifyContent: "center",
    },
    simple_text: {
      paddingVertical: 7,
      marginBottom: 5,
      paddingHorizontal: 5,
      fontFamily: "montserrat_medium",
      color: colors.white,
      fontSize: 14,
      textAlign: "center",
    },
    play_btn: {
      borderRadius: 100,
      backgroundColor: colors.play_bg,
      borderWidth: 4,
      borderColor: colors.play_wrapper,
    },
    carousel: {
      width,
    },
    error_text: {
      fontFamily: "montserrat_medium",
      fontSize: 15,
      textAlign: "center",
      color: colors.white,
    },
    error_card: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: 18,
      paddingVertical: 10,
      fontFamily: "montserrat_bold",
      color: colors.white,
    },
  };
};
