import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { postLogin } from "../api/signup/login";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(postLogin, {
    onSuccess: (response) => {
      // console.log(response);
      if (response.headers.authorization) {
        localStorage.setItem(
          "access_token",
          response.headers.authorization.split(" ")[1]
          //au~~ bar~~~ token
          //bar~~ token
        );
        localStorage.setItem(
          "refresh_token",
          response.headers.refresh_token.split(" ")[1]
        );
        alert("🥕 반갑습니다 🥕");
        window.location.href = "/";
      } else {
        alert("다시 시도해주십시오.");
      }
    },
    onError: (response) => {
      console.log(response);
      alert("이메일 또는 비밀번호를 확인해주세요!");
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
      alert("빈칸을 빠짐없이 입력해주세요!");
      return;
    }

    loginMutation.mutate(obj);
  };

  return (
    <StForm onSubmit={loginSubmitHandler}>
      <StSignUplb>로그인</StSignUplb>
      <StInput
        type="text"
        placeholder="이메일을 입력하세요"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <StInput
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StSubmitBtn>
        <StImg
          style={{ width: "20px", height: "20px" }}
          src={process.env.PUBLIC_URL + "/carrot_icon-icons.com_128.png"}
        />{" "}
        로그인
        <StImg
          style={{ width: "20px", height: "20px" }}
          src={process.env.PUBLIC_URL + "/carrot_icon-icons.com_128.png"}
        />
      </StSubmitBtn>
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

const StSignUplb = styled.label`
  font-size: 30px;
  margin-bottom: 20px;
  font-family: "Jalnan";
  color: black;
`;

const StInput = styled.input`
  width: 350px;
  height: 30px;
  border-radius: 10px;
  font-family: "Jalnan";
  font-size: 12px;
  padding: 10px;
  border-color: #b2b2b2;
`;
const StSubmitBtn = styled.button`
  width: 300px;
  height: 60px;
  font-size: 20px;
  font-family: "Jalnan";
  border-radius: 10px;
  background-color: tomato;
  color: white;
`;

const StImg = styled.img`
  padding-right: 10px;
  padding-left: 10px;
`;
