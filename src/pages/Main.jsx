import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getBoardList } from "../api/board/board";
import { useDispatch, useSelector } from "react-redux";
import { reduxGetBoardList } from "../redux/module/boardSlice";

export default function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, data } = useQuery("lists", getBoardList, {
    onSuccess: (response) => {
      console.log(response.data);
      dispatch(reduxGetBoardList(response.data));
    },
  });

  // console.log("bl", boardList);
  // const boardList = useSelector((state) => state.boards.boards);
  const boardList = useSelector((state) => state.boards.boards);

  // console.log(boardList);

  const [searchTitle, setSearchTitle] = useState("");
  const searchTitleChangeHandler = (e) => {
    setSearchTitle(e.target.value);
    const filterBoardList = boardList.filter((item) =>
      item.title.includes(searchTitle)
    );
    console.log(filterBoardList);
  };

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

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{isError}</p>;
  return (
    <StDiv>
      <input
        type="text"
        placeholder="검색창"
        style={{ width: "300px" }}
        value={searchTitle}
        onChange={searchTitleChangeHandler}
      />
      <button onClick={btnGoToUpload}>게시글 업로드</button>
      <div>
        <button>판매중</button>
        <button>판매완료</button>
      </div>

      {boardList
        ?.filter((item) => item.title.includes(searchTitle))
        ?.map((target, index) => {
          return <p key={index}>{target.title}</p>;
        })}
      <StGridDiv>
        <Link to="Detail">
          <StCard>
            <img
              alt="홍당무"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIWERISCBUREhgZHCMYGhIWGBkRGRoYGRkZHRkaGRocITElHB8rHxgaJjgmKy8xNTU1GiQ7QDs0Qy40NTEBDAwMEA8QHxISHzYrJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NP/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcBAv/EAD4QAAICAQIDBQQHBgUFAQAAAAABAgMEERIFITEGE0FRYSIycZEUQlKBkqHBBzNygrHRNVOiwuEjJGNzsxX/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMFBAYB/8QALBEBAAIBBAEACAcBAAAAAAAAAAECAwQREiExBRMyUWGBofAUIjNxscHRQf/aAAwDAQACEQMRAD8A7MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrZuTGuqy2z3YRlN/CKbf8AQD3Ly6647sucK19qclBfNn1TfCcVOiUZxfSUWpJ/Bo5fYlONeVxeEMjIuirErIqyuiqfOEK4S1jrpzbf/I4JesfIldiru4zi1OmuKjXOenszcOSTT+zpr/XktrMdb8ZRm9Inbd067Lri0rpwg30UpRi38E2Z0/I4ouGwnunxFK+yfOdk1ucm/LXovJFi7A5MqsuWGpSlVKp2QhJuXdyhJRko69ItSXLpyGLWUyX4RD5F6zO0OlAA60wAAAAAAAAAAAAAAAAAAAAAAAA0+I59dFU7syW2EPelo3pq0lyXN82jcK/24q3cMzEuelcp/g9v/aH2PLVr7fcMlJRje9W9OcLEtenXaSXGu0WLi7FxOzu3PXatspt7dNfdT818zgvBKd+Xi19d1sI6ejsj+h0b9slH/Tw7PKc4fjjGX+xlcWnbdZNIiYhbuE9rMLJs7rh9u+eje1xnDlHTV+0kvEnjjP7JKN2fZN/Upl85Tgv0Z2YlWd43QtG07AAJIvNTnfFeNX5Vdjqsji4knKuMlBW35CWsZuKk1GEObWvNnQLoboyinpqmtfitDkOJbpTTj2axnjxdM4PqpxnNt/emnqc2qyzjx7w+WtxrybNko6Vxr36VwjBObUpNQioptpJa6JeB8EZDJUcm1ZU9uqXdxk9Itc9WvDXVkkYuSJ33t/3ty3iY7l6Ysa/JoyvpPDnS5d33eyxSa2uW6Wji1o20ufoZT5lNL32l8XofMd7Y7cq+XytprO8L52V7SLLjZG6HdXVtKde7ctJa7ZRfjF6P4aFjOadgtZcSunQ9YRoUJtc1vdmsVr56JnSzfw3m+OLT5dm+8bgALQAAAAAAAAAAAAAAAAAAAAADT4rj95j319d9co6ee6LX6m4Y7ZaRk/JN/JAcP7FcDyv/ANHFllY99cYy3ylOE4JbYya1bWnvJIv/AO1Hh87cGP0WE7JQsjLbCLnLRqUW9Fz+siF7I9vsvJzKaMqGOoz11cIzUlpCUlo3J+XkW3trxmzEw5X4ahKSlGKU03H2paPkmv6lcRHGdltpnlCqfsl4VdXPLnm1216xhGO+Eoa85uWm5c9PZ+Z00pv7P+01+bHIefGqLrcVHYnHVSUtddZP7JciVfHSF99+wAx2WRinKxqKXWTaSXxbJIshTe3XBMd03Zrc6ra4OSsrai57V7MJp8pJvRc+fM38rttw2DcZZFc5L6talc/9CZWO2PazCyMWVGPZbFuUJSUqbIqUYyUmtXFadF8iF5rxndKsSrlsYzqrrzn7dkdE0ue7bq2vLQU4du6LyrnNR5qMVs108ZvXn8DWqza55W5TjthDSOr26yk/a018ktCXk0k3Lklz19DCtNqRt43+H8OS02p199te/PrhZGu2WjktVr09NX4a8/kYOMQi41qcYzfeR21vnvbkk46eOqbX3lw7C8DrtxrsjidcbFky9mE1uSpr1VfJ9G3ulqvQnuG9kMCixW4lEVJc4ylKVm1+cd7e37juxaHaa23/AHXVxRWYnfuEnw/h1FEO74fXXVHXXbCKim/FvTq/Vm6eHppJgAAAAAAAAAAAAAAAAAAAAAAAB8yWq0Z9ACJw+zuFVNWYWNjVTXScK4QktVo9Gly5G3nYVV0HXnQhbF6NwnFTjqnqno/Jm2D5sNHh/CsehSXDqaqVJ6yVcIw1a6N6LmbwIftJxhY2NK1R3zbUK611sslyhFff19Ex4PLW4/2g7qcMbhsPpOTNaxpT0UY/5lsvqwX5lSzMNWS3cdsedZ12auGJW/KFaft/xS6m1HHePCcLZb8m328m/q5N9K4vwhFPTT+5rmXq9ZMTwpP7y1tHootXnf5R/r2MtFtqUYR8IQShFfCMdENzPAZczM9y1q1isbV6YMjErmtL4Qn/ABRT/Mh87gMtk48MnKCktHVKTcGn4Rk+cCfBOmS1PEq8mDHkja8LP2U7QUXwVFcXj2VxUZYstNYxS0Ti/rx5dV95ZEcozsRycLMWTrug91dq5NNeD84vo16svXZXjiyqN813dkHstr+zNeXo1zX/AAbmm1MZq/GPLC1WlnDPwlPAA6nIAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSuJXK3icnP2q8CtT2+Dybtdn3xgtV5ORdGc34dduw7b31y8iy3Xx2ReyC+UUU578Mc29y7T4/WZIr7/v8Ahjvu96d8kteblJ6Ln5swY+ZXPX6NOE9OqjJS/oamRGM77fpUFfGjGnkQxpauFliltW+K96MVz0IvG4i8jFzLr68euzGjGyvIprVPNy291PbykpLXRP1MrFo/WY+Uz3LWy631eThFeo6WcHieqTfLl0NS3JslOVXD4QnOMd87JzVVdcPCU5vpr5HJTHa9uNY7d18laV5WnpuA0YZNsZVx4hCrbZqq76Jq+qcl1hu5OMvRo3hkx2xztaHzHlpkjlSd4D54Lk/R+JUzXKGSu5sXhvWrqk/XrH7z6I7jk9lcLF1rtrsT9Y2R/uW6a/DLWVWqpF8No+brh6eI9PQvNgAAAAAAAAAAAAAAAAAAAAAAAAAAAACP45kd3iZNn2Kpy/DBv9CmYWG/ovDqIuMduNCTcnoluW6TfyLH26nt4Xntf5M184tfqV/ia0dMfs1Vx+UF/c4tfO2Lv3w7vR9d8vXun7+qP4jw6UZ1zrslTbFbq7IP2oqXhJPrGS+qzVsx7rNq4pdGyEZb1TXXHHg5r681H3n8TeI7jMG4QUoznWpxdsK+U5VJ+1GPNdfiZmPLeZ9XWdon6NTJhpEesvXeY+/DerujLXu5Rlp12tS0+OhDZlcGszFyrIUfSJV213z1VcpVJp12SS9ldGn5m1xzJ4VKuM+zUHTlQlHZXXTOrem1ujYtNrWmvN8yQnCMk42KMk+sWlJfJl0x+EyRMdxMKon8ZjmJjjMSgMPHjCiGHRbVkTlkRybJ0yc66oQjol3jS3Tl6LwLCe4VFUWoz0rhzbVcUtfRJctX5mXIhCLiqZb+WremiT8l56LQpz5Zy/m8RHXntbp8cYfyT3M9+OmEjePR3VRrXWdkIL4ysiSRhxqO94hg0rmozeRP+Gpaw1/naIaavLLWPis1VuOK0/B1FHp4j09G8yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK3+0H/Cc7/wBUv0ITjH73+SH/AM4k928hrwrPX/hm/ktf0K/xKWs4S86q3864mf6R/S+f+tH0b+r8p/pqAAxm4AAAAABIdgMbfkZmXLomsaD9Ie1Nr0cpL8JVuNd/CM7cS2S10jGlwjPWb0jFQfVNs6f2Z4UsbEpoXNxj7T85y5zf4mzU9H4u5yMn0jmnjGPZLAA1WQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI/juP3mJk1/bqnH8UJL9Sh0Xd5jYNn2savX4xTi/zidL+Jy/h9eymWPLrjX2UfyOW+v8A0zfyOLX13wz8p+ru9H22zR8d4+jKADDb4AABgzLZxhuordr19xSUXp4tN+PoZzTz8xwgvoy7yyTUK4R5uU5cor4eLJUrNrRERuhktFazMzszdlqXmZsJW1zrrxvblGemsrn+7XJteyk5fcvM6iiG7L8GWLjQqbUpt77LPt2S95/DwXokTR6LDjjHSKw81myzkvNpAAWqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKD2jxu54g5rlDLgo6+Cyaddn3yg3FeqL8RfH+EQyseVN7cddJRmvehOPOM4+qZDJSL1msp47zS0WhRwav0icbHj8XSrvXXwhYv8yt9Gn106p8jbPOZMdsduNnpsWWuSvKrwA0sjiEIzVdKlbZL3aa1vm38F7q9WRrWbTtVK1q1jeZ2Z8rIhXCVmRJRilq3+i82SXYPsuoTln5lSqnP91Tp+7g+s5LwnJeHgvi0tjgHZKcpwye0W1zi91eLF7oVvwlJ9Jz/ACXry0u6Rt6TSzijlbyw9Zq4yzxr4j6vQAdrgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABG8W4Pj5Nfd8SrjZHqteUovzjJc4v1TK1Z2B0f/Y5uXXHwhPZel6JyWv5l3BG1K29qN0q3tT2Z2UqvsBB/wCIZeXcvsRlGiL+Oxa/mWLhPBMXGjt4bVXVr1klrKX8U3rKX3skwK0rX2Y2LXtb2p3AASRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z"
            ></img>
            <p>title</p>
            <span>판매완료</span>
          </StCard>
        </Link>
      </StGridDiv>
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

const StGridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 90%;
  text-align: center;
`;

const StCard = styled.section`
  background-color: gray;
  border: 1px solid black;
  margin: 10px;
`;
