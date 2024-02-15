import axios from "axios";
import useAuthStore from "../stores/auth";

// const axiosaxiosInterface = {
//   authorizedaxiosInterface: axios.create({
//     baseURL: "https://api.realworld.io/api",
//   }),
//   normalaxiosInterface: axios.create({
//     baseURL: "https://api.realworld.io/api",
//   }),
//   // should be private but idk how
//   tokenInterceptor: null,
//   //   might need seperation of concerns but fuck it
//   //   setToken must be set before using the authorizedaxiosInterface as one
//   setToken: function (token) {
//     const tokenInterceptor = this.authorizedaxiosInterface.interceptors.request.use(
//       (config) => {
//         //well the current version works and using this would mean i would have to deal with null check so the current version is easier for me to implement so fuck it

//         config.headers["Authorization"] = `Token ${token}`;
//         return config;
//       }
//     );
//     this.tokenInterceptor = tokenInterceptor;
//   },
//   nullifyToken: function () {
//     this.authorizedaxiosInterface.interceptors.request.eject(this.tokenInterceptor);
//   },
//   setupNavigationInterceptor: function (navigate) {
//     this.authorizedaxiosInterface.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         if (error.response.status == 401) {
//           navigate("/register");
//           return Promise.reject(error);
//         }
//       }
//     );
//   },
// };

const axiosInterface = axios.create({
  baseURL: "https://api.realworld.io/api",
});

axiosInterface.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Token ${
    useAuthStore.getState().identification?.token
  }`;
  return config;
});
export function setupNavigationInterceptor(navigate) {
  axiosInterface.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error) => {
      if (error.response.status == 401) {
        navigate("/register");
      }
    }
  );
}

// console.log(res.headers['authorization']);
export default axiosInterface;
