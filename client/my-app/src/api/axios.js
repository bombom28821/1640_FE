import axios from "axios";

export default axios.create({
  baseURL: "https://back-end-1640.herokuapp.com",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
