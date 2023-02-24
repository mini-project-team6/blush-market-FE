import React, { useState } from "react";
import styled from "styled-components";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(id, password);
    if (!id.trim() || !password.trim()) {
      alert("똑바로 입력 하세요....");
      return;
    }
  };

  return (
    <StForm onSubmit={loginSubmitHandler}>
      <h1>로그인</h1>
      <input
        type="text" //
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>로그인</button>
    </StForm>
  );
}

const StForm = styled.form`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
