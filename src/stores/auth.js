import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInterface from "../lib/axios";
// first version of zustand token state is using zustand with persistent and setting the token from inside zustand
// next version is using the token on persisting and savign it with local storage and calling zustand on all the interfaces
// third version which if it doesnt work iwill be called on local storage and the interfaces will call on local storage to see if it changes
//   using login so to not use token except in the interface
//   loggedIn: false
const useAuthStore = create(
  persist(
    (set, get) => ({
      identification: null,

      setIdentification: (token, username, image) => {
        set(() => ({
          identification: { token: token, username: username, image: image },
        }));
        console.log("token set to: ", token);
      },
      deleteIdentification: () => {
        if (get().identification) {
          console.log("deleting token");
          set(() => ({
            identification: null,
          }));
        }
      },
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
