import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { useIsMounted } from "../utils/hooks/isMountedHook";

const enum THEMES {
  DARK = "dark",
  LIGHT = "light",
}

function DarkSwitch() {
  const [darkMode, setDarkMode] = useState(
    getPersistedDarkMode() === THEMES.DARK
  );
  const isMounted = useIsMounted();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.querySelector("html");
    if (darkMode) {
      root?.classList.add("dark");
    } else {
      root?.classList.remove("dark");
    }
  }, [darkMode]);

  function getPersistedDarkMode() {
    if (typeof window === "undefined") return;

    // 1st: look for prev persisted setting
    const theme = localStorage.getItem("theme");

    // 2nd: if no prev setting found use browser setting
    if (!theme) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEMES.DARK
        : THEMES.LIGHT;
    }
    return theme;
  }

  function setPersistedDarkMode(update: string) {
    localStorage.setItem("theme", update);
  }

  function toggleHandler() {
    setPersistedDarkMode(darkMode ? THEMES.LIGHT : THEMES.DARK);
    setDarkMode((prev) => !prev);
  }

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleHandler}
      className="inline-block p-2 hover:bg-violet-500/25 outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-white/50 "
    >
      {darkMode && <MoonIcon className="text-violet-300 w-6 h-6" />}
      {!darkMode && <SunIcon className="text-violet-700 w-6 h-6" />}
    </button>
  );
}

export default DarkSwitch;
