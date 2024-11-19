import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-4 top-4 rounded-lg bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-containerBackground dark:hover:bg-containerHover"
      aria-label="Cambiar de tema entre claro y oscuro"
    >
      {theme === "dark" ? (
        <Sun className="size-5 text-yellow-500" />
      ) : (
        <Moon className="size-5 text-gray-700" />
      )}
    </button>
  );
};
