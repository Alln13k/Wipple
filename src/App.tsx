import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { DynamicNotch } from "./components/DynamicNotch";
import { Sidebar, type PageId } from "./components/Sidebar";
import { useSettings } from "./hooks/useSettings";
import { ComingSoon } from "./pages/ComingSoon";
import { Dashboard } from "./pages/Dashboard";
import { NotchPage } from "./pages/NotchPage";
import { SettingsPage } from "./pages/SettingsPage";

export function App() {
  const isNotchWindow = window.location.hash === "#/notch";
  if (isNotchWindow) return <DynamicNotch />;
  return <DesktopApp />;
}

export default App;

function DesktopApp() {
  const [page, setPage] = useState<PageId>("dashboard");
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    document.body.classList.toggle("reduced-motion", settings.reduceMotion);
  }, [settings.reduceMotion]);

  useEffect(() => {
    void invoke("set_notch_enabled", { enabled: settings.notchEnabled }).catch(() => {
      // Browser previews do not have a Tauri window to show or hide.
    });
  }, [settings.notchEnabled]);

  const setNotchEnabled = (notchEnabled: boolean) => {
    updateSettings({ notchEnabled });
  };

  const renderPage = () => {
    switch (page) {
      case "notch":
        return (
          <NotchPage
            enabled={settings.notchEnabled}
            reduceMotion={settings.reduceMotion}
            onChange={setNotchEnabled}
            onReduceMotionChange={(reduceMotion) => updateSettings({ reduceMotion })}
          />
        );
      case "settings":
        return <SettingsPage settings={settings} updateSettings={updateSettings} onNotchEnabledChange={setNotchEnabled} />;
      case "airpods":
      case "mirroring":
      case "system":
        return <ComingSoon module={page} />;
      default:
        return <Dashboard onNavigate={setPage} notchEnabled={settings.notchEnabled} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="main-area">{renderPage()}</div>
    </div>
  );
}
