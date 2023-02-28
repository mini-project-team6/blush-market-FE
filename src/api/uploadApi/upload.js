import { instance, baseURL } from "../axios";

// const access_token = localStorage.getItem("access_token");
// const config = {
//   headers: {
//     "Authorization" :`Bearer ${access_token}`,
//     "Content-Type": `multipart/form-data; `,
//     }
// }

const uploadPost = async(formData) => {
  try{
    const response = await baseURL.post("/api/post", formData, {
      headers: {
        // "Authorization" :`Bearer ${access_token}`,
        "Content-Type": `multipart/form-data; `,
        }
    });
    return response;
  }
  catch{

  }

  // const response = await instance.post("/post", formData, config);
  // console.log(formData.get('title'), formData.get('content'), formData.get('image'));
  // return response;
}

export {uploadPost};