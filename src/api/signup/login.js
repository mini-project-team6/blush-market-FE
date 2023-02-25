import { suseSweet } from "../../utils/useSweet";
import { instance, baseURL } from "../axios";

export const postLogin = async (payload) => {
  try {
    //http://43.201.8.139:8080/member/login
    const response = await instance.post("/member/login", {
      name: payload.id,
      password: payload.password,
    });
    console.log(response);
    return response;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.msg);
  }
};

export const postSignup = async (payload) => {
  try {
    const data = await instance.post("/member/signup", {
      name: payload.id,
      password: payload.password,
    });
    suseSweet(1000, "success", "회원가입 성공");
    return data;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.msg);
  }
};

export const getCheckId = async (payload) => {
  try {
    const response = await instance.get(`/member/usercheck/${payload}`);
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.msg);
  }
};
