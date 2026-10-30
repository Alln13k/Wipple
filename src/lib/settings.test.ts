import { beforeEach, describe, expect, it } from "vitest";
import { defaultSettings, loadSettings, saveSettings, STORAGE_KEY } from "./settings";

describe("settings persistence", () => {
  beforeEach(() => localStorage.clear());

  it("returns defaults when no settings have been saved", () => {
    expect(loadSettings()).toEqual(defaultSettings);
  });

  it("round-trips settings through local storage", () => {
    const settings = { ...defaultSettings, notchEnabled: false, accent: "cyan" as const };
    saveSettings(settings);
    expect(loadSettings()).toEqual(settings);
    expect(localStorage.getItem(STORAGE_KEY)).toContain('"notchEnabled":false');
  });

  it("merges saved values with new defaults", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ reduceMotion: true }));
    expect(loadSettings()).toEqual({ ...defaultSettings, reduceMotion: true });
  });
});
