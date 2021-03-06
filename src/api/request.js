import Cookie from "js-cookie";
import axios from "axios";
import Router from "@/router/index";
import { Message } from "element-ui";

// 创建axios实例
const request = axios.create({
  baseURL: "https://yiyuan.dreamblue.net.cn",
  timeout: 8000
});

// 请求拦截器
request.interceptors.request.use(config => {
  config.headers["Content-Type"] = "application/json;charset=utf-8";
  config.headers["token"] = Cookie.get("token");
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 请求成功
    if (response.data.code === 200) {
      return response.data;
    } else {
      // 请求失败
      Message({
        message: response.data.msg,
        type: "error",
        duration: 1500
      });
      // 登陆超时
      if (response.data.code === 1008) {
        Router.push("/login");
      }
      return Promise.reject(new Error(response.data.msg));
    }
  },
  error => {
    Message({
      message: error,
      type: "error",
      duration: 1500
    });
    return Promise.reject(error);
  }
);

export default request;
