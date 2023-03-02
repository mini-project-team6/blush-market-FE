import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getlogoutID } from "../api/signup/login";

export default function Header() {
  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    if (!!localStorage.getItem("access_token")) {
      setisLogin(true);
    } else {
      setisLogin(false);
    }
  }, [isLogin]);

  const logoutMutation = useMutation(getlogoutID, {
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/";
    },
  });
  const logoutHandler = () => {
    const refresh_token = localStorage.getItem("refresh_token");
    logoutMutation.mutate(refresh_token);
    alert("로그아웃 하시겠습니까?");

  };
  return (
    <Stdiv>
      <StHomebtn
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <StyledImage
          src={process.env.PUBLIC_URL + "/carrot_icon-icons.com_128.png"}
        />
      </StHomebtn>
      <StHeaderLink to={"/"}>홍당무 마켓</StHeaderLink> <br />
      {!isLogin ? (
        <StUserDiv>
          <StLoginLink to={"/login"}>로그인</StLoginLink>
          <StSignUpLink to={"/signup"}>회원가입</StSignUpLink>
        </StUserDiv>
      ) : (
        <StHomebtn onClick={logoutHandler}>로그아웃</StHomebtn>
      )}
    </Stdiv>
  );
}
const Stdiv = styled.div`
  display: flex;
  background-color: tomato;
  padding: 20px;
  align-items: center;
  min-width: 600px;
`;
const StUserDiv = styled.div`
  margin: 10px;
  gap: 50px;
`;

const StHeaderLink = styled(Link)`
  font-size: 40px;
  margin: auto;
  padding-left : 7rem;
  font-family: "Jalnan";
  text-decoration: none;
  color: black;
`;

const StHomebtn = styled.button`
  background-color: transparent;
  padding : 5px;
  border : none;
  cursor: pointer;
  font-family: "Jalnan";
  font-size: 18px;
`;

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
`;

const StLoginLink = styled(Link)`
  font-family: "Jalnan";
  text-align: center;
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  margin-right : 10px;
`;

const StSignUpLink = styled(Link)`
  font-family: "Jalnan";
  text-align: center;
  color: black;
  text-decoration: none;
  font-size: 18px;
`;
