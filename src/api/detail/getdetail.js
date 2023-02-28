import { instance } from "../axios";

const getDetailPost = async () => {
  const response = await instance.get("/api/post");
  // console.log(response.data[0].commentList);
  // return response.data[0].commentList;
  return response.data;
};

export { getDetailPost};
