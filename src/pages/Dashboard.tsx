import { ArrowUpRight, CircleDot, Monitor, Radio, Sparkles } from "lucide-react";
import type { PageId } from "../components/Sidebar";

interface DashboardProps {
  onNavigate: (page: PageId) => void;
  notchEnabled: boolean;
}

export function Dashboard({ onNavigate, notchEnabled }: DashboardProps) {
  return (
    <main className="content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Friday, October 30, 2026</p>
          <h1>Good afternoon.</h1>
          <p className="lede">Your desktop, composed around the moments that matter.</p>
        </div>
        <div className="header-orb"><Sparkles size={20} /></div>
      </header>

      <section className="hero-card">
        <div className="hero-copy">
          <div className="pill"><span className="status-dot" /> Running locally</div>
          <h2>Quietly present.<br /><em>Always within reach.</em></h2>
          <p>Wipple keeps your favorite controls close without taking over your workspace.</p>
          <button className="primary-button" onClick={() => onNavigate("notch")}>
            Open Dynamic Notch <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="hero-notch">
          <div className="notch-preview">
            <span className="preview-dot" />
            <span className="preview-line" />
            <span className="preview-time">12:48</span>
          </div>
          <div className="glow glow-one" />
          <div className="glow glow-two" />
        </div>
      </section>

      <div className="section-heading">
        <div><span className="eyebrow">Your setup</span><h3>Modules</h3></div>
        <span className="muted">1 of 4 active</span>
      </div>
      <section className="module-grid">
        <ModuleCard icon={<CircleDot size={19} />} title="Dynamic Notch" description="Floating desktop presence" active={notchEnabled} onClick={() => onNavigate("notch")} />
        <ModuleCard icon={<Radio size={19} />} title="AirPods" description="Device controls & battery" onClick={() => onNavigate("airpods")} />
        <ModuleCard icon={<Monitor size={19} />} title="Screen Mirroring" description="Cast your workspace" onClick={() => onNavigate("mirroring")} />
      </section>
    </main>
  );
}

function ModuleCard({
  icon,
  title,
  description,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`module-card ${active ? "module-active" : "module-soon"}`} onClick={onClick}>
      <div className="module-icon">{icon}</div>
      <span className="module-title">{title}</span>
      <span className="module-description">{description}</span>
      {active ? <span className="module-state"><span className="status-dot" /> Active</span> : <span className="coming-label">Coming soon</span>}
    </button>
  );
}
