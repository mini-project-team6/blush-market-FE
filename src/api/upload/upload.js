import { instance, baseURL } from "../axios";

const uploadPost = async(newPost) => {
  const response = await instance.post("/api/post", newPost);
  return response.data;
  // console.log(response.data);
}

export {uploadPost};