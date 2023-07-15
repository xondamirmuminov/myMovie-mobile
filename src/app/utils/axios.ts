import Axios from "axios";
import { store } from "../store";
import { handleLoading } from "../store/auth";
import { ACCOUNT_ID, BACKEND_API } from "@env";

const baseURL = BACKEND_API;

const axios = Axios.create({ baseURL, withCredentials: true, timeout: 20000 });

axios.interceptors.request.use((configs: any) => {
    store.dispatch(handleLoading(true));
    configs.headers.authorization = `Bearer ${ACCOUNT_ID}`
    return configs;
});

axios.interceptors.response.use(
    (res: any) => {
        store.dispatch(handleLoading(false));
        return res;
    },
    (error: any) => {
        store.dispatch(handleLoading(false));
        return Promise.reject(error);
    }
);

Axios.interceptors.request.use((configs: any) => {
    store.dispatch(handleLoading(true));
    return configs;
});

Axios.interceptors.response.use(
    (res: any) => {
        store.dispatch(handleLoading(false));
        configs.headers.authorization = `Bearer ${ACCOUNT_ID}`
        return res;
    },
    (error: any) => {
        store.dispatch(handleLoading(false));
        return Promise.reject(error);
    }
);
export default axios;