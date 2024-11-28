import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const fonts = {
  body: "var(--font-thicccboi)",
  clash: "var(--font-clashGrotesk)",
  // montserrat: "'Montserrat Alternates', sans-serif"
};

const colors = {
  white: "#ffffff",
  text: "#0A0807",
  textTwo: "#333344",
  heading: "#0E002A",
  muted: "#F6F6F6",
  inputErrorBorder: "#FC8180",
  lineColor: "#F0F0F0",
  iconColor: "#292D32",
  darkOne: "#151515",
  darkTwo: "#1B1B1D",
  neutral: {
    50: "#E6E5E7",
    100: "#CDCCD0",
    200: "#B5B3B9",
    300: "#9C9AA2",
    400: "#84818B",
    500: "#6B6774",
    600: "#524E5D",
    700: "#3A3546",
    800: "#211C2F",
    900: "#090318",
  },
  primary: {
    50: "#D4FFE9",
    100: "#A9FED3",
    200: "#70FEB6",
    300: "#02DB6D",
    400: "#01B057",
    500: "#327BC0",
    600: "#013E1F",
    700: "#001A0D",
    800: "#001209",
    900: "#000402",
  },
  secondary: {
    50: "#FAE8E9",
    100: "#F1BABC",
    200: "#E99496",
    300: "#E68487",
    400: "#DD565A",
    500: "#D53035",
    600: "#B12428",
    700: "#71171A",
    800: "#400D0F",
    900: "#280809",
  },
  success: {
    50: "#DCFFEA",
    100: "#B9FFD5",
    200: "#8AFFB9",
    300: "#5BFF9D",
    400: "#0AFF6C",
    500: "#00DA57",
    600: "#00C44E",
    700: "#00A341",
    800: "#007830",
    900: "#005723",
  },
  warning: {
    50: "#FFF8D6",
    100: "#FFF0A3",
    200: "#FFE870",
    300: "#FFE352",
    400: "#FFDE33",
    500: "#FFD600",
    600: "#E6C100",
    700: "#B39600",
    800: "#806B00",
    900: "#594B00",
  },
  error: {
    50: "#FFE0E0",
    100: "#FFC9C9",
    200: "#FFB2B2",
    300: "#FF8484",
    400: "#FF5656",
    500: "#FF3F3F",
    600: "#FF1F1F",
    700: "#CF0000",
    800: "#9F0000",
    900: "#6F0000",
  },
};

const lightColorsPalette = {
  neutral: {
    50: "#E6E5E7",
    100: "#CDCCD0",
    200: "#B5B3B9",
    300: "#9C9AA2",
    400: "#84818B",
    500: "#6B6774",
    600: "#524E5D",
    700: "#3A3546",
    800: "#211C2F",
    900: "#090318",
  },
  primary: {
    50: "#D4FFE9",
    100: "#A9FED3",
    200: "#70FEB6",
    300: "#02DB6D",
    400: "#01B057",
    500: "#327BC0",
    600: "#013E1F",
    700: "#001A0D",
    800: "#001209",
    900: "#000402",
  },
  secondary: {
    50: "#FAE8E9",
    100: "#F1BABC",
    200: "#E99496",
    300: "#E68487",
    400: "#DD565A",
    500: "#D53035",
    600: "#B12428",
    700: "#71171A",
    800: "#400D0F",
    900: "#280809",
  },
  success: {
    50: "#DCFFEA",
    100: "#B9FFD5",
    200: "#8AFFB9",
    300: "#5BFF9D",
    400: "#0AFF6C",
    500: "#00DA57",
    600: "#00C44E",
    700: "#00A341",
    800: "#007830",
    900: "#005723",
  },
  warning: {
    50: "#FFF8D6",
    100: "#FFF0A3",
    200: "#FFE870",
    300: "#FFE352",
    400: "#FFDE33",
    500: "#FFD600",
    600: "#E6C100",
    700: "#B39600",
    800: "#806B00",
    900: "#594B00",
  },
  error: {
    50: "#FFE0E0",
    100: "#FFC9C9",
    200: "#FFB2B2",
    300: "#FF8484",
    400: "#FF5656",
    500: "#FF3F3F",
    600: "#FF1F1F",
    700: "#CF0000",
    800: "#9F0000",
    900: "#6F0000",
  },
};

const darkColorsPalette = {
  neutral: {
    // 50: "#1E1D1F",
    50: "#444",
    // 100: "#29282B",
    100: "#666",
    200: "#39373D",
    300: "#48454B",
    400: "#57545A",
    // 500: "#66636B",
    500: "#99969E",
    600: "#757278",
    700: "#848189",
    800: "#94919B",
    900: "#A4A1A9",
  },
  primary: {
    50: "#224C63",
    100: "#3D6476",
    200: "#597E89",
    300: "#74999C",
    400: "#90B3B9",
    500: "#327BC0",
    600: "#C7E7DF",
    700: "#E3F0ED",
    800: "#F7F4F7",
    900: "#FCFCFB",
  },
  secondary: {
    50: "#373235",
    100: "#484346",
    200: "#5A5358",
    300: "#6B6267",
    400: "#7C7176",
    500: "#8E8086",
    600: "#9E8E91",
    700: "#AF9A9C",
    800: "#C0A7A9",
    900: "#D2B4B5",
  },
  success: {
    50: "#243E2E",
    100: "#365243",
    200: "#496657",
    300: "#5C7A6C",
    400: "#708E81",
    500: "#84A296",
    600: "#98BCAD",
    700: "#ADD5CB",
    800: "#C1EDDF",
    900: "#D6F6F3",
  },
  warning: {
    50: "#524431",
    100: "#65533E",
    200: "#78624B",
    300: "#8B7158",
    400: "#9E8066",
    500: "#AF8F73",
    600: "#C29E80",
    700: "#D5AD8D",
    800: "#E9BC9A",
    900: "#FCC9AA",
  },
  error: {
    50: "#593636",
    100: "#6B4444",
    200: "#7D5252",
    300: "#8F6060",
    400: "#A16E6E",
    500: "#B37C7C",
    600: "#C58A8A",
    700: "#D79898",
    800: "#E9A7A7",
    900: "#FBB5B5",
  },
};

const lightColors = {
  ...lightColorsPalette,
  white: "#ffffff",
  text: "#0A0807",
  textTwo: "#333344",
  heading: "#0E002A",
  muted: "#F6F6F6",
  inputErrorBorder: "#FC8180",
  lineColor: "#F0F0F0",
  iconColor: "#292D32",
  darkOne: "#151515",
  darkTwo: "#1B1B1D",
};

const darkColors = {
  ...darkColorsPalette,
  white: "#151515",
  text: "#F6F6F6",
  textTwo: "#D9D9D9",
  heading: "#F0F0F0",
  muted: "#292D32",
  inputErrorBorder: "#FC8180",
  lineColor: "#333344",
  iconColor: "#F6F6F6",
  darkOne: "#ffffff",
  darkTwo: "#0A0807",
};

export const semanticColorTokens: Record<string, any> = {};

// Create semantic color tokens
Object.entries(lightColors).forEach(([colorKey, colorValue]) => {
  if (typeof colorValue === "string") {
    semanticColorTokens[colorKey] = {
      default: colorValue,
      _dark: darkColors[colorKey as keyof typeof darkColors],
    };
  } else if (typeof colorValue === "object") {
    Object.entries(colorValue).forEach(([shadeKey, shadeValue]) => {
      semanticColorTokens[`${colorKey}-${shadeKey}`] = {
  default: shadeValue,
  // @ts-ignore
  _dark: darkColors[colorKey][shadeKey],
};
    });
  }
});

const Text = defineStyleConfig({
  baseStyle: {
    fontFamily: "body",
    fontWeight: "400",
    color: "text",
  },
  sizes: {
    xs: {
      fontSize: ["12px", "14px"],
    },
    sm: {
      fontSize: ["14px", "16px"],
    },
    md: {
      fontSize: ["16px", "18px"],
    },
    lg: {
      fontSize: ["18px", "20px"],
    },
    xl: {
      fontSize: ["22px", "24px"],
    },
    xxl: {
      fontSize: ["30px", "32px"],
    },
  },
  defaultProps: {
    size: "md",
  },
});

const Heading = defineStyleConfig({
  baseStyle: {
    fontFamily: "body",
    fontWeight: "800",
    color: "heading",
  },
  sizes: {
    sm: {
      fontSize: ["20px", "24px"],
    },
    md: {
      fontSize: ["24px", "28px", "32px"],
    },
  },
  defaultProps: {
    size: "md",
  },
});

const components = {
  Heading,
  Text,
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  semanticTokens: {
    colors: semanticColorTokens,
  },
});

export default theme;
