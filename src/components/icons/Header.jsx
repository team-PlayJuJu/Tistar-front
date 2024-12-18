import React, { useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom"; // Link import

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? "#333" : "#fff")};
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    transition: background-color 0.3s, color 0.3s; 
  }
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${(props) => (props.darkMode ? "#444" : "white")};
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #030153; /* 부모 색상 상속 inherit */
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 색상 상속 */
`;

const Icons = styled.div`
  button {
    border: none;
    background: none;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    color: inherit;
    transition: color 0.3s;
  }
`;

// 모달 내용 클릭 시, Overlay 이벤트 전파 막기
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  color: #000;
  padding: 1.5rem;
  border-radius: 1rem; /* 네모를 동글게 */
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 30%; /* 가로 좁게 */
  max-height: 80vh; /* 최대 세로 크기 제한 */
  height: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  pointer-events: auto;
`;


const ImagePreviewContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f4f4f4;
  border-radius: 1rem; /* 동글게 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  overflow: hidden;
  position: relative;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;



const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  background-color: #fff;
  color: #000;
  border-radius: 1rem;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-top: 1rem;
  resize: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem; /* 버튼 간 간격 */
  margin-top: 1rem;
  flex-direction: row; /* 가로로 배치 */
`;


const StyledButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: #ddd;
  color: #000;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #000;
    color: #ddd;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;


const Input = styled.input`
  display: none;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  /* 반투명 배경 */
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};  /* 모달이 열리면 보여짐 */
  z-index: 999;  /* 모달보다 아래에 위치 */
`;

const Header = ({ onPlusClick }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeIcon, setThemeIcon] = useState("☀️");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setThemeIcon(darkMode ? "☀️" : "🌙");
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setContent("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleUploadToServer = () => {
    if (!selectedImage || !content) {
      alert("내용과 이미지를 모두 입력하세요.");
      return;
    }
    console.log("업로드 실행");
    closeModal();
  };

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <HeaderContainer darkMode={darkMode}>
        <StyledLink to="/home">
          <Logo>TISTAR</Logo>
        </StyledLink>
        <Icons>
          <button onClick={openModal}>+</button>
          <button onClick={toggleDarkMode}>{themeIcon}</button>
          <Link to="/profile">
            <button>👤</button>
          </Link>
        </Icons>
      </HeaderContainer>

      {/* Overlay 추가: 모달 외부 클릭 시 닫기 기능 */}
      <Overlay isOpen={isModalOpen} onClick={closeModal} />

      {/* 모달 내용 클릭 시 Overlay 클릭 이벤트 전파 방지 */}
      <Modal isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
        <h2>게시글 작성</h2>

        {/* 사진 업로드 및 미리보기 */}
        <ImagePreviewContainer>
          {selectedImage ? (
            <ImagePreview src={selectedImage} alt="미리보기 이미지" />
          ) : (
            <span>이미지를 추가해주세요</span>
          )}
        </ImagePreviewContainer>

        {/* 내용 입력 */}
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="게시글 내용을 입력하세요."
        />

        {/* 파일 선택 버튼과 업로드 버튼을 가로로 배치 */}
        <ButtonGroup>
          <StyledButton onClick={() => fileInputRef.current.click()}>파일 선택</StyledButton>
          <StyledButton onClick={handleUploadToServer}>업로드</StyledButton>
        </ButtonGroup>

        {/* 파일 입력 */}
        <Input type="file" ref={fileInputRef} onChange={handleFileUpload} />
      </Modal>
    </>
  );
};

export default Header;
