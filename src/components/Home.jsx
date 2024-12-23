import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from './icons/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #000;
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
  background-color: #ffcccc;
  color: #ff0000;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  border: 1px solid #ff0000;
  max-width: 600px;
  text-align: center;
  margin-top: 20px;
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
        params: { sortBy: sortType },  // 'latests'로 정렬 기준 설정
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
        },
      });

      console.log('응답 데이터:', response.data);

      // 응답 데이터에서 'content' 배열을 사용하여 게시물 목록을 업데이트
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
    fetchPosts(sortType);  // sortType 값에 따라 게시물 불러오기
  }, [sortType]);

  // posts 상태에 따른 메시지 처리
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

      {loading && <p>Loading...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}  {/* 예쁜 에러 메시지 표시 */}

      <Grid>
        {posts.length > 0 ? (
          posts.map((post) => (
            <GridItem key={post.postId} src={post.imageUrl} alt="게시글 이미지" />
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
