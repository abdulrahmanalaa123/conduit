import axios from "axios";

const axiosInterface = {
  authorizedInterface: axios.create({
    baseURL: "https://api.realworld.io/api",
  }),
  normalInterface: axios.create({
    baseURL: "https://api.realworld.io/api",
  }),
  //   might need seperation of concerns but fuck it
  //   setToken must be set before using the authorizedInterface as one
  setToken: function (token) {
    this.authorizedInterface.interceptors.request.use((config) => {
      config.headers["Authorization"] = token;
      localStorage.setItem("token", token);
    });
  },
  nullifyToken: function () {
    this.authorizedInterface.interceptors.request.use((config) => {
      config.headers["Authorization"] = null;
      localStorage.removeItem("token");
    });
  },
  setupNavigationInterceptor: function (navigate) {
    this.authorizedInterface.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status == 401) {
          this.nullifyToken();
          console.log(localStorage.getItem("token"));
          navigate("/register");
        }
      }
    );
  },
};

// console.log(res.headers['authorization']);
export default axiosInterface;
