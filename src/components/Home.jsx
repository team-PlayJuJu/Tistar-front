import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';
import Header from './icons/Header';

const lightTheme = {
  background: '#fff',
  headerBackground: '#F9F9F9',
  gridItemBackground: '#eee',
  buttonBackground: '#ddd',
  buttonColor: '#000',
  textareaBackground: '#fff',
  textareaColor: '#000',
  inputBackground: '#fff',
  inputColor: '#000',
};

const darkTheme = {
  background: '#1F1E2B',
  color: '#fff',
  headerBackground: '#3B3865',
  gridItemBackground: '#D9D9D9',
  buttonBackground: '#555',
  buttonColor: '#fff',
  textareaBackground: '#333',
  textareaColor: '#fff',
  inputBackground: '#333',
  inputColor: '#fff',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  min-height: 100vh;
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonColor};
    color: ${({ theme }) => theme.buttonBackground};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 65%;
  margin-top: 2rem;
`;

const GridItem = styled.img`
  width: 100%;
  height: 200px; /* 고정된 높이 */
  object-fit: cover; /* 이미지 비율 유지하며 채우기 */
  border-radius: 0.5rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
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
  width: auto;
  height: auto;
  object-fit: contain;
  margin-top: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.textareaBackground};
  color: ${({ theme }) => theme.textareaColor};
  border: none;
  padding: 1rem;
  margin-top: 1rem;
  resize: none;
`;

const Input = styled.input`
  display: none;
`;

const Home = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState('');
  const [sortType, setSortType] = useState('default');
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleUploadToServer = async () => {
    const file = fileInputRef.current.files[0];
    if (!file || !content) {
      alert('내용과 이미지를 모두 입력하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    formData.append('images', file);

    try {
      const response = await axios.post('https://dd4b-210-218-52-13.ngrok-free.app/post/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // 새 이미지 추가
      if (posts == null) {
        setPosts([
          { id: response.data.id, imageUrl: URL.createObjectURL(file) },
        ]);
      } else {
        setPosts((prevPosts) => [
          { id: response.data.id, imageUrl: URL.createObjectURL(file) },
          ...prevPosts,
        ]);
      }

      setContent('')
      closeModal();
    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
    }
  };

  const fetchPosts = async (sortType) => {
    try {
      const response = await axios.get('https://dd4b-210-218-52-13.ngrok-free.app/posts', {
        params: { sortBy: sortType },
      });
      setPosts(response.data.content);
    } catch (error) {
      console.error('게시물 가져오기 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchPosts(sortType);
  }, [sortType]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header onPlusClick={openModal} />
        <Tabs>
          <Tab active={sortType === 'LATEST'} onClick={() => setSortType('LATEST')}>
            🌟 최신순
          </Tab>
          <Tab active={sortType === 'HEARTS'} onClick={() => setSortType('HEARTS')}>
            🔥 인기순
          </Tab>
          <Tab active={sortType === 'OLDEST'} onClick={() => setSortType('OLDEST')}>
            ⏰ 오래된순
          </Tab>
        </Tabs>
        {/* 이미지 그리드 */}
        <Grid>
          {posts?.map((post) => (
            <GridItem key={post.id} src={post.imageUrl} alt="게시글 이미지" />
          ))}
        </Grid>
        {/* 모달 */}
        <Overlay isOpen={isModalOpen} onClick={closeModal} />
        <Modal isOpen={isModalOpen}>
          <h2>게시글 작성</h2>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글 내용을 입력하세요."
          />
          <Input type="file" ref={fileInputRef} onChange={handleFileUpload} />
          <StyledButton onClick={() => fileInputRef.current.click()}>파일 선택</StyledButton>
          {selectedImage && <ImagePreview src={selectedImage} alt="미리보기 이미지" />}
          <StyledButton onClick={handleUploadToServer}>업로드</StyledButton>
          <StyledButton onClick={closeModal}>닫기</StyledButton>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
