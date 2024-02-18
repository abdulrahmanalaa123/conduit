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
  const token = useAuthStore.getState().identification?.token;
  if (token) {
    config.headers["Authorization"] = `Token ${
      useAuthStore.getState().identification?.token
    }`;
  }
  return config;
});
// for some reason the response status and data wasnt read although the request went through and returned back an error response but it didnt read it and it worked with using the nullable operator
//i really dont know how and why and i need to use catch on the signup function and the sign in function idk why as well i need to look it up cuz i still till now
//tilll now it works sometiems and sometimes doesnt idk why i mean the error handling part the success logic is flawless but errors are fucked up
export function setupNavigationInterceptor(navigate) {
  axiosInterface.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("error", error);

      if (!error.response) {
        return Promise.reject({
          errors: { Network: ["error or Server Error"] },
        });
      } else if (error.response.status == 401) {
        navigate("/register");
      } else {
        return Promise.reject(error.response.data);
      }
    }
  );
}

export function errorListFormatting(errorData) {
  const errorList = [];
  for (const errorType in errorData.errors) {
    errorList.push(`${errorType} ${errorData.errors[errorType][0]}`);
  }
  return errorList;
}
// console.log(res.headers['authorization']);
export default axiosInterface;
