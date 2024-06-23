import React from 'react';
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
  flex-direction: column;
  align-items: center;
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
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
`;

const SignupLink = styled.a`
  margin-top: 1rem;
  color: #6c63ff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  const handleSignup = () => {
    navigate('/signup');
  };




  return (
    <Container>

      <LoginForm>
        <Logo />
        <InputContainer>
          <Input type="text" placeholder="유저명" />
          <Icon>📧</Icon>
        </InputContainer>
        <InputContainer>
          <Input type="password" placeholder="비밀번호" />
          <Icon>🔒</Icon>
        </InputContainer>
        <Button onClick={handleLogin}>로그인</Button>
        <SignupLink onClick={handleSignup}>회원가입</SignupLink>
      </LoginForm>
    </Container>
  );
};

export default Login;
