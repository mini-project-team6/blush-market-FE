import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
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
  const [updateImg, onUpdateImg] = useState("");
  const [updateTitle, onUpdateTitle] = useInput("");
  const [updateContent, onUpdateContent] = useInput("");

  const fileInput = React.useRef(null);
  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  // 전체 조회
  useEffect(() => {
    const getDetailPost = async () => {
      const { data } = await baseURL.get(`/api/post/${id}`);
      console.log(data);
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
    console.log(id);
    alert("Delete 완료");
    navigate("/");
  };

  //수정
  const Edit_Mutation = useMutation(EditPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("lists");
    },
  });

  const onEditBtnHandler = () => {
    Edit_Mutation.mutate();
    setDetail();
    alert("수정 완료!");
  };
  // const onSubmitPostHandler = async (event) => {
  //   event.preventDefault();
  //   if (newtitle.trim() === "" || newcontent.trim() === "") {
  //     return alert("빈칸을 채워주세요");
  //   }

  //   const formData = new FormData();
  //   formData.append('title', updateTitle);
  //   formData.append('content', updateContent);
  //   formData.append('file', updateImg);
  //   mutation.mutate(formData);
  //   alert("수정 완료");
  //   navigate(`/detail/${id}`);
  // };

  return (
    <StDiv>
      {detail.ismine ? (
        <div>
          <ImgBox src={detail.image}></ImgBox>
          <h2>{detail.title}</h2>
          <h5>{detail.content}</h5>
          <button onClick={() => onDeleteBtnHandler(detail.id)}>삭제</button>
          <button onClick={() => onEditBtnHandler(detail.id)}>수정</button>
          {/* <button>수정</button> */}
        </div>
      ) : (
        <div>
          <ImgBox src={detail.image}></ImgBox>
          <h2>{detail.title}</h2>
          <h5>{detail.content}</h5>
        </div>
      )}

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

const ImgBox = styled.img`
  width: 300px;
  height: 200px;
  margin: 10px;
`;
