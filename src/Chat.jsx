import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  AttachFile,
  SearchOutlined,
  AccountCircleOutlined,
  SendOutlined,
  KeyboardVoiceOutlined,
  ChatOutlined,
  DoneAllOutlined,
} from "@mui/icons-material";

const Chat = ({ socket, username, group }) => {
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState([]);
  const [recievedUser, setRecievedUser] = useState([]);

  const theme = useTheme();
  const mobileScreens = useMediaQuery("(max-width:800px)");
  const [mobileToggle, setMobileToggle] = useState(
    mobileScreens ? false : true
  );

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
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
    socket.on("receive_user", (data) => {
      setRecievedUser((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [recievedMessage]);
  return (
    <Box>
      {/* Menu */}

      {!mobileScreens && (
        <Box
          sx={{
            width: "30%",
            backgroundColor: "rgba(255, 255, 255, 0.83)",
            position: "absolute",
            bottom: "0",
            height: "89vh",
            zIndex: "10000",
            backdropFilter: "blur(2px) saturate(146%)",
            mt: "1rem",
          }}
        >
          <Divider />
          <Typography variant="h5" textAlign="center" m="2rem">
            Coming soon.
          </Typography>
        </Box>
      )}

      {/* Main Page */}
      <Box
        sx={{
          width: mobileScreens ? "100%" : "70%",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: "0",
          top: "0",
          right: "0",
          justifyContent: "space-between",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          zIndex: "-1",
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
              p: "1rem",
              justifyContent: mobileScreens ? "space-around" : "space-evenly",
              position: "fixed",
              top: "0",
              right: "0",
              zIndex: "100",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "90%",
                gap: "3rem",
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
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  width: "50%",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: theme.palette.primary.dark,
                    width: "50px",
                    height: "50px",
                  }}
                >
                  {group[0]}
                </Avatar>
                <Box
                  sx={{
                    display: "flex",
                    width: "90%",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {group}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                    }}
                  >
                    {recievedUser.length} online
                  </Typography>
                </Box>
              </Box>
            </Box>

            <IconButton>
              <SearchOutlined />
            </IconButton>
          </Box>
          {mobileToggle && mobileScreens && (
            <Box
              sx={{
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.83)",
                position: "absolute",
                top: "5rem",
                height: "30vh",
                display: "block",
                backdropFilter: "blur(2px) saturate(146%)",
                zIndex: "1000",
              }}
            >
              <Divider />

              <Typography variant="h4" textAlign="center" m="2rem">
                Coming soon. I'm working on it
              </Typography>
            </Box>
          )}
          <Box mb="8rem"></Box>

          {/* Chat */}
          {recievedMessage.map(({ message, author, time }, index) => {
            return (
              <Box
                sx={{
                  mt: "3rem",
                  ml: "1rem",
                  mr: "1rem",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  justifyContent:
                    author === username ? "flex-end" : "flex-start",
                  postion: "relative",
                  zIndex: "-1",
                  boxSizing: "border-box",
                }}
                key={`name-${index}`}
                ref={messagesEndRef}
              >
                {author !== username && (
                  <Box>
                    <Avatar
                      sx={{
                        backgroundColor: theme.palette.primary.dark,
                        width: 30,
                        height: 30,
                        fontSize: "15px",
                      }}
                    >
                      {author[0].toUpperCase()}
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

                    padding: "10px 5px 0px 10px",
                    marginBottom: "5px",
                    width: mobileScreens ? "50%" : "40%",
                    maxWidth: !mobileScreens ? "30%" : null,
                    wordWrap: "break-word",
                  }}
                >
                  {author !== username && (
                    <Typography
                      fontSize={"14px"}
                      sx={{
                        textAlign: "left",
                        // textDecoration: "underline",
                      }}
                      mb="1px"
                      color={"#0a5a8f"}
                    >
                      ~{author}
                    </Typography>
                  )}
                  <Typography
                    variant="h5"
                    fontWeight={"400"}
                    sx={{ textAlign: "left", m: "1px" }}
                  >
                    {message}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      fontSize={"11px"}
                      sx={{
                        fontWeight: "100",
                        textAlign: "right",
                        m: 0,
                      }}
                    >
                      {time}
                    </Typography>
                    {author === username && (
                      <DoneAllOutlined style={{ fontSize: 15 }} />
                    )}
                  </Box>
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
            p: "0.5rem 0",
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
              width: "80%",
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
  );
};

export default Chat;
