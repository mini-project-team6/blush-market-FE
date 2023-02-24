import React from "react";
import styled from "styled-components";

export default function LoginForm() {
  return (
    <StDiv>
      <h1>로그인</h1>
      <input type="text" />
      <input type="text" />
      <button>로그인</button>
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
