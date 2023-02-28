import { baseURL } from "../axios";

const getDetailPost = async () => {
  const response = await baseURL.get("/api/post");
  // console.log(response.data[0].commentList);
  // return response.data.response.commentList;
  return response.data;
};

export { getDetailPost};
