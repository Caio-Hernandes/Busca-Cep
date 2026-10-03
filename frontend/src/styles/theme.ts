export const lightTheme = {
  colors: {
    background: "#f5f3ed",

    card: "#fffaeb",
    cardSecondary: "#fbf3e4",

    primary: "#105652",
    primaryHover: "#0c4642",
    primarySoft: "rgba(16, 86, 82, 0.15)",

    text: "#1f1f1f",
    textSecondary: "#646464",

    border: "rgba(16, 86, 82, 0.55)",

    error: "#b42318"
  }
};

export const darkTheme = {
  colors: {
    background: "#151817",

    card: "#202422",
    cardSecondary: "#292e2b",

    primary: "#79aaa6",
    primaryHover: "#91bbb7",
    primarySoft: "rgba(121, 170, 166, 0.15)",

    text: "#f5f3ed",
    textSecondary: "#b7b9b8",

    border: "rgba(121, 170, 166, 0.55)",

    error: "#ff8a80"
  }
};

export type AppTheme = typeof lightTheme;