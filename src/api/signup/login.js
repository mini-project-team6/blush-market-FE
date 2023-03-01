import { suseSweet } from "../../utils/useSweet";
import { instance, baseURL } from "../axios";

export const postLogin = async (payload) => {
  try {
    const response = await instance.post("/api/member/login", {
      email: payload.id,
      password: payload.password,
    });

    return response;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.error.message);
  }
};

export const postSignup = async (payload) => {
  try {
    const data = await instance.post("/api/member/signup", {
      name: payload.id,
      password: payload.password,
      email: payload.email,
    });
    suseSweet(1000, "success", "회원가입 성공");
    return data;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.error.message);
  }
};

export const getCheckId = async (payload) => {
  console.log(payload);
  try {
    const response = await instance.get(`/api/member`, {
      params: { email: payload },
    });
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.error.message);
  }
};

export const getlogoutID = async (payload) => {
  try {
    const response = await instance.get(`api/member/logout`, {
      headers: {
        refresh_token: `Bearer ${payload}`,
      },
    });
    return response;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.error.message);
  }
};
