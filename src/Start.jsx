import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import Chat from "./Chat";
import { useTheme } from "@emotion/react";

const Start = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [logoShow, setLogoShow] = useState(false);
  const theme = useTheme();
  const mobileScreens = useMediaQuery("(max-width:800px)");

  const joinGroup = () => {
    if (username !== "" && group !== "") {
      socket.emit("join_group", { username, group });
      setShowChat(true);
    }
  };
  return (
    <Box>
      {!showChat ? (
        <Box
          sx={{
            margin: "6rem auto",
            padding: "2rem",

            borderRadius: "1rem",
            width: mobileScreens ? "90%" : "60%",
            border: `5px solid ${theme.palette.primary.main}`,
          }}
        >
          <Box
            sx={{
              borderRadius: "1rem",
              background: theme.palette.background.default,
              color: "#FFFFF",
              padding: "2rem 2rem 4rem 2rem",
            }}
          >
            <img
              src="https://i.pinimg.com/564x/f5/28/cc/f528cc010d8a9bfcef07d08106976d0f.jpg"
              width={mobileScreens ? "50%" : "20%"}
              style={{
                display: "block",
                margin: "auto",
              }}
              alt="whatsapp"
            />
            <Typography
              fontWeight={"500"}
              textAlign={"center"}
              variant="h2"
              sx={{
                mb: "1.5rem",
              }}
            >
              Whatsapp
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",

                gridGap: "1.5rem",
              }}
            >
              <TextField
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  gridColumn: mobileScreens ? "1/ span 2" : "1",
                }}
                required
              />
              <FormControl
                sx={{
                  gridColumn: mobileScreens ? "1/ span 2" : "2",
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Choose a Group
                </InputLabel>
                <Select
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  label="Group"
                  required
                >
                  <MenuItem value={"Newbies"}>Newbies</MenuItem>
                  <MenuItem value={"Bryte Devs"}>Bryte Devs</MenuItem>
                  <MenuItem value={"Top Devs"}>Top Devs</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={joinGroup}
                type="submit"
                sx={{
                  gridColumn: "span 2",
                }}
              >
                Join Group
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Chat socket={socket} username={username} group={group} />
      )}
    </Box>
  );
};

export default Start;
