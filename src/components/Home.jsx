import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from './icons/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff; /* theme 없이 직접 색상 설정 */
  color: #000; /* text color */
  min-height: 100vh;
  padding-top: 80px; /* Header 고정으로 상단 여백 추가 */
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #ddd; /* theme 없이 직접 색상 설정 */
  color: #000;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #000; /* hover 상태 색상 */
    color: #ddd;
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
  margin-top: 30px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${({ active }) => (active ? 'black' : 'gray')}; /* 클릭 시 글씨를 검은색으로 변경 */
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

const Home = () => {
  const [sortType, setSortType] = useState('LATEST');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (sortType) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
        params: { sortBy: sortType },
      });
      setPosts(response.data.content);
    } catch (error) {
      console.error('게시물 가져오기 중 오류 발생:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchPosts(sortType);
  }, [sortType]);

  return (
    <Container>
      <Header />
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
      <Grid>
        {posts?.map((post) => (
          <GridItem key={post.id} src={post.imageUrl} alt="게시글 이미지" />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;