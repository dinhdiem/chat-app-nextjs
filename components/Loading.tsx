import styled from "styled-components";
import Image from "next/image";
import avatarLogin from "../assets/whatsapplogo.png";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`;

const StyledLogo = styled(Image)`
  border-radius: 50%;
`;

const Loading = () => {
  return (
    <Container>
      <StyledImageWrapper>
        <StyledLogo src={avatarLogin} height="200px" width={"200px"} />
      </StyledImageWrapper>
      <CircularProgress />
    </Container>
  );
};

export default Loading;
