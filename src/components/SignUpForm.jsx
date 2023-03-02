import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCheckId, postSignup } from "../api/signup/login";
import { suseSweet } from "../utils/useSweet";

export default function SignUpForm() {
  const [userid, setUserid] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [uservalpassword, setUservalpassword] = useState("");
  const [useremail, setUserEmail] = useState("");

  const [ischeck, setIscheck] = useState(false);
  const [isname, setIsname] = useState(false);
  const [isemailcheck, setIsemailcheck] = useState(false);
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
      response ? setIsname(true) : setIsname(false);
      if (response) {
        setIsname(true);
        suseSweet(1000, "success", "사용가능");
      } else {
        setIsname(false);
      }
    },
  });

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const checkID = (e) => {
    if (!e.target.value.trim()) return;
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
      <StSignUplb>회원가입</StSignUplb>
      <StEmailDiv>
        <StInput
          type="text"
          placeholder = "이메일"
          value={useremail}
          onChange={handleEmailChange}
        />

        <StCheckBtn
          type="button"
          disabled={!isValidEmail}
          value={useremail}
          onClick={checkID}
        >
          중복확인
        </StCheckBtn>
      </StEmailDiv>
      {/* {ischeck ? !isname ? <p>사용불가</p> : <p>사용가능한 닉네임</p> : null} */}
      {isValidEmail ? <Stfont style={{ color: "#008000" }}>올바른 이메일 형식입니다. </Stfont> : <Stfont  style={{ color: "#ff6666" }}>이메일 형식이 아닙니다.</Stfont>}

      <div>
        <StInput
          type="text"
          placeholder = "닉네임"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
      </div>

      {/* {!isname ? <p>이미 사용중</p> : <p>사용가능한 아이디</p>} */}
      <div>
        <StInput
          type="password"
          placeholder = "비밀번호"
          value={userpassword}
          onChange={handlePasswordChange}
        />
      </div>
      {isValidPassword ? (
        <Stfont style={{ color: "#008000" }}>사용가능한 비밀번호 입니다.</Stfont>
      ) : (
        <Stfont  style={{ color: "#ff6666" }} >영어,숫자,특수문자를 포함한 8자이상이여야 합니다.</Stfont>
      )}
      <div>
        <StInput
          type="password"
          placeholder="비밀번호 확인"
          value={uservalpassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      {passwordMatch ? (
        <Stfont style={{ color: "#008000" }}>비밀번호 일치!</Stfont>
      ) : (
        <Stfont style={{ color: "#ff6666" }}>비밀번호 불일치!</Stfont>
      )}
      <div>
        <StSubmitBtn
          disabled={
            !(isname && passwordMatch && isValidPassword && isValidEmail)
          }
        >
        <StImg
            style={{  width: "20px", height: "20px" }}
            src={process.env.PUBLIC_URL + "/carrot_icon-icons.com_128.png"}
          />
          가입하기
          <StImg
            style={{  width: "20px", height: "20px" }}
            src={process.env.PUBLIC_URL + "/carrot_icon-icons.com_128.png"}
          />
        </StSubmitBtn>
      </div>
    </StForm>
  );
}

const StForm = styled.form`
  padding: 8rem 0 10rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  min-width: 600px;
`;

const StInput = styled.input`
  width : 350px;
  height : 30px;
  border-radius : 10px;
  font-family: "Jalnan";
  font-size : 12px;
  padding: 10px;
  border-color : #b2b2b2;
`

const StSignUplb= styled.label`
  font-size: 30px;
  margin-bottom: 20px;
  font-family: "Jalnan";
  color: black;
`;

const Stfont= styled.p`
  font-size: 15px;
  font-family: "Jalnan";
  color: black;
`;

const StImg=styled.img`
  padding-right : 10px;
  padding-left : 10px;
`;

const StSubmitBtn= styled.button`
  width : 300px;
  height : 60px;
  font-size: 20px;
  font-family: "Jalnan";
  border-radius : 10px;
  background-color : tomato;
  color: white;
`;

const StCheckBtn= styled.button`
  width : 80px;
  height : 50px;
  font-size: 15px;
  font-family: "Jalnan";
  border-radius : 10px;
  background-color : tomato;
  color: white;
  margin-left: 10px;
`;
  
const StEmailDiv = styled.div`
  padding-left: 90px;
  display : block;
`