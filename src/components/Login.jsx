import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "./icons/Logo";
import backgroundPNG from "./icons/BG.png";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundPNG}); 
  background-size: cover;
`;


const LoginForm = styled.form`
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
  border: 0.125rem solid #ddd; // 두께를 2px로 증가
  border-radius: 1rem;
  outline: none;
  font-size: 1rem;
  text-align: center;
  transition: border-color 0.3s, box-shadow 0.3s; // 부드러운 전환 추가

  &.error-border {
    border-color: red;
    animation: shake 0.3s;
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`;

const Button = styled.button`
  width: 20rem;
  padding: 0.75rem;
  background-color: ${({ isLogin }) => (isLogin ? "#6c63ff" : "none")};
  color: ${({ isLogin }) => (isLogin ? "white" : "#6c63ff")};
  border: ${({ isLogin }) => (isLogin ? "none" : "0.0625rem solid #4200FF")};
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [usernamePlaceholder, setUsernamePlaceholder] = useState("유저명"); // 유저명 placeholder 상태 추가
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("비밀번호"); // 비밀번호 placeholder 상태 추가

  const handleLogin = async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    try {
      const loginData = JSON.stringify({ name: username, pwd: password });
      const response = await axios.post(
        "https://ae0f-210-218-52-13.ngrok-free.app/auth/signin",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access } = response.data;
      localStorage.setItem("accessToken", access);
      navigate("/home");
    } catch (error) {
      console.error("로그인 오류:", error.response?.data || error.message);
      setError("로그인 실패: 유저명이나 비밀번호를 확인하세요.");


      document.getElementById("usernameInput").classList.add("error-border");
      document.getElementById("passwordInput").classList.add("error-border");


      setTimeout(() => {
        document.getElementById("usernameInput").classList.remove("error-border");
        document.getElementById("passwordInput").classList.remove("error-border");
      }, 1000);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <Logo />
        <div>
          <InputContainer>
            <Input
              id="usernameInput"
              type="text"
              placeholder={usernamePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUsernamePlaceholder("")} // 포커스 시 placeholder 제거
              onBlur={() => setUsernamePlaceholder("유저명")} // 포커스 해제 시 placeholder 복원
            />
          </InputContainer>
          <InputContainer>
            <Input
              id="passwordInput"
              type="password"
              placeholder={passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordPlaceholder("")} // 포커스 시 placeholder 제거
              onBlur={() => setPasswordPlaceholder("비밀번호")} // 포커스 해제 시 placeholder 복원
            />
          </InputContainer>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer>
          <Button type="submit" isLogin={true}>
            로그인
          </Button>
          <Button type="button" isLogin={false} onClick={handleSignup}>
            회원가입
          </Button>
        </ButtonContainer>
      </LoginForm>
    </Container>
  );
};

export default Login;
