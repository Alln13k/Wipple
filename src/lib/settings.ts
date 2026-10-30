export interface WippleSettings {
  notchEnabled: boolean;
  launchAtStartup: boolean;
  showOnAllDisplays: boolean;
  reduceMotion: boolean;
  accent: "violet" | "cyan" | "rose";
}

export const defaultSettings: WippleSettings = {
  notchEnabled: true,
  launchAtStartup: false,
  showOnAllDisplays: false,
  reduceMotion: false,
  accent: "violet",
};

const STORAGE_KEY = "wipple.settings.v1";

export function loadSettings(): WippleSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultSettings;
    const parsed = JSON.parse(saved) as Partial<WippleSettings>;
    return { ...defaultSettings, ...parsed };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: WippleSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export { STORAGE_KEY };
