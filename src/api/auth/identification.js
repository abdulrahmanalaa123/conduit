import useAuthStore from "../../stores/auth";

export function setIdentification(responseData) {
  useAuthStore
    .getState()
    .setIdentification({ identificationObject: responseData.user });
}
export function logout() {
  useAuthStore.getState().deleteIdentification();
}
