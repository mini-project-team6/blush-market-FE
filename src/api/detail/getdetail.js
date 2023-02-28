import { baseURL } from "../axios";

const getDetailPost = async () => {
  const response = await baseURL.get("/api/post");
  return response.data;
};

const DeletePost = async (id) => {
  try{
    await baseURL.delete(`/api/post/${id}`);
  }
  catch{
    return null;
  }
};

const EditPost = async (id) => {
  try{
    const response = await baseURL.put(`/api/post/${id}`);
    console.log(response)
    return response;
  }
  catch{
    return null;
  }
};

export {getDetailPost, DeletePost, EditPost};
