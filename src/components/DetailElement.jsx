import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommentModal from "./modal/CommentModal";
import { instance } from "../api/axios";

export default function DetailElement() {
  const {id} = useParams();
  const [detail, setDetail] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    const getPost = async () => {
      const response = await instance.get("/post/2");
      // const response = await instance.get(`/post/${id}`);
      return response.data;
    };
    getPost().then((result) => setDetail(result))
  }, [id]);


  return (
    <StDiv>
      {/* <ImgBox src = {detail.image}></ImgBox> */}
      <h2>{detail.title}</h2>
      <h5>{detail.content}</h5>

      <div>자기게시글이면 수정/삭제버튼이 보여지는구간</div>

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
  margin : 10px
`;
