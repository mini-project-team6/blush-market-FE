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
        alert("๐ฅ ๋ฐ๊ฐ์ต๋๋ค ๐ฅ");
        window.location.href = "/";
      } else {
        alert("๋ค์ ์๋ํด์ฃผ์ญ์์ค.");
      }
    },
    onError: (response) => {
      console.log(response);
      alert("์ด๋ฉ์ผ ๋๋ ๋น๋ฐ๋ฒํธ๋ฅผ ํ์ธํด์ฃผ์ธ์!");
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
      alert("๋น์นธ์ ๋น ์ง์์ด ์๋ ฅํด์ฃผ์ธ์!");
      return;
    }

    loginMutation.mutate(obj);
  };

  return (
    <StForm onSubmit={loginSubmitHandler}>
      <StSignUplb>๋ก๊ทธ์ธ</StSignUplb>
      <StInput
        type="text"
        placeholder="์ด๋ฉ์ผ์ ์๋ ฅํ์ธ์"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <StInput
        type="password"
        placeholder="๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํ์ธ์"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StSubmitBtn>
        <StImg
          style={{ width: "20px", height: "20px" }}
          src={process.env.PUBLIC_URL + "/carrot_icon-icons.com_128.png"}
        />{" "}
        ๋ก๊ทธ์ธ
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
