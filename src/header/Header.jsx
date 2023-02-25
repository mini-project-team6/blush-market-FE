import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();
  return (  
  <Stdiv>
    <button onClick={()=>{navigate('/')}}> Main </button>
    <Stlb>header</Stlb> <br />
    <Stdiv2>
    <Link to={'/login'}> 로그인</Link>
    <Link to={'/signup'}> 회원가입</Link>
    </Stdiv2>
  </Stdiv>);
}
const Stdiv= styled.div `
  display : flex;
  background-color : #e9e9e9;
  padding : 10px;
`

const Stlb= styled.label `
  font-size : 20px;
  margin : auto;
`
const Stdiv2= styled.div `
  gap : 50px;
`