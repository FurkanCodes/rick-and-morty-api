import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosParams = {
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const axiosInstance = axios.create(axiosParams);

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
  };
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // global error handling, can be improved, request codelar yazılabilir
    console.error("API request failed:", error);
    return Promise.reject(error);
  }
);

export default api(axiosInstance);
