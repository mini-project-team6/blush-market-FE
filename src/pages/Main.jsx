import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getBoardList,
  getBoardListByKeyword,
  getBoardListByToggle,
} from "../api/board/board";
import ProductList from "../components/ProductList";
import { instance } from "../api/axios";
import axios from "axios";

export default function Main() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const searchTitleChangeHandler = (e) => {
    setSearchTitle(e.target.value);
  };

  const { isLoading, isError, data } = useQuery("lists", getBoardList, {
    onSuccess: (response) => {
      setList(response.data.response);
    },
  });

  const istoken = () => !!localStorage.getItem("access_token");
  const btnGoToUpload = () => {
    if (istoken()) {
      navigate("/upload");
    } else {
      alert("로그인하시기 바랍니다!");
      navigate("/login");
    }
  };

  //텍스트 검색
  const btnSearch = async () => {
    console.log(searchTitle);
    const { data } = await getBoardListByKeyword({
      keyword: searchTitle,
    });
    console.log(data);
    setList(data.response);
    setSearchTitle("");
  };

  //판매중or판매완료
  const btnSellorSoldout = async (e) => {
    console.log(e);

    if (e === "SELL") {
      const { data } = await getBoardListByToggle({
        sellstatus: 0,
      });
      setList(data.response);
    } else {
      const { data } = await getBoardListByToggle({
        sellstatus: 1,
      });
      setList(data.response);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{isError}</p>;

  if (!list) {
    return <p>loading</p>;
  }
  return (
    <StDiv>
      <div>
        <StInput
          type="text"
          placeholder="🥕 검색하고자 하는 키워드를 입력하세요."
          value={searchTitle}
          onChange={searchTitleChangeHandler}
        />
        <StSearchBtn onClick={btnSearch}>검색</StSearchBtn>
      </div>
      <StSecdiv>
        <StPostBtn onClick={btnGoToUpload}>게시글 업로드</StPostBtn>
        <div>
          <StSellBtn onClick={() => btnSellorSoldout("SELL")}>판매중</StSellBtn>
          <StSoldBtn onClick={() => btnSellorSoldout("SOULOUT")}>
            판매완료
          </StSoldBtn>
        </div>
      </StSecdiv>
      <ProductList products={list} />
    </StDiv>
  );
}

const StDiv = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  min-width: 600px;
  font-family: "Jalnan";
`;

const StSearchBtn = styled.button`
  width: 80px;
  height: 40px;
  font-size: 15px;
  font-family: "Jalnan";
  border-radius: 10px;
  background-color: tomato;
  border-color: tomato;
  cursor: pointer;
  color: white;
  margin-left: 10px;
`;

const StPostBtn = styled.button`
  width: 150px;
  height: 40px;
  font-size: 15px;
  font-family: "Jalnan";
  border-radius: 10px;
  border-color: #008000;
  background-color: #008000;
  cursor: pointer;
  color: white;
  margin-left: 10px;
`;

const StInput = styled.input`
  width: 350px;
  height: 20px;
  border-radius: 10px;
  font-family: "Jalnan";
  font-size: 12px;
  padding: 10px;
  border-color: #b2b2b2;
`;

const StSecdiv = styled.div`
  min-width: 800px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  /* gap : 500px; */
`;

const StSellBtn = styled.button`
  width: 100px;
  height: 40px;
  font-size: 15px;
  font-family: "Jalnan";
  border-radius: 10px;
  border-color: #008000;
  background-color: white;
  cursor: pointer;
  margin-left: 10px;
`;

const StSoldBtn = styled.button`
  width: 100px;
  height: 40px;
  font-size: 15px;
  font-family: "Jalnan";
  border-radius: 10px;
  border-color: tomato;
  background-color: white;
  cursor: pointer;
  margin-left: 10px;
`;
