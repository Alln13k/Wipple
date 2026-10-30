import { invoke } from "@tauri-apps/api/core";
import { Pause, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export function DynamicNotch() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    document.body.classList.add("notch-body");
    return () => document.body.classList.remove("notch-body");
  }, []);

  const toggle = async () => {
    const next = !expanded;
    setExpanded(next);
    try {
      await invoke("set_notch_expanded", { expanded: next });
    } catch {
      // Allows the component to be previewed with Vite outside the Tauri shell.
    }
  };

  return (
    <main className={`notch-window ${expanded ? "expanded" : ""}`} onMouseEnter={() => void setExpandedState(true, setExpanded)} onMouseLeave={() => void setExpandedState(false, setExpanded)}>
      <button className="notch-window-toggle" onClick={() => void toggle()} aria-label={expanded ? "Collapse Dynamic Notch" : "Expand Dynamic Notch"}>
        <span className="notch-window-brand"><span className="preview-dot" /><Sparkles size={13} /></span>
        <span className="notch-window-label">{expanded ? "Wipple ready" : "Wipple"}</span>
        <span className="notch-window-time">12:48</span>
      </button>
      <div className="notch-window-panel">
        <div className="window-status"><span className="status-dot" /> Desktop presence active</div>
        <div className="window-actions">
          <span className="window-placeholder">Media controls will appear here when GSMTC is connected.</span>
          <button className="mini-action" disabled title="Media integration pending">{expanded ? <Pause size={14} /> : <Play size={14} />}</button>
        </div>
      </div>
    </main>
  );
}

async function setExpandedState(value: boolean, setter: (value: boolean) => void) {
  setter(value);
  try {
    await invoke("set_notch_expanded", { expanded: value });
  } catch {
    // Ignore when rendered in a regular browser.
  }
}
