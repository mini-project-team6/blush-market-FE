import { Card } from "@mui/material";
import React from "react";
import styled from "styled-components";

export default function Upload() {
  return (
    <div>
      <StCard>
        <label> Title </label><br />
        <input type="text" placeholder="제목" style={{ height : "30px", width: "300px" }} /> <br />
        <label> Content </label><br />
        <input type="text" placeholder="내용" style={{ height : "100px", width: "300px" }} /> <br />

        <input type="text" placeholder="사진업로드" style={{ height : "30px", width: "200px" }} />
        <button style={{ height : "30px", width: "50px"}}>업로드</button> <br />
        <button style={{ height : "30px", width: "100px"}}>게시</button>
      </StCard>
    </div>
    );
  }
  
  const StCard = styled.section`
    background-color: #dadada;
    display : block;
    padding: 20px;
    margin : auto;
  `;