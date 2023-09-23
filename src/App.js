import React from "react";
import { io } from "socket.io-client";

import Start from "./Start";
import { themeSettings } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
const socket = io("https://chatapp-server-i6g1.onrender.com");
const App = () => {
  const theme = createTheme(themeSettings());
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Start socket={socket} />
      </div>
    </ThemeProvider>
  );
};

export default App;
