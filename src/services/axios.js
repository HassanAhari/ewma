import axios from "axios";
import store from "@/store/index"

export const API_BASE_URL = process.env.VUE_APP_BASE_URL

const http = axios.create({
    baseURL:  API_BASE_URL,
});

http.interceptors.response.use(
    response => {
        return response
    },
    error => {
        store.state.textAlert = error.message
        store.state.alert = true
        return error
    }
)

export default http;
