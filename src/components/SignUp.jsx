import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Logo from './icons/Logo';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70rem;
  background-color: rgb(236, 236, 236);
`;

const LoginForm = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
  width: 31.6875rem;
  height: 3.125rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem 0 0 0.5rem;
  outline: none;
  font-size: 1rem;
`;

const Icon = styled.span`
  background-color: #6c63ff;
  padding: 0.75rem;
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
`;

const Button = styled.button`
  width: 20rem;
  padding: 0.75rem;
  background-color: ${({ isLogin }) => (isLogin ? '#6c63ff' : 'none')};
  color: ${({ isLogin }) => (isLogin ? 'white' : '#6c63ff')};
  border: ${({ isLogin }) => (isLogin ? 'none' : '0.0625rem solid #4200FF')};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('${process.env.REACT_APP_API_URL}/user/signin', { username, password });
      // Assume the response contains a token
      const { token } = response.data;

      // Store the token in localStorage or cookies
      localStorage.setItem('token', token);

      // Redirect to home page
      navigate('/home');
    } catch (error) {
      setError('로그인 실패: 유저명이나 비밀번호를 확인하세요.');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <LoginForm>
        <Logo />
        <div>
          <InputContainer>
            <Input
              type="text"
              placeholder="유저명"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer>
          <Button isLogin={true} onClick={handleLogin}>로그인</Button>
        </ButtonContainer>
      </LoginForm>
    </Container >
  );
};

export default Login;
