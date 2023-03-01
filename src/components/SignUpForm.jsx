import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCheckId, postSignup } from "../api/signup/login";

export default function SignUpForm() {
  const [userid, setUserid] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [uservalpassword, setUservalpassword] = useState("");
  const [useremail, setUserEmail] = useState("");

  const [ischeck, setIscheck] = useState(false);
  const [isname, setIsname] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const navigate = useNavigate();
  // const client = useQueryClient();
  const signUpMutation = useMutation(postSignup, {
    onSuccess: (response) => {
      console.log(response);
      alert("회원가입 성공?");
      navigate("/login");
    },
    onError: (response) => {
      console.log(response);
      alert("뭔가 에러?");
    },
  });

  const checkIdMutation = useMutation(getCheckId, {
    onSuccess: (response) => {
      console.log(response);
      setIsname(response);
    },
  });

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  //   console.log(userid);

  const checkID = (e) => {
    setIscheck(true);
    checkIdMutation.mutate(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUserpassword(value);
    value === uservalpassword
      ? setPasswordMatch(true)
      : setPasswordMatch(false);

    passwordRegex.test(value)
      ? setIsValidPassword(true)
      : setIsValidPassword(false);
  };

  //.이메일 정규표현식
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setUserEmail(value);
    regex.test(value) ? setIsValidEmail(true) : setIsValidEmail(false);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setUservalpassword(value);
    value === userpassword ? setPasswordMatch(true) : setPasswordMatch(false);
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    const obj = {
      id: userid,
      password: userpassword,
      email: useremail,
    };
    signUpMutation.mutate(obj);
  };

  return (
    <StForm onSubmit={signupSubmitHandler}>
      <h1>회원가입</h1>
      <div>
        <input
          type="text"
          style={{ width: "270px" }}
          placeholder="이메일"
          value={useremail}
          onChange={handleEmailChange}
        />
      </div>
      {isValidEmail ? <p>이메일 형식에 맞음</p> : <p>이메일 형식이 아닙니다</p>}

      <div>
        <input
          type="text"
          style={{ width: "270px" }}
          placeholder="아이디"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
        <button
          type="button"
          value={userid}
          style={{ width: "80px" }}
          onClick={checkID}
        >
          중복확인
        </button>
      </div>
      {ischeck ? !isname ? <p>이미 사용중</p> : <p>사용가능한 아이디</p> : null}
      {/* {!isname ? <p>이미 사용중</p> : <p>사용가능한 아이디</p>} */}
      <div>
        <input
          type="password"
          style={{ width: "350px" }}
          placeholder="비밀번호"
          value={userpassword}
          onChange={handlePasswordChange}
        />
      </div>
      {isValidPassword ? (
        <p>조건 만족</p>
      ) : (
        <p>영어,숫자,특수문자포함 8자이상이여야합니다</p>
      )}
      <div>
        <input
          type="password"
          style={{ width: "350px" }}
          placeholder="비밀번호확인"
          value={uservalpassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      {passwordMatch ? (
        <p style={{ color: "green" }}>비밀번호 일치!</p>
      ) : (
        <p style={{ color: "red" }}>비밀번호 불일치!</p>
      )}
      <div>
        <button
          style={{ width: "350px" }}
          disabled={
            !(isname && passwordMatch && isValidPassword && isValidEmail)
          }
        >
          {" "}
          제출!
        </button>
      </div>
    </StForm>
  );
}

const StForm = styled.form`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
