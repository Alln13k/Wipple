import { invoke } from "@tauri-apps/api/core";
import { Check, CircleDot, Info, MousePointer2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Toggle } from "../components/Toggle";

interface NotchPageProps {
  enabled: boolean;
  reduceMotion: boolean;
  onChange: (enabled: boolean) => void;
  onReduceMotionChange: (value: boolean) => void;
}

export function NotchPage({ enabled, reduceMotion, onChange, onReduceMotionChange }: NotchPageProps) {
  const [expanded, setExpanded] = useState(false);

  const setExpandedState = async (value: boolean) => {
    setExpanded(value);
    try {
      await invoke("set_notch_expanded", { expanded: value });
    } catch {
      // The browser preview remains usable when running outside Tauri.
    }
  };

  return (
    <main className="content">
      <header className="page-header compact">
        <div>
          <p className="eyebrow">Module 01 / Desktop presence</p>
          <h1>Dynamic Notch</h1>
          <p className="lede">A small, calm surface for the things you need right now.</p>
        </div>
        <div className="live-badge"><span className="status-dot" /> {enabled ? "Enabled" : "Disabled"}</div>
      </header>

      <section className="notch-stage">
        <div className={`notch-demo ${expanded ? "expanded" : ""} ${reduceMotion ? "no-motion" : ""}`} onClick={() => void setExpandedState(!expanded)}>
          <div className="notch-demo-head">
            <span className="preview-dot" />
            <span className="notch-demo-title">Wipple</span>
            <span className="notch-demo-time">12:48</span>
          </div>
          {expanded && (
            <div className="notch-demo-details">
              <span className="detail-chip"><Sparkles size={13} /> Ready</span>
              <span className="detail-hint">Click to collapse</span>
            </div>
          )}
        </div>
        <p className="stage-hint"><MousePointer2 size={13} /> Click the preview to test expansion</p>
      </section>

      <section className="settings-panel">
        <div className="panel-heading"><div><span className="eyebrow">Behavior</span><h3>Notch controls</h3></div><CircleDot size={19} /></div>
        <Toggle checked={enabled} onChange={onChange} label="Show Dynamic Notch" description="Keep the floating window visible on your desktop" />
        <Toggle checked={!reduceMotion} onChange={(value) => onReduceMotionChange(!value)} label="Animated expansion" description="Use a soft transition when the notch opens" />
        <div className="info-callout"><Info size={16} /><span>Media controls are intentionally not connected yet. The current surface is a real Tauri window with hover/click behavior and display-aware positioning.</span></div>
      </section>

      <div className="implementation-note"><Check size={15} /><span>Window foundation ready · GSMTC media integration pending</span></div>
    </main>
  );
}
