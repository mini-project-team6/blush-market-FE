import useInput from '../hooks/useInput';
import React ,{ useState } from 'react'
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { uploadPost } from '../api/upload/upload';

const UploadForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const mutation = useMutation(uploadPost,{
    onSuccess: () => {
      queryClient.invalidateQueries("newPost")
    },
  });

  const [newpost, setNewPost] = useState({
    title : '',
    content : '',
    image : ''
  });

  const fileInput = React.useRef(null);
  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  }

  const [newtitle, onTitleHandler] = useInput('');
  const [newcontent, onContentHandler] = useInput('');
  const [newimage, onImageHandler] = useInput('');

  // const onChangeHandler = (event) => {
  //   const {name, value} = event.target;
  //   setNewPost ({...newpost, [name]: value});
  // }
  
  const onSubmitPostHandler = async (event) => {
    event.preventDefault();
    if ( newtitle.trim()=== "" || newcontent.trim()=== "" || newimage.trim()=== ""){
      return alert("빈칸을 채워주세요");
    } 
    const newPost = {
      title : newtitle,
      content : newcontent,
      image : newimage
    };
    mutation.mutate(newPost);
    alert("업로드 완료");
  }
  
  return (
    <form onSubmit={onSubmitPostHandler}>
      <StCard>
        <label> Title </label><br />
        <input
          type = 'text'
          value={newtitle}
          onChange={onTitleHandler}
        /> <br />
        <label> Content </label> <br />
        <input
          type = 'text'
          value={newcontent}
          onChange={onContentHandler}
        /> <br />
        <StpicInput 
          type="file" 
          placeholder="사진업로드"
          accept="image/*"
          ref={fileInput}
          value = {newimage} 
          onChange={onImageHandler} /> <br />
        <StupicBtn> 업로드 </StupicBtn> 
        {/* <StuploadBtn onClick={()=>navigate('/')}> 게시 </StuploadBtn> */}
      </StCard>
    </form>
  )
}

export default UploadForm

const StCard = styled.section`
background-color: #dadada;
display : block;
padding: 20px;
margin : auto;
`;

const StupicBtn = styled.button`
  height : 30px;
  width : 100px;
`
const StuploadBtn = styled.button`
  height : 30px;
  width : 100px;
`
const StpicInput = styled.input`
  height : 30px;
  width : 200px;
`
