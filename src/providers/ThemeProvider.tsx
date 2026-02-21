import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

export type ThemeValue = "light" | "dark" | "auto"
export const STORAGE_KEY = "app-theme"

interface ThemeContextType {
  theme: ThemeValue
  setTheme: (value: ThemeValue) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const getSystemTheme = (): "light" | "dark" => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark"
  }
  return "light"
}

export const ThemeScript = () => {
  const scriptContent = `
    (function() {
      try {
        var storageKey = '${STORAGE_KEY}';
        var theme = localStorage.getItem(storageKey) || 'auto';
        var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var resolved = theme === 'auto' ? (supportDarkMode ? 'dark' : 'light') : theme;

        document.documentElement.classList.remove('light-theme', 'dark-theme');
        document.documentElement.classList.add(resolved + '-theme');
        document.documentElement.style.colorScheme = resolved;
      } catch (e) {}
    })();
  `
  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeValue>("auto")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as ThemeValue
    if (["light", "dark", "auto"].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
  }, [])

  const setTheme = useCallback((newTheme: ThemeValue) => {
    setThemeState(newTheme)
    if (newTheme === "auto") {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, newTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const resolved = theme === "auto" ? getSystemTheme() : theme

    root.classList.remove("light-theme", "dark-theme")
    root.classList.add(`${resolved}-theme`)
    root.style.colorScheme = resolved
    setResolvedTheme(resolved)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark light)")
    const handleChange = () => {
      if (theme === "auto") {
        const newSystemTheme = getSystemTheme()
        root.classList.remove("light-theme", "dark-theme")
        root.classList.add(`${newSystemTheme}-theme`)
        setResolvedTheme(newSystemTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
