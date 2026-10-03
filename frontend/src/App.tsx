import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import SearchPage from "./pages/SearchPage";
import ThemeToggle from "./components/ThemeToggle";

import { GlobalStyles } from "./styles/GlobalStyles";

import {
  lightTheme,
  darkTheme
} from "./styles/theme";

type ThemeMode = "light" | "dark";

const getInitialTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem("theme");

  if (
    savedTheme === "light" ||
    savedTheme === "dark"
  ) {
    return savedTheme;
  }

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDark ? "dark" : "light";
};

function App() {
  const [themeMode, setThemeMode] =
    useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((currentTheme) =>
      currentTheme === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeProvider
      theme={
        themeMode === "light"
          ? lightTheme
          : darkTheme
      }
    >
      <GlobalStyles />

      <ThemePosition>
        <ThemeToggle
          themeMode={themeMode}
          onToggle={toggleTheme}
        />
      </ThemePosition>

      <SearchPage />
    </ThemeProvider>
  );
}

import styled from "styled-components";

const ThemePosition = styled.div`
  position: fixed;

  top: 20px;
  right: 20px;

  z-index: 10;

  @media (max-width: 600px) {
    top: 14px;
    right: 14px;
  }
`;

export default App;