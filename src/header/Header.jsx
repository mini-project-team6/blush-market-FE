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
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        {" "}
        Main{" "}
      </button>
      <Stlb>header</Stlb> <br />
      {!isLogin ? (
        <Stdiv2>
          <Link to={"/login"}> 로그인</Link>
          <Link to={"/signup"}> 회원가입</Link>
        </Stdiv2>
      ) : (
        <button onClick={logoutHandler}>로그아웃</button>
      )}
    </Stdiv>
  );
}
const Stdiv = styled.div`
  display: flex;
  background-color: #e9e9e9;
  padding: 10px;
`;

const Stlb = styled.label`
  font-size: 20px;
  margin: auto;
`;
const Stdiv2 = styled.div`
  gap: 50px;
`;
