import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';

const lightTheme = {
  background: '#fff',
  headerBackground: '#F9F9F9',
  gridItemBackground: '#eee',
  buttonBackground: '#ddd',
};

const darkTheme = {
  background: '#1F1E2B',
  color: '#fff',
  headerBackground: '#3B3865',
  gridItemBackground: '#D9D9D9',
  buttonBackground: '#555',
  buttonColor: '#fff',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.headerBackground};
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: ${({ active }) => (active ? 'red' : 'gray')};
  display: flex;
  align-items: center;

  &::before {
    content: ${({ icon }) => `"${icon}"`};
    margin-right: 0.5rem;
  }
`;

const Profile = styled.div`
  margin-top: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 65%;
  margin-top: 17.5rem;
  gap: 1rem;
`;

const GridItem = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  padding-bottom: 100%;
  background-color: ${({ theme }) => theme.gridItemBackground};
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin-top: 1rem;
`;


const Home = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태
  const [content, setContent] = useState(''); // 게시글 내용 상태
  const fileInputRef = useRef(null);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null); // 모달을 닫을 때 이미지도 초기화
  };

  // 파일 선택 시 이미지 미리보기 처리
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // 서버에 게시글 및 이미지 업로드 요청
  const handleUploadToServer = async () => {
    const file = fileInputRef.current.files[0]; // 선택된 파일 가져오기
    if (!file || !content) {
      alert("내용과 이미지를 모두 입력하세요.");
      return;
    }

    const formData = new FormData();
    formData.append('content', content); // 게시글 내용 추가
    formData.append('images', file); // 선택된 이미지 추가

    try {
      const response = await axios.post('https://4ad6-210-218-52-13.ngrok-free.app/post/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // 액세스 토큰
        },
      });

      console.log('게시글 및 이미지 업로드 성공:', response.data);
      closeModal(); // 업로드 후 모달 닫기
    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          Tistar
          <Actions>
            <Button onClick={openModal}>업로드</Button>
            <Button onClick={toggleTheme}>{theme === lightTheme ? '다크 모드' : '라이트 모드'}</Button>
          </Actions>
        </Header>
        <Grid>
          {Array.from({ length: 18 }).map((_, index) => (
            <GridItem key={index} onClick={openModal} />
          ))}
        </Grid>
        <Overlay isOpen={isModalOpen} onClick={closeModal} />
        <Modal isOpen={isModalOpen}>
          <h2>게시글 작성</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글 내용을 입력하세요."
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload} // 파일 선택 시 호출
          />
          <Button onClick={() => fileInputRef.current.click()}>파일 선택</Button>

          {/* 이미지 미리보기 */}
          {selectedImage && <ImagePreview src={selectedImage} alt="미리보기 이미지" />}

          <Button onClick={handleUploadToServer}>업로드</Button>
          <Button onClick={closeModal}>닫기</Button>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
