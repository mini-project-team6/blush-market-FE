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

  // console.log("data", data?.data.response);
  // const boardList = data?.data.response;
  console.log("list", list);

  // console.log("bl", boardList);
  // const boardList = useSelector((state) => state.boards.boards);
  // let boardList = useSelector((state) => state.boards.boards) || [];
  // console.log(boardList.length);
  // if (boardList?.length) {
  //   console.log("빈배열");
  // }

  // console.log(boardList);

  //업로드시 토큰확인
  const istoken = () => !!localStorage.getItem("access_token");
  const btnGoToUpload = () => {
    if (istoken()) {
      navigate("/upload");
    } else {
      alert("로그인하세요");
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
        <input
          type="text"
          placeholder="검색창"
          style={{ width: "300px" }}
          value={searchTitle}
          onChange={searchTitleChangeHandler}
        />
        <button onClick={btnSearch}>검색</button>
      </div>
      <button onClick={btnGoToUpload}>게시글 업로드</button>
      <div>
        <button onClick={() => btnSellorSoldout("SELL")}>판매중</button>
        <button onClick={() => btnSellorSoldout("SOULOUT")}>판매완료</button>
      </div>

      <ProductList products={list} />

      {/* {boardList
        .filter((item) => item.title.includes(searchTitle))
        .map((target, index) => {
          return <p key={index}>{target.title}</p>;
        })} */}
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
`;
