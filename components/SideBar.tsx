import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MoveVertIcon from "@mui/icons-material/MoreVert";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import * as EmailValidator from "email-validator";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, query, where } from "firebase/firestore";
import { Conversation } from "../types";
import ConversationSelect from "./ConversationSelect";

type Props = {};

const SideBar = (props: Props) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const [isOpenNew, setIsOpenNew] = useState(false);

  const [writeEmail, setWriteEmail] = useState("");

  const isInvitingSelf = writeEmail === loggedInUser?.email;

  const toggleNewDialog = (isOpen: boolean) => {
    setIsOpenNew(isOpen);
    if (!isOpen) setWriteEmail("");
  };

  const closeDialog = () => {
    toggleNewDialog(false);
  };

  const queryGetConversationUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", loggedInUser?.email)
  );

  const [conversationSnapshot] = useCollection(queryGetConversationUser);

  const isConversationAlreadyExists = (writeEmail: string) => {
    return conversationSnapshot?.docs.find((conversation) =>
      (conversation.data() as Conversation).users.includes(writeEmail)
    );
  };

  const createConversation = async () => {
    if (!writeEmail) return;
    if (
      EmailValidator.validate(writeEmail) &&
      !isInvitingSelf &&
      !isConversationAlreadyExists(writeEmail)
    ) {
      await addDoc(collection(db, "conversations"), {
        users: [loggedInUser?.email, writeEmail],
      });
    }
    closeDialog();
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Lỗi rồi: ", error);
    }
  };
  return (
    <StyleContainer>
      <StyledHeader>
        <Tooltip title={loggedInUser?.email as string} placement="right">
          <StyledUserAvatar src={loggedInUser?.photoURL || ""} />
        </Tooltip>
        <div>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <SearchIcon />
        <StyledInputSearch placeholder="Tìm kiếm người dùng" />
      </StyledSearch>
      <StyledSideBarButton
        onClick={() => {
          toggleNewDialog(true);
        }}
      >
        Thêm người liên hệ
      </StyledSideBarButton>
      {conversationSnapshot?.docs.map((item) => (
        <ConversationSelect
          key={item.id}
          id={item.id}
          conversationUsers={(item.data() as Conversation).users}
        />
      ))}
      <Dialog open={isOpenNew} onClose={closeDialog}>
        <DialogTitle>Thêm liên hệ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng nhập địa chỉ người bạn muốn trò chuyện!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Địa chỉ email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(event) => setWriteEmail(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Hủy</Button>
          <Button disabled={!writeEmail} onClick={createConversation}>
            Tạo mới
          </Button>
        </DialogActions>
      </Dialog>
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
  z-index: 1;
`;
const StyledSearch = styled.div`
  display: flex;
  padding: 15px;
  border-radius: 2px;
  align-items: center;
`;
const StyledSideBarButton = styled(Button)`
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;
const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyledInputSearch = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

export default SideBar;
