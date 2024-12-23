import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Header from './icons/Header';

// 글로벌 스타일 설정
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? '#333' : '#fff')};
    color: ${(props) => (props.darkMode ? '#fff' : '#000')};
    transition: background-color 0.3s, color 0.3s;
  }
`;

// 기본 스타일 설정
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 80px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 30px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${({ active, darkMode }) => (active ? (darkMode ? '#fff' : 'red') : 'gray')};
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
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: ${(props) => (props.darkMode ? '#ddd' : 'gray')};
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const Loader = styled.div`
  border: 5px solid ${(props) => (props.darkMode ? '#555' : '#f3f3f3')};
  border-top: 5px solid ${(props) => (props.darkMode ? '#fff' : '#3498db')};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Home = () => {
  const [sortType, setSortType] = useState('latests'); // 기본값을 'latests'로 설정
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // 다크 모드 상태
  const [themeIcon, setThemeIcon] = useState('☀️'); // 테마 아이콘

  const fetchPosts = async (sortType) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('토큰이 없습니다.');
        return;
      }

      setLoading(true);

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post`, {
        params: { sortBy: sortType },
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (response.data && Array.isArray(response.data.content)) {
        setPosts(response.data.content);
      } else {
        setError('잘못된 응답 데이터 구조');
      }
    } catch (error) {
      setError('게시물 가져오기 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(sortType);
  }, [sortType]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setThemeIcon(darkMode ? '☀️' : '🌙');
  };

  return (
    <Container>
      <GlobalStyle darkMode={darkMode} />
      <Header onPlusClick={toggleDarkMode} />
      <Tabs>
        <Tab active={sortType === 'latests'} darkMode={darkMode} onClick={() => setSortType('latests')}>
          🌟 최신순
        </Tab>
        <Tab active={sortType === 'hearts'} darkMode={darkMode} onClick={() => setSortType('hearts')}>
          🔥 인기순
        </Tab>
        <Tab active={sortType === 'oldests'} darkMode={darkMode} onClick={() => setSortType('oldests')}>
          ⏰ 오래된순
        </Tab>
      </Tabs>

      {loading && <Loader darkMode={darkMode} />}
      {error && <ErrorMessage darkMode={darkMode}>{error}</ErrorMessage>}

      <Grid>
        {posts.length > 0 &&
          posts.map((post) => (
            <GridItem key={post.postId} src={post.imageUrl} alt="게시글 이미지" />
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
