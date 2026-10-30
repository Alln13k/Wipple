import {
  Airplay,
  AudioLines,
  CircleDot,
  LayoutDashboard,
  Monitor,
  Settings,
  Sparkles,
} from "lucide-react";

export type PageId = "dashboard" | "notch" | "airpods" | "mirroring" | "system" | "settings";

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const primaryItems: Array<{ id: PageId; label: string; icon: typeof LayoutDashboard; status?: string }> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "notch", label: "Dynamic Notch", icon: CircleDot, status: "Live" },
];

const comingSoonItems: Array<{ id: PageId; label: string; icon: typeof LayoutDashboard }> = [
  { id: "airpods", label: "AirPods", icon: Airplay },
  { id: "mirroring", label: "Screen Mirroring", icon: Monitor },
  { id: "system", label: "System", icon: AudioLines },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><Sparkles size={17} /></div>
        <span>Wipple</span>
        <span className="brand-version">0.1</span>
      </div>

      <div className="nav-section">
        <span className="nav-label">Workspace</span>
        {primaryItems.map((item) => (
          <NavItem key={item.id} item={item} active={activePage === item.id} onClick={() => onNavigate(item.id)} />
        ))}
      </div>

      <div className="nav-section">
        <span className="nav-label">Modules</span>
        {comingSoonItems.map((item) => (
          <NavItem key={item.id} item={item} active={activePage === item.id} onClick={() => onNavigate(item.id)} />
        ))}
      </div>

      <div className="sidebar-spacer" />
      <button className={`nav-item ${activePage === "settings" ? "active" : ""}`} onClick={() => onNavigate("settings")}>
        <Settings size={17} />
        <span>Settings</span>
      </button>
      <div className="sidebar-footer">
        <span className="status-dot" />
        <span>Wipple is running</span>
      </div>
    </aside>
  );
}

function NavItem({
  item,
  active,
  onClick,
}: {
  item: { label: string; icon: typeof LayoutDashboard; status?: string };
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <Icon size={17} />
      <span>{item.label}</span>
      {item.status && <span className="nav-status">{item.status}</span>}
    </button>
  );
}
