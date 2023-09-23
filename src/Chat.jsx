import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  AttachFile,
  SearchOutlined,
  AccountCircleOutlined,
  SendOutlined,
  KeyboardVoiceOutlined,
  ChatOutlined,
} from "@mui/icons-material";

const Chat = ({ socket, username, group }) => {
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState([]);
  const [mobileToggle, setMobileToggle] = useState(false);

  const theme = useTheme();
  const mobileScreens = useMediaQuery("(max-width:800px)");

  const sendMessage = async () => {
    if (message !== "") {
      const data = {
        message,
        author: username,
        group,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getUTCMinutes(),
      };
      await socket.emit("send_message", data);
      setMessage("");
      setRecievedMessage((prev) => [...prev, data]);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setRecievedMessage((prev) => [...prev, data]);
    });
  }, [socket]);
  return (
    <ScrollToBottom>
      <Box>
        {/* Menu */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: mobileScreens ? "15%" : "5%",
              height: "100vh",

              backgroundColor: "#E5E4E2",
              p: "2rem 0.5rem",
            }}
          >
            <IconButton
              sx={{
                color: "#756a6af8",
                fontSize: "50px",
              }}
              onClick={() => setMobileToggle(!mobileToggle)}
            >
              <ChatOutlined />
            </IconButton>
          </Box>
          {/* People */}

          {!mobileScreens || mobileToggle ? (
            <Box
              sx={{
                width: mobileScreens ? "50%" : "25%",
                height: "100vh",

                backgroundColor: "#455A64",
                zIndex: "100",
                color: "#FFF",
              }}
            >
              <Typography
                variant="h3"
                color="#FFF"
                textAlign="center"
                mt="2rem"
              >
                Chats
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <Typography
                  variant="h3"
                  color="#FFF"
                  textAlign="center"
                  m="2rem"
                >
                  Coming soon
                </Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
        {/* Main Page */}
        <Box
          sx={{
            width: mobileScreens ? "85%" : "70%",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            bottom: "0",
            top: "0",
            right: "0",
            justifyContent: "space-between",
            border: "1px solid rgba(209, 213, 219, 0.3)",
          }}
        >
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              overflow: "scroll",
            }}
          >
            {/* Top */}
            <Box
              sx={{
                backdropFilter: "blur(2px) saturate(146%)",
                backgroundColor: "rgba(255, 255, 255, 0.83)",
                display: "flex",
                gap: "0.5rem",
                width: "100%",
                p: "1.5rem",
                justifyContent: "space-between",
                position: "fixed",
                zIndex: "200",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  width: "90%",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.primary.dark,
                  }}
                >
                  {group[0]}
                </Avatar>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  {group}
                </Typography>
              </Box>

              <IconButton>
                <SearchOutlined />
              </IconButton>
            </Box>
            <Box mb="8rem"></Box>
            {/* Chat */}
            {recievedMessage.map(({ message, author, time }) => {
              return (
                <Box
                  sx={{
                    mt: "3rem",
                    ml: "1rem",
                    mr: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: author === username && "flex-end",
                    postion: "relative",
                    zIndex: "-1",
                  }}
                >
                  {author !== username && (
                    <Box>
                      <Avatar
                        sx={{
                          backgroundColor: theme.palette.primary.dark,
                          width: 24,
                          height: 24,
                        }}
                      >
                        {author[0]}
                      </Avatar>
                    </Box>
                  )}
                  <Box
                    sx={{
                      backdropFilter: "blur(2px) saturate(146%)",
                      borderRadius:
                        author === username
                          ? "15px 0 12px 12px"
                          : "0 12px 12px 12px",
                      border: "1px solid rgba(209, 213, 219, 0.3)",
                      backgroundColor:
                        author === username
                          ? "#dcf8c6"
                          : "rgba(255, 255, 255, 0.83)",
                      width: mobileScreens ? "50%" : "30%",
                      minHeight: "80px",
                      overflow: "auto",
                      padding: "4px 1rem",
                    }}
                  >
                    <Typography
                      fontSize={"13px"}
                      sx={{
                        textAlign: "left",
                        textDecoration: "underline",
                      }}
                      mb="4px"
                    >
                      {author}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight={"400"}
                      sx={{ textAlign: "left" }}
                    >
                      {message}
                    </Typography>

                    <Typography
                      fontSize={"12px"}
                      sx={{
                        textAlign: "right",
                      }}
                    >
                      {time} AM
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
          {/* Footer */}
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              display: "flex",
              gap: "0.5rem",
              justifyContent: "space-around",
              width: "100%",
              p: "1rem 0",
            }}
          >
            <IconButton>
              <AccountCircleOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>

            <TextField
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: "2rem",
                width: "70%",
              }}
            />
            {message === "" ? (
              <IconButton>
                <KeyboardVoiceOutlined />
              </IconButton>
            ) : (
              <IconButton onClick={sendMessage}>
                <SendOutlined />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </ScrollToBottom>
  );
};

export default Chat;

{
  //   <Box>
  //   <Box>
  //     <Typography>Message</Typography>
  //     {/* {recievedMessage.map(({ message, author, time, group }, index) => (
  //       <Box key={index}>
  //         {message}
  //         {author}
  //         {time}
  //         {group}
  //       </Box>
  //     ))} */}
  //   </Box>
  // </Box>
  // <Box>
  //   <TextField
  //     placeholder="Message"
  //     value={message}
  //     onChange={(e) => setMessage(e.target.value)}
  //   />
  //   <Button variant="contained" onClick={sendMessage}>
  //     &#9658;
  //   </Button>
  // </Box>
}
