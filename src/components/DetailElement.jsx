import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentModal from "./modal/CommentModal";
import { baseURL } from "../api/axios";
import { getDetailPost } from "../api/detail/getdetail";

export default function DetailElement() {
  const { id } = useParams();

  console.log(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [detail, setDetail] = useState("");
  const [updateImg, setUpDateImg] = useState("");
  const [updateTitle, setupdateTitle] = useState("");
  const [updateContent, setupdateImg] = useState("");

  const fileInput = React.useRef(null);
  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  // const updateMutation = useMutation(updateBoard, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("post");
  //   },
  // });
  const mutation = useMutation(getDetailPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    },
  });

  useEffect(() => {
    const getDetailPost = async () => {
      const { data } = await baseURL.get(`/api/post/${id}`);
      // const response = await baseURL.get('/api/post');
      console.log(data);
      return data;
    };
    getDetailPost().then((result) => setDetail(result));
  }, [id]);

  const onDeleteBtnHandler = (id) => {
    const msg = window.confirm("삭제?");
    if (msg) {
      mutation.mutate(id);
      navigate("/");
    } else {
      return;
    }
  };

  // const onEditBtnHandler = (Id) => {
  //   const msg = window.confirm("수정완료?");
  //   if (!msg) {
  //     return;
  //   } else {
  //     const payload = {
  //       title: updateTitle,
  //       content: updateContent,
  //       file: updateImg,
  //     };
  //     updateMutation.mutate(payload);
  //     setDetail(payload);
  //     // onToggle();
  //     alert("수정 완료!");
  //   }
  // };

  return (
    <StDiv>
      <ImgBox src={detail.image}></ImgBox>
      <h2>{detail.title}</h2>
      <h5>{detail.content}</h5>

      <div>
        <button onClick={() => onDeleteBtnHandler(detail.id)}>삭제</button>
        {/* <button onClick={() => onEditBtnHandler(detail.Id)}>수정</button> */}
        <button>수정</button>
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

const ImgBox = styled.img`
  width: 300px;
  height: 200px;
  margin: 10px;
`;
