import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./icons/Header";
import axios from "axios";

// GlobalStyle for dark mode
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? "#333" : "#fff")};
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    transition: background-color 0.3s, color 0.3s; 
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 80px;
`;

const Profile = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePicture = styled.div`
  font-size: 60px;
  background-color: #f0f0f0;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileInfo = styled.div`
  h2 {
    margin: 10px 0 5px;
    display: inline-block;
    margin-right: 5px;
  }

  p {
    color: gray;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #888;

  &:hover {
    color: #555;
  }

  &::before {
    content: "✏️";
    font-size: 20px;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 18px;
  margin: 0 10px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin: 20px auto;
  max-width: 600px;
`;

const GridItem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const NoPostsMessage = styled.div`
  font-size: 18px;
  color: gray;
  margin-top: 20px;
`;

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [themeIcon, setThemeIcon] = useState("☀️");
  const [showLikes, setShowLikes] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setThemeIcon(darkMode ? "☀️" : "🌙");
  };

  const fetchPosts = async () => {
    setShowLikes(false);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("토큰이 없습니다.");
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (response.data && Array.isArray(response.data.content)) {
        const sortedPosts = response.data.content.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      } else {
        setError("잘못된 응답 데이터 구조");
      }
    } catch (error) {
      setError("게시물 가져오기 중 오류 발생");
    }
  };

  const showLikedPosts = () => {
    setShowLikes(true);
    setPosts([]); // 좋아요 표시 시 기존 게시물 초기화
  };

  return (
    <Container>
      <GlobalStyle darkMode={darkMode} />
      <Header onPlusClick={toggleDarkMode} />

      {/* 프로필 섹션 */}
      <Profile>
        <ProfilePicture>👤</ProfilePicture>
        <ProfileInfo>
          <h2>이건주</h2>
          <EditButton></EditButton>
          <p>Back-end</p>
        </ProfileInfo>
      </Profile>

      {/* 버튼 그룹 */}
      <ButtonGroup>
        <Button onClick={fetchPosts}>게시물</Button>
        <Button onClick={showLikedPosts}>좋아요</Button>
      </ButtonGroup>

      {/* 게시물 그리드 */}
      {showLikes ? (
        <NoPostsMessage>좋아요를 누른 게시물이 없습니다.</NoPostsMessage>
      ) : posts.length > 0 ? (
        <Grid>
          {posts.map((post) => (
            <GridItem key={post.postId} src={post.imageUrl} alt="게시물 이미지" />
          ))}
        </Grid>
      ) : (
        <NoPostsMessage>게시물이 없습니다.</NoPostsMessage>
      )}

      {error && <div>{error}</div>}
    </Container>
  );
};

export default ProfilePage;
