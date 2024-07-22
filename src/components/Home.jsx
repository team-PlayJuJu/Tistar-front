import React, { useState, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';

const lightTheme = {
  background: '#fff',
  headerBackground: '#f1f1f1',
  gridItemBackground: '#eee',
  buttonBackground: '#ddd',
};

const darkTheme = {
  background: '#1F1E2B',
  color: '#fff',
  headerBackground: '#D9D9D9',
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
  width: 120rem;
  height: 4.375rem;
  padding: 0.6875rem 2.5625rem 0.625rem 2.0625rem;
  align-items: center;
  gap: 97.75rem;
  flex-shrink: 0;
  font-size: 1.5rem;
  background: #D9D9D9;
  border-bottom: 0.0625rem solid rgba(128, 128, 128, 0.31);
  background: #F9F9F9;
  font-size: 1.21213rem;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.headerBackground};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.625rem; 
`;

const Button = styled.button`
  width: 5.625rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 2rem;
  padding: 0.3125rem 0.625rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
`;

const Profile = styled.div`

`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 60%;
  margin-top: 1.25rem;
  gap: 1rem;
`;

const GridItem = styled.div`
  width: 90%;
  padding-bottom: 90%;
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
  const fileInputRef = useRef(null);

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
      const response = await axios.post('https://2394-210-218-52-13.ngrok-free.app/post/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzIxMzEyOTQ4LCJleHAiOjE3MjEzMTQ3NDh9.ljRFbwc1Z8HR37ReoYiVaY1D-hNeWhEJELfgJU6emPNWxT3vvDFycTzBSQ5sXIQNUaA50p2MrhdPmPWi6wCsfQ'
        },
      });
      setImageUrl(response.data.imageUrl);
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
            <Button>Upload</Button>
            <Button onClick={toggleTheme}>Light</Button>
          </Actions>
        </Header>
        <Profile>
          <div>Profile</div>
        </Profile>
        <Grid>
          {Array.from({ length: 18 }).map((_, index) => (
            <GridItem key={index} onClick={openModal} />
          ))}
        </Grid>
        <Overlay isOpen={isModalOpen} onClick={closeModal} />
        <Modal isOpen={isModalOpen}>
          <h2>안녕</h2>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button onClick={() => fileInputRef.current.click()}>Upload</Button>
          <Button onClick={closeModal}>Close</Button>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
