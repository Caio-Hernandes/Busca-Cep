import styled from "styled-components";

interface ThemeToggleProps {
  themeMode: "light" | "dark";
  onToggle: () => void;
}

const ThemeToggle = ({
  themeMode,
  onToggle
}: ThemeToggleProps) => {
  return (
    <Button
      type="button"
      onClick={onToggle}
      aria-label="Alternar tema"
      title={
        themeMode === "light"
          ? "Ativar modo escuro"
          : "Ativar modo claro"
      }
    >
      {themeMode === "light" ? "☾" : "☀"}
    </Button>
  );
};

const Button = styled.button`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};

  font-size: 20px;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.cardSecondary};
    transform: translateY(-1px);
  }
`;

export default ThemeToggle;