import axios from "axios";
// import useAuthStore from "../context/authContext";

const axiosInterface = {
  authorizedInterface: axios.create({
    baseURL: "https://api.realworld.io/api",
  }),
  normalInterface: axios.create({
    baseURL: "https://api.realworld.io/api",
  }),
  // should be private but idk how
  tokenInterceptor: null,
  //   might need seperation of concerns but fuck it
  //   setToken must be set before using the authorizedInterface as one
  setToken: function (token) {
    const tokenInterceptor = this.authorizedInterface.interceptors.request.use(
      (config) => {
        //well the current version works and using this would mean i would have to deal with null check so the current version is easier for me to implement so fuck it
        // config.headers["Authorization"] = `Token ${
        //   useAuthStore.getState().identification.token
        // }`;
        config.headers["Authorization"] = `Token ${token}`;
        return config;
      }
    );
    this.tokenInterceptor = tokenInterceptor;
  },
  nullifyToken: function () {
    this.authorizedInterface.interceptors.request.eject(this.tokenInterceptor);
  },
  setupNavigationInterceptor: function (navigate) {
    this.authorizedInterface.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status == 401) {
          navigate("/register");
        }
      }
    );
  },
};

// console.log(res.headers['authorization']);
export default axiosInterface;
