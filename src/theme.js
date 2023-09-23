export const themeSettings = () => {
  return {
    palette: {
      primary: {
        main: "#128c7e",
        dark: "#075e54",
        light: "#25d366",
      },
      background: {
        default: "#FFFF",
        alt: "#dcf8c6",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableFocusRipple: true,
          disableElevation: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            color: "#ffffff",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            cursor: "pointer",
            color: "#14213d",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: "25px",
          },
        },
      },
    },

    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 13,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
