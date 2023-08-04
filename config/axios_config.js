import axios from "axios";

export default axios.create({
  // baseURL: "http://192.168.43.165:5000/api/",
  baseURL: "https://consumet-marvi.vercel.app/meta/anilist/",
});
