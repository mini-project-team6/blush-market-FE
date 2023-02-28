import React, { useState } from "react";
import styled from "styled-components";
import CommentList from "./CommentList";

export default function CommentModalContent() {
  // const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <>
      <CommentList />
      <Footer>
        <CommentModalForm onSubmit={handleSubmit}>
          {/* <CommentInput
            type="text"
            placeholder="이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /> */}
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
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
