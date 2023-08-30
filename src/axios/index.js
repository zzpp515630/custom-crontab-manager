import axios from "axios";
import { ElMessage } from "element-plus";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (response.data.code !== 1) {
        ElMessage({
          showClose: true,
          message: response.data.msg,
          type: "error",
        });
      }
      return response.data;
    }
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response) {
      ElMessage.close();
      ElMessage({
        showClose: true,
        message: error.response.status + ":" + error.response.data.error,
        type: "error",
      });
    }
    // Do something with response error
    return Promise.reject(error);
  }
);
