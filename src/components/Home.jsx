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

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem; 
`;


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem; 
  width: 50%;
  margin-top: 1.25rem;
  gap: 1rem;
`;

const GridItem = styled.div`
  width: 90%;
  padding-bottom: 90%;
  background-color: #eee;
  background-color: ${({ theme }) => theme.gridItemBackground};
`;

const Home = () => {

    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };


    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header>
                    Tistar
                    <User>
                        <Actions>
                            <Button>Upload</Button>
                            <Button onClick={toggleTheme}>Light</Button>
                        </Actions>
                    </User>
                </Header>

                <Grid>
                    {Array.from({ length: 18 }).map((_, index) => (
                        <GridItem key={index} />
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Home;