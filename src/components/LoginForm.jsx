import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { postLogin } from "../api/signup/login";
export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(postLogin, {
    onSuccess: (response) => {
      if (response.headers.authorization) {
        localStorage.setItem(
          "access_token",
          response.headers.authorization.split(" ")[1]
        );
        localStorage.setItem(
          "refresh_token",
          response.headers.refresh_token.split(" ")[1]
        );
        alert("로그인 성공?");
      } else {
        alert("로그인 실패?");
      }
    },
    onError: (response) => {
      console.log(response);
      alert("로그인 에러??");
    },
  });

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const obj = {
      id,
      password,
    };
    console.log(obj);
    if (!id.trim() || !password.trim()) {
      alert("똑바로 입력 하세요....");
      return;
    }

    loginMutation.mutate(obj);
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
