import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getDetailPost } from "../../api/detail/getdetail";
import useInput from "../../hooks/useInput";

export default function CommentList() {
  // const [newcomment, onCommentHandler] = useInput('');
  // const { id } = useParams();
  // const { data } = useQuery("post", getDetailPost);

  return (
    <ScrollableDiv>
      <h1 style={{ textAlign: "center" }}>댓글</h1>
      <h5>content</h5>
      <div>
        {/* <div> {response} </div> */}
        {/* {data?.map((i) => {
          return (
            <div key = {i.id}> 
              <div> {i.content}</div>
            </div>
          )
        })} */}
      </div>
    </ScrollableDiv>
  );
}

const ScrollableDiv = styled.div`
  margin-top: 10px;
  /* 스크롤바를 추가할 div 태그에 적용할 스타일 */
  overflow: auto; /* 스크롤바 표시를 위해 overflow 속성 값을 auto로 설정 */
  height: 80%; /* 스크롤바 영역의 높이를 지정 */
  background-color: white;

  /* 스크롤바 스타일 설정 */
  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
    height: 10px; /* 스크롤바의 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background: gray; /* 스크롤바 색상 */
    border-radius: 5px; /* 스크롤바 모서리의 반경 */
  }
`;
