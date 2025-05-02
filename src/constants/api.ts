import axios from "axios";

export const API = "http://rabbit-vm.ddns.net/api";
// export const API = "http://localhost:3000";
export const STORAGE_API = API + "/static";

export const Http = axios.create();

if (localStorage.getItem("access_token")) {
  Http.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
}
