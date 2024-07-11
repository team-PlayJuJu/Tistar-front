import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Logo from './icons/Logo';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70rem;
  background-color: rgb(236, 236, 236);
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
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem 0 0 0.5rem;
  outline: none;
  font-size: 1rem;
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

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'onBlur'
  });
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      const signupData = JSON.stringify({ name: data.username, email: data.email, pwd: data.password });
      await axios.post('https://7e88-210-218-52-13.ngrok-free.app/auth/signup', signupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/');
    } catch (error) {
      console.error('회원가입 오류:', error.response?.data || error.message);
      setError('회원가입 오류');
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(handleSignup)}>
        <Logo />
        <div>
          <InputContainer>
            <Input
              type="text"
              placeholder="유저명"
              {...register('username', { required: '유저명을 입력해주세요' })}
            />
          </InputContainer>
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <InputContainer>
            <Input
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
                  message: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요'
                }
              })}
            />
          </InputContainer>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          <InputContainer>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해주세요',
                validate: (value) =>
                  watch('password') !== value
                    ? '비밀번호가 일치하지 않습니다'
                    : true
              })}
            />
          </InputContainer>
          {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
        </div>
        <ButtonContainer>
          <Button isLogin={true} type="submit">회원가입</Button>
        </ButtonContainer>
      </LoginForm>
    </Container>
  );
};

export default SignUp;
