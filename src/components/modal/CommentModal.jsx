import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import CommentModalContent from "./CommentModalContent";

export default function CommentModal() {
  // 모달창이 열려있는지 여부를 관리할 상태 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // 모달창이 열리면 페이지 스크롤을 막도록 처리
  function handleModalOpen() {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  }

  // 모달창이 닫히면 페이지 스크롤을 다시 가능하도록 처리
  function handleModalClose() {
    document.body.style.overflow = "unset";
    setIsModalOpen(false);
  }
  return (
    <>
      <StDiv>
        <Button onClick={handleModalOpen}>댓글 달기</Button>
      </StDiv>

      {isModalOpen && (
        <ModalOverlay onClick={handleModalClose}>
          <ModalContent
            isOpen={isModalOpen}
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <CloseButton onClick={handleModalClose}>X</CloseButton>
            <CommentModalContent />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0%);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(100%);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  /* background-color: tomato; */
  z-index: 100;
`;

const ModalContent = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 50%;
  margin: 0 auto;
  width: 100%;
  max-width: 80%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  cursor: pointer;
`;
const Button = styled.button`
  width: 500px;
  height: 40px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: tomato;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.2);
    background-color: #4caf50;
  }
`;

const StDiv = styled.div`
  margin-top: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
`;
