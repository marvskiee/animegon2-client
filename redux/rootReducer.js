import { combineReducers } from "redux";
import favoriteReducer from "./favorite/favoriteReducers";

const rootReducer = combineReducers({
  favorite: favoriteReducer,
});

export default rootReducer;