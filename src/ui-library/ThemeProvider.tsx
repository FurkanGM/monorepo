import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { darkTheme } from "~/stitches.config";

type ThemeVariants = "light" | "dark";

type ThemeContextProps = {
  theme: ThemeVariants;
  setTheme: React.Dispatch<React.SetStateAction<ThemeVariants>>;
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: "dark",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeVariants>("dark");

  const context = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
