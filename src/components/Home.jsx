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
  width: 75%;
  margin-top: 2rem;
`;

const GridItem = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 0.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 25px;  /* 하트 크기 줄이기 */
  color: ${(props) => (props.filled ? 'red' : 'white')};
  cursor: pointer;
  z-index: 1;
`;

const LikeCount = styled.span`
  position: absolute;
  top: 10px;
  right: 45px;  /* 하트 옆에 숫자가 위치하도록 조정 */
  font-size: 20px;
  color: white;
  z-index: 1;
`;

const ErrorMessage = styled.p`
  color: gray;
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
  const [sortType, setSortType] = useState('latests');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [themeIcon, setThemeIcon] = useState('☀️');

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
        const postsWithHeartData = await Promise.all(
          response.data.content.map(async (post) => {
            const heartResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/hearts`, {
              params: { postId: post.postId },
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': '69420',
              },
            });

            return {
              ...post,
              isHeart: heartResponse.data.isHeart,
              heartCount: heartResponse.data.HeartCount,
            };
          })
        );

        setPosts(postsWithHeartData);
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

  const handleLikeToggle = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }

      const postIndex = posts.findIndex((post) => post.postId === postId);
      const updatedPosts = [...posts];

      if (posts[postIndex].isHeart) {
        // 좋아요 취소
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/hearts`, {
          params: { postId },
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        });
        updatedPosts[postIndex].isHeart = false;
        updatedPosts[postIndex].heartCount -= 1;
      } else {
        // 좋아요 등록
        await axios.post(`${process.env.REACT_APP_BASE_URL}/hearts`, null, {
          params: { postId },
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': '69420',
          },
        });
        updatedPosts[postIndex].isHeart = true;
        updatedPosts[postIndex].heartCount += 1;
      }

      setPosts(updatedPosts);
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
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
            <GridItem key={post.postId}>
              <Image src={post.imageUrl} alt="게시글 이미지" />
              <HeartIcon
                filled={post.isHeart}
                onClick={() => handleLikeToggle(post.postId)}
              >
                {post.isHeart ? '❤️' : '🤍'}
              </HeartIcon>
              {post.heartCount > 0 && (
                <LikeCount darkMode={darkMode}>{post.heartCount}</LikeCount>
              )}
            </GridItem>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
