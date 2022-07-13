import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '@/@components/@shared/Input';
import PageTemplate from '@/@components/@shared/PageTemplate';
import { PATH } from '@/Router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setEmail(value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setPassword(value);
  };

  const handleSubmitLoginForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @TODO: Logic
  };

  return (
    <PageTemplate>
      <Styled.Root>
        <Link
          to={PATH.LANDING}
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 50px;
          `}
        >
          <img src='/assets/images/logo.png' alt='로고' width='36' />
          <Styled.BrandName>꼭꼭</Styled.BrandName>
        </Link>
        <Styled.LoginForm onSubmit={handleSubmitLoginForm}>
          <Input
            id='email'
            type='email'
            label='이메일'
            placeholder='이메일'
            value={email}
            onChange={onChangeEmail}
          />
          <Input
            id='password'
            type='password'
            label='비밀번호'
            description='영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요'
            placeholder='비밀번호'
            value={password}
            onChange={onChangePassword}
          />
          <button type='submit'>로그인</button>
        </Styled.LoginForm>
        <Link to={PATH.JOIN}>회원가입</Link>
      </Styled.Root>
    </PageTemplate>
  );
};

export default Login;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100vh;
  `,
  BrandName: styled.h1`
    font-size: 20px;
    font-weight: bold;

    margin-left: 16px;

    ${({ theme }) => css`
      color: ${theme.colors.primary_400};
    `}
  `,
  LoginForm: styled.form`
    & > input {
      width: 100%;
      height: 50px;
      font-size: 14px;
      border: 1px solid ${({ theme }) => theme.colors.light_grey_100};

      padding: 0 10px;
    }

    & > input::placeholder {
      ${({ theme }) => css`
        color: ${theme.colors.light_grey_100};
      `}
    }

    & > input:nth-child(1) {
      border-radius: 4px 4px 0 0;
    }
    & > input:nth-child(2) {
      border-radius: 0 0 4px 4px;
      margin-bottom: 36px;
    }

    & > button {
      width: 100%;
      height: 50px;

      font-weight: bold;

      border-radius: 4px;

      margin-bottom: 20px;

      ${({ theme }) => css`
        background-color: ${theme.colors.primary_400};
        color: ${theme.colors.white_100};
      `}
    }
  `,
};
