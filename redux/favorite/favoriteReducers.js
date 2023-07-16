import { FAVORITE_UPDATED } from "./favoriteTypes";

const initialState = {
  favorite: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_UPDATED:
      return {
        ...state,
        favorite: action.payload,
      };

    default:
      return state;
  }
};
export default favoriteReducer;