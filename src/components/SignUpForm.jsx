import React from "react";
import styled from "styled-components";

export default function SignUpForm() {
  return (
    <StDiv>
      <h1>회원가입</h1>
      <div>
        <input type="text" style={{ width: "270px" }} placeholder="아이디" />
        <button style={{ width: "80px" }}>중복확인</button>
      </div>
      <div>
        <input type="text" style={{ width: "350px" }} placeholder="비밀번호" />
      </div>
      <div>
        <input
          type="text"
          style={{ width: "350px" }}
          placeholder="비밀번호확인"
        />
      </div>

      <div>
        <button style={{ width: "350px" }}> 제출!</button>
      </div>
    </StDiv>
  );
}

const StDiv = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
