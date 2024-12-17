import React, { useState } from "react";
import styled from "styled-components";
import Header from "./icons/Header";

// Styled-components
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 80px; /* Header 높이만큼 여백 추가 */
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
  }

  p {
    color: gray;
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

const GridItem = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 100%; /* 1:1 비율 */
`;

const NoPostsMessage = styled.div`
  font-size: 18px;
  color: gray;
  margin-top: 20px;
`;

const ProfilePage = () => {
  const [posts, setPosts] = useState([]); // 게시물 상태
  const [likedPosts, setLikedPosts] = useState([]); // 좋아요 누른 게시물 상태
  const [showLikes, setShowLikes] = useState(false); // 좋아요 누른 게시물 보기 상태

  // 좋아요 누른 게시물 보기 버튼 클릭 시
  const handleShowLikedPosts = () => {
    setShowLikes(true);
  };

  // 내가 올린 게시물 보기 버튼 클릭 시
  const handleShowMyPosts = () => {
    setShowLikes(false);
  };

  const displayPosts = showLikes ? likedPosts : posts;

  return (
    <Container>
      {/* 고정된 Header 컴포넌트 */}
      <Header />

      {/* 프로필 섹션 */}
      <Profile>
        <ProfilePicture>👤</ProfilePicture>
        <ProfileInfo>
          <h2>김동학</h2>
          <p>DevOps Engineer</p>
        </ProfileInfo>
      </Profile>

      {/* 버튼 그룹 */}
      <ButtonGroup>
        <Button onClick={handleShowMyPosts}>게시물</Button>
        <Button onClick={handleShowLikedPosts}>좋아요</Button>
      </ButtonGroup>

      {/* 게시물 그리드 */}
      {displayPosts.length > 0 ? (
        <Grid>
          {displayPosts.map((_, index) => (
            <GridItem key={index} />
          ))}
        </Grid>
      ) : (
        <NoPostsMessage>
          {showLikes ? "좋아요 누른 게시물이 없습니다." : "업로드한 게시물이 없습니다."}
        </NoPostsMessage>
      )}
    </Container>
  );
};

export default ProfilePage;
