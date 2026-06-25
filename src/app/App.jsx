import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Command,
  Contact,
  Gauge,
  GraduationCap,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Play,
  RotateCcw,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Target,
  Trophy,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import {
  allActivities,
  domains,
  getActivity,
  getTier,
  masterFlashcardsActivity,
  tiers,
} from "../content/studyData.js";
import {
  getDomainCoverage,
  getExamRemediationMap,
  getLatestExamAttempt,
  getModuleProgress,
  getOverallProgress,
  getReadiness,
  getRecommendation,
  getReadinessSignals,
  getTierProgress,
  getWeakObjectives,
  getObjectiveRemediation,
  moduleNeedsReview,
} from "../lib/learningLogic.js";
import {
  feedbackByObjective,
  manualQaSummary,
  requiredLearnersPerTier,
  validationGateStatus,
} from "../lib/validationLogic.js";
import { progressRepository } from "../lib/progressRepository.js";
import { getFlashcardRevealTerm } from "../lib/flashcardTerms.js";
import {
  currentTierForProgress,
  filterCurriculum,
} from "../lib/curriculumSearch.js";
import { ActivityView as LearningActivityView } from "../features/learn/LearningActivities.jsx";
import { calculateSubnet, generateSubnetPrompt, isValidIpv4Address } from "../lib/subnetting.js";
import { SubnettingPractice } from "../features/subnetting/SubnettingPractice.jsx";
import { SubnettingExplanations } from "../features/subnetting/SubnettingExplanations.jsx";

const primaryNavItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "path", label: "Learning Path", icon: Layers3 },
  { id: "life-of-a-packet", label: "Life of a Packet", icon: Activity },
  { id: "domains", label: "Exam Domains", icon: BookOpen },
  { id: "flashcards", label: "Flash Cards", icon: Contact },
  { id: "common-ports", label: "Common Ports", icon: Server },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "study-guide", label: "How to Study", icon: GraduationCap },
  { id: "developers", label: "Meet the Developers", icon: UsersRound },
];

const aboutNavItems = [
  { id: "read-me", label: "Read Me", icon: CircleHelp },
  { id: "privacy", label: "Data & Privacy", icon: LockKeyhole },
  { id: "why-network", label: "Why Network+?", icon: TrendingUp },
];

const navItems = [...primaryNavItems, ...aboutNavItems];

const commonPorts = [
  { port: "20/21", protocol: "FTP", transport: "TCP", function: "Transfers files between systems. TCP 21 controls the session, while TCP 20 is traditionally used for active-mode data transfer.", memory: "File Transfer Protocol is old, clear-text, and still shows up in troubleshooting and legacy environments." },
  { port: "22", protocol: "SSH/SFTP/SCP", transport: "TCP", function: "Provides encrypted remote administration and secure file copy over the same protected channel.", memory: "Think secure shell: if you are safely managing a Linux server remotely, 22 is the usual answer." },
  { port: "23", protocol: "Telnet", transport: "TCP", function: "Offers remote terminal access without encryption, which makes it unsafe on modern networks.", memory: "Telnet is useful to recognize, but SSH is the safer replacement." },
  { port: "25", protocol: "SMTP", transport: "TCP", function: "Moves email between mail servers and often handles outbound mail relay.", memory: "SMTP sends mail. Client submission commonly uses 587 instead." },
  { port: "53", protocol: "DNS", transport: "UDP/TCP", function: "Resolves names to IP addresses. UDP is common for lookups; TCP is used for zone transfers and larger responses.", memory: "When users say 'the internet is down' but IP pings work, DNS on 53 is a prime suspect." },
  { port: "67/68", protocol: "DHCP", transport: "UDP", function: "Automatically leases IP settings. Servers listen on 67, clients use 68.", memory: "No valid address, gateway, or DNS? Check DHCP before blaming the whole network." },
  { port: "69", protocol: "TFTP", transport: "UDP", function: "Transfers files with minimal overhead and no built-in authentication, often for network device images or boot files.", memory: "Tiny FTP: simple, fast, and not secure." },
  { port: "80", protocol: "HTTP", transport: "TCP", function: "Carries unencrypted web traffic.", memory: "HTTP is easy to inspect, which is exactly why sensitive sites should use HTTPS." },
  { port: "110", protocol: "POP3", transport: "TCP", function: "Downloads mailbox messages from a server to a client.", memory: "POP pulls mail down; IMAP keeps mail synchronized on the server." },
  { port: "123", protocol: "NTP", transport: "UDP", function: "Synchronizes clocks across clients, servers, logs, and authentication systems.", memory: "Bad time breaks certificates, Kerberos, logs, and incident timelines." },
  { port: "143", protocol: "IMAP", transport: "TCP", function: "Lets mail clients read and organize messages while keeping them on the server.", memory: "IMAP is usually the better mental model for multi-device mail sync." },
  { port: "161/162", protocol: "SNMP", transport: "UDP", function: "Collects device telemetry on 161 and receives traps or alerts on 162.", memory: "Monitoring tools ask devices questions on 161; devices shout back alerts on 162." },
  { port: "389", protocol: "LDAP", transport: "TCP/UDP", function: "Queries directory services for users, groups, devices, and identity attributes.", memory: "LDAP is directory lookup; LDAPS protects it with TLS." },
  { port: "443", protocol: "HTTPS", transport: "TCP", function: "Carries encrypted web traffic using TLS.", memory: "443 is the default secure web port and a constant firewall/proxy troubleshooting checkpoint." },
  { port: "445", protocol: "SMB/CIFS", transport: "TCP", function: "Supports Windows file sharing, printer sharing, and many domain file operations.", memory: "File share problems on Windows often lead you to SMB on 445." },
  { port: "465/587", protocol: "SMTPS/SMTP Submission", transport: "TCP", function: "Secures or submits outbound email from clients and applications.", memory: "587 is the modern client submission port you are most likely to configure." },
  { port: "514", protocol: "Syslog", transport: "UDP/TCP", function: "Sends event logs from network devices and servers to a collector.", memory: "Central logging turns scattered device events into a timeline." },
  { port: "636", protocol: "LDAPS", transport: "TCP", function: "Protects LDAP directory queries with TLS encryption.", memory: "LDAPS is LDAP with privacy, especially important for identity traffic." },
  { port: "993", protocol: "IMAPS", transport: "TCP", function: "Provides IMAP mail access over TLS.", memory: "Secure server-stored mailbox access." },
  { port: "995", protocol: "POP3S", transport: "TCP", function: "Provides POP3 mail download over TLS.", memory: "Secure mailbox download, less common than IMAPS in many workplaces." },
  { port: "3389", protocol: "RDP", transport: "TCP/UDP", function: "Provides graphical remote desktop access to Windows systems.", memory: "Useful for administration, risky if exposed directly to the internet." },
];

const typeLabels = {
  lesson: "Lesson",
  flashcards: "Flashcards",
  quiz: "Knowledge check",
  checkpoint: "Tier checkpoint",
  scenario: "Scenario lab",
  exam: "Practice exam",
  subnetting: "Subnetting lab",
};

function scrollAppToTop(behavior = "auto") {
  const options = { top: 0, left: 0, behavior };
  window.scrollTo(options);
  document.documentElement.scrollTop = 0;
  document.documentElement.scrollLeft = 0;
  document.body.scrollTop = 0;
  document.body.scrollLeft = 0;
  document.querySelectorAll(".app-shell, .main, .page").forEach((node) => {
    node.scrollTop = 0;
    node.scrollLeft = 0;
    node.scrollTo?.(options);
  });
}

function scheduleScrollAppToTop(behavior = "auto") {
  scrollAppToTop(behavior);
  window.requestAnimationFrame(() => {
    scrollAppToTop(behavior);
    window.setTimeout(() => scrollAppToTop("auto"), 90);
  });
}

function Sidebar({ active, onNavigate, open, onClose, progress }) {
  const overall = getOverallProgress(progress);
  const packetSectionActive = active === "life-of-a-packet" || active === "life-of-arp";
  const [packetNavOpen, setPacketNavOpen] = useState(packetSectionActive);
  useEffect(() => {
    if (packetSectionActive) setPacketNavOpen(true);
  }, [packetSectionActive]);
  const renderNavItem = ({ id, label, icon: Icon }) => {
    if (id === "life-of-a-packet") {
      return (
        <div className="nav-collapsible" key={id}>
          <button
            className={`nav__item nav__item--parent ${packetSectionActive ? "nav__item--active" : ""}`}
            onClick={() => {
              setPacketNavOpen(true);
              onNavigate(id);
              onClose();
            }}
            aria-expanded={packetNavOpen}
          >
            <Icon size={18} />
            <span>{label}</span>
            <ChevronRight
              className={`nav__chevron ${packetNavOpen ? "nav__chevron--open" : ""}`}
              size={15}
            />
          </button>
          {packetNavOpen && (
            <div className="nav-submenu" aria-label="Life of a Packet sections">
              <button
                type="button"
                className={`nav-subitem ${active === "life-of-a-packet" ? "nav-subitem--active" : ""}`}
                onClick={() => {
                  onNavigate("life-of-a-packet");
                  onClose();
                }}
              >
                Packet Path
              </button>
              <button
                type="button"
                className={`nav-subitem ${active === "life-of-arp" ? "nav-subitem--active" : ""}`}
                onClick={() => {
                  onNavigate("life-of-arp");
                  onClose();
                }}
              >
                Life of ARP
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={id}
        className={`nav__item ${active === id ? "nav__item--active" : ""}`}
        onClick={() => {
          onNavigate(id);
          onClose();
        }}
      >
        <Icon size={18} />
        <span>{label}</span>
        {id === "path" && <span className="nav__badge">{tiers.length}</span>}
      </button>
    );
  };

  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="brand">
        <button
          className="brand__mark brand__home"
          onClick={() => {
            onNavigate("dashboard");
            onClose();
          }}
          aria-label="Return to Overview home"
          title="Field Guide home"
        >
          <ShieldCheck size={22} />
        </button>
        <div>
          <strong>NET+ FIELD GUIDE</strong>
          <span>N10-009</span>
        </div>
      </div>
      <button
        className="sidebar__close"
        onClick={onClose}
        aria-label="Close navigation"
      >
        <X size={20} />
      </button>
      <nav className="nav" aria-label="Main navigation">
        <div className="nav__group">
          <p className="eyebrow">Workspace</p>
          {primaryNavItems.map(renderNavItem)}
        </div>
        <div className="nav__group nav__group--about">
          <p className="eyebrow">About</p>
          {aboutNavItems.map(renderNavItem)}
        </div>
      </nav>
      <div className="sidebar__mission">
        <div className="mission__icon">
          <Target size={18} />
        </div>
        <p className="eyebrow">Learning path</p>
        <strong>Foundations first.</strong>
        <span>Six guided tiers turn a big exam into the next small win.</span>
        <div className="mission__meter">
          <i style={{ width: `${overall}%` }} />
        </div>
        <small>{overall}% journey complete</small>
      </div>
      <div className="profile">
        <div className="profile__avatar">
          {progress.learnerName.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <strong>{progress.learnerName}</strong>
          <span>Network+ candidate</span>
        </div>
        <ChevronRight size={17} />
      </div>
    </aside>
  );
}

function Topbar({
  title,
  onMenu,
  onHome,
  query,
  onQueryChange,
  onSearchActivate,
  recommendation,
  onContinue,
}) {
  const inputRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const handleKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
        onSearchActivate();
        window.setTimeout(() => inputRef.current?.focus(), 0);
      } else if (
        event.key === "Escape" &&
        document.activeElement === inputRef.current
      ) {
        event.preventDefault();
        onQueryChange("");
        setSearchOpen(false);
        inputRef.current.blur();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onQueryChange, onSearchActivate]);
  const update = (value) => {
    onQueryChange(value);
    onSearchActivate();
  };
  return (
    <header className="topbar">
      <button
        className="icon-button mobile-menu"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>
      <div className="topbar__context">
        <div className="topbar__title">
          <p className="eyebrow">Learning workspace</p>
          <h1>{title}</h1>
        </div>
        <button
          type="button"
          className={`topbar-home ${title === "Overview" ? "topbar-home--active" : ""}`}
          onClick={onHome}
          aria-label="Go to Overview home"
          title="Go to Overview"
        >
          <ShieldCheck size={17} />
          <span>Home</span>
        </button>
      </div>
      <div className={`topbar__actions ${searchOpen ? "search-open" : ""}`}>
        {recommendation?.activity && (
          <button
            className="continue-learning"
            onClick={onContinue}
            aria-label="Continue learning"
            title="Continue learning"
          >
            <Play size={15} />
            <span>Continue learning</span>
          </button>
        )}
        <button
          className="search-toggle"
          onClick={() => {
            setSearchOpen(!searchOpen);
            if (!searchOpen) {
              onSearchActivate();
              window.setTimeout(() => inputRef.current?.focus(), 0);
            }
          }}
          aria-label="Search guided curriculum"
          aria-expanded={searchOpen}
        >
          <Search size={18} />
        </button>
        <label className="search">
          <Search size={17} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => update(event.target.value)}
            aria-label="Filter guided curriculum"
            placeholder="Filter curriculum..."
          />
          <kbd>
            <Command size={11} /> K
          </kbd>
        </label>
      </div>
    </header>
  );
}

function Ring({ value, color = "#00d9ff", size = 74 }) {
  return (
    <div
      className="ring"
      style={{
        "--value": `${Math.max(0, Math.min(100, value)) * 3.6}deg`,
        "--ring": color,
        "--size": `${size}px`,
      }}
    >
      <strong>{value}%</strong>
    </div>
  );
}

function Highlight({ text, query }) {
  const value = String(text ?? "");
  const index = value.toLowerCase().indexOf(query.trim().toLowerCase());
  return index < 0 || !query.trim() ? (
    value
  ) : (
    <>
      {value.slice(0, index)}
      <mark>{value.slice(index, index + query.trim().length)}</mark>
      {value.slice(index + query.trim().length)}
    </>
  );
}

function Onboarding({ onStart, onExplore }) {
  return (
    <div className="welcome-overlay">
      <section
        className="welcome-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
      >
        <div className="welcome-orbit">
          <div className="brand__mark">
            <ShieldCheck size={30} />
          </div>
          <i />
          <i />
        </div>
        <p className="eyebrow">Welcome to your field guide</p>
        <h1 id="welcome-title">
          Network+ is a mountain.
          <br />
          <em>We built you a trail.</em>
        </h1>
        <p>
          Six guided tiers move from essential language to a full practice exam.
          Nothing is locked, and you’ll always know the next useful step.
        </p>
        <div className="welcome-tiers">
          {tiers.map((tier) => {
            const tierNumber = Number(tier.number);
            const tierLabel = Number.isFinite(tierNumber)
              ? String(tierNumber).padStart(2, "0")
              : tier.number;
            return (
              <span key={tier.id} style={{ "--tier": tier.color }}>
                <b>{tierLabel}</b>
                {tier.title}
              </span>
            );
          })}
        </div>
        <div className="welcome-actions">
          <button className="button button--primary" onClick={onStart}>
            <Play size={17} fill="currentColor" />
            Start with Tier 1 <ArrowRight size={17} />
          </button>
          <button className="button button--ghost" onClick={onExplore}>
            Explore the full path
          </button>
        </div>
        <small>Progress stays on this device. No account required.</small>
      </section>
    </div>
  );
}

function Dashboard({ progress, onOpenTier, onOpenActivity, onNavigate }) {
  const readiness = getReadiness(progress);
  const recommendation = getRecommendation(progress);
  const next = recommendation.activity;
  const currentTier = currentTierForProgress(
    tiers,
    progress,
    getRecommendation,
  );
  return (
    <div className="page dashboard">
      <div className="circuit-field" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index}>
            <i />
          </span>
        ))}
      </div>
      <h2 className="sr-only">Recommended Network+ activity</h2>
      <section className="start-card start-card--primary" aria-labelledby="start-card-title">
        <div className="start-card__icon">
          <GraduationCap size={24} />
        </div>
        <div>
          <p className="eyebrow">
            {recommendation.review
              ? "Review recommended"
              : progress.completedActivityIds.length
                ? "Keep going"
                : "Start here"}
          </p>
          <h3 id="start-card-title">
            {next
              ? next.title
              : progress.completedActivityIds.length
                ? "Journey complete."
                : "New to networking? Start at zero and follow the trail."}
          </h3>
          <p>
            {recommendation.review
              ? `A recent score below 80% suggests a quick review. ${next?.summary}`
              : next
                ? next.summary
                : "Review any tier or take another practice exam whenever you like."}
          </p>
        </div>
        <button
          className="button button--primary"
          disabled={!next}
          onClick={() => next && onOpenActivity(next.id)}
        >
          {recommendation.review
            ? "Start review"
            : next
              ? "Open next activity"
              : "Journey complete"}
          <ArrowRight size={16} />
        </button>
      </section>
      <section className="stats-row stats-row--trimmed">
        <article>
          <span className="stat-icon stat-icon--green">
            <Target size={19} />
          </span>
          <div>
            <p>Current tier</p>
            <strong>Tier {currentTier.number}</strong>
            <small>{currentTier.title}</small>
          </div>
        </article>
        <article>
          <span className="stat-icon stat-icon--orange">
            <Award size={19} />
          </span>
          <div>
            <p>Activities</p>
            <strong>{progress.completedActivityIds.length}</strong>
            <small>completed across the path</small>
          </div>
        </article>
        <article>
          <span className="stat-icon stat-icon--blue">
            <Gauge size={19} />
          </span>
          <div>
            <p>Readiness</p>
            <strong>{readiness}%</strong>
            <small>coverage + accuracy</small>
          </div>
        </article>
      </section>
      <section className="dashboard-tools" aria-label="Quick tools">
        <button type="button" onClick={() => onNavigate("life-of-a-packet")}>
          <span className="stat-icon stat-icon--blue">
            <Activity size={19} />
          </span>
          <strong>Life of a Packet</strong>
          <small>Watch a request cross the LAN and return.</small>
          <ArrowRight size={16} />
        </button>
        <button type="button" onClick={() => onNavigate("common-ports")}>
          <span className="stat-icon stat-icon--green">
            <Server size={19} />
          </span>
          <strong>Common Ports</strong>
          <small>Practice the ports that show up in tickets.</small>
          <ArrowRight size={16} />
        </button>
        <button type="button" onClick={() => onNavigate("flashcards")}>
          <span className="stat-icon stat-icon--orange">
            <Contact size={19} />
          </span>
          <strong>Flash Cards</strong>
          <small>Drill weak terms without opening a full lesson.</small>
          <ArrowRight size={16} />
        </button>
      </section>
      <div className="guided-layout guided-layout--wide">
        <section className="panel journey-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your guided journey</p>
              <h3>Six tiers, one clear direction</h3>
            </div>
            <button className="text-button" onClick={() => onNavigate("path")}>
              Full path <ArrowRight size={15} />
            </button>
          </div>
          <TierRail progress={progress} onOpenTier={onOpenTier} compact />
        </section>
      </div>
    </div>
  );
}

function TierRail({ progress, onOpenTier, compact = false }) {
  const recommendedTier =
    tiers.find((tier) => getTierProgress(tier, progress) < 100) ??
    tiers[tiers.length - 1];
  return (
    <div className={`tier-rail ${compact ? "tier-rail--compact" : ""}`}>
      {tiers.map((tier, index) => {
        const value = getTierProgress(tier, progress);
        const recommended = tier.id === recommendedTier.id;
        const badge = compact && tier.id === "tier-subnetting" ? "IP" : tier.number;
        return (
          <button
            key={tier.id}
            className={`tier-node ${recommended ? "tier-node--recommended" : ""}`}
            style={{ "--tier": tier.color }}
            onClick={() => onOpenTier(tier.id)}
          >
            <span className="tier-node__number">
              {value === 100 ? <Check size={19} /> : badge}
            </span>
            <span className="tier-node__copy">
              <small>
                {recommended
                  ? value > 0
                    ? "Continue here"
                    : "Recommended next"
                  : tier.recommendedAfter
                    ? `Best after Tier ${tier.recommendedAfter}`
                    : "Start here"}
              </small>
              <strong>{tier.title}</strong>
              <em>{tier.subtitle}</em>
            </span>
            <span className="tier-node__progress">
              <i style={{ width: `${value}%` }} />
            </span>
            <b>{value}%</b>
            <ChevronRight size={18} />
            {index < tiers.length - 1 && <span className="tier-connector" />}
          </button>
        );
      })}
    </div>
  );
}

function PathView({
  progress,
  onOpenTier,
  onOpenActivity,
  query,
  onClearQuery,
}) {
  const results = useMemo(() => filterCurriculum(tiers, query), [query]);
  if (query.trim())
    return (
      <div className="page">
        <div className="page-intro search-intro">
          <div>
            <p className="eyebrow">Curriculum filter</p>
            <h2>Results for “{query}”</h2>
            <p aria-live="polite">
              {results.resultCount}{" "}
              {results.resultCount === 1 ? "activity" : "activities"} found
              across {results.tiers.length}{" "}
              {results.tiers.length === 1 ? "tier" : "tiers"}.
            </p>
          </div>
          <button className="button button--ghost" onClick={onClearQuery}>
            Clear filter
          </button>
        </div>
        {results.resultCount === 0 ? (
          <section className="panel search-empty">
            <Search size={28} />
            <h3>No curriculum matches that filter.</h3>
            <p>
              Try a tier name, objective such as 3.4, activity type, or topic
              keyword.
            </p>
            <button className="button button--primary" onClick={onClearQuery}>
              Show full path
            </button>
          </section>
        ) : (
          <div className="search-results">
            {results.tiers.map((tier) => (
              <section
                className="panel search-tier"
                key={tier.id}
                style={{ "--tier": tier.color }}
              >
                <header>
                  <span>Tier {tier.number}</span>
                  <h3>
                    <Highlight text={tier.title} query={query} />
                  </h3>
                </header>
                {tier.modules.map((module) => (
                  <div className="search-module" key={module.id}>
                    <h4>
                      <Highlight text={module.title} query={query} />
                    </h4>
                    {module.activities.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => onOpenActivity(activity.id)}
                      >
                        <span>
                          {typeLabels[activity.type]} · Objective{" "}
                          <Highlight text={activity.objective} query={query} />
                        </span>
                        <strong>
                          <Highlight text={activity.title} query={query} />
                        </strong>
                        <small>
                          <Highlight text={activity.summary} query={query} />
                        </small>
                        <ArrowRight size={16} />
                      </button>
                    ))}
                  </div>
                ))}
              </section>
            ))}
          </div>
        )}
      </div>
    );
  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">Guided curriculum</p>
          <h2>
            See the whole mountain.
            <br />
            Take one step.
          </h2>
          <p>
            The path mixes all five exam domains in prerequisite order. Every
            tier is open, but Tier 1 gives you the vocabulary and confidence the
            rest will use.
          </p>
        </div>
        <div className="path-summary">
          <Ring value={getOverallProgress(progress)} size={94} />
          <span>
            <strong>Full journey</strong>
            <small>
              {progress.completedActivityIds.length} activities finished
            </small>
          </span>
        </div>
      </div>
      <section className="panel path-panel">
        <TierRail progress={progress} onOpenTier={onOpenTier} />
      </section>
    </div>
  );
}

function TierDetail({ tier, progress, onBack, onOpenActivity }) {
  const value = getTierProgress(tier, progress);
  return (
    <div className="page tier-detail-page" style={{ "--tier": tier.color }}>
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={16} /> Back to path
      </button>
      <section className="tier-banner">
        <div>
          <span className="status-pill">
            <i /> Tier {tier.number} of {tiers.length}
          </span>
          <p className="eyebrow">
            {tier.difficulty} · {tier.minutes} minutes
          </p>
          <h2>{tier.title}</h2>
          <p>
            {tier.subtitle}. {tier.modules[0].summary}
          </p>
        </div>
        <Ring value={value} color={tier.color} size={126} />
      </section>
      {tier.recommendedAfter && (
        <div className="guidance-note">
          <Sparkles size={18} />
          <div>
            <strong>
              Recommended after Tier {tier.recommendedAfter}, never locked.
            </strong>
            <span>
              You can explore now. If anything feels unfamiliar, the earlier
              tier will build the missing context.
            </span>
          </div>
        </div>
      )}
      <div className="module-stack">
        {tier.modules.map((module, moduleIndex) => {
          const moduleProgress = getModuleProgress(module, progress);
          const needsReview = moduleNeedsReview(module, progress);
          return (
            <section
              className={`panel module-panel ${needsReview ? "module-panel--review" : ""}`}
              key={module.id}
            >
              <div className="module-heading">
                <span>0{moduleIndex + 1}</span>
                <div className="module-heading__copy">
                  <p className="eyebrow">Learning module</p>
                  <h3>{module.title}</h3>
                  <p>{module.summary}</p>
                </div>
                <div className="module-progress">
                  <strong>
                    {needsReview
                      ? "Review recommended"
                      : `${moduleProgress}% complete`}
                  </strong>
                  <i>
                    <em style={{ width: `${moduleProgress}%` }} />
                  </i>
                </div>
              </div>
              <div className="activity-list">
                {module.activities.map((activity, activityIndex) => {
                  const done = progress.completedActivityIds.includes(
                    activity.id,
                  );
                  const hasContent =
                    activity.content || activity.cards || activity.questions;
                  return (
                    <button
                      key={activity.id}
                      className={`activity-row ${done ? "activity-row--done" : ""}`}
                      onClick={() => onOpenActivity(activity.id)}
                    >
                      <span className="activity-status">
                        {done ? <Check size={17} /> : activityIndex + 1}
                      </span>
                      <span className="activity-copy">
                        <small>
                          {typeLabels[activity.type]} · Domain {activity.domain}{" "}
                          · Objective {activity.objective}
                        </small>
                        <strong>{activity.title}</strong>
                        <em>{activity.summary}</em>
                      </span>
                      <span className="activity-time">
                        <Clock3 size={14} />
                        {activity.duration} min
                      </span>
                      {!hasContent && (
                        <span className="preview-badge">Preview</span>
                      )}
                      <ChevronRight size={18} />
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function DomainsView({ progress }) {
  const coverage = getDomainCoverage(progress);
  const [selected, setSelected] = useState(coverage[0]);
  useEffect(
    () =>
      setSelected(
        coverage.find((domain) => domain.id === selected.id) ?? coverage[0],
      ),
    [progress],
  );
  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">Objective reference</p>
          <h2>
            Five exam domains.
            <br />
            Woven through every tier.
          </h2>
          <p>
            Use this view to inspect official coverage. Your learning order is
            guided by difficulty, not the domain numbering.
          </p>
        </div>
      </div>
      <div className="domain-grid">
        {coverage.map((domain) => {
          const Icon = domain.icon;
          return (
            <button
              key={domain.id}
              className={`domain-card ${selected.id === domain.id ? "domain-card--active" : ""}`}
              style={{ "--domain": domain.color }}
              onClick={() => setSelected(domain)}
            >
              <span className="domain-card__icon">
                <Icon size={22} />
              </span>
              <small>{domain.weight}% OF EXAM</small>
              <h3>{domain.title}</h3>
              <p>{domain.topics.join(" · ")}</p>
              <div className="domain-card__bottom">
                <span>
                  <i style={{ width: `${domain.progress}%` }} />
                </span>
                <strong>{domain.progress}%</strong>
              </div>
            </button>
          );
        })}
      </div>
      <section
        className="panel domain-detail"
        style={{ "--domain": selected.color }}
      >
        <div>
          <p className="eyebrow">Domain {selected.id} coverage</p>
          <h3>{selected.title}</h3>
          <p>
            Progress grows whenever you complete a mapped activity anywhere in
            the {tiers.length}-tier path.
          </p>
        </div>
        <div className="topic-chips">
          {selected.topics.map((topic, i) => (
            <span key={topic}>
              <b>
                {selected.id}.{i + 1}
              </b>
              {topic}
            </span>
          ))}
        </div>
        <Ring value={selected.progress} color={selected.color} size={82} />
      </section>
    </div>
  );
}

const packetScenarios = {
  web: {
    label: "Open a website",
    packet: "HTTPS",
    color: "#00d9ff",
    summary:
      "A client resolves a name, builds frames for the local LAN, crosses the gateway, and receives the server response.",
    steps: [
      {
        title: "Application creates data",
        device: "Workstation",
        layer: "Layer 7",
        detail:
          "The browser creates an HTTPS request. The payload is still just application data before TCP/IP headers are added.",
      },
      {
        title: "Transport adds ports",
        device: "Workstation",
        layer: "Layer 4",
        detail:
          "TCP adds a source port and destination port 443 so both hosts know which application conversation this belongs to.",
      },
      {
        title: "Network adds IPs",
        device: "Workstation",
        layer: "Layer 3",
        detail:
          "IP adds the client source address and the remote server destination address. The client sees the server is off-subnet.",
      },
      {
        title: "ARP finds the gateway MAC",
        device: "Switch",
        layer: "Layer 2",
        detail:
          "Because the destination is remote, the client frames the packet to the default gateway MAC, not the web server MAC.",
      },
      {
        title: "Switch forwards the frame",
        device: "Switch",
        layer: "Layer 2",
        detail:
          "The switch checks its MAC table and forwards the frame only toward the router port.",
      },
      {
        title: "Router chooses a route",
        device: "Router",
        layer: "Layer 3",
        detail:
          "The router removes the LAN frame, keeps the IP packet, decrements TTL, and forwards it using the routing table.",
      },
      {
        title: "Server replies",
        device: "Server",
        layer: "Layers 4-7",
        detail:
          "The server sends return traffic back through the same logical stack: ports, IP addresses, frames, and switching.",
      },
    ],
  },
  dhcp: {
    label: "Get an IP address",
    packet: "DHCP",
    color: "#ffb86b",
    summary:
      "A new client broadcasts because it does not yet know its address, gateway, or DHCP server.",
    steps: [
      {
        title: "Client broadcasts discover",
        device: "Laptop",
        layer: "Layer 2",
        detail:
          "The client starts with no valid IP, so it sends a DHCP Discover to the broadcast MAC address.",
      },
      {
        title: "Switch floods the frame",
        device: "Switch",
        layer: "Layer 2",
        detail:
          "Broadcast traffic is copied out switch ports in the VLAN so a DHCP server or relay can hear it.",
      },
      {
        title: "DHCP offers a lease",
        device: "Server",
        layer: "Layer 7",
        detail:
          "The DHCP server offers an IP address, subnet mask, default gateway, DNS server, and lease time.",
      },
      {
        title: "Client requests the offer",
        device: "Laptop",
        layer: "Layer 7",
        detail:
          "The client accepts one offer with a DHCP Request so every DHCP server knows which lease was chosen.",
      },
      {
        title: "Server acknowledges",
        device: "Server",
        layer: "Layer 7",
        detail:
          "The ACK finalizes the lease. The client can now talk to local and routed networks.",
      },
    ],
  },
  ping: {
    label: "Ping a neighbor",
    packet: "ICMP",
    color: "#75f0c2",
    summary:
      "A same-LAN ping shows the difference between IP packets and Ethernet frames.",
    steps: [
      {
        title: "ICMP echo is built",
        device: "Workstation",
        layer: "Layer 3",
        detail:
          "Ping creates an ICMP Echo Request addressed to another host on the same subnet.",
      },
      {
        title: "ARP resolves the peer",
        device: "Workstation",
        layer: "Layer 2",
        detail:
          "The client needs the destination host MAC address because same-subnet traffic does not use the default gateway.",
      },
      {
        title: "Switch learns and forwards",
        device: "Switch",
        layer: "Layer 2",
        detail:
          "The switch records the source MAC, then forwards the frame toward the destination MAC.",
      },
      {
        title: "Peer sends echo reply",
        device: "Laptop",
        layer: "Layer 3",
        detail:
          "The receiving host swaps source and destination information and returns an ICMP Echo Reply.",
      },
    ],
  },
};

const packetDevices = [
  { id: "workstation", label: "Workstation", meta: "192.168.10.25", x: 15, y: 22 },
  { id: "laptop", label: "Laptop", meta: "192.168.10.44", x: 15, y: 70 },
  { id: "switch", label: "Access switch", meta: "MAC table", x: 38, y: 47 },
  { id: "router", label: "Default gateway", meta: "192.168.10.1", x: 66, y: 47 },
  { id: "server", label: "Server", meta: "10.20.30.8", x: 85, y: 26 },
  { id: "internet", label: "Internet", meta: "Routed WAN", x: 85, y: 70 },
];

const deviceConfigs = {
  router: {
    title: "RTR-EDGE-01",
    command: "show running-config",
    summary:
      "Default gateway for VLAN 10. It routes LAN traffic toward the WAN, relays DHCP, and overloads inside hosts behind the outside interface.",
    output: `RTR-EDGE-01# show running-config
!
hostname RTR-EDGE-01
no ip domain-lookup
ip domain-name fieldguide.local
!
interface GigabitEthernet0/0
 description LAN uplink to SW-ACCESS-01
 ip address 192.168.10.1 255.255.255.0
 ip helper-address 10.20.30.8
 ip nat inside
 no shutdown
!
interface GigabitEthernet0/1
 description WAN handoff to ISP
 ip address 203.0.113.10 255.255.255.252
 ip nat outside
 no shutdown
!
ip dhcp excluded-address 192.168.10.1 192.168.10.20
ip dhcp pool VLAN10-USERS
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 10.20.30.8 1.1.1.1
 lease 7
!
access-list 10 permit 192.168.10.0 0.0.0.255
ip nat inside source list 10 interface GigabitEthernet0/1 overload
ip route 0.0.0.0 0.0.0.0 203.0.113.9
!
line vty 0 4
 transport input ssh
 login local
end`,
    callouts: [
      "GigabitEthernet0/0 is the hosts' default gateway.",
      "ip helper-address forwards DHCP broadcasts to the server.",
      "The default route sends unknown remote destinations to the ISP.",
    ],
  },
  switch: {
    title: "SW-ACCESS-01",
    command: "show running-config",
    summary:
      "Access switch for user devices. It places endpoints in VLAN 10 and uplinks to the router.",
    output: `SW-ACCESS-01# show running-config
!
hostname SW-ACCESS-01
spanning-tree mode rapid-pvst
!
vlan 10
 name USERS
!
interface GigabitEthernet0/1
 description Workstation-A
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
!
interface GigabitEthernet0/2
 description Laptop-B
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
!
interface GigabitEthernet0/24
 description Uplink to RTR-EDGE-01
 switchport mode access
 switchport access vlan 10
!
interface Vlan10
 description Management SVI
 ip address 192.168.10.2 255.255.255.0
 no shutdown
!
ip default-gateway 192.168.10.1
!
mac address-table dynamic
 AA:10:25    DYNAMIC     Gi0/1
 BB:10:44    DYNAMIC     Gi0/2
 CC:10:01    DYNAMIC     Gi0/24
end`,
    callouts: [
      "Access ports put user devices into VLAN 10.",
      "The switch forwards frames using the MAC address table.",
      "ip default-gateway is for switch management, not host routing.",
    ],
  },
  server: {
    title: "SRV-DNS-DHCP-01",
    command: "ipconfig /all + service notes",
    summary:
      "Infrastructure server that answers DNS and DHCP for the lab subnet.",
    output: `SRV-DNS-DHCP-01> ipconfig /all

Ethernet adapter LAN:
   IPv4 Address . . . . . . . . . . : 10.20.30.8
   Subnet Mask  . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 10.20.30.1
   DNS Servers . . . . . . . . . . : 10.20.30.8

DHCP scope VLAN10-USERS
   Scope network  . . . . . . . . . : 192.168.10.0/24
   Lease range    . . . . . . . . . : 192.168.10.21-192.168.10.220
   Option 003 Router . . . . . . . : 192.168.10.1
   Option 006 DNS Servers . . . . . : 10.20.30.8, 1.1.1.1

DNS zone fieldguide.local
   www.fieldguide.local  A  10.20.30.8`,
    callouts: [
      "DHCP options give clients their gateway and DNS servers.",
      "The router's helper address lets DHCP cross a subnet boundary.",
      "DNS turns names into IP addresses before the packet can be sent.",
    ],
  },
  workstation: {
    title: "Workstation-A",
    command: "ipconfig /all",
    summary:
      "Client endpoint with a DHCP lease and a default gateway pointing at the router.",
    output: `Workstation-A> ipconfig /all

Ethernet adapter LAN:
   Connection-specific DNS Suffix  . : fieldguide.local
   Physical Address . . . . . . . . : AA:10:25
   DHCP Enabled . . . . . . . . . . : Yes
   IPv4 Address . . . . . . . . . . : 192.168.10.25
   Subnet Mask  . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 192.168.10.1
   DHCP Server . . . . . . . . . . : 10.20.30.8
   DNS Servers . . . . . . . . . . : 10.20.30.8

Workstation-A> arp -a
192.168.10.1    CC:10:01    dynamic
192.168.10.44   BB:10:44    dynamic`,
    callouts: [
      "Same-subnet traffic uses the peer MAC address.",
      "Remote traffic uses the default gateway MAC address.",
      "ARP maps local IPv4 addresses to Ethernet addresses.",
    ],
  },
  laptop: {
    title: "Laptop-B",
    command: "ipconfig /all",
    summary:
      "Second LAN endpoint used to demonstrate same-subnet switching and ARP.",
    output: `Laptop-B> ipconfig /all

Wireless/Ethernet adapter LAN:
   Physical Address . . . . . . . . : BB:10:44
   DHCP Enabled . . . . . . . . . . : Yes
   IPv4 Address . . . . . . . . . . : 192.168.10.44
   Subnet Mask  . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 192.168.10.1
   DNS Servers . . . . . . . . . . : 10.20.30.8

Laptop-B> ping 192.168.10.25
Reply from 192.168.10.25: bytes=32 time<1ms TTL=128`,
    callouts: [
      "The laptop can reach the workstation without using the router.",
      "The switch still learns both source MAC addresses.",
      "The gateway is only needed for off-subnet destinations.",
    ],
  },
  internet: {
    title: "ISP / Internet",
    command: "path view",
    summary:
      "Represents routed networks beyond the local default gateway.",
    output: `Internet path summary

Client LAN       192.168.10.0/24
Default gateway  192.168.10.1
Edge outside     203.0.113.10/30
Next hop ISP     203.0.113.9

Traffic behavior:
1. Client sends remote traffic to gateway MAC CC:10:01.
2. Router forwards using 0.0.0.0/0 default route.
3. NAT overload translates inside clients to 203.0.113.10.
4. Return traffic maps back to the original client session.`,
    callouts: [
      "The client does not ARP for internet hosts.",
      "The router makes the Layer 3 forwarding decision.",
      "NAT changes address visibility at the network edge.",
    ],
  },
};

const packetWires = [
  { id: "desktop-switch", from: "workstation", to: "switch", left: 18, top: 35, width: 23, rotate: 22 },
  { id: "laptop-switch", from: "laptop", to: "switch", left: 19, top: 63, width: 22, rotate: -19 },
  { id: "switch-router", from: "switch", to: "router", left: 46, top: 50, width: 21, rotate: 0 },
  { id: "router-server", from: "router", to: "server", left: 72, top: 39, width: 18, rotate: -25 },
  { id: "router-internet", from: "router", to: "internet", left: 72, top: 60, width: 18, rotate: 25 },
];

const packetFlowsByScenario = {
  web: [
    { path: "desktop-switch", delay: "0s", label: "HTTPS" },
    { path: "switch-router", delay: ".9s", label: "HTTPS" },
    { path: "router-server", delay: "1.8s", label: "Request" },
    { path: "router-server", delay: "2.7s", reverse: true, label: "Reply" },
    { path: "switch-router", delay: "3.6s", reverse: true, label: "Reply" },
    { path: "desktop-switch", delay: "4.5s", reverse: true, label: "Reply" },
  ],
  dhcp: [
    { path: "laptop-switch", delay: "0s", label: "Discover" },
    { path: "switch-router", delay: ".9s", label: "Relay" },
    { path: "router-server", delay: "1.8s", label: "Discover" },
    { path: "router-server", delay: "2.7s", reverse: true, label: "Offer" },
    { path: "switch-router", delay: "3.6s", reverse: true, label: "Offer" },
    { path: "laptop-switch", delay: "4.5s", reverse: true, label: "ACK" },
  ],
  ping: [
    { path: "desktop-switch", delay: "0s", label: "ARP" },
    { path: "laptop-switch", delay: "1.2s", label: "Echo" },
    { path: "laptop-switch", delay: "2.4s", reverse: true, label: "Reply" },
    { path: "desktop-switch", delay: "3.6s", reverse: true, label: "Reply" },
  ],
};

const packetTrafficEvents = {
  web: ["DNS/HTTPS request", "Gateway forwards", "Server replies"],
  dhcp: ["Discover broadcast", "Offer returns", "Request lease", "ACK confirms"],
  ping: ["ARP for neighbor", "ICMP echo", "ICMP reply"],
};

const macLabFrames = [
  {
    id: "unknown",
    label: "Desktop to laptop",
    source: "AA:10:25",
    destination: "BB:10:44",
    port: "Gi0/1",
    outcome: "Unknown destination: flood",
    note: "The switch learns the source MAC on Gi0/1, then floods because it has not learned the laptop MAC yet.",
  },
  {
    id: "reply",
    label: "Laptop replies",
    source: "BB:10:44",
    destination: "AA:10:25",
    port: "Gi0/2",
    outcome: "Known destination: forward",
    note: "The switch learns the laptop MAC on Gi0/2 and forwards directly to the desktop on Gi0/1.",
  },
  {
    id: "server",
    label: "Desktop to gateway",
    source: "AA:10:25",
    destination: "CC:10:01",
    port: "Gi0/1",
    outcome: "Known gateway: forward",
    note: "Traffic leaving the subnet uses the default gateway MAC, so the switch forwards to the router port.",
  },
];

const arpTargets = {
  gateway: {
    label: "Remote website",
    intent: "Workstation needs to reach 10.20.30.8 through its default gateway.",
    resolveIp: "192.168.10.1",
    owner: "Default gateway",
    ownerMac: "CC:10:01",
    result: "The IP destination stays 10.20.30.8, but the Ethernet destination becomes the gateway MAC.",
    cacheBefore: [
      { ip: "192.168.10.44", mac: "BB:10:44", state: "cached" },
    ],
    cacheAfter: [
      { ip: "192.168.10.44", mac: "BB:10:44", state: "cached" },
      { ip: "192.168.10.1", mac: "CC:10:01", state: "learned" },
    ],
    clues: [
      "Can ping the gateway but not the server? ARP probably worked; move up to routing, DNS, firewall, or service checks.",
      "Cannot resolve the gateway MAC? Check VLAN, switchport, duplicate IP, or gateway interface state.",
    ],
  },
  neighbor: {
    label: "Same-LAN neighbor",
    intent: "Workstation pings Laptop-B on the same 192.168.10.0/24 subnet.",
    resolveIp: "192.168.10.44",
    owner: "Laptop-B",
    ownerMac: "BB:10:44",
    result: "Same-subnet traffic uses the neighbor MAC directly; the router is not part of the frame.",
    cacheBefore: [
      { ip: "192.168.10.1", mac: "CC:10:01", state: "cached" },
    ],
    cacheAfter: [
      { ip: "192.168.10.1", mac: "CC:10:01", state: "cached" },
      { ip: "192.168.10.44", mac: "BB:10:44", state: "learned" },
    ],
    clues: [
      "Same-subnet ping fails but gateway ping works? Look for endpoint firewall, wrong mask, bad switchport, or stale ARP.",
      "The switch floods the ARP request inside the VLAN, then forwards normal unicast after the MAC is known.",
    ],
  },
  stale: {
    label: "Stale cache",
    intent: "The gateway NIC changed, but the workstation still has the old MAC cached.",
    resolveIp: "192.168.10.1",
    owner: "Default gateway",
    ownerMac: "CC:10:01",
    result: "Clearing or refreshing ARP lets the workstation learn the current MAC and rebuild the frame correctly.",
    cacheBefore: [
      { ip: "192.168.10.1", mac: "CC:10:99", state: "stale" },
    ],
    cacheAfter: [
      { ip: "192.168.10.1", mac: "CC:10:01", state: "refreshed" },
    ],
    clues: [
      "A stale entry can make one host fail while others on the same VLAN work normally.",
      "Useful checks: `arp -a`, `arp -d`, duplicate IP detection, and switch MAC table lookups.",
    ],
  },
};

const arpSteps = [
  {
    title: "Decide what IP needs a MAC",
    layer: "L3 to L2 handoff",
    detail:
      "The host checks its subnet mask. Local destination? Resolve that host. Remote destination? Resolve the default gateway instead.",
  },
  {
    title: "Check the ARP cache",
    layer: "Host cache",
    detail:
      "If the mapping is already fresh, the host skips the broadcast and immediately builds the Ethernet frame.",
  },
  {
    title: "Broadcast who-has",
    layer: "Ethernet broadcast",
    detail:
      "The request goes to ff:ff:ff:ff:ff:ff, so every device in the VLAN sees it. Routers do not forward that broadcast.",
  },
  {
    title: "Owner replies unicast",
    layer: "ARP reply",
    detail:
      "Only the device that owns the requested IP replies, and it sends the answer directly back to the requester MAC.",
  },
  {
    title: "Cache then send the frame",
    layer: "Normal unicast",
    detail:
      "The host stores the IP-to-MAC mapping and wraps the packet in an Ethernet frame addressed to the learned MAC.",
  },
  {
    title: "Switch forwards by MAC",
    layer: "Switching",
    detail:
      "After ARP, the switch uses its MAC address table to forward the unicast frame. The IP packet inside still keeps the final IP destination.",
  },
];

const arpGlossary = [
  ["ARP request", "Broadcast question: who has this IPv4 address?"],
  ["ARP reply", "Unicast answer: that IPv4 address is at this MAC."],
  ["ARP cache", "Temporary host table of IPv4-to-MAC mappings."],
  ["Broadcast domain", "The VLAN or segment that receives the ARP request."],
  ["ARP poisoning", "A spoofed mapping that points an IP address at the wrong MAC."],
  ["Dynamic ARP inspection", "A switch security feature that helps reject forged ARP messages."],
];

function upsertMacEntry(entries, frame) {
  const next = entries.filter((entry) => entry.mac !== frame.source);
  return [
    ...next,
    {
      mac: frame.source,
      port: frame.port,
      age: "fresh",
    },
  ];
}

function CiscoStyleRouterIcon() {
  return (
    <svg
      className="network-symbol network-symbol--router"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="18" />
      <path d="M15 18h18" />
      <path d="M29 14l5 4-5 4" />
      <path d="M33 30H15" />
      <path d="M19 26l-5 4 5 4" />
      <path d="M18 33l12-18" />
      <path d="M25 15h6v6" />
      <path d="M30 33L18 15" />
      <path d="M18 15h6" />
    </svg>
  );
}

function CiscoStyleSwitchIcon() {
  return (
    <svg
      className="network-symbol network-symbol--switch"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <rect x="9" y="13" width="30" height="22" rx="4" />
      <path d="M15 20h10" />
      <path d="M22 17l4 3-4 3" />
      <path d="M33 20H23" />
      <path d="M26 17l-4 3 4 3" />
      <path d="M15 28h10" />
      <path d="M22 25l4 3-4 3" />
      <path d="M33 28H23" />
      <path d="M26 25l-4 3 4 3" />
    </svg>
  );
}

function getDeviceCommands(deviceId, primaryConfig) {
  const commands = {
    router: [
      { id: "run", label: "show run", output: primaryConfig.output },
      {
        id: "ip-route",
        label: "show ip route",
        output: `RTR-EDGE-01# show ip route

Gateway of last resort is 203.0.113.9 to network 0.0.0.0

C    192.168.10.0/24 is directly connected, GigabitEthernet0/0
L    192.168.10.1/32 is directly connected, GigabitEthernet0/0
C    203.0.113.8/30 is directly connected, GigabitEthernet0/1
L    203.0.113.10/32 is directly connected, GigabitEthernet0/1
S*   0.0.0.0/0 [1/0] via 203.0.113.9`,
      },
      {
        id: "nat",
        label: "show ip nat translations",
        output: `RTR-EDGE-01# show ip nat translations

Pro  Inside global      Inside local       Outside local      Outside global
tcp  203.0.113.10:49152 192.168.10.25:49152 10.20.30.8:443   10.20.30.8:443
udp  203.0.113.10:53012 192.168.10.25:53012 1.1.1.1:53       1.1.1.1:53`,
      },
    ],
    switch: [
      { id: "run", label: "show run", output: primaryConfig.output },
      {
        id: "mac",
        label: "show mac address-table",
        output: `SW-ACCESS-01# show mac address-table

          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
  10    aa10.0025.0001    DYNAMIC     Gi0/1
  10    bb10.0044.0001    DYNAMIC     Gi0/2
  10    cc10.0001.0001    DYNAMIC     Gi0/24`,
      },
      {
        id: "interfaces",
        label: "show interfaces status",
        output: `SW-ACCESS-01# show interfaces status

Port      Name               Status       Vlan       Duplex  Speed
Gi0/1     Workstation-A      connected    10         a-full  a-1000
Gi0/2     Laptop-B           connected    10         a-full  a-1000
Gi0/24    Uplink-RTR         connected    10         a-full  a-1000`,
      },
    ],
    server: [
      { id: "ip", label: "ipconfig /all", output: primaryConfig.output },
      {
        id: "dns",
        label: "nslookup",
        output: `SRV-DNS-DHCP-01> nslookup www.fieldguide.local
Server:  SRV-DNS-DHCP-01
Address: 10.20.30.8

Name:    www.fieldguide.local
Address: 10.20.30.8`,
      },
    ],
    workstation: [
      { id: "ip", label: "ipconfig /all", output: primaryConfig.output },
      {
        id: "trace",
        label: "tracert",
        output: `Workstation-A> tracert 10.20.30.8

  1   <1 ms   <1 ms   <1 ms   192.168.10.1
  2    3 ms    2 ms    3 ms   10.20.30.8

Trace complete.`,
      },
    ],
    laptop: [
      { id: "ip", label: "ipconfig /all", output: primaryConfig.output },
      {
        id: "arp",
        label: "arp -a",
        output: `Laptop-B> arp -a

Interface: 192.168.10.44
  Internet Address      Physical Address      Type
  192.168.10.1          cc-10-00-01-00-01     dynamic
  192.168.10.25         aa-10-00-25-00-01     dynamic`,
      },
    ],
    internet: [
      { id: "path", label: "path view", output: primaryConfig.output },
      {
        id: "edge",
        label: "edge summary",
        output: `ISP edge view

Neighbor route: 203.0.113.10/30
Customer inside source seen after NAT: 203.0.113.10
Private client address hidden: 192.168.10.25
Return path: ISP -> 203.0.113.10 -> NAT table -> client`,
      },
    ],
  };
  return commands[deviceId] ?? [{ id: "primary", label: primaryConfig.command, output: primaryConfig.output }];
}

function LifeOfPacketView() {
  const packetColor = packetScenarios.web.color;
  const explanations = [
    {
      title: "1. Client sends",
      body: "The workstation builds a request and wraps it in a local Ethernet frame.",
    },
    {
      title: "2. LAN forwards",
      body: "The switch forwards the frame toward the default gateway using MAC addresses.",
    },
    {
      title: "3. Router sends",
      body: "The router strips the local frame, keeps the IP packet, and sends it toward the server.",
    },
    {
      title: "4. Server replies",
      body: "The response comes back through the router and switch to the original client.",
    },
  ];

  return (
    <div className="page packet-page">
      <div className="page-intro packet-intro">
        <div>
          <p className="eyebrow">Packet path</p>
          <h2>Life of a packet</h2>
          <p>
            Watch one request leave a workstation, cross the switch, pass
            through the default gateway, reach a server, and return.
          </p>
        </div>
      </div>
      <section
        className="packet-lab packet-lab--simple packet-lab--story"
        style={{ "--packet-color": packetColor, "--packet-duration": "5.8s" }}
      >
        <div className="packet-stage packet-stage--story" aria-label="Animated packet path from client through switch and router to server">
          <svg
            className="packet-schematic"
            viewBox="0 0 390 620"
            role="img"
            aria-labelledby="packet-schematic-title packet-schematic-desc"
          >
            <title id="packet-schematic-title">Packet path through a small network</title>
            <desc id="packet-schematic-desc">
              A request leaves a client, passes through an access switch and router,
              reaches a web server, then returns as a reply.
            </desc>
            <defs>
              <marker id="packet-arrow-down" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path className="packet-arrowhead packet-arrowhead--down" d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
              <marker id="packet-arrow-up" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path className="packet-arrowhead packet-arrowhead--up" d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
              <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path className="packet-schematic__cable" d="M 195 118 V 498" />
            <path className="packet-schematic__arrow packet-schematic__arrow--down" d="M 176 132 V 484" markerEnd="url(#packet-arrow-down)" />
            <path className="packet-schematic__arrow packet-schematic__arrow--up" d="M 214 484 V 132" markerEnd="url(#packet-arrow-up)" />

            <g className="packet-node packet-node--client" transform="translate(45 34)">
              <rect width="300" height="82" rx="18" />
              <circle className="packet-node__badge" cx="30" cy="28" r="15" />
              <text className="packet-node__badge-text" x="30" y="33">1</text>
              <rect className="packet-node__icon" x="60" y="20" width="44" height="30" rx="5" />
              <path className="packet-node__icon-line" d="M 75 59 H 89 M 82 50 V 59" />
              <text className="packet-node__title" x="122" y="35">Client PC</text>
              <text className="packet-node__meta" x="122" y="58">192.168.10.25</text>
            </g>

            <text className="packet-hop-label" x="195" y="149">Ethernet frame</text>

            <g className="packet-node packet-node--switch" transform="translate(45 164)">
              <rect width="300" height="82" rx="18" />
              <circle className="packet-node__badge" cx="30" cy="28" r="15" />
              <text className="packet-node__badge-text" x="30" y="33">2</text>
              <rect className="packet-node__icon" x="58" y="24" width="50" height="26" rx="5" />
              <path className="packet-node__icon-line" d="M 67 37 H 99 M 73 31 L 67 37 L 73 43 M 93 31 L 99 37 L 93 43" />
              <text className="packet-node__title" x="122" y="35">Access Switch</text>
              <text className="packet-node__meta" x="122" y="58">forwards by MAC</text>
            </g>

            <text className="packet-hop-label" x="195" y="279">gateway handoff</text>

            <g className="packet-node packet-node--router" transform="translate(45 294)">
              <rect width="300" height="82" rx="18" />
              <circle className="packet-node__badge" cx="30" cy="28" r="15" />
              <text className="packet-node__badge-text" x="30" y="33">3</text>
              <circle className="packet-node__router-icon" cx="83" cy="38" r="24" />
              <path className="packet-node__icon-line" d="M 70 38 H 96 M 76 31 L 70 38 L 76 45 M 90 31 L 96 38 L 90 45 M 83 25 V 51" />
              <text className="packet-node__title" x="122" y="35">Router</text>
              <text className="packet-node__meta" x="122" y="58">routes by IP</text>
            </g>

            <text className="packet-hop-label" x="195" y="409">IP packet</text>

            <g className="packet-node packet-node--server" transform="translate(45 424)">
              <rect width="300" height="82" rx="18" />
              <circle className="packet-node__badge" cx="30" cy="28" r="15" />
              <text className="packet-node__badge-text" x="30" y="33">4</text>
              <rect className="packet-node__icon" x="66" y="15" width="34" height="48" rx="6" />
              <path className="packet-node__icon-line" d="M 74 27 H 92 M 74 39 H 92 M 74 51 H 92" />
              <text className="packet-node__title" x="122" y="35">Web Server</text>
              <text className="packet-node__meta" x="122" y="58">10.20.30.8</text>
            </g>

            <g className="packet-dot packet-token packet-token--request">
              <rect x="-26" y="-15" width="52" height="30" rx="15" />
              <text x="0" y="5">REQ</text>
              <animateMotion dur="4.2s" repeatCount="indefinite" path="M 176 124 V 492" />
            </g>
            <g className="packet-dot packet-token packet-token--reply">
              <rect x="-26" y="-15" width="52" height="30" rx="15" />
              <text x="0" y="5">RSP</text>
              <animateMotion dur="4.2s" begin="1.15s" repeatCount="indefinite" path="M 214 492 V 124" />
            </g>

            <g className="packet-legend" transform="translate(45 548)">
              <rect width="300" height="44" rx="14" />
              <circle className="packet-legend__request" cx="24" cy="22" r="7" />
              <text x="38" y="27">request outbound</text>
              <circle className="packet-legend__reply" cx="170" cy="22" r="7" />
              <text x="184" y="27">reply returns</text>
            </g>
          </svg>
        </div>
        <aside className="packet-guide packet-guide--story" aria-label="Packet path explanation">
          <p className="eyebrow">What to notice</p>
          <h3>Request goes out. Reply comes back.</h3>
          <div className="packet-guide__list">
            {explanations.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

function ArpLab({ defaultOpen = true, canCollapse = false }) {
  const [arpTargetId, setArpTargetId] = useState("gateway");
  const [arpStepIndex, setArpStepIndex] = useState(0);
  const [showArpNetwork, setShowArpNetwork] = useState(defaultOpen);
  const arpTarget = arpTargets[arpTargetId];
  const arpStep = arpSteps[arpStepIndex];
  const arpWireMode =
    arpStepIndex >= 4
      ? "is-unicast"
      : arpStepIndex >= 3
        ? "is-reply"
        : arpStepIndex >= 2
          ? "is-request"
          : "";
  const selectArpTarget = (targetId) => {
    setArpTargetId(targetId);
    setArpStepIndex(0);
  };
  const resetArpWalkthrough = () => {
    setShowArpNetwork(true);
    setArpTargetId("gateway");
    setArpStepIndex(0);
  };

  return (
    <section
      className={`panel arp-lab ${showArpNetwork ? "arp-lab--open" : ""}`}
      aria-labelledby="arp-lab-title"
    >
      <div className="arp-lab__header">
        <div>
          <p className="eyebrow">Address resolution</p>
          <h3 id="arp-lab-title">ARP: IP question, MAC answer</h3>
          <p>
            ARP bridges Layer 3 and Layer 2 on an IPv4 LAN. Pick the destination,
            then step through how the host finds the next local MAC address
            before any Ethernet frame can leave.
          </p>
        </div>
        <div className="arp-lab__actions">
          <button
            type="button"
            className="button button--primary"
            onClick={showArpNetwork ? resetArpWalkthrough : () => setShowArpNetwork(true)}
          >
            {showArpNetwork ? (
              <RotateCcw size={16} />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
            {showArpNetwork ? "Replay ARP flow" : "Show ARP network"}
          </button>
          {showArpNetwork && canCollapse && (
            <button
              type="button"
              className="button button--ghost"
              onClick={() => setShowArpNetwork(false)}
            >
              Hide walkthrough
            </button>
          )}
        </div>
      </div>
      {!showArpNetwork ? (
        <button
          type="button"
          className="arp-launch-card"
          onClick={() => setShowArpNetwork(true)}
        >
          <span className="arp-launch-card__icon">
            <Activity size={24} />
          </span>
          <span>
            <b>Open the ARP mini network</b>
            <small>
              Watch a workstation ask for the right MAC, receive the reply,
              update its cache, and build the Ethernet frame.
            </small>
          </span>
          <ArrowRight size={18} />
        </button>
      ) : (
        <>
          <div className="arp-targets" aria-label="ARP destination scenarios">
            {Object.entries(arpTargets).map(([id, target]) => (
              <button
                key={id}
                type="button"
                className={arpTargetId === id ? "is-active" : ""}
                aria-pressed={arpTargetId === id}
                onClick={() => selectArpTarget(id)}
              >
                {target.label}
              </button>
            ))}
          </div>
          <div className="arp-lab__grid">
            <div className="arp-mini-network" aria-label="Interactive ARP network diagram">
              <div className="arp-mini-network__topline">
                <span>Mini LAN</span>
                <strong>{arpTarget.label}</strong>
              </div>
              <div className="arp-mini-network__map">
                <svg
                  className="arp-mini-network__wires"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className={`arp-wire-path arp-wire-path--cache ${arpStepIndex === 1 ? "is-live is-cache" : ""}`}
                    d="M20 26 C21 35 21 42 20 50"
                  />
                  <path
                    className={`arp-wire-path arp-wire-path--host-switch ${arpWireMode}`}
                    d="M22 50 C33 48 40 48 50 50"
                  />
                  <path
                    className={`arp-wire-path arp-wire-path--switch-owner ${arpWireMode}`}
                    d="M50 50 C61 48 68 48 79 50"
                  />
                  <path
                    className={`arp-wire-path arp-wire-path--broadcast ${arpStepIndex === 2 ? "is-live is-request" : ""}`}
                    d="M50 50 C58 62 67 72 80 77"
                  />
                  <g className={`arp-spark ${arpStepIndex === 2 ? "is-live" : ""}`}>
                    <circle r="2.1" />
                    <animateMotion
                      dur="1.45s"
                      repeatCount="indefinite"
                      path="M22 50 C33 48 40 48 50 50 C61 48 68 48 79 50"
                    />
                  </g>
                  <g className={`arp-spark arp-spark--reply ${arpStepIndex === 3 ? "is-live" : ""}`}>
                    <circle r="2.1" />
                    <animateMotion
                      dur="1.45s"
                      repeatCount="indefinite"
                      path="M79 50 C68 48 61 48 50 50 C40 48 33 48 22 50"
                    />
                  </g>
                  <g className={`arp-spark arp-spark--unicast ${arpStepIndex >= 4 ? "is-live" : ""}`}>
                    <circle r="2.1" />
                    <animateMotion
                      dur="1.7s"
                      repeatCount="indefinite"
                      path="M22 50 C33 48 40 48 50 50 C61 48 68 48 79 50"
                    />
                  </g>
                </svg>
                <button
                  type="button"
                  className={`arp-mini-device arp-mini-device--host ${[0, 4].includes(arpStepIndex) ? "is-active" : ""}`}
                  onClick={() => setArpStepIndex(0)}
                  aria-label="Step 1: decide what IP needs a MAC"
                >
                  <Contact size={18} />
                  <strong>Workstation</strong>
                  <span>AA:10:25</span>
                </button>
                <button
                  type="button"
                  className={`arp-mini-device arp-mini-device--cache ${arpStepIndex === 1 ? "is-active" : ""}`}
                  onClick={() => setArpStepIndex(1)}
                  aria-label="Step 2: check the ARP cache"
                >
                  <Command size={18} />
                  <strong>ARP cache</strong>
                  <span>{arpTarget.cacheBefore.length ? "check table" : "empty"}</span>
                </button>
                <button
                  type="button"
                  className={`arp-mini-device arp-mini-device--switch ${[2, 5].includes(arpStepIndex) ? "is-active" : ""}`}
                  onClick={() => setArpStepIndex(2)}
                  aria-label="Step 3: broadcast who-has through the switch"
                >
                  <CiscoStyleSwitchIcon />
                  <strong>Switch</strong>
                  <span>VLAN 10</span>
                </button>
                <button
                  type="button"
                  className={`arp-mini-device arp-mini-device--owner ${arpStepIndex === 3 ? "is-active" : ""}`}
                  onClick={() => setArpStepIndex(3)}
                  aria-label={`Step 4: ${arpTarget.owner} replies unicast`}
                >
                  {arpTarget.owner === "Laptop-B" ? <Contact size={18} /> : <CiscoStyleRouterIcon />}
                  <strong>{arpTarget.owner}</strong>
                  <span>{arpTarget.ownerMac}</span>
                </button>
                <button
                  type="button"
                  className={`arp-mini-device arp-mini-device--others ${arpStepIndex === 2 ? "is-active" : ""}`}
                  onClick={() => setArpStepIndex(2)}
                  aria-label="Broadcast copy reaches other hosts in the VLAN"
                >
                  <UsersRound size={18} />
                  <strong>Other hosts</strong>
                  <span>hear request</span>
                </button>
                <button
                  type="button"
                  className={`arp-mini-packet arp-mini-packet--request ${arpStepIndex === 2 ? "is-active" : ""}`}
                  onClick={() => setArpStepIndex(2)}
                >
                  Who has {arpTarget.resolveIp}?
                </button>
                <button
                  type="button"
                  className={`arp-mini-packet arp-mini-packet--reply ${arpStepIndex === 3 ? "is-active" : ""}`}
                  onClick={() => setArpStepIndex(3)}
                >
                  {arpTarget.ownerMac}
                </button>
              </div>
              <div className="arp-mini-network__footer" aria-live="polite">
                <span>Step {arpStepIndex + 1}</span>
                <strong>{arpStep.title}</strong>
                <div className="arp-mini-step-dots" role="group" aria-label="ARP walkthrough steps">
                  {arpSteps.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      className={arpStepIndex === index ? "is-active" : ""}
                      aria-pressed={arpStepIndex === index}
                      aria-label={`Step ${index + 1}: ${item.title}`}
                      onClick={() => setArpStepIndex(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <article className="arp-visual" aria-live="polite">
              <div className="arp-visual__nodes">
                <div className="arp-node arp-node--source">
                  <Contact size={21} />
                  <strong>Workstation</strong>
                  <span>AA:10:25</span>
                </div>
                <div className="arp-node arp-node--broadcast">
                  <Layers3 size={21} />
                  <strong>VLAN broadcast</strong>
                  <span>FF:FF:FF:FF:FF:FF</span>
                </div>
                <div className="arp-node arp-node--owner">
                  {arpTarget.owner === "Laptop-B" ? <Contact size={21} /> : <CiscoStyleRouterIcon />}
                  <strong>{arpTarget.owner}</strong>
                  <span>{arpTarget.ownerMac}</span>
                </div>
              </div>
              <div className="arp-frame-stack">
                <div className={`arp-frame ${arpStepIndex >= 2 ? "is-active" : ""}`}>
                  <span>ARP request</span>
                  <strong>Who has {arpTarget.resolveIp}?</strong>
                  <small>Ethernet dst FF:FF:FF:FF:FF:FF</small>
                </div>
                <ArrowRight size={18} />
                <div className={`arp-frame ${arpStepIndex >= 3 ? "is-active" : ""}`}>
                  <span>ARP reply</span>
                  <strong>{arpTarget.resolveIp} is at {arpTarget.ownerMac}</strong>
                  <small>Unicast back to AA:10:25</small>
                </div>
              </div>
              <div className="arp-result-card">
                <p className="eyebrow">Frame decision</p>
                <h4>{arpStep.title}</h4>
                <p>{arpStep.detail}</p>
                <strong>{arpTarget.result}</strong>
              </div>
            </article>
            <aside className="arp-cache-card">
              <p className="eyebrow">ARP cache</p>
              <h4>{arpTarget.intent}</h4>
              <div className="arp-cache-columns">
                <div>
                  <span>Before</span>
                  {arpTarget.cacheBefore.map((entry) => (
                    <p key={`${entry.ip}-${entry.mac}`}>
                      <code>{entry.ip}</code>
                      <b>{entry.mac}</b>
                      <em>{entry.state}</em>
                    </p>
                  ))}
                </div>
                <div>
                  <span>After</span>
                  {arpTarget.cacheAfter.map((entry) => (
                    <p key={`${entry.ip}-${entry.mac}`}>
                      <code>{entry.ip}</code>
                      <b>{entry.mac}</b>
                      <em>{entry.state}</em>
                    </p>
                  ))}
                </div>
              </div>
            </aside>
          </div>
          <div className="arp-doc-grid">
            <article>
              <p className="eyebrow">Terms to know</p>
              <div className="arp-glossary">
                {arpGlossary.map(([term, definition]) => (
                  <span key={term}>
                    <strong>{term}</strong>
                    <small>{definition}</small>
                  </span>
                ))}
              </div>
            </article>
            <article>
              <p className="eyebrow">Troubleshooting clues</p>
              <ul>
                {arpTarget.clues.map((clue) => (
                  <li key={clue}>{clue}</li>
                ))}
                <li>
                  If a host ARPs for a remote server IP, suspect the subnet mask
                  or default gateway configuration.
                </li>
                <li>
                  If the gateway IP maps to an unexpected MAC, investigate
                  duplicate IPs, spoofing, ARP poisoning, or Dynamic ARP Inspection.
                </li>
              </ul>
            </article>
          </div>
        </>
      )}
    </section>
  );
}

function LifeOfArpView() {
  return (
    <div className="page arp-page">
      <div className="page-intro arp-intro">
        <div>
          <p className="eyebrow">Focused lab</p>
          <h2>Life of ARP</h2>
          <p>
            Follow how an IPv4 host turns a next-hop IP address into a usable
            Ethernet destination, then read the cache and troubleshooting clues
            that prove what happened.
          </p>
        </div>
      </div>
      <ArpLab defaultOpen canCollapse={false} />
    </div>
  );
}

function ProgressView({ progress, onOpenActivity }) {
  const readiness = getReadiness(progress);
  const readinessSignals = getReadinessSignals(progress);
  const weakObjectives = getWeakObjectives(progress, 6);
  const feedback = progress.learnerFeedback ?? [];
  const latestExamAttempt = getLatestExamAttempt(progress);
  const examRemediation = getExamRemediationMap(latestExamAttempt).slice(0, 8);
  const feedbackBySignal = feedback.reduce((counts, entry) => {
    counts[entry.signal] = (counts[entry.signal] ?? 0) + 1;
    return counts;
  }, {});
  const exportFeedback = () => {
    const payload = JSON.stringify({
      type: "network-plus-learner-feedback",
      exportedAt: new Date().toISOString(),
      feedback,
    }, null, 2);
    navigator.clipboard?.writeText(payload);
  };
  const currentTier = currentTierForProgress(
    tiers,
    progress,
    getRecommendation,
  );
  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">Performance</p>
          <h2>Your learning telemetry.</h2>
          <p>
            Readiness combines weighted domain coverage with checkpoint
            accuracy. It will become more meaningful as you practice.
          </p>
        </div>
      </div>
      <div className="progress-layout">
        <section className="panel readiness-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Tier progress</p>
              <h3>{tiers.length}-stage trajectory</h3>
            </div>
            <span className="trend-up">{readiness}% ready</span>
          </div>
          <div className="tier-bars">
            {tiers.map((tier) => (
              <div key={tier.id} style={{ "--tier": tier.color }}>
                <span>
                  <b>Tier {tier.number}</b>
                  {tier.title}
                </span>
                <i>
                  <em
                    style={{ width: `${getTierProgress(tier, progress)}%` }}
                  />
                </i>
                <strong>{getTierProgress(tier, progress)}%</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="panel mastery-panel">
          <p className="eyebrow">Current focus</p>
          <ShieldCheck size={34} />
          <h3>{currentTier.title}</h3>
          <strong>{getTierProgress(currentTier, progress)}% complete</strong>
          <p>
            Finish the next recommended activity to strengthen your core map.
          </p>
        </section>
      </div>
      <section className="panel progress-readiness">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Launch readiness</p>
            <h3>What still needs proof</h3>
          </div>
          <span className="trend-up">{readiness}% ready</span>
        </div>
        <div className="readiness-signal-grid">
          {readinessSignals.map((signal) => (
            <article className={signal.ready ? "is-ready" : ""} key={signal.id}>
              <span>{signal.ready ? <CheckCircle2 size={18} /> : <CircleHelp size={18} />}</span>
              <div>
                <strong>{signal.label}</strong>
                <p>{signal.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="weak-objective-strip">
          <strong>Weak objectives</strong>
          {weakObjectives.length ? (
            weakObjectives.map((weak) => <span key={weak.objective}>{weak.objective}</span>)
          ) : (
            <em>No weak scored objectives yet.</em>
          )}
        </div>
      </section>
      <section className="panel validation-review">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Learner validation</p>
            <h3>Feedback captured during study</h3>
          </div>
          <button className="text-button" onClick={exportFeedback} disabled={!feedback.length}>
            Copy JSON <ArrowRight size={15} />
          </button>
        </div>
        <div className="validation-counts">
          {["confusing", "too-hard", "needs-example", "good-explanation"].map((signal) => (
            <article key={signal}>
              <strong>{feedbackBySignal[signal] ?? 0}</strong>
              <span>{signal.replace("-", " ")}</span>
            </article>
          ))}
        </div>
        {feedback.length ? (
          <div className="validation-log-list">
            {feedback.slice(-6).reverse().map((entry) => (
              <article key={entry.id}>
                <span>Objective {entry.objective} · {entry.signal.replace("-", " ")}</span>
                <strong>{entry.activityTitle}</strong>
                {entry.note && <p>{entry.note}</p>}
              </article>
            ))}
          </div>
        ) : (
          <p className="validation-empty">
            No learner feedback captured yet. Open any activity and use the
            validation form to mark confusing content, difficulty jumps, or good explanations.
          </p>
        )}
      </section>
      <section className="panel exam-remediation-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Final exam review map</p>
            <h3>Missed objectives to repair</h3>
          </div>
          <span className="trend-up">
            {latestExamAttempt ? `${Math.round(latestExamAttempt.score * 100)}% latest exam` : "No exam yet"}
          </span>
        </div>
        {examRemediation.length ? (
          <div className="exam-remediation-list">
            {examRemediation.map((item) => {
              const primary = item.lesson ?? item.flashcards ?? item.quiz ?? item.checkpoint ?? item.subnetting;
              return (
                <article key={item.objective}>
                  <span>Domain {item.domainId} · Objective {item.objective}</span>
                  <strong>{item.domainTitle}</strong>
                  <div>
                    {item.lesson && <button type="button" onClick={() => onOpenActivity(item.lesson.id)}>Lesson</button>}
                    {item.flashcards && <button type="button" onClick={() => onOpenActivity(item.flashcards.id)}>Cards</button>}
                    {item.quiz && <button type="button" onClick={() => onOpenActivity(item.quiz.id)}>Quiz</button>}
                    {item.checkpoint && <button type="button" onClick={() => onOpenActivity(item.checkpoint.id)}>Checkpoint</button>}
                    {item.subnetting && <button type="button" onClick={() => onOpenActivity(item.subnetting.id)}>Subnetting</button>}
                  </div>
                  {primary && (
                    <button className="button button--ghost" type="button" onClick={() => onOpenActivity(primary.id)}>
                      Start remediation <ArrowRight size={15} />
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="validation-empty">
            Complete the final practice exam to generate a missed-objective review map.
          </p>
        )}
      </section>
    </div>
  );
}

const tierOneValidationTasks = [
  "Complete lessons 1.1-1.8 without instructor help.",
  "Use flashcards after each section and mark unclear cards.",
  "Complete each coached check and section quiz.",
  "Open Subnetting Lessons, then complete at least 10 subnetting practice prompts.",
  "Complete the Tier 1 checkpoint.",
  "Use validation notes for confusing, too hard, needs example, or good explanation moments.",
]

const manualQaItems = [
  ["keyboard-lesson", "Keyboard: lesson journey", "Open a lesson, move through content, validation form, and completion using keyboard only."],
  ["keyboard-flashcards", "Keyboard: flashcards", "Launch flashcards, flip cards, move previous/next, and complete the deck using keyboard only."],
  ["keyboard-quiz", "Keyboard: quiz/checkpoint", "Answer a quiz or checkpoint, read feedback, advance questions, and save completion using keyboard only."],
  ["keyboard-scenario", "Keyboard: scenario", "Complete a decision scenario and verify selected actions are reachable and understandable."],
  ["keyboard-exam", "Keyboard: final exam modes", "Launch practice mode and exam mode, select answers, reveal practice feedback, and submit or exit cleanly."],
  ["keyboard-subnetting", "Keyboard: subnetting practice", "Fill subnetting answers, check results, and advance to a new question using keyboard only."],
  ["responsive-phone", "Mobile phone layout", "Review overview, navigation, activity overlay, subnetting, search, and feedback capture on a phone viewport."],
  ["responsive-tablet", "Tablet layout", "Review the same core surfaces on a tablet viewport and confirm navigation does not overlap content."],
  ["a11y-focus", "Focus and reduced motion", "Confirm visible focus, logical focus order, reduced motion behavior, and no keyboard traps."],
  ["a11y-reader", "Screen-reader spot check", "Spot-check headings, labels, status messages, activity overlays, forms, and answer feedback."],
  ["content-pdf", "PDF objective signoff", "Confirm all official N10-009 numbered objectives map to app learning loops and assessment representation."],
  ["content-originality", "Originality/editorial review", "Confirm examples, questions, explanations, and scenarios are original and not exam-dump-like."],
]

function ValidationLabView({ progress, onSaveSession, onSaveQaCheck, onOpenActivity }) {
  const [learnerId, setLearnerId] = useState("");
  const [tier, setTier] = useState("1");
  const [experience, setExperience] = useState("true-beginner");
  const [device, setDevice] = useState("");
  const [outcome, setOutcome] = useState("completed");
  const [severity, setSeverity] = useState("none");
  const [notes, setNotes] = useState("");
  const gate = validationGateStatus(progress, tiers);
  const qa = manualQaSummary(progress);
  const objectiveFeedback = feedbackByObjective(progress).slice(0, 8);
  const tierOne = getTier("tier-1");
  const latestExamAttempt = getLatestExamAttempt(progress);
  const tierOneActivities = tierOne.modules.flatMap((module) => module.activities).filter((activity) => activity.required);
  const tierOneDone = tierOneActivities.filter((activity) => progress.completedActivityIds.includes(activity.id)).length;
  const copyValidationPackage = () => {
    const payload = JSON.stringify({
      type: "network-plus-validation-package",
      exportedAt: new Date().toISOString(),
      validationSessions: progress.validationSessions ?? [],
      learnerFeedback: progress.learnerFeedback ?? [],
      manualQaChecks: progress.manualQaChecks ?? {},
      manualQaSummary: manualQaSummary(progress),
      latestExamRemediation: getExamRemediationMap(latestExamAttempt),
      tierSummary: gate.tierSummary,
      objectiveFeedback: feedbackByObjective(progress),
    }, null, 2);
    navigator.clipboard?.writeText(payload);
  };
  const save = () => {
    onSaveSession({
      id: `validation-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      learnerId: learnerId.trim() || `Learner ${(progress.validationSessions ?? []).length + 1}`,
      tier,
      experience,
      device: device.trim() || "Not recorded",
      outcome,
      severity,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    });
    setLearnerId("");
    setDevice("");
    setNotes("");
  };
  return (
    <div className="page validation-page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">Validation Lab</p>
          <h2>
            Turn learner sessions
            <br />
            into launch evidence.
          </h2>
          <p>
            Run the Tier 1 trial first, log real learner outcomes, and use
            repeated feedback to decide which content gets rewritten.
          </p>
        </div>
        <div className="path-summary validation-summary">
          <Ring value={Math.round((gate.readyTiers / gate.totalTiers) * 100)} size={94} />
          <span>
            <strong>{gate.readyTiers} of {gate.totalTiers} tiers ready</strong>
            <small>{gate.blockerCount} launch blockers recorded</small>
          </span>
        </div>
      </div>
      <section className="panel validation-gates">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Learner coverage</p>
            <h3>{requiredLearnersPerTier} learners per tier required</h3>
          </div>
          <span className="trend-up">{gate.feedbackCount} activity notes</span>
        </div>
        <div className="validation-tier-grid">
          {gate.tierSummary.map((row) => (
            <article className={row.ready ? "is-ready" : ""} key={row.tier}>
              <span>Tier {row.tier}</span>
              <strong>{row.title}</strong>
              <p>{row.learners}/{requiredLearnersPerTier} learners · {row.blockers} blockers</p>
            </article>
          ))}
        </div>
      </section>
      <section className="panel manual-qa-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Manual QA checklist</p>
            <h3>Close the product validation gate</h3>
          </div>
          <span className="trend-up">{qa.pass}/{manualQaItems.length} passed · {qa.blockers} blockers</span>
        </div>
        <div className="manual-qa-list">
          {manualQaItems.map(([id, title, detail]) => {
            const current = progress.manualQaChecks?.[id]?.status ?? "open";
            return (
              <article className={`manual-qa-item manual-qa-item--${current}`} key={id}>
                <div>
                  <strong>{title}</strong>
                  <p>{detail}</p>
                </div>
                <div className="manual-qa-actions" role="group" aria-label={`${title} status`}>
                  {["open", "pass", "issue", "blocker"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={current === status ? "is-active" : ""}
                      aria-pressed={current === status}
                      onClick={() => onSaveQaCheck({
                        id,
                        title,
                        detail,
                        status,
                        updatedAt: new Date().toISOString(),
                      })}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="panel tier-one-runner">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Tier 1 trial runner</p>
            <h3>Run the first learner session in order</h3>
          </div>
          <span className="trend-up">{tierOneDone}/{tierOneActivities.length} required done</span>
        </div>
        <div className="tier-one-runner__meter" aria-label={`Tier 1 validation progress ${tierOneDone} of ${tierOneActivities.length}`}>
          <span style={{ width: `${(tierOneDone / tierOneActivities.length) * 100}%` }} />
        </div>
        <div className="tier-one-runner__list">
          {tierOneActivities.map((activity, index) => {
            const done = progress.completedActivityIds.includes(activity.id);
            return (
              <button key={activity.id} className={done ? "is-done" : ""} onClick={() => onOpenActivity(activity.id)}>
                <span>{done ? <Check size={15} /> : index + 1}</span>
                <div>
                  <strong>{activity.title}</strong>
                  <small>{typeLabels[activity.type]} · Objective {activity.objective} · {activity.duration} min</small>
                </div>
                <ArrowRight size={15} />
              </button>
            );
          })}
        </div>
        <div className="validation-export-row">
          <p>After the session, save the learner session log and copy the validation package for review.</p>
          <button className="button button--ghost" onClick={copyValidationPackage}>
            Copy validation package
          </button>
        </div>
      </section>
      <div className="validation-layout">
        <section className="panel validation-checklist">
          <p className="eyebrow">Tier 1 session script</p>
          <h3>Run this with each beginner</h3>
          <ol>
            {tierOneValidationTasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ol>
        </section>
        <section className="panel validation-session-form">
          <p className="eyebrow">Session log</p>
          <h3>Record learner outcome</h3>
          <div className="session-form-grid">
            <label>
              Learner ID
              <input value={learnerId} onChange={(event) => setLearnerId(event.target.value)} placeholder="Beginner 01" />
            </label>
            <label>
              Tier
              <select value={tier} onChange={(event) => setTier(event.target.value)}>
                {tiers.map((item) => <option key={item.id} value={String(item.number)}>Tier {item.number}</option>)}
              </select>
            </label>
            <label>
              Experience
              <select value={experience} onChange={(event) => setExperience(event.target.value)}>
                <option value="true-beginner">True beginner</option>
                <option value="some-it">Some IT exposure</option>
                <option value="experienced">Experienced reviewer</option>
              </select>
            </label>
            <label>
              Device/browser
              <input value={device} onChange={(event) => setDevice(event.target.value)} placeholder="iPhone Safari, Windows Chrome..." />
            </label>
            <label>
              Outcome
              <select value={outcome} onChange={(event) => setOutcome(event.target.value)}>
                <option value="completed">Completed</option>
                <option value="stopped-confused">Stopped confused</option>
                <option value="stopped-time">Stopped due to time</option>
                <option value="blocked-accessibility">Blocked by accessibility issue</option>
              </select>
            </label>
            <label>
              Severity
              <select value={severity} onChange={(event) => setSeverity(event.target.value)}>
                <option value="none">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </label>
          </div>
          <label className="session-notes">
            Notes
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} placeholder="Confusing explanation, difficulty jump, navigation issue, accessibility issue, or strong content." />
          </label>
          <button className="button button--primary" onClick={save}>
            Save learner session <ArrowRight size={16} />
          </button>
        </section>
      </div>
      <section className="panel validation-review">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Feedback triage</p>
            <h3>Objectives creating the most signals</h3>
          </div>
          <span className="trend-up">{objectiveFeedback.length} objective groups</span>
        </div>
        {objectiveFeedback.length ? (
          <div className="objective-feedback-list">
            {objectiveFeedback.map((row) => (
              <article key={row.objective}>
                <strong>Objective {row.objective}</strong>
                <span>{row.total} notes · {row.confusing} confusing · {row.tooHard} too hard · {row.needsExample} needs example</span>
                {row.notes[0] && <p>{row.notes[0]}</p>}
              </article>
            ))}
          </div>
        ) : (
          <p className="validation-empty">No activity-level feedback yet. Have learners use the validation form inside activities.</p>
        )}
      </section>
    </div>
  )
}

function FlashCardsView({ onOpenActivity }) {
  return (
    <div className="page flashcards-page">
      <section className="flashcards-hero">
        <div>
          <span className="status-pill">
            <i /> Cumulative recall
          </span>
          <p className="eyebrow">Flash Cards</p>
          <h2>Shuffle the whole Network+ deck.</h2>
          <p>
            This deck pulls every flashcard from every section into one
            cumulative review set. Each time you open it, the order is shuffled
            so you practice recall instead of memorizing a sequence.
          </p>
          <button
            className="button button--primary"
            onClick={() => onOpenActivity(masterFlashcardsActivity.id)}
          >
            Start shuffled deck <ArrowRight size={16} />
          </button>
        </div>
        <div className="flashcards-stat" aria-hidden="true">
          <Contact size={42} />
          <strong>{masterFlashcardsActivity.cards.length}</strong>
          <span>cards from all sections</span>
        </div>
      </section>
      <section className="flashcards-note">
        <Sparkles size={20} />
        <div>
          <strong>Best use</strong>
          <p>
            Use this after a tier checkpoint, before exam mode, or whenever you
            want a fast mixed review across terms, controls, attacks,
            architecture, operations, and governance.
          </p>
        </div>
      </section>
    </div>
  );
}

function CommonPortsView() {
  const [flashIndex, setFlashIndex] = useState(0);
  const [showFlashAnswer, setShowFlashAnswer] = useState(false);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [matchedPorts, setMatchedPorts] = useState([]);
  const [openExplanation, setOpenExplanation] = useState(commonPorts[0].port);

  const portOptions = useMemo(() => commonPorts.slice(0, 12), []);
  const protocolOptions = useMemo(
    () => [...portOptions].sort((a, b) => a.protocol.localeCompare(b.protocol)),
    [portOptions],
  );
  const currentCard = commonPorts[flashIndex % commonPorts.length];
  const matchedSet = new Set(matchedPorts);
  const pendingCorrect =
    selectedPort &&
    selectedProtocol &&
    selectedPort === selectedProtocol &&
    !matchedSet.has(selectedPort);

  function choosePort(port) {
    setSelectedPort(port);
    if (selectedProtocol === port && !matchedSet.has(port)) {
      setMatchedPorts((ports) => [...ports, port]);
    }
  }

  function chooseProtocol(port) {
    setSelectedProtocol(port);
    if (selectedPort === port && !matchedSet.has(port)) {
      setMatchedPorts((ports) => [...ports, port]);
    }
  }

  function nextFlashcard() {
    setShowFlashAnswer(false);
    setFlashIndex((index) => (index + 1) % commonPorts.length);
  }

  function resetMatching() {
    setSelectedPort(null);
    setSelectedProtocol(null);
    setMatchedPorts([]);
  }

  return (
    <div className="page ports-page">
      <section className="ports-hero">
        <div>
          <span className="status-pill">
            <i /> Port recall
          </span>
          <p className="eyebrow">Common Ports</p>
          <h2>Build the port-number reflex.</h2>
          <p>
            Network+ and Security+ both expect fast recognition of common
            services, port numbers, transports, and secure replacements. Use
            this page for short daily reps until the obvious ports feel boring.
          </p>
        </div>
        <div className="ports-hero__stat" aria-hidden="true">
          <Server size={44} />
          <strong>{commonPorts.length}</strong>
          <span>core ports</span>
        </div>
      </section>

      <section className="ports-grid">
        <article className="panel ports-flash">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Flash card</p>
              <h3>{currentCard.protocol}</h3>
            </div>
            <span className="ports-counter">
              {flashIndex + 1}/{commonPorts.length}
            </span>
          </div>
          <button
            className={`port-card ${showFlashAnswer ? "port-card--flipped" : ""}`}
            onClick={() => setShowFlashAnswer((shown) => !shown)}
            aria-pressed={showFlashAnswer}
          >
            <span>{showFlashAnswer ? currentCard.port : "Tap to reveal port"}</span>
            <strong>{showFlashAnswer ? currentCard.transport : currentCard.protocol}</strong>
            <em>{showFlashAnswer ? currentCard.memory : "Recall the number and transport first."}</em>
          </button>
          <button className="button button--ghost" onClick={nextFlashcard}>
            Next card <ArrowRight size={16} />
          </button>
        </article>

        <article className="panel ports-match">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Matching drill</p>
              <h3>Pair numbers with services.</h3>
            </div>
            <span className="ports-counter">
              {matchedPorts.length}/{portOptions.length}
            </span>
          </div>
          <div className="matching-columns">
            <div>
              <strong>Port</strong>
              {portOptions.map((item) => (
                <button
                  key={item.port}
                  className={`match-chip ${selectedPort === item.port ? "match-chip--selected" : ""} ${matchedSet.has(item.port) ? "match-chip--matched" : ""}`}
                  onClick={() => choosePort(item.port)}
                >
                  {item.port}
                </button>
              ))}
            </div>
            <div>
              <strong>Service</strong>
              {protocolOptions.map((item) => (
                <button
                  key={item.protocol}
                  className={`match-chip ${selectedProtocol === item.port ? "match-chip--selected" : ""} ${matchedSet.has(item.port) ? "match-chip--matched" : ""}`}
                  onClick={() => chooseProtocol(item.port)}
                >
                  {item.protocol}
                </button>
              ))}
            </div>
          </div>
          <div className="ports-feedback">
            {pendingCorrect
              ? "Matched. Nice."
              : selectedPort && selectedProtocol && selectedPort === selectedProtocol
                ? "Matched. Nice."
              : selectedPort && selectedProtocol && selectedPort !== selectedProtocol
                ? "Not that pair. Check the service function and try again."
                : "Choose one item from each side."}
          </div>
          <button className="button button--ghost" onClick={resetMatching}>
            <RotateCcw size={16} /> Reset drill
          </button>
        </article>
      </section>

      <section className="panel ports-reference">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explain the function</p>
            <h3>What each port is actually doing.</h3>
          </div>
        </div>
        <div className="ports-reference__list">
          {commonPorts.map((item) => (
            <article key={item.port} className="port-reference-card">
              <button
                onClick={() =>
                  setOpenExplanation((open) => (open === item.port ? null : item.port))
                }
                aria-expanded={openExplanation === item.port}
              >
                <span>{item.port}</span>
                <strong>{item.protocol}</strong>
                <em>{item.transport}</em>
                <CircleHelp size={17} />
              </button>
              {openExplanation === item.port && (
                <p>
                  {item.function} <b>Memory hook:</b> {item.memory}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ReadMeView() {
  const notes = [
    {
      title: "Independent study resource",
      body:
        "This app is not an official course and is not affiliated with, endorsed by, sponsored by, or approved by CompTIA or any other certification provider.",
    },
    {
      title: "No pass guarantee",
      body:
        "Using this app does not guarantee that you will pass any certification exam. Exam readiness depends on your study time, background, practice, and the current official exam objectives.",
    },
    {
      title: "Original practice content",
      body:
        "Practice questions, simulations, flashcards, and explanations are original learning materials. They are not real exam questions, brain dumps, or copied exam content.",
    },
    {
      title: "Trademarks",
      body:
        "CompTIA, A+, Network+, Security+, and related marks are trademarks of their respective owners. Names are used only to identify the certification topics the app helps learners study.",
    },
    {
      title: "Educational use",
      body:
        "Content is provided for educational purposes only. Always compare your preparation against the latest official objectives and policies from the certification provider.",
    },
  ];
  return (
    <div className="page readme-page">
      <section className="readme-hero">
        <p className="eyebrow">Read Me</p>
        <h2>Important notes before using this study app.</h2>
        <p>
          This page explains what the app is, what it is not, and how official
          certification names are used.
        </p>
      </section>
      <section className="readme-list">
        {notes.map((note) => (
          <article key={note.title} className="panel readme-card">
            <CircleHelp size={20} />
            <div>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function PrivacyView({ progress, onResetLocalData }) {
  const [armed, setArmed] = useState(false);
  const completedCount = progress.completedActivityIds.length;
  const examAttemptCount = progress.examAttempts?.length ?? 0;
  const feedbackCount = progress.learnerFeedback?.length ?? 0;
  const privacyPoints = [
    {
      title: "Offline after install",
      body:
        "Lessons, labs, diagrams, flashcards, practice exams, icons, and styles are packaged into the app bundle.",
    },
    {
      title: "Local progress only",
      body:
        "Study progress, exam attempts, and saved practice state stay in this device's app storage unless you manually export them.",
    },
    {
      title: "No tracking stack",
      body:
        "The app has no account system, analytics SDK, advertising identifier use, remote logging, or third-party tracking code.",
    },
    {
      title: "No external study links",
      body:
        "The installed app does not open remote resources for normal study flows, so it remains usable without network access.",
    },
  ];

  return (
    <div className="page privacy-page">
      <section className="privacy-hero">
        <div>
          <p className="eyebrow">Data & Privacy</p>
          <h2>Your study data stays on this device.</h2>
          <p>
            Network+ N10-009 is designed as an offline local-storage study app.
            App Store purchases and Apple ID account handling are managed by
            Apple, not by this app.
          </p>
        </div>
        <div className="privacy-lock" aria-hidden="true">
          <LockKeyhole size={44} />
          <span>Local only</span>
        </div>
      </section>

      <section className="privacy-grid" aria-label="Privacy posture">
        {privacyPoints.map((point) => (
          <article className="panel privacy-card" key={point.title}>
            <ShieldCheck size={20} />
            <h3>{point.title}</h3>
            <p>{point.body}</p>
          </article>
        ))}
      </section>

      <section className="panel local-data-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Stored on device</p>
            <h3>Current local study footprint</h3>
          </div>
        </div>
        <div className="local-data-stats">
          <span>
            <strong>{completedCount}</strong>
            completed activities
          </span>
          <span>
            <strong>{examAttemptCount}</strong>
            exam attempts
          </span>
          <span>
            <strong>{progress.totalStudyMinutes}</strong>
            study minutes
          </span>
          <span>
            <strong>{feedbackCount}</strong>
            local notes
          </span>
        </div>
        <p>
          Deleting local data clears learner progress and saved practice-exam
          drafts from this device. It does not affect App Store purchase
          history or Apple ID account information.
        </p>
      </section>

      <section className="panel danger-zone">
        <div>
          <p className="eyebrow">Local data control</p>
          <h3>Reset this device</h3>
          <p>
            Use this before handing the device to another learner, or whenever
            you want to restart the course from a clean state.
          </p>
        </div>
        <label className="danger-confirm">
          <input
            type="checkbox"
            checked={armed}
            onChange={(event) => setArmed(event.target.checked)}
          />
          I understand this deletes local learner progress on this device.
        </label>
        <button
          className="button button--danger"
          disabled={!armed}
          onClick={onResetLocalData}
        >
          <RotateCcw size={16} />
          Delete local progress
        </button>
      </section>
    </div>
  );
}

function StudyGuideView() {
  return (
    <div className="page study-guide-page">
      <section className="study-guide-hero">
        <div>
          <span className="status-pill">
            <i /> Study strategy
          </span>
          <p className="eyebrow">How to study for the Network+</p>
          <h2>
            Go from zero to Network+ ready.
            <br />
            <em>One guided step at a time.</em>
          </h2>
          <p>
            Net+ Field Guide is built as a complete path from first principles
            through exam synthesis. Start at Tier 1, follow the guided
            recommendations, and let each lesson, scenario, flashcard deck,
            quiz, checkpoint, and practice exam build the next layer of your
            Network+ readiness.
          </p>
        </div>
        <div className="study-guide-mark">
          <GraduationCap size={42} />
          <span>
            Start here.
            <br />
            Build steadily.
          </span>
        </div>
      </section>
      <section className="study-principle">
        <p className="eyebrow">Our purpose</p>
        <h3>A complete Network+ learning path designed for beginners.</h3>
        <p>
          The course starts with foundational language, then moves into threats,
          architecture, operations, governance, and full exam practice. Use the
          app in order when you are new, or jump into weak objectives when you
          already have experience. The goal is not just memorization—it is
          helping you reason through Network+ scenarios with confidence.
        </p>
      </section>
      <div className="study-method-grid">
        <article>
          <span>
            <BookOpen size={20} />
          </span>
          <p className="eyebrow">01 · Start at the foundation</p>
          <h3>Follow the tiers in order</h3>
          <p>
            Begin with Tier 1 and let the app introduce the vocabulary,
            objectives, and decision patterns you need before moving into more
            technical domains.
          </p>
        </article>
        <article>
          <span>
            <Layers3 size={20} />
          </span>
          <p className="eyebrow">02 · Practice as you learn</p>
          <h3>Use every learning loop</h3>
          <p>
            Read the lesson, study the objective map, work the scenario, drill
            the flashcards, complete the coached check, and finish the section
            quiz before advancing.
          </p>
        </article>
        <article>
          <span>
            <Sparkles size={20} />
          </span>
          <p className="eyebrow">03 · Repair weak spots</p>
          <h3>Let results guide review</h3>
          <p>
            When a quiz, checkpoint, or exam exposes a weak objective, return
            to that lesson and its cards. Short targeted reviews turn misses
            into durable understanding.
          </p>
        </article>
        <article>
          <span>
            <CircleHelp size={20} />
          </span>
          <p className="eyebrow">04 · Prove readiness</p>
          <h3>Use checkpoints and exam mode</h3>
          <p>
            Complete each tier checkpoint, then use the comprehensive practice
            exam in exam mode. Read every explanation afterward and retest only
            after reviewing missed objectives.
          </p>
        </article>
      </div>
      <section className="study-rhythm">
        <div>
          <p className="eyebrow">A simple study rhythm</p>
          <h3>Learn → practice → test → remediate</h3>
        </div>
        <ol>
          <li>
            <strong>Learn</strong>
            <span>Read the next guided lesson and objective map.</span>
          </li>
          <li>
            <strong>Apply</strong>
            <span>Work the scenario and connect the concept to a realistic decision.</span>
          </li>
          <li>
            <strong>Retrieve</strong>
            <span>
              Review flashcards and answer questions without notes.
            </span>
          </li>
          <li>
            <strong>Adjust</strong>
            <span>
              Revisit weak objectives until you can explain the right answer
              and why the distractors are wrong.
            </span>
          </li>
        </ol>
      </section>
      <aside className="study-disclaimer">
        <ShieldCheck size={22} />
        <div>
          <strong>Preparation, not a guarantee.</strong>
          <p>
            This app is designed to take a learner from zero to Network+
            readiness, but no study tool can guarantee a passing score. Always
            compare your preparation against the current official CompTIA
            Network+ exam objectives and use the resources below when you want
            another explanation or extra practice.
          </p>
        </div>
      </aside>
      <footer className="additional-resources">
        <div>
          <p className="eyebrow">Offline package</p>
          <h3>Everything here works without internet</h3>
          <p>
            Lessons, labs, flashcards, practice exams, progress, and remediation
            are bundled into the app. Learner progress stays on this device.
          </p>
        </div>
        <div className="offline-resource-list" aria-label="Offline app readiness">
          <span>
            <ShieldCheck size={16} />
            No account login or cloud sync
          </span>
          <span>
            <ShieldCheck size={16} />
            No analytics or remote tracking
          </span>
          <span>
            <ShieldCheck size={16} />
            No web resources required after install
          </span>
        </div>
        <p className="resources-disclosure">
          Net+ Field Guide and its creator are not affiliated with, endorsed by,
          or sponsored by CompTIA. All trademarks and course materials belong to
          their respective owners.
        </p>
      </footer>
    </div>
  );
}

function MeetDevelopersView() {
  const team = [
    {
      name: "David",
      specialty: "Specializes in network design and network infrastructure.",
    },
    {
      name: "Ryan",
      specialty: "Specializing in System administration and Cyber Security.",
    },
    {
      name: "Russ",
      specialty: "Specializes in all aspects of IT and networking.",
    },
  ];
  return (
    <div className="page developers-page">
      <section className="developers-hero">
        <div>
          <span className="status-pill">
            <i /> Built by practitioners
          </span>
          <p className="eyebrow">Meet the developers</p>
          <h2>Network+ study design shaped by real networking professionals.</h2>
          <p>
            This app was developed strategically by three networking
            professionals with a combined 30 years of networking expertise.
            Each developer currently holds an active Network+ certification,
            so the learning path, assessment style, and review flow were built
            with both exam readiness and practical network judgment in mind.
          </p>
        </div>
        <div className="developers-badge" aria-hidden="true">
          <UsersRound size={44} />
          <strong>30+</strong>
          <span>combined years of networking expertise</span>
        </div>
      </section>
      <section className="team-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Meet the team</p>
            <h3>Three certified network practitioners behind the guide.</h3>
          </div>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article key={member.name} className="team-card">
              <div className="team-card__scene" aria-hidden="true">
                <div className="team-card__figure">
                  <span className="team-card__head" />
                  <span className="team-card__body" />
                  <span className="team-card__arm team-card__arm--left" />
                  <span className="team-card__arm team-card__arm--right" />
                  <span className="team-card__leg team-card__leg--left" />
                  <span className="team-card__leg team-card__leg--right" />
                </div>
                <div className="team-card__desk">
                  <span className="team-card__monitor" />
                  <span className="team-card__keyboard" />
                </div>
              </div>
              <h4>{member.name}</h4>
              <p>{member.specialty}</p>
              <small>Current Network+ certified</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function WhyNetworkView() {
  const marketStats = [
    { value: "$96,800", label: "2024 median annual pay for network and computer systems administrators" },
    { value: "14,300", label: "average annual openings projected from 2024–2034" },
    { value: "Vendor-neutral", label: "foundation for routing, switching, wireless, services, security, and troubleshooting" },
  ];
  return (
    <div className="page info-page">
      <section className="info-hero">
        <div>
          <span className="status-pill">
            <i /> Career signal
          </span>
          <p className="eyebrow">Why the Network+?</p>
          <h2>Networking is the layer every IT path has to cross.</h2>
          <p>
            Every help desk ticket, server rollout, cloud migration, wireless
            complaint, firewall rule, VPN issue, and outage investigation
            eventually touches the network. Network+ is useful because it
            teaches the shared language behind those moments: addressing,
            switching, routing, services, wireless, security basics, and
            troubleshooting.
          </p>
        </div>
        <div className="info-stat-card">
          <TrendingUp size={42} />
          <strong>14.3k</strong>
          <span>projected annual openings</span>
        </div>
      </section>
      <div className="info-stat-grid">
        {marketStats.map((stat) => (
          <article key={stat.value} className="panel info-stat">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
      <section className="panel info-copy">
        <h3>Why it matters for new learners</h3>
        <p>
          Network+ is not a promise of a specific salary or job title. It is a
          foundation credential for people who need to understand how devices
          communicate, why connections fail, how services such as DNS and DHCP
          support users, and how to troubleshoot with a structured process.
          That makes it especially useful for help desk, junior network,
          systems, field technician, cloud support, and cybersecurity learners
          who need stronger infrastructure fundamentals.
        </p>
        <small>
          Labor-market figures reference the U.S. Bureau of Labor Statistics
          Occupational Outlook Handbook for Network and Computer Systems
          Administrators, accessed June 20, 2026.
        </small>
      </section>
    </div>
  );
}

function WhyChooseAppView() {
  const questionCount = allActivities.flatMap((activity) => activity.questions ?? []).length;
  const appStats = [
    { value: tiers.length, label: "guided tiers from foundations to practice exam" },
    { value: allActivities.length, label: "learning activities, labs, checks, quizzes, and exams" },
    { value: questionCount, label: "assessment questions with explanations" },
    { value: masterFlashcardsActivity.cards.length, label: "flashcards in the cumulative deck" },
  ];
  return (
    <div className="page info-page">
      <section className="info-hero info-hero--app">
        <div>
          <span className="status-pill">
            <i /> Built for momentum
          </span>
          <p className="eyebrow">Why choose this app?</p>
          <h2>Network+ prep without the maze.</h2>
          <p>
            Net+ Field Guide gives you a clear path, focused lessons, realistic
            scenarios, coached checks, cumulative review, and practice exams
            without burying you in fluff. It is designed to help you learn the
            objective, practice the decision, test the concept, and immediately
            know what to review next.
          </p>
        </div>
        <div className="info-stat-card">
          <Award size={42} />
          <strong>{questionCount}</strong>
          <span>questions with explanations</span>
        </div>
      </section>
      <div className="info-stat-grid">
        {appStats.map((stat) => (
          <article key={stat.label} className="panel info-stat">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
      <section className="panel info-copy">
        <h3>What we offer</h3>
        <p>
          You get a zero-to-Network+ learning path, original questions,
          shuffled flashcards, practice and exam modes, objective-based
          remediation, progress tracking, mobile-friendly layouts, and a simple
          interface that keeps the next step obvious. The goal is clarity:
          learn what matters, practice it often, and remove unnecessary noise
          from the networking learning process.
        </p>
      </section>
    </div>
  );
}

function LessonActivity({ activity, onComplete, completed }) {
  return (
    <>
      {activity.media && (
        <figure className="lesson-media">
          <img src={`${import.meta.env.BASE_URL}${activity.media.src.replace(/^\/+/, '')}`} alt={activity.media.alt} />
          <figcaption>{activity.media.caption}</figcaption>
        </figure>
      )}
      {activity.learningObjectives && (
        <section className="learning-objectives">
          <p className="eyebrow">By the end, you can</p>
          {activity.learningObjectives.map((objective) => (
            <span key={objective}>
              <Check size={14} />
              {objective}
            </span>
          ))}
        </section>
      )}
      <article className="lesson-body">
        {activity.content.map((paragraph, index) => (
          <div className="lesson-section" key={paragraph}>
            <span className="lesson-section__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="lesson-section__content">
              {activity.headings?.[index] && (
                <h2>{activity.headings[index]}</h2>
              )}
              <p>{paragraph}</p>
            </div>
          </div>
        ))}
      </article>
      <div className="key-idea">
        <Sparkles size={19} />
        <div>
          <strong>Field note</strong>
          <p>
            Ask what the safeguard protects, how it works, and which risk it
            reduces. That reasoning transfers better than memorizing labels.
          </p>
        </div>
      </div>
      <button
        className="button button--primary activity-complete"
        onClick={onComplete}
      >
        {completed ? (
          <>
            <Check size={17} />
            Completed — continue
          </>
        ) : (
          <>
            Mark complete <ArrowRight size={17} />
          </>
        )}
      </button>
    </>
  );
}

function SubnettingActivity({ activity, onComplete, completed }) {
  const [address, setAddress] = useState(activity.defaultAddress ?? "192.168.14.77");
  const [prefix, setPrefix] = useState(activity.defaultPrefix ?? 26);
  const [practiceSeed, setPracticeSeed] = useState(0);
  const [practice, setPractice] = useState(() => generateSubnetPrompt(0));
  const parsedPrefix = Number(prefix);
  const valid =
    isValidIpv4Address(address) &&
    Number.isInteger(parsedPrefix) &&
    parsedPrefix >= 0 &&
    parsedPrefix <= 32;
  const result = valid ? calculateSubnet(address, parsedPrefix) : null;
  const nextPractice = () => {
    const nextSeed = practiceSeed + 1;
    setPracticeSeed(nextSeed);
    setPractice(generateSubnetPrompt(nextSeed));
  };
  const loadPractice = () => {
    setAddress(practice.address);
    setPrefix(practice.prefix);
  };

  return (
    <>
      <section className="subnetting-brief">
        <div>
          <p className="eyebrow">Binary foundation</p>
          <h2>Subnetting is boundary math.</h2>
          <p>
            IPv4 has 32 bits. The prefix says how many bits are network bits.
            The remaining bits are host bits. Once you know the block size, you
            can find the network address, broadcast address, and usable range.
          </p>
        </div>
        <div className="binary-weights" aria-label="Binary octet weights">
          {[128, 64, 32, 16, 8, 4, 2, 1].map((weight) => (
            <span key={weight}>{weight}</span>
          ))}
        </div>
      </section>
      <section className="subnetting-grid">
        <div className="subnetting-panel">
          <p className="eyebrow">Calculator</p>
          <h2>IPv4 subnet calculator</h2>
          <div className="subnet-inputs">
            <label>
              IPv4 address
              <input value={address} onChange={(event) => setAddress(event.target.value)} inputMode="decimal" />
            </label>
            <label>
              CIDR prefix
              <input value={prefix} onChange={(event) => setPrefix(event.target.value)} inputMode="numeric" />
            </label>
          </div>
          {!valid && (
            <p className="subnet-error" role="alert">
              Enter an IPv4 address like 192.168.1.10 and a prefix from 0 to 32.
            </p>
          )}
          {result && (
            <div className="subnet-results">
              {[
                ["Subnet mask", result.subnetMask],
                ["Wildcard mask", result.wildcardMask],
                ["Network", result.networkAddress],
                ["Broadcast", result.broadcastAddress],
                ["First usable", result.firstUsable],
                ["Last usable", result.lastUsable],
                ["Usable hosts", result.usableHosts.toLocaleString()],
                ["Total addresses", result.totalAddresses.toLocaleString()],
              ].map(([label, value]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
          )}
        </div>
        <div className="subnetting-panel">
          <p className="eyebrow">Practice</p>
          <h2>Try the mental workflow</h2>
          <p className="subnet-practice-prompt">{practice.prompt}</p>
          <div className="subnet-practice-actions">
            <button className="button button--ghost" onClick={loadPractice}>
              <Calculator size={16} />
              Load in calculator
            </button>
            <button className="button button--primary" onClick={nextPractice}>
              New prompt <ArrowRight size={16} />
            </button>
          </div>
          <details className="subnet-answer">
            <summary>Reveal answer</summary>
            <p>
              Network {practice.answer.networkAddress}, broadcast{" "}
              {practice.answer.broadcastAddress}, usable range{" "}
              {practice.answer.firstUsable} to {practice.answer.lastUsable}.
            </p>
          </details>
        </div>
      </section>
      {result && (
        <section className="subnetting-panel subnetting-panel--wide">
          <p className="eyebrow">Binary view</p>
          <h2>See the boundary</h2>
          <div className="binary-table">
            {[
              ["Address", result.address, result.binaryAddress],
              ["Mask", result.subnetMask, result.binaryMask],
              ["Network", result.networkAddress, result.binaryNetwork],
            ].map(([label, decimal, binary]) => (
              <div key={label}>
                <strong>{label}</strong>
                <span>{decimal}</span>
                <code>{binary}</code>
              </div>
            ))}
          </div>
          <p className="subnet-note">
            Prefix /{result.prefix} means the first {result.prefix} bits are fixed
            network bits. Host bits change inside that subnet. For /31 and /32,
            this learner calculator reports traditional usable hosts as 0.
          </p>
        </section>
      )}
      <article className="lesson-body subnetting-reading">
        {activity.content.map((paragraph, index) => (
          <div className="lesson-section" key={paragraph}>
            <span className="lesson-section__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="lesson-section__content">
              <h2>{activity.headings[index]}</h2>
              <p>{paragraph}</p>
            </div>
          </div>
        ))}
      </article>
      <button className="button button--primary activity-complete" onClick={onComplete}>
        {completed ? (
          <>
            <Check size={17} />
            Completed — continue
          </>
        ) : (
          <>
            Complete subnetting lab <ArrowRight size={17} />
          </>
        )}
      </button>
    </>
  );
}

function FlashcardActivity({ activity, onComplete, completed }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = activity.cards[index];
  const revealTerm = getFlashcardRevealTerm(card[0]);
  return (
    <>
      <p className="activity-instruction">
        Tap the card to reveal the meaning. Move at your own pace—this is
        retrieval practice, not a test.
      </p>
      <button
        className={`flashcard ${flipped ? "flashcard--flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <span>
          {flipped
            ? "Definition"
            : `Term ${index + 1} of ${activity.cards.length}`}
        </span>
        {flipped ? (
          <span className="flashcard__answer">
            <strong className="flashcard__term">{revealTerm}</strong>
            <span className="flashcard__definition">{card[1]}</span>
          </span>
        ) : (
          <strong>{card[0]}</strong>
        )}
        <small>{flipped ? "Tap to see term" : "Tap to reveal"}</small>
      </button>
      <div className="flashcard-controls">
        <button
          className="button button--ghost"
          disabled={index === 0}
          onClick={() => {
            setIndex(index - 1);
            setFlipped(false);
          }}
        >
          <ArrowLeft size={16} />
          Previous
        </button>
        {index < activity.cards.length - 1 ? (
          <button
            className="button button--primary"
            onClick={() => {
              setIndex(index + 1);
              setFlipped(false);
            }}
          >
            Next card <ArrowRight size={16} />
          </button>
        ) : (
          <button className="button button--primary" onClick={onComplete}>
            {completed ? "Review complete" : "Complete deck"}{" "}
            <Check size={16} />
          </button>
        )}
      </div>
    </>
  );
}

function QuizActivity({ activity, onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = activity.questions[index];
  const answered = selected !== null;
  const choose = (choice) => {
    if (answered) return;
    setSelected(choice);
    if (choice === question.correctIndex) setCorrect(correct + 1);
  };
  const advance = () => {
    if (index === activity.questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex(index + 1);
    setSelected(null);
  };
  if (finished) {
    const score = Math.round((correct / activity.questions.length) * 100);
    return (
      <div className="activity-results">
        <div className="results-mark">
          <Trophy size={38} />
        </div>
        <p className="eyebrow">
          {activity.type === "checkpoint"
            ? "Checkpoint complete"
            : "Knowledge check complete"}
        </p>
        <h2>{score >= 80 ? "Strong signal." : "Useful reconnaissance."}</h2>
        <p>
          You scored{" "}
          <strong>
            {correct} of {activity.questions.length}
          </strong>
          . Incorrect answers are information, not punishment.
        </p>
        <div className="results-score">
          <strong>{score}%</strong>
          <span>accuracy</span>
        </div>
        <button
          className="button button--primary"
          onClick={() => onComplete(score / 100)}
        >
          Save progress <ArrowRight size={16} />
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="quiz-head">
        <div>
          <p className="eyebrow">
            Question {index + 1} of {activity.questions.length}
          </p>
        </div>
        <div className="quiz-dots">
          {activity.questions.map((_, i) => (
            <i key={i} className={i <= index ? "active" : ""} />
          ))}
        </div>
      </div>
      <h2 className="question-title">{question.prompt}</h2>
      <div className="answers">
        {question.options.map((option, choice) => {
          let state = "";
          if (answered && choice === question.correctIndex)
            state = "answer--correct";
          else if (answered && choice === selected) state = "answer--wrong";
          return (
            <button
              key={option}
              className={`answer ${state}`}
              onClick={() => choose(choice)}
            >
              <span>{String.fromCharCode(65 + choice)}</span>
              {option}
              {answered && choice === question.correctIndex && (
                <CheckCircle2 size={19} />
              )}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className={`explanation ${selected === question.correctIndex ? "explanation--correct" : ""}`}
          role="status"
        >
          <strong>
            {selected === question.correctIndex
              ? "Correct — clean read."
              : "Not quite. Here’s the distinction."}
          </strong>
          <p>{question.explanation}</p>
        </div>
      )}
      <div className="quiz-footer">
        <span>{correct} correct so far</span>
        <button
          className="button button--primary"
          disabled={!answered}
          onClick={advance}
        >
          {index === activity.questions.length - 1
            ? "See results"
            : "Next question"}{" "}
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}

function ActivityView({ activity, progress, onClose, onComplete }) {
  const completed = progress.completedActivityIds.includes(activity.id);
  const hasContent = activity.content || activity.cards || activity.questions;
  const tier = getTier(`tier-${activity.tierNumber}`);
  const activityPosition = allActivities.findIndex(
    (candidate) => candidate.id === activity.id,
  ) + 1;
  const [readingProgress, setReadingProgress] = useState(0);
  const updateReadingProgress = (event) => {
    const element = event.currentTarget;
    const available = element.scrollHeight - element.clientHeight;
    setReadingProgress(
      available > 0
        ? Math.min(100, Math.round((element.scrollTop / available) * 100))
        : 100,
    );
  };
  return (
    <div className="activity-overlay" onScroll={updateReadingProgress}>
      <main className="activity-view">
        <header className="activity-header">
          <button className="back-button" onClick={onClose}>
            <ArrowLeft size={16} /> Exit activity
          </button>
          <div className="activity-orientation" aria-label="Activity location">
            <span>
              Tier {activity.tierNumber} · {tier?.title ?? "Network+ Path"}
            </span>
            <strong>
              Activity {activityPosition} of {allActivities.length}
            </strong>
            <span>
              {typeLabels[activity.type]} · {activity.duration} min
            </span>
          </div>
          <i
            className="reading-progress"
            style={{ width: `${readingProgress}%` }}
          />
        </header>
        <div className="activity-shell">
          <div className="activity-title">
            <p className="eyebrow">
              Tier {activity.tierNumber} · {activity.difficulty}
            </p>
            <h1>{activity.title}</h1>
            <p>{activity.summary}</p>
          </div>
          {!hasContent ? (
            <div className="preview-state">
              <Layers3 size={35} />
              <p className="eyebrow">Curriculum preview</p>
              <h2>This activity has its place on the trail.</h2>
              <p>
                Its full learning content arrives after the complete Tier 1
                experience is validated. You can still explore every tier and
                see how the path fits together.
              </p>
              <button className="button button--primary" onClick={onClose}>
                Return to tier <ArrowRight size={16} />
              </button>
            </div>
          ) : activity.type === "lesson" ? (
            <LessonActivity
              activity={activity}
              completed={completed}
              onComplete={() => onComplete(activity)}
            />
          ) : activity.type === "flashcards" ? (
            <FlashcardActivity
              activity={activity}
              completed={completed}
              onComplete={() => onComplete(activity)}
            />
          ) : activity.type === "subnetting" ? (
            <SubnettingActivity
              activity={activity}
              completed={completed}
              onComplete={() => onComplete(activity)}
            />
          ) : (
            <QuizActivity
              activity={activity}
              onComplete={(score) => onComplete(activity, score)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function CompletionToast({ onClose }) {
  return (
    <div className="completion-toast" role="status">
      <span>
        <Check size={18} />
      </span>
      <div>
        <strong>Saved</strong>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState(() => progressRepository.load());
  const [active, setActive] = useState("dashboard");
  const [selectedTierId, setSelectedTierId] = useState(null);
  const [activityId, setActivityId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastActivity, setToastActivity] = useState(null);
  const [showWelcome, setShowWelcome] = useState(
    () => !progressRepository.load().completedOnboarding,
  );
  const activityTriggerRef = useRef(null);
  const homeScrollPendingRef = useRef(false);
  const titles = useMemo(
    () => ({
      ...Object.fromEntries(navItems.map((item) => [item.id, item.label])),
      "life-of-arp": "Life of ARP",
    }),
    [],
  );

  const closeActivity = () => {
    setActivityId(null);
    window.requestAnimationFrame(() => activityTriggerRef.current?.focus?.());
  };
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        if (activityId) closeActivity();
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activityId]);
  useEffect(() => {
    if (!homeScrollPendingRef.current || active !== "dashboard") return;
    homeScrollPendingRef.current = false;
    scheduleScrollAppToTop();
  }, [active]);
  const persist = (next) => {
    const saved = progressRepository.save(next);
    setProgress(saved);
    return saved;
  };
  const finishOnboarding = (destination) => {
    persist({ ...progress, completedOnboarding: true });
    setShowWelcome(false);
    if (destination === "path") setActive("path");
  };
  const openTier = (tierId) => {
    setSelectedTierId(tierId);
    setActive("path");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openActivity = (id) => {
    activityTriggerRef.current = document.activeElement;
    setSearchQuery("");
    setActivityId(id);
  };
  const completeActivity = (activity, result = null, nextActivityId = null) => {
    const normalizedResult =
      typeof result === "number"
        ? { score: result }
        : (result ?? { score: null });
    const alreadyDone = progress.completedActivityIds.includes(activity.id);
    const completedActivityIds = alreadyDone
      ? progress.completedActivityIds
      : [...progress.completedActivityIds, activity.id];
    const completedAt = new Date().toISOString();
    const savedResult = {
      ...normalizedResult,
      attempts: (progress.results[activity.id]?.attempts ?? 0) + 1,
      completedAt,
    };
    const nextDraft = {
      ...progress,
      completedActivityIds,
      totalStudyMinutes:
        progress.totalStudyMinutes + (alreadyDone ? 0 : activity.duration),
      lastStudiedAt: completedAt,
      results: { ...progress.results, [activity.id]: savedResult },
      scenarioResults:
        activity.type === "scenario"
          ? { ...progress.scenarioResults, [activity.id]: savedResult }
          : progress.scenarioResults,
      examAttempts:
        activity.type === "exam"
          ? [
              ...progress.examAttempts,
              { activityId: activity.id, ...savedResult },
            ]
          : progress.examAttempts,
    };
    const nextActivity = getRecommendation(nextDraft).activity;
    persist({ ...nextDraft, currentActivityId: nextActivity?.id ?? null });
    setActivityId(nextActivityId);
    setToastActivity({ activity, nextActivity });
    window.setTimeout(() => setToastActivity(null), 4200);
  };
  const saveValidationSession = (entry) => {
    persist({
      ...progress,
      validationSessions: [...(progress.validationSessions ?? []), entry],
    });
  };
  const saveManualQaCheck = (entry) => {
    persist({
      ...progress,
      manualQaChecks: {
        ...(progress.manualQaChecks ?? {}),
        [entry.id]: entry,
      },
    });
  };
  const activity = activityId ? getActivity(activityId) : null;
  const activityIndex = activity
    ? allActivities.findIndex((candidate) => candidate.id === activity.id)
    : -1;
  const nextActivity =
    activityIndex >= 0 ? (allActivities[activityIndex + 1] ?? null) : null;
  const selectedTier = selectedTierId ? getTier(selectedTierId) : null;
  const topbarRecommendation = getRecommendation(progress);

  const activateSearch = () => {
    setActive("path");
    setSelectedTierId(null);
  };
  const continueLearning = () => {
    const next = topbarRecommendation.activity;
    if (!next) return;
    setSelectedTierId(next.tierId);
    openActivity(next.id);
  };
  const goHome = () => {
    homeScrollPendingRef.current = true;
    setActivityId(null);
    setSelectedTierId(null);
    setSearchQuery("");
    setMenuOpen(false);
    setActive("dashboard");
    scheduleScrollAppToTop();
  };
  const resetLocalStudyData = () => {
    Object.keys(window.localStorage)
      .filter((key) => key === "networkplus-learner-progress" || key.startsWith("network-plus-exam-v4-"))
      .forEach((key) => window.localStorage.removeItem(key));
    progressRepository.clear();
    const freshProgress = progressRepository.load();
    setProgress(freshProgress);
    setActivityId(null);
    setSelectedTierId(null);
    setSearchQuery("");
    setToastActivity(null);
    setMenuOpen(false);
    setShowWelcome(true);
    setActive("dashboard");
    scheduleScrollAppToTop();
  };
  const openSubnettingLab = () => {
    const subnettingActivity = allActivities.find((candidate) => candidate.type === "subnetting");
    if (subnettingActivity) openActivity(subnettingActivity.id);
  };
  return (
    <div className="app-shell">
      <Sidebar
        active={active}
        onNavigate={(id) => {
          setActive(id);
          setSelectedTierId(null);
        }}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        progress={progress}
      />
      {menuOpen && (
        <button
          className="sidebar-scrim"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}
      <main className="main">
        <Topbar
          title={titles[active]}
          onMenu={() => setMenuOpen(true)}
          onHome={goHome}
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onSearchActivate={activateSearch}
          recommendation={topbarRecommendation}
          onContinue={continueLearning}
        />
        {active === "dashboard" && (
          <Dashboard
            progress={progress}
            onOpenTier={openTier}
            onOpenActivity={openActivity}
            onNavigate={(id) => {
              setActive(id);
              setSelectedTierId(null);
            }}
          />
        )}
        {active === "path" &&
          (selectedTier ? (
            <TierDetail
              tier={selectedTier}
              progress={progress}
              onBack={() => setSelectedTierId(null)}
              onOpenActivity={openActivity}
            />
          ) : (
            <PathView
              progress={progress}
              onOpenTier={openTier}
              onOpenActivity={openActivity}
              query={searchQuery}
              onClearQuery={() => setSearchQuery("")}
            />
          ))}
        {active === "domains" && <DomainsView progress={progress} />}
        {active === "life-of-a-packet" && <LifeOfPacketView />}
        {active === "life-of-arp" && <LifeOfArpView />}
        {active === "subnetting" && (
          <div className="page subnetting-practice-page">
            <SubnettingPractice onBack={() => setActive("path")} />
          </div>
        )}
        {active === "subnetting-explain" && <SubnettingExplanations />}
        {active === "flashcards" && (
          <FlashCardsView onOpenActivity={openActivity} />
        )}
        {active === "common-ports" && <CommonPortsView />}
        {active === "progress" && (
          <ProgressView progress={progress} onOpenActivity={openActivity} />
        )}
        {active === "study-guide" && <StudyGuideView />}
        {active === "developers" && <MeetDevelopersView />}
        {active === "read-me" && <ReadMeView />}
        {active === "privacy" && (
          <PrivacyView
            progress={progress}
            onResetLocalData={resetLocalStudyData}
          />
        )}
        {active === "why-network" && <WhyNetworkView />}
        {active === "why-app" && <WhyChooseAppView />}
        <footer className="legal-disclaimer">
          This app is an independent study resource and is not affiliated with,
          endorsed by, sponsored by, or approved by CompTIA or any other
          certification provider. CompTIA, A+, Network+, Security+, and related
          marks are trademarks of their respective owners. All content is
          original and provided for educational purposes only.
        </footer>
      </main>
      {showWelcome && (
        <Onboarding
          onStart={() => finishOnboarding("start")}
          onExplore={() => finishOnboarding("path")}
        />
      )}
      {activity && (
        <LearningActivityView
          activity={activity}
          nextActivity={nextActivity}
          progress={progress}
          onClose={closeActivity}
          onHome={goHome}
          onOpenNext={setActivityId}
          onComplete={completeActivity}
        />
      )}
      {toastActivity && (
        <CompletionToast
          activity={toastActivity.activity}
          nextActivity={toastActivity.nextActivity}
          onOpenNext={() => {
            if (toastActivity.nextActivity) {
              setActivityId(toastActivity.nextActivity.id);
            }
            setToastActivity(null);
          }}
          onClose={() => setToastActivity(null)}
        />
      )}
    </div>
  );
}
