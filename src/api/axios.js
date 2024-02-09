import axios from "axios";

const axiosInterface = {
  authorizedInterface: axios.create({
    baseURL: "https://api.realworld.io/api",
  }),
  normalInterface: axios.create({
    baseURL: "https://api.realworld.io/api",
  }),
  //   might need seperation of concerns but fuck it
  setToken: function () {
    this.authorizedInterface.interceptors.request.use((config) => {
      config.headers["Authorization"] = token;
      localStorage.setItem("token", token);
    });
  },
};

// console.log(res.headers['authorization']);
export default axiosInterface;
