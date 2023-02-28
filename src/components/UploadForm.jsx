import useInput from "../hooks/useInput";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
// import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { uploadPost } from "../api/uploadApi/upload";

const UploadForm = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(uploadPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("newPost");
    },
  });


  const fileInput = React.useRef(null);
  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const [newtitle, onTitleHandler] = useInput("");
  const [newcontent, onContentHandler] = useInput("");
  const [newimage, setNewImage] = useState("");
  const [file, setFile] = useState("");

  const onImgPostHandler = (event) => {
    // console.log(event.target.files)
    setNewImage([]);
    for (let i = 0; i < event.target.files.length; i++) {
      setFile(event.target.files[i]);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.addEventListener("loaded", (event) => {
        newimage.src = event.target.result;
      });
      reader.onloadend = () => {
        const base = reader.result;
        if (base) {
          const baseSub = base.toString();
          setNewImage((newimage) => [...newimage, baseSub]);
        }
      };
    }
  };

  const onSubmitPostHandler = async (event) => {
    event.preventDefault();
    if (newtitle.trim() === "" || newcontent.trim() === "") {
      return alert("빈칸을 채워주세요");

    } 

    const formData = new FormData();
    formData.append('title', newtitle);
    formData.append('content', newcontent);
    formData.append('file', file);
    mutation.mutate(formData);

    console.log(formData.get('title'), formData.get('content'), formData.get('file'));

    alert("업로드 완료");
  };

  return (
    <form onSubmit={onSubmitPostHandler} encType="multipart/form-data">
      <StCard>
        <label> Title </label>
        <br />
        <input type="text" value={newtitle} onChange={onTitleHandler} /> <br />
        <label> Content </label> <br />
        <input
          type="text"
          value={newcontent}
          onChange={onContentHandler}
        />{" "}
        <br />
        <StpicInput
          name="imgUpload"
          type="file"
          accept="image/*"
          ref={fileInput}
          // value = {newimage}
          onChange={onImgPostHandler}
        />
        <StuploadBtn onClick={onImgButton}> 파일 업로드 </StuploadBtn>
        <div>
          <ImgBox src={newimage} alt="img" />
        </div>{" "}
        <br />
        <StupicBtn> 업로드 </StupicBtn>
      </StCard>
    </form>
  );
};

export default UploadForm;

const StCard = styled.section`
  background-color: #dadada;
  display: block;
  padding: 20px;
  margin: auto;
`;

const StupicBtn = styled.button`
  height: 30px;
  width: 100px;
`;
const StuploadBtn = styled.button`
  height: 30px;
  width: 100px;
`;
const StpicInput = styled.input`
  height: 30px;
  width: 200px;
`;
const ImgBox = styled.img`
  width: 300px;
  height: 200px;
  margin: 10px;
`;
