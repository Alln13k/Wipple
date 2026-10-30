import { useCallback, useEffect, useState } from "react";
import {
  defaultSettings,
  loadSettings,
  saveSettings,
  type WippleSettings,
} from "../lib/settings";

export function useSettings() {
  const [settings, setSettings] = useState<WippleSettings>(() => {
    if (typeof window === "undefined") return defaultSettings;
    return loadSettings();
  });

  useEffect(() => {
    saveSettings(settings);
    document.documentElement.dataset.accent = settings.accent;
  }, [settings]);

  const updateSettings = useCallback(
    (patch: Partial<WippleSettings>) =>
      setSettings((current) => ({ ...current, ...patch })),
    [],
  );

  return { settings, updateSettings };
}
