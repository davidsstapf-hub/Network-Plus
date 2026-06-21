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
  { id: "domains", label: "Exam Domains", icon: BookOpen },
  { id: "flashcards", label: "Flash Cards", icon: Contact },
  { id: "common-ports", label: "Common Ports", icon: Server },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "study-guide", label: "How to Study", icon: GraduationCap },
  { id: "developers", label: "Meet the Developers", icon: UsersRound },
];

const aboutNavItems = [
  { id: "read-me", label: "Read Me", icon: CircleHelp },
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

function Sidebar({ active, onNavigate, open, onClose, progress }) {
  const overall = getOverallProgress(progress);
  const renderNavItem = ({ id, label, icon: Icon }) => (
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
      <div>
        <p className="eyebrow">Learning workspace</p>
        <h1>{title}</h1>
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
          {tiers.map((tier) => (
            <span key={tier.id} style={{ "--tier": tier.color }}>
              <b>0{tier.number}</b>
              {tier.title}
            </span>
          ))}
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
        return (
          <button
            key={tier.id}
            className={`tier-node ${recommended ? "tier-node--recommended" : ""}`}
            style={{ "--tier": tier.color }}
            onClick={() => onOpenTier(tier.id)}
          >
            <span className="tier-node__number">
              {value === 100 ? <Check size={19} /> : tier.number}
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

function ProgressView({ progress, onOpenActivity }) {
  const readiness = getReadiness(progress);
  const readinessSignals = getReadinessSignals(progress);
  const weakObjectives = getWeakObjectives(progress, 6);
  const feedback = progress.learnerFeedback ?? [];
  const confidenceEntries = Object.values(progress.confidenceRatings ?? {});
  const lowConfidence = confidenceEntries.filter((entry) => entry.rating === "low" || entry.rating === "medium").slice(-8).reverse();
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
      confidenceRatings: progress.confidenceRatings ?? {},
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
      <section className="panel confidence-review">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Confidence review</p>
            <h3>Activities to revisit</h3>
          </div>
          <span className="trend-up">{lowConfidence.length} study signals</span>
        </div>
        {lowConfidence.length ? (
          <div className="confidence-review-list">
            {lowConfidence.map((entry) => (
              <button
                key={entry.activityId}
                type="button"
                onClick={() => onOpenActivity(entry.activityId)}
              >
                <span>Objective {entry.objective} · {entry.rating === "low" ? "Not yet" : "Almost"}</span>
                <strong>{entry.activityTitle}</strong>
                <em>Review activity</em>
              </button>
            ))}
          </div>
        ) : (
          <p className="validation-empty">No low-confidence activities yet. Use the confidence check at the end of activities to build a review list.</p>
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
  ["keyboard-lesson", "Keyboard: lesson journey", "Open a lesson, move through content, confidence check, validation form, and completion using keyboard only."],
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
  const confidenceEntries = Object.values(progress.confidenceRatings ?? {});
  const shakyObjectives = confidenceEntries
    .filter((entry) => entry.rating === "low" || entry.rating === "medium")
    .reduce((rows, entry) => {
      const key = entry.objective ?? "unmapped";
      const row = rows.get(key) ?? { objective: key, total: 0, low: 0, medium: 0, titles: [] };
      row.total += 1;
      if (entry.rating === "low") row.low += 1;
      if (entry.rating === "medium") row.medium += 1;
      row.titles.push(entry.activityTitle);
      rows.set(key, row);
      return rows;
    }, new Map());
  const confidenceTriage = [...shakyObjectives.values()]
    .sort((a, b) => b.total - a.total || a.objective.localeCompare(b.objective, undefined, { numeric: true }))
    .slice(0, 6);
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
      confidenceRatings: progress.confidenceRatings ?? {},
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
      <section className="panel validation-review">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Learner review dashboard</p>
            <h3>Confidence clusters to watch</h3>
          </div>
          <span className="trend-up">{confidenceTriage.length} objective groups</span>
        </div>
        {confidenceTriage.length ? (
          <div className="objective-feedback-list">
            {confidenceTriage.map((row) => (
              <article key={row.objective}>
                <strong>Objective {row.objective}</strong>
                <span>{row.total} shaky ratings · {row.low} not yet · {row.medium} almost</span>
                <p>{row.titles[0]}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="validation-empty">No low-confidence clusters yet. Ask learners to use confidence checks after activities.</p>
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
          <p className="eyebrow">Continue learning</p>
          <h3>Additional resources</h3>
          <p>
            For comprehensive video instruction and another perspective on the
            exam objectives, consider exploring these independent educators.
          </p>
        </div>
        <nav aria-label="Additional Network+ study resources">
          <a
            href="https://www.youtube.com/watch?v=KiEptGbnEBc&list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv"
            target="_blank"
            rel="noreferrer"
          >
            Professor Messer <ArrowRight size={16} />
          </a>
          <a
            href="https://www.udemy.com/user/jason-dion/?kw=jason+di&src=sac"
            target="_blank"
            rel="noreferrer"
          >
            Jason Dion <ArrowRight size={16} />
          </a>
        </nav>
        <p className="resources-disclosure">
          Net+ Field Guide and its creator are not affiliated with, endorsed by,
          or sponsored by CompTIA, Udemy, Jason Dion, or Professor Messer. All
          trademarks and course materials belong to their respective owners.
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
      <div className="lesson-objective">
        <span>Domain {activity.domain}</span>
        <span>Objective {activity.objective}</span>
        <span>{activity.duration} min</span>
      </div>
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
      <div className="lesson-objective">
        <span>Subnetting Lab</span>
        <span>Binary + CIDR</span>
        <span>{activity.duration} min</span>
      </div>
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
        <strong>{flipped ? card[1] : card[0]}</strong>
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
          <span>
            Domain {question.domain} · Objective {question.objective}
          </span>
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
  const titles = useMemo(
    () => Object.fromEntries(navItems.map((item) => [item.id, item.label])),
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
  const saveLearnerFeedback = (entry) => {
    persist({
      ...progress,
      learnerFeedback: [...(progress.learnerFeedback ?? []), entry],
    });
  };
  const saveConfidenceRating = (entry) => {
    persist({
      ...progress,
      confidenceRatings: {
        ...(progress.confidenceRatings ?? {}),
        [entry.activityId]: entry,
      },
    });
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
          onHome={() => {
            setActivityId(null);
            setSelectedTierId(null);
            setActive("dashboard");
            window.scrollTo({ top: 0 });
          }}
          onOpenNext={setActivityId}
          onComplete={completeActivity}
          onFeedbackSaved={saveLearnerFeedback}
          onConfidenceSaved={saveConfidenceRating}
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
