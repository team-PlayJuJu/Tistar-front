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
  color: ${({ active }) => (active ? 'black' : 'gray')};
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

const Home = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('최신순');
  const fileInputRef = useRef(null);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰 가져오기
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      console.log('Access Token:', accessToken);
    }

    if (refreshToken) {
      console.log('Refresh Token:', refreshToken);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('images', file);
    formData.append('content', "hello");

    try {
      const response = await axios.post('https://ae0f-210-218-52-13.ngrok-free.app/post/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,  // 로컬 스토리지에서 액세스 토큰 가져오기
        },
      });

      // 서버로부터 새로운 토큰이 전달될 경우 로컬 스토리지에 저장
      const { accessToken, refreshToken } = response.data;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
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
        <Tabs>
          <Tab
            active={activeTab === '최신순'}
            onClick={() => setActiveTab('최신순')}
            icon="✨"
          >
            최신순
          </Tab>
          <Tab
            active={activeTab === '인기순'}
            onClick={() => setActiveTab('인기순')}
            icon="🔥"
          >
            인기순
          </Tab>
          <Tab
            active={activeTab === '오래된순'}
            onClick={() => setActiveTab('오래된순')}
            icon="⏰"
          >
            오래된순
          </Tab>
        </Tabs>
        <Profile>
          <div>프로필</div>
        </Profile>
        <Grid>
          {Array.from({ length: 18 }).map((_, index) => (
            <GridItem key={index} onClick={openModal} />
          ))}
        </Grid>
        <Overlay isOpen={isModalOpen} onClick={closeModal} />
        <Modal isOpen={isModalOpen}>
          <h2>안녕하세요</h2>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button onClick={() => fileInputRef.current.click()}>파일 업로드</Button>
          <Button onClick={closeModal}>닫기</Button>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
