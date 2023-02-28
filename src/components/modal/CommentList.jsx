import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { baseURL } from "../../api/axios";
import styled from "styled-components";
// import { getDetailPost } from "../../api/detail/getdetail";
import useInput from "../../hooks/useInput";
import { useEffect, useState } from "react";

export default function CommentList() {
  const param = useParams();
  const [commentList, setCommentList] = useState([]);
  const getDetailPost = async () => {
    // console.log(`/api/post/${param}`);
    const data = await baseURL.get(`/api/post/${param.id}`);
    return data;
  };
  const { isLoading, isError, data } = useQuery("details", getDetailPost, {
    onSuccess: (response) => {
      setCommentList(response.data.response.commentList.reverse());
    },
  });

  const deleteComment = async (payload) => {
    const data = await baseURL.delete(`/api/post/comment/${payload}`);
    return data;
  };
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("details");
    },
  });
  const onDeleteComment = (e) => {
    console.log(e);
    deleteMutation.mutate(e);
  };
  // useEffect(() => {
  //   const getDetailPost = async () => {
  //     const { data } = await baseURL.get(`/api/post/${id}`);
  //     console.log(data);
  //     return data.response;
  //   };
  //   getDetailPost().then((result) => setDetail(result));
  // }, [id]);

  // const [newcomment, onCommentHandler] = useInput('');
  // const { id } = useParams();
  // const { data } = useQuery("post", getDetailPost);
  // useEffect(() => {
  //   commentList.reverse();
  // }, []);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{isError}</p>;
  return (
    <ScrollableDiv>
      <h1 style={{ textAlign: "center" }}>댓글</h1>
      {commentList?.map((item) => {
        return (
          <div>
            <p>
              {item.username} : {item.content}
              <span>
                {item.ismine ? (
                  <button onClick={() => onDeleteComment(item.id)}>X</button>
                ) : null}
              </span>
            </p>
          </div>
        );
      })}
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

// const StCommentDiv =
