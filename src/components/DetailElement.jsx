import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentModal from "./modal/CommentModal";
import { baseURL } from "../api/axios";
import { getDetailPost, DeletePost, EditPost } from "../api/detail/getdetail";
import useInput from "../hooks/useInput";

export default function DetailElement() {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [detail, setDetail] = useState("");
  const [updateImg, setUpdateImg] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [file, setFile] = useState("");
  const [sellState, setSellState] = useState("");

  const fileInput = React.useRef(null);

  // 전체 조회
  useEffect(() => {
    const getDetailPost = async () => {
      const { data } = await baseURL.get(`/api/post/${id}`);
      // console.log(data);
      return data.response;
    };
    getDetailPost().then((result) => setDetail(result));
  },[id]);

  //삭제
  const DELETE_mutation = useMutation(DeletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("lists");
    },
  });

  const onDeleteBtnHandler = (id) => {
    DELETE_mutation.mutate(id);
    // console.log(id);
    alert("삭제 완료");
    navigate("/");
  };

  //수정
  const Edit_Mutation = useMutation(EditPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("lists");
    },
  });

  const onImgPostHandler = (event) => {
    setUpdateImg([]);
      setFile(event.target.files[0]);

      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        const base = reader.result;
        if (base) {
          const baseSub = base.toString();
          setUpdateImg((updateImg) => [...updateImg, baseSub]);
        }
      };
  };

  const onSubmitPostHandler = async (event) => {
    event.preventDefault();
    if (updateTitle.trim() === "" || updateContent.trim() === "" ) {
      return alert("빈칸을 채워주세요");
    }
    const formData = new FormData();
  
      formData.append("title", updateTitle);
      formData.append("content", updateContent);
      formData.append("file", file);
      formData.append("sellState", sellState);
      const payload = {
        id : id,
        title: formData.get("title"),
        content : formData.get("content"),
        file : formData.get("file"),
        sellState : formData.get("sellState"),
      }
      Edit_Mutation.mutate(payload);
      setDetail(payload);
      setUpdateImg(updateImg);
      setFile(payload)
    
    alert("수정 완료");
    navigate("/");
  };

  const radiocheck = (e) => {
    // console.log(e.target.value)
    setSellState(e.target.value);
  };

  function EditMode () {
    setIsEditMode(true)
    setUpdateTitle(detail.title)
    setUpdateContent(detail.content)
    setUpdateImg(detail.image)
    setFile(detail.file)
    setSellState(detail.sellState)
    // console.log(detail.image)
  };

  return (
    <StDiv>
      <div>
        {detail?.ismine?(
        <STdiv>
          {/* 수정영역 */}
          {isEditMode ? (
            <form onSubmit={onSubmitPostHandler} encType="multipart/form-data">
              <>
              <ImgBox src={updateImg} alt="image"/>
              <input
                  name="imgUpload"
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={onImgPostHandler}
                />
                <StTxtarea
                  type="text"
                  name="updateTitle"
                  value={updateTitle}
                  onChange={(event) => {
                    setUpdateTitle(event.target.value);
                  }}
                />
                <StTxtarea
                  type="text"
                  name="updateContent"
                  value={updateContent}
                  onChange={(event) => {
                    setUpdateContent(event.target.value);
                  }}
                />
                <div>
                  <input 
                    type="radio" 
                    id="SELL"
                    name="radio_btn" 
                    value="0" 
                    onChange={radiocheck} 
                    />
                  <label htmlFor="SELL">판매중</label>
                  <input 
                    type="radio" 
                    id="SOLD" 
                    name="radio_btn" 
                    value="1" 
                    onChange={radiocheck}
                    />
                  <label htmlFor="SOLD">판매완료</label>
                </div>
              </>

              <button size="medium" className="editbitn">
                {" "}
                저장{" "}
              </button>
            </form>
            ) : (
              <div>
                <ImgBox src = {detail.image}></ImgBox>
                <div>{detail.title}</div>
                <div> {detail.content} </div>  
                <p>
                  {detail.sellState === "SELL" ? "판매중" : "판매완료"}
                </p> 
                <button onClick={() => onDeleteBtnHandler(detail.id)}>삭제</button>
              <button size ='medium' className="editbitn" onClick={EditMode} > 수정 </button>
              </div>
              )
          }        
        </STdiv>
        ):(
          <>
            <ImgBox src = {detail.image}> </ImgBox>
            <div> {detail.title} </div>
            <div> {detail.content} </div>  
            <p>
              {detail.sellState === "SELL" ? "판매중" : "판매완료"}
            </p>

          </>
        )}
      </div>

      <CommentModal />
    </StDiv>
  );
}

const StDiv = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const STdiv = styled.div`
  width: 400px;
`;
const ImgBox = styled.img`
  width: 300px;
  height: 300px;
  margin: 10px;
  background: no-repeat center/100%;
  background-size: cover;
`;

const StTxtarea = styled.textarea`
  margin: 20px 35px;
  height: 50px;
  width: 46rem;
  border-radius: 20px;
  padding: 10px;
`;
