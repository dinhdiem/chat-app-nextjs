import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "@mui/material/Button";
import avatarLogin from "../assets/whatsapplogo.png";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const StyledContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`;

const StyledLogo = styled(Image)`
  border-radius: 50%;
`;

const Login = () => {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);

  const signIn = () => {
    signInWithGoogle();
  };

  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>
      <StyledLoginContainer>
        <StyledImageWrapper>
          <StyledLogo src={avatarLogin} height="200px" width={"200px"} />
        </StyledImageWrapper>
        <Button variant="outlined" onClick={signIn}>
          Đăng nhập với Google
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  );
};

export default Login;
