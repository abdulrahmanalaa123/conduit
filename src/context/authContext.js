import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInterface from "../helpers/axios";
// first version of zustand token state is using zustand with persistent and setting the token from inside zustand
// next version is using the token on persisting and savign it with local storage and calling zustand on all the interfaces
// third version which if it doesnt work iwill be called on local storage and the interfaces will call on local storage to see if it changes
//   using login so to not use token except in the interface
//   loggedIn: false
const useAuthStore = create(
  persist(
    (set, get) => ({
      identification: {
        token: null,
        username: null,
      },

      setIdentification: (token, username) => {
        set(() => ({ identification: { token: token, username: username } }));
        axiosInterface.setToken(token);
        console.log("token set to: ", token);
      },
      deleteIdentification: () => {
        console.log("deleting token");
        if (get().identification) {
          set(() => ({
            identification: null,
          }));
          axiosInterface.nullifyToken();
        }
      },
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
