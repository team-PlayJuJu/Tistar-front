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
    content: "✏️"; /* 연필 아이콘 */
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

// Modal styled-components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  box-sizing: border-box; /* 박스 크기 계산에 padding 포함 */
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* padding을 포함하여 width를 정확하게 계산 */
`;

const ProfilePage = () => {
  const [posts, setPosts] = useState([]); // 게시물 상태
  const [likedPosts, setLikedPosts] = useState([]); // 좋아요 누른 게시물 상태
  const [showLikes, setShowLikes] = useState(false); // 좋아요 누른 게시물 보기 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [name, setName] = useState("이건주"); // 프로필 이름 상태
  const [occupation, setOccupation] = useState("Back-end"); // 프로필 직업 상태

  // 좋아요 누른 게시물 보기 버튼 클릭 시
  const handleShowLikedPosts = () => {
    setShowLikes(true);
  };

  // 내가 올린 게시물 보기 버튼 클릭 시
  const handleShowMyPosts = () => {
    setShowLikes(false);
  };

  // 프로필 수정하기 버튼 클릭 시
  const handleEditProfile = () => {
    setIsModalOpen(true); // 모달 열기
  };

  // 프로필 수정 완료 후 모달 닫기
  const handleSaveProfile = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 프로필 정보 수정
  const handleNameChange = (e) => setName(e.target.value);
  const handleOccupationChange = (e) => setOccupation(e.target.value);

  const displayPosts = showLikes ? likedPosts : posts;

  return (
    <Container>
      {/* 고정된 Header 컴포넌트 */}
      <Header />

      {/* 프로필 섹션 */}
      <Profile>
        <ProfilePicture>👤</ProfilePicture>
        <ProfileInfo>
          <h2>{name}</h2>
          <EditButton onClick={handleEditProfile}></EditButton>
          <p>{occupation}</p>
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

      {/* 프로필 수정 모달 */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>프로필 수정</h3>
            <Input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="이름"
            />
            <Input
              type="text"
              value={occupation}
              onChange={handleOccupationChange}
              placeholder="전공"
            />
            <div>
              <Button onClick={handleSaveProfile}>저장</Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ProfilePage;