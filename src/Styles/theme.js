// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  dark: {
    800: "#080c24",
    600: "#151e34",
    200: "#151e34",
  },
  brand: {
    600: "#1f7ea7",
  },
  position: {
    rb: "#3071e8",
    wr: "#30e8ac",
    te: "#e89e30",
    qb: "#e83030",
    dst: "#19179f",
    k: "#7d179f",
  },
};

// 3. extend the theme
const theme = extendTheme({ config, colors });

export default theme;
