import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentModal from "./modal/CommentModal";
import { baseURL } from "../api/axios";
import { getDetailPost, DeletePost, EditPost } from "../api/detail/getdetail";

export default function DetailElement() {
  const { id } = useParams();
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
      return data.response;
    };
    getDetailPost().then((result) => setDetail(result));
  }, [id]);

  //삭제
  const DELETE_mutation = useMutation(DeletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("lists");
    },
  });

  const onDeleteBtnHandler = (id) => {
    DELETE_mutation.mutate(id);
    alert("삭제 완료!");
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
    if (updateTitle.trim() === "" || updateContent.trim() === "") {
      return alert("빈칸을 채워주세요");
    }
    else if (!file) {
      return alert("사진을 다시 올려주세요!");
    }
    const formData = new FormData();

    formData.append("title", updateTitle);
    formData.append("content", updateContent);
    formData.append("file", file);
    formData.append("sellState", sellState);
    const payload = {
      id: id,
      title: formData.get("title"),
      content: formData.get("content"),
      file: formData.get("file"),
      sellState: formData.get("sellState"),
    };
    Edit_Mutation.mutate(payload);
    setDetail(payload.formData);

    alert("수정 완료");
    navigate(`/detail/${payload.id}`);
  };

  const radiocheck = (e) => {
    setSellState(e.target.value);
  };

  function EditMode() {
    setIsEditMode(true);
    setUpdateTitle(detail.title);
    setUpdateContent(detail.content);
    setUpdateImg(detail.image);
    setFile(detail.file);
    setSellState(detail.sellState);
  }

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
              <div>
              <p /><Stlb htmlFor="input-file">파일 업로드</Stlb> <p />
              <input
                id="input-file"
                name="imgUpload"
                type="file"
                accept="image/*"
                ref={fileInput}
                src={file}
                onChange={onImgPostHandler}
                style={{display:"none"}}
              />
                </div>
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
                    check={detail.sellState === "SELL" ? true : false}/>
                  <label htmlFor="SELL">판매중</label> 
                  <input 
                    type="radio" 
                    id="SOLD" 
                    name="radio_btn" 
                    value="1" 
                    onChange={radiocheck}
                    check={detail.sellState === "SOLDOUT" ? true : false}/>
                  <label htmlFor="SOLD">판매완료</label> <p />
                </div>
              </>
              <StEditBtn>저장</StEditBtn>
            </form>

            ) : (
              <div>
                <ImgBox src={detail.image}></ImgBox>
                <StStateP>
                  {detail.sellState === "SELL" ? "판매중" : "판매완료"}
                </StStateP>
                <StTitlediv> {detail.title} </StTitlediv>
                <StContentediv> {detail.content} </StContentediv>
                <StdeleteBtn onClick={() => onDeleteBtnHandler(detail.id)}>
                  삭제
                </StdeleteBtn>
                <StEditBtn
                  size="medium"
                  className="editbitn"
                  onClick={EditMode}
                >
                  {" "}
                  수정{" "}
                </StEditBtn>
              </div>
            )}
          </STdiv>
        ) : (
          <>
            <ImgBox src={detail.image}></ImgBox>
            <StStateP>
              {detail.sellState === "SELL" ? "판매중" : "판매완료"}
            </StStateP>
            <StTitlediv> {detail.title} </StTitlediv>
            <StContentediv> {detail.content} </StContentediv>
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
  /* background-color : #ffe0da; */
  font-family: "Jalnan";
`;

const STdiv = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
`;

const ImgBox = styled.img`
  width: 300px;
  height: 300px;
  margin: auto;
  border: solid;
  border-radius: 10px;
  display: flex;
`;

const StTxtarea = styled.textarea`
  margin-bottom: 20px;
  height: 50px;
  width: 400px;
  border-radius: 10px;
  border-color: tomato;
  padding: 10px;
  font-family: "Jalnan";
`;
const Stlb = styled.label`
  font-family: "Jalnan";
  border-radius: 10px;
  border: solid;
  width: 100px;
  padding: 10px;
  border-color: tomato;
  background-color: tomato;
  color: white;
  cursor: pointer;
`;
const StTitlediv = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  color: black;
`;

const StContentediv = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  color: #4b4b4b;
`;

const StStateP = styled.p`
  font-size: 15px;
  color: tomato;
`;

const StEditBtn = styled.button`
  width: 80px;
  height: 30px;
  font-size: 15px;
  font-family: "Jalnan";
  border-radius: 10px;
  border-color: #008000;
  color: #008000;
  background-color: white;
  cursor: pointer;
`;

const StdeleteBtn = styled.button`
  width: 80px;
  height: 30px;
  font-size: 15px;
  font-family: "Jalnan";
  border-radius: 10px;
  border-color: tomato;
  margin-right: 10px;
  background-color: white;
  cursor: pointer;
  color: tomato;
`;
