import { baseURL } from "../axios";

const getDetailPost = async () => {
  const response = await baseURL.get("/api/post");
  return response.data;
};

const DeletePost = async (id) => {
  try {
    await baseURL.delete(`/api/post/${id}`);
  } catch {
    return null;
  }
};

const EditPost = async (payload) => {
  console.log(payload);
  try {
    const response = await baseURL.patch(
      `/api/post/${payload.id}`,
      {
        title: payload.title,
        content: payload.content,
        file: payload.file,
        sellState: payload.sellStatus,
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
