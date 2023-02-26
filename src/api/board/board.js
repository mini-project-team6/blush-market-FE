import { suseSweet } from "../../utils/useSweet";
import { baseURL, instance } from "../axios";

export const getBoardList = async () => {
  try {
    //http://43.201.8.139:8080/member/login
    // const response = await instance.get("/api/posts");
    const response = await instance.get("/posts");
    return response;
  } catch (error) {
    suseSweet(1000, "error", error.response.data.msg);
  }
};
