import { Airplay, AudioLines, Monitor, Sparkles } from "lucide-react";
import type { PageId } from "../components/Sidebar";

const moduleCopy: Record<Exclude<PageId, "dashboard" | "notch" | "settings">, { title: string; eyebrow: string; description: string; icon: typeof Airplay }> = {
  airpods: { title: "AirPods", eyebrow: "Module 02 / Audio", description: "See battery, connection state, and controls at a glance.", icon: Airplay },
  mirroring: { title: "Screen Mirroring", eyebrow: "Module 03 / Displays", description: "Bring wireless display controls into one calm surface.", icon: Monitor },
  system: { title: "System", eyebrow: "Module 04 / Controls", description: "Quickly reach the system controls you use every day.", icon: AudioLines },
};

export function ComingSoon({ module }: { module: Exclude<PageId, "dashboard" | "notch" | "settings"> }) {
  const copy = moduleCopy[module];
  const Icon = copy.icon;
  return (
    <main className="content">
      <header className="page-header compact">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="lede">{copy.description}</p>
        </div>
        <div className="coming-badge">Coming soon</div>
      </header>
      <section className="empty-module">
        <div className="empty-icon"><Icon size={24} /></div>
        <Sparkles className="empty-sparkle" size={18} />
        <h2>This module is in progress.</h2>
        <p>The interface is reserved and ready. Native Windows integration will be added in a later release.</p>
        <span className="scope-note">No simulated device data is shown.</span>
      </section>
    </main>
  );
}
