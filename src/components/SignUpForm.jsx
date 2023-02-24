import React, { useState } from "react";
import styled from "styled-components";

export default function SignUpForm() {
  const [userid, setUserid] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [uservalpassword, setUservalpassword] = useState("");

  const [isname, setIsname] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  //   console.log(userid);

  const checkID = () => {
    setIsname(true);
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

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setUservalpassword(value);
    value === userpassword ? setPasswordMatch(true) : setPasswordMatch(false);
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    const obj = {
      id: userid,
      passwd: userpassword,
    };
    console.log("submit!", obj);
  };

  return (
    <StForm onSubmit={signupSubmitHandler}>
      <h1>회원가입</h1>
      <div>
        <input
          type="text"
          style={{ width: "270px" }}
          placeholder="아이디"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
        <button type="button" style={{ width: "80px" }} onClick={checkID}>
          중복확인
        </button>
      </div>
      중복입니다/아닙니다
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
          disabled={!(isname && passwordMatch && isValidPassword)}
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
