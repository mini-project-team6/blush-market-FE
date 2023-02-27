import { instance } from "../axios";

const getPost = async (formData) => {
  const response = await instance.get("/post");
  // console.log(formData.get('title'), formData.get('content'), formData.get('image'));
  return response.data;
};

const getDetailPost = async () => {
  const response = await instance.get("/post");
  // console.log(response.data[0].commentList);
  return response.data[0].commentList;
};

export { getPost, getDetailPost};
