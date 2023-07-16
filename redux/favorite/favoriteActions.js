import { FAVORITE_UPDATED } from "./favoriteTypes";

export const favoriteUpdated = (data) => {
  return {
    type: FAVORITE_UPDATED,
    payload: data,
  };
};

export const setFavorites = (data) => (dispatch) => {
  dispatch(favoriteUpdated(data));
};