import axios from "axios";

export default axios.create({
  // baseURL: "http://192.168.43.165:5000/api/",
  baseURL: "https://api.consumet.org/meta/anilist/",
});
