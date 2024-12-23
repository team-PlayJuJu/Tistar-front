import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from './icons/Header';

// 기본 스타일 설정
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #000;
  min-height: 100vh;
  padding-top: 80px;
  position: relative;  /* 로딩과 에러 메시지가 중앙에 오도록 설정 */
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
  color: ${({ active }) => (active ? 'black' : 'gray')};
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

// 에러 메시지 스타일
const ErrorMessage = styled.p`
  color: #444;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  z-index: 10;  /* 에러 메시지가 로딩 스피너 위에 표시되도록 */
`;

// 로딩 스피너 스타일
const Loader = styled.div`
  border: 5px solid #f3f3f3; /* 배경 색 */
  border-top: 5px solid #3498db; /* 스피너 색 */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;  /* 로딩 스피너가 에러 메시지 뒤에 표시되도록 */
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Home = () => {
  const [sortType, setSortType] = useState('latests');  // 기본값을 'latests'로 설정
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async (sortType) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        console.error('토큰이 없습니다.');
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

      console.log('응답 데이터:', response.data);

      if (response.data && Array.isArray(response.data.content)) {
        setPosts(response.data.content);
      } else {
        console.error('잘못된 응답 데이터 구조:', response.data);
        setError('잘못된 응답 데이터 구조');
      }
    } catch (error) {
      console.error('게시물 가져오기 중 오류 발생:', error);
      setError('게시물 가져오기 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(sortType);
  }, [sortType]);

  useEffect(() => {
    if (posts.length === 0) {
      setError('게시물이 없습니다.');
    } else {
      setError(null);
    }
  }, [posts]);

  return (
    <Container>
      <Header />
      <Tabs>
        <Tab active={sortType === 'latests'} onClick={() => setSortType('latests')}>
          🌟 최신순
        </Tab>
        <Tab active={sortType === 'hearts'} onClick={() => setSortType('hearts')}>
          🔥 인기순
        </Tab>
        <Tab active={sortType === 'oldests'} onClick={() => setSortType('oldests')}>
          ⏰ 오래된순
        </Tab>
      </Tabs>

      {/* 로딩 스피너는 loading 상태일 때만 표시 */}
      {loading && <Loader />}

      {/* 에러 메시지는 error 상태가 있을 때만 표시 */}
      {error && !loading && <ErrorMessage>{error}</ErrorMessage>}

      <Grid>
        {posts.length > 0 ? (
          posts.map((post) => (
            <GridItem key={post.postId} src={post.imageUrl} alt="게시글 이미지" />
          ))
        ) : null}
      </Grid>
    </Container>
  );
};

export default Home;
