import axios, { AxiosInstance } from "axios";

const userApiBaseUrl = () => {
  return "http://localhost:8080";
};

let axiosInstance: AxiosInstance;

export class UserApiClient {
  static getConfig() {
    return {
      baseURL: userApiBaseUrl(),
      timeout: 20000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  }

  static getInstance() {
    if (axiosInstance) {
      return axiosInstance;
    } else {
      const config = UserApiClient.getConfig();
      axiosInstance = axios.create(config);
      return axiosInstance;
    }
  }
}

const userApiClient = UserApiClient.getInstance;
export default userApiClient;
