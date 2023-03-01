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
      <Stlb>홍당무 마켓</Stlb> <br />
      {!isLogin ? (
        <Stdiv2>
          <StyledLink to={"/login"}> 로그인</StyledLink>
          <StyledLink to={"/signup"}> 회원가입</StyledLink>
        </Stdiv2>
      ) : (
        <StHomebtn onClick={logoutHandler}>로그아웃</StHomebtn>
      )}
    </Stdiv>
  );
}
const Stdiv = styled.div`
  display: flex;
  background-color: tomato;
  padding: 10px;
`;

const Stlb = styled.label`
  font-size: 30px;
  margin: auto;
  font-family: "Jalnan";
`;
const Stdiv2 = styled.div`
  margin: 10px;
  gap: 50px;
`;

const StHomebtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: "Jalnan";
  font-size: 18px;
`;

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
`;

const StyledLink = styled(Link)`
  font-family: "Jalnan";
  text-align: center;
  color: black;
  text-decoration: none;
  font-size: 18px;
`;
