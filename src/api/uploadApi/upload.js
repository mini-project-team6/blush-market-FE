import { instance, baseURL } from "../axios";

const access_token = localStorage.getItem("access_token");
// const config = {headers: {
//   "Authorization" :`Bearer ${access_token}`,
//   }}

const uploadPost = async(formData) => {
  const response = await instance.post("/post", formData, {
    headers: {
      "Authorization" :`Bearer ${access_token}`,
      "Content-Type": `multipart/form-data; `,
      }
  }
  );
  // const response = await instance.post("/post", formData, config);
  // console.log(formData.get('title'), formData.get('content'), formData.get('image'));
  return response;
}

export {uploadPost};