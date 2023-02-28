import { suseSweet } from "../../utils/useSweet";
import { baseURL, instance, instance2 } from "../axios";

export const getBoardList = async () => {
  try {
    //http://43.201.8.139:8080/member/login
    const response = await instance.get("/api/post");
    // const response = await instance2.get("/posts");
    return response;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.msg);
  }
};

export const getBoardListByKeyword = async (payload) => {
  try {
    const response = await instance.get("api/posts", {
      params: {
        keyword: payload.keyword,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.msg);
  }
};

export const getBoardListByToggle = async (payload) => {
  try {
    const response = await instance.get("api/posts", {
      params: {
        keyword: "",
        sellstatus: payload.sellstatus,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.msg);
  }
};
