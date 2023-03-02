import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

function ProductList({ products }) {
  return (
    <>
      <StGridDiv>
        {products.map((target, index) => {
          return (
            <StLink to={`detail/${target.id}`} key={index}>
              <StCard key={target.id} soldOut={target.sellState !== "SELL"}>
                <StImg alt="홍당무" src={target.image}></StImg>
                <StFlexdiv>
                  <StTitleP maxLength={16}>{target.title}</StTitleP>
                  <StStateP>
                    {target.sellState === "SELL" ? "판매중" : "판매완료"}
                  </StStateP>
                </StFlexdiv>
              </StCard>
            </StLink>
          );
        })}
      </StGridDiv>
    </>
  );
}

export default memo(ProductList);

const StGridDiv = styled.div`
  display: flex;
  flex-wrap : wrap;
  /* background-color : pink; */
  text-align: center;
  min-width: 800px;
  max-width: 1000px;
  gap: 40px;
  padding: 10px;
`;

const StCard = styled.section`
  background-color: white;
  margin: 10px;
  border-radius : 12px 12px 0px 0px; 
  width: 200px;
  height: 200px;
  margin-right: -10px;
  // soldOut 값이 true인 경우, filter 속성을 사용하여 블러 처리
  ${({ soldOut }) =>
    soldOut &&
    css`
      filter: blur(1px);
      opacity: 0.6;
    `}
`;
const StImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius : 12px 12px 0px 0px; 
  border : 0.3px solid;
`;

const StTitleP = styled.p`
  font-size: 13px;
  font-weight: bold;
  padding: 0px 10px 0px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ maxLength }) =>
    maxLength &&
    css`
      max-width: ${maxLength * 1.1}ch;
    `}
`;

const StStateP = styled.p`
  font-size: 13px;
  color : white;
  padding: 0px 10px 0px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ maxLength }) =>
    maxLength &&
    css`
      max-width: ${maxLength * 1.1}ch;
    `}
`;

const StFlexdiv = styled.div`
  display: flex;
  width: 200px;
  border : 0.5px solid;
  border-color : tomato;
  text-align: center;
  background-color: tomato;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-top: -3px;
  justify-content : space-between;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

