import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family:
      Inter,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  body {
    min-width: 320px;
    min-height: 100vh;

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    transition:
      background-color 0.25s ease,
      color 0.25s ease;
  }

  button,
  input,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }
`;