import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';

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
  width: 47.0625rem;
  height: 3.375rem;
  flex-shrink: 0;
  border-radius: 0rem 0rem 1.875rem 1.875rem;
  background: #D9D9D9;
  display: flex;
  font-size: 1.21213rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
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
  display: inline-block;
  border: 0.0625rem solid red;
  align-items: center;
  gap: 0.5rem;
  color: black;
  font-size: 2rem;
  position: absolute;
  top: 3rem;
  right: 8rem;
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
  padding: 9rem;
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

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

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
          <div>
            Profile
          </div>
        </Profile>
        <Grid>
          {Array.from({ length: 18 }).map((_, index) => (
            <GridItem key={index} onClick={openModal} />
          ))}
        </Grid>
        <Overlay isOpen={isModalOpen} onClick={closeModal} />
        <Modal isOpen={isModalOpen}>
          <h2>안녕!!!</h2>
          <p>content.</p>
          <Button onClick={closeModal}>Close</Button>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
