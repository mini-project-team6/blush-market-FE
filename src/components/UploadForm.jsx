import useInput from "../hooks/useInput";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { uploadPost } from "../api/uploadApi/upload";

const UploadForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(uploadPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("lists");
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
    if (newtitle.trim() === "" || newcontent.trim() === "" ) {
      return alert("빈칸을 채워주세요");
    } 

    const formData = new FormData();
    formData.append("title", newtitle);
    formData.append("content", newcontent);
    formData.append("file", file);

    console.log(formData.get("file"))

    mutation.mutate(formData);

    alert("업로드 완료!");
    navigate("/");
  };

  return (
    <form name='post' onSubmit={onSubmitPostHandler} encType="multipart/form-data">
      <StCard>
        <Stlabel>🥕 제목을 입력하세요 </Stlabel>
        <StInput 
        type="text" 
        value={newtitle} 
        onChange={onTitleHandler} 
        style={{ height: "50px" }} /> <p />
        <Stlabel> 🥕 제품 설명을 입력하세요 </Stlabel>
        <StInput
          type="text"
          value={newcontent}
          onChange={onContentHandler}
          style={{ height: "100px" }} 
        />
        <p />
        <StsmallLabel> 제품 이미지를 올려주세요</StsmallLabel>
        <StUploadlb htmlFor="input-file">이미지 파일 업로드</StUploadlb> <p />
        <input
          id="input-file"
          name="imgUpload"
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={onImgPostHandler}
          style={{display:"none"}}
        />
        <div>
          <ImgBox src={newimage} alt="img"/>
        </div>
        <br />
        <StPostBtn> 업로드 </StPostBtn>
      </StCard>
    </form>
  );
};

export default UploadForm;

const StCard = styled.section`
  padding: 50px;
  margin: auto;
  display : flex;
  align-items: center;
  flex-direction: column;
`;

const ImgBox = styled.img`
  min-width: 300px;
  min-height: 300px;
  max-width: 500px;
  max-height: 500px;
  background-color : #ebebeb;
  align-items : center;
`;

const StInput = styled.textarea`
  width : 400px;
  border-radius : 10px;
  font-family: "Jalnan";
  font-size : 18px;
  padding: 10px;
  margin-top : 10px;
  border-color : #b2b2b2;
  background-color :#ebebeb;
`

const Stlabel= styled.label`
  font-size: 20px;
  font-family: "Jalnan";
  color: black;
`;

const StsmallLabel= styled.label`
  font-size: 15px;
  font-family: "Jalnan";
  color: #b2b2b2;
  margin-bottom: 10px;
`;

const StPostBtn= styled.button`
  width : 200px;
  height : 50px;
  font-size: 20px;
  font-family: "Jalnan";
  border-radius : 10px;
  background-color : tomato;
  border-color : tomato;
  color: white;
`;

const StUploadlb = styled.label`
  font-family: "Jalnan";
  border-radius : 10px;
  border : solid;
  width : 200px;
  padding: 10px;
  text-align : center;
  border-color : tomato;
  background-color: tomato;
  color : white;
  cursor: pointer;
`