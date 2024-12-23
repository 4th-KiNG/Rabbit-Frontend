import axios from "axios";

//export const IP = "http://rabbit-vm.ddns.net/api";
export const IP = "http://localhost:3000";

export const Http = axios.create();

if (localStorage.getItem("access_token")) {
  Http.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
}
