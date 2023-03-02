import { baseURL } from "../axios";

const uploadPost = async(formData) => {
  try{
    const response = await baseURL.post("/api/post", formData, {
      headers: {
        "Content-Type": `multipart/form-data; `,
        }
    });
    return response;
  }
  catch{

  }
}


export { uploadPost };
