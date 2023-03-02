import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { baseURL } from "../../api/axios";
import CommentList from "./CommentList";

export default function CommentModalContent() {
  const param = useParams();
  // const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const getCommentPost = async (content) => {
    const data = await baseURL.post(`/api/post/comment/${param.id}`, {
      content,
    });
  };
  const commentMutation = useMutation(getCommentPost, {
    onSettled: (response) => {
      console.log("성공");
      queryClient.invalidateQueries("details");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    commentMutation.mutate(content);
    setContent("");
  }
  return (
    <>
      <CommentList />
      <Footer>
        <CommentModalForm onSubmit={handleSubmit}>
          <CommentInput
            type="text"
            placeholder="댓글을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <SubmitButton type="submit">완료</SubmitButton>
        </CommentModalForm>
      </Footer>
    </>
  );
}

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 80%;
`;
const CommentModalForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  bottom: 0;
  left: 0;
`;

const CommentInput = styled.input`
  width: 50%;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom : 20px;
  font-family: "Jalnan";
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  font-family: "Jalnan";
  background-color: #008000;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom : 20px;
  cursor: pointer;
`;
