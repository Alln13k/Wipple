import { Check, Monitor, Palette, Settings2 } from "lucide-react";
import { Toggle } from "../components/Toggle";
import type { WippleSettings } from "../lib/settings";

interface SettingsPageProps {
  settings: WippleSettings;
  updateSettings: (patch: Partial<WippleSettings>) => void;
  onNotchEnabledChange: (enabled: boolean) => void;
}

export function SettingsPage({ settings, updateSettings, onNotchEnabledChange }: SettingsPageProps) {
  return (
    <main className="content">
      <header className="page-header compact">
        <div>
          <p className="eyebrow">Preferences</p>
          <h1>Settings</h1>
          <p className="lede">Make Wipple feel like it belongs on your desktop.</p>
        </div>
        <div className="header-orb"><Settings2 size={20} /></div>
      </header>

      <section className="settings-panel">
        <div className="panel-heading"><div><span className="eyebrow">Startup</span><h3>Always close at hand</h3></div><Monitor size={19} /></div>
        <Toggle checked={settings.notchEnabled} onChange={onNotchEnabledChange} label="Show Dynamic Notch" description="Keep the floating surface visible on your desktop" />
        <Toggle checked={settings.launchAtStartup} onChange={(value) => updateSettings({ launchAtStartup: value })} label="Launch Wipple at startup" description="Open Wipple when you sign in to Windows" />
        <Toggle checked={settings.showOnAllDisplays} onChange={(value) => updateSettings({ showOnAllDisplays: value })} label="Show on all displays" description="Keep a notch on each connected monitor" />
      </section>

      <section className="settings-panel">
        <div className="panel-heading"><div><span className="eyebrow">Appearance</span><h3>Choose your tone</h3></div><Palette size={19} /></div>
        <div className="accent-picker">
          {(["violet", "cyan", "rose"] as const).map((accent) => (
            <button key={accent} className={`accent-option ${accent} ${settings.accent === accent ? "selected" : ""}`} onClick={() => updateSettings({ accent })}>
              <span className="accent-swatch" /><span>{accent[0].toUpperCase() + accent.slice(1)}</span>{settings.accent === accent && <Check size={14} />}
            </button>
          ))}
        </div>
        <Toggle checked={settings.reduceMotion} onChange={(value) => updateSettings({ reduceMotion: value })} label="Reduce motion" description="Prefer instant transitions throughout Wipple" />
      </section>

      <p className="persisted-note"><Check size={14} /> Settings are saved locally on this device.</p>
    </main>
  );
}
