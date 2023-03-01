import { baseURL } from "../axios";

const getDetailPost = async () => {
  const response = await baseURL.get("/api/post");
  console.log(response)
  return response;
};

const DeletePost = async (id) => {
  try {
    await baseURL.delete(`/api/post/${id}`);
  } catch {
    return null;
  }
};

const EditPost = async (payload) => {
  try {
    const response = await baseURL.patch(
      `/api/post/${payload.id}`,
      {
        title: payload.title,
        content: payload.content,
        file: payload.file,
        sellState: payload.sellState,
      },
      {
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
      }
    );
    return response;
  } catch {
    return null;
  }
};

export { getDetailPost, DeletePost, EditPost };
