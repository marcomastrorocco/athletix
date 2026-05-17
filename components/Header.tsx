"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BookTrialModal from "@/components/BookTrialModal";

const ABOUT_PATHS = [
  "/about",
  "/our-gym",
  "/our-team",
  "/allied-health",
  "/ndis-program",
  "/careers",
];

const CLASSES_PATHS = [
  "/classes",
  "/youth-classes",
  "/adult-classes",
  "/family-classes",
  "/athlete-programs",
];

type Props = {
  contact: { phone: string; email: string; address: string };
};

const phoneHref = (p: string) => `tel:+${p.replace(/[^\d]/g, "")}`;

const SIDE_HOURS = [
  { weekday: 1, short: "MON", hours: "5:15 AM – 7:30 PM" },
  { weekday: 2, short: "TUE", hours: "6:00 AM – 7:30 PM" },
  { weekday: 3, short: "WED", hours: "5:15 AM – 7:30 PM" },
  { weekday: 4, short: "THU", hours: "6:00 AM – 7:30 PM" },
  { weekday: 5, short: "FRI", hours: "5:15 AM – 6:00 PM" },
  { weekday: 6, short: "SAT", hours: "6:00 AM – 11:30 AM" },
];

export default function Header({ contact }: Props) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [todayWeekday, setTodayWeekday] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"classes" | "about" | null>(null);

  useEffect(() => {
    setTodayWeekday(new Date().getDay());
  }, []);

  // Close any open dropdown when the mobile nav closes
  useEffect(() => {
    if (!navOpen) setOpenDropdown(null);
  }, [navOpen]);

  const toggleDropdown = (key: "classes" | "about") => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const Chevron = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSideOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sideOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sideOpen]);

  const isActive = (href: string) => pathname === href;
  const isAboutActive = ABOUT_PATHS.includes(pathname);
  const isClassesActive = CLASSES_PATHS.includes(pathname);
  const closeNav = () => setNavOpen(false);

  return (
    <>
      <header
        className="site-header"
        id="siteHeader"
        style={{
          boxShadow: scrolled ? "0 6px 20px rgba(0,0,0,.6)" : "none",
        }}
      >
        <div className="container header-inner">
          <Link href="/" className="logo" onClick={closeNav}>
            <img src="/image/athlethix-logo.png" alt="Athletix" />
          </Link>
          <nav
            className={`nav${navOpen ? " open" : ""}`}
            id="mainNav"
          >
            <Link
              href="/timetable"
              className={isActive("/timetable") ? "active" : undefined}
              onClick={closeNav}
            >
              TIMETABLE
            </Link>
            <div className={`dropdown${openDropdown === "classes" ? " open" : ""}`}>
              <div className="dropdown-head">
                <Link
                  href="/classes"
                  className={`dropbtn${isClassesActive ? " active" : ""}`}
                  onClick={closeNav}
                >
                  CLASSES
                </Link>
                <button
                  type="button"
                  className="dropdown-toggle"
                  aria-label="Toggle Classes submenu"
                  aria-expanded={openDropdown === "classes"}
                  onClick={() => toggleDropdown("classes")}
                >
                  <Chevron />
                </button>
              </div>
              <div className="dropdown-content">
                <div className="dropdown-inner">
                  <Link href="/youth-classes" onClick={closeNav}>
                    YOUTH CLASSES
                  </Link>
                  <Link href="/adult-classes" onClick={closeNav}>
                    ADULT CLASSES
                  </Link>
                  <Link href="/family-classes" onClick={closeNav}>
                    FAMILY CLASSES
                  </Link>
                  <Link href="/athlete-programs" onClick={closeNav}>
                    ATHLETE PROGRAMS
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/membership"
              className={isActive("/membership") ? "active" : undefined}
              onClick={closeNav}
            >
              MEMBERSHIP
            </Link>
            <div className={`dropdown${openDropdown === "about" ? " open" : ""}`}>
              <div className="dropdown-head">
                <Link
                  href="/about"
                  className={`dropbtn${isAboutActive ? " active" : ""}`}
                  onClick={closeNav}
                >
                  ABOUT US
                </Link>
                <button
                  type="button"
                  className="dropdown-toggle"
                  aria-label="Toggle About submenu"
                  aria-expanded={openDropdown === "about"}
                  onClick={() => toggleDropdown("about")}
                >
                  <Chevron />
                </button>
              </div>
              <div className="dropdown-content">
                <div className="dropdown-inner">
                  <Link href="/our-gym" onClick={closeNav}>
                    OUR GYM
                  </Link>
                  <Link href="/our-team" onClick={closeNav}>
                    OUR TEAM
                  </Link>
                  <Link href="/allied-health" onClick={closeNav}>
                    ALLIED HEALTH
                  </Link>
                  <Link href="/ndis-program" onClick={closeNav}>
                    NDIS PROGRAM
                  </Link>
                  <Link href="/careers" onClick={closeNav}>
                    CAREERS
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className={isActive("/contact") ? "active" : undefined}
              onClick={closeNav}
            >
              CONTACT US
            </Link>
            <Link
              href="/blog"
              className={isActive("/blog") ? "active" : undefined}
              onClick={closeNav}
            >
              BLOG
            </Link>
          </nav>
          <div className="header-cta">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setTrialOpen(true);
                closeNav();
              }}
            >
              Book Trial
            </button>
            <button
              className="side-toggle"
              id="sideToggle"
              aria-label="Open side panel"
              onClick={() => setSideOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <button
              className={`nav-toggle${navOpen ? " open" : ""}`}
              id="navToggle"
              aria-label="Toggle menu"
              onClick={() => setNavOpen((o) => !o)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <aside
        className={`side-panel${sideOpen ? " open" : ""}`}
        id="sidePanel"
        aria-hidden={!sideOpen}
      >
        <button
          className="side-close"
          id="sideClose"
          aria-label="Close side panel"
          onClick={() => setSideOpen(false)}
        >
          ×
        </button>
        <div className="side-inner">
          <div className="side-logo">
            <img src="/image/athlethix-logo.png" alt="Athletix" />
          </div>
          <p className="side-about">
            Athletix is a Fitness and Athletic development centre with S&amp;C
            coaches, sports physiotherapy and rehab &amp; in-house cafe in the
            heart of Brisbane (Fortitude Valley) offering Group Classes for
            Youth, Adults and Athletes in Strength, Speed &amp; Agility,
            Conditioning, Sprint Mechanics, Pilates, Mobility and more. Book a
            Trial Class Today!
          </p>
          <p className="side-address">
            <span className="pin">📍</span> {contact.address.toUpperCase()}.
          </p>
          <p className="side-phone">
            <span className="pin">📞</span>{" "}
            <a href={phoneHref(contact.phone)}>{contact.phone}</a>
          </p>

          <h4 className="side-heading">Working Hours</h4>
          <ul className="side-hours">
            {SIDE_HOURS.map((row) => {
              const isToday = todayWeekday === row.weekday;
              return (
                <li key={row.short} className={isToday ? "is-today" : ""}>
                  <span className="day">{row.short}</span>
                  <strong className="hours">{row.hours}</strong>
                  {isToday && <span className="today-badge">Today</span>}
                </li>
              );
            })}
          </ul>

          <h4 className="side-heading">Our Socials</h4>
          <div className="side-socials">
            <a href="#" aria-label="YouTube">
              ▶
            </a>
            <a href="#" aria-label="Instagram">
              ◉
            </a>
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="LinkedIn">
              in
            </a>
            <a href="#" aria-label="Twitter">
              𝕏
            </a>
          </div>
        </div>
      </aside>
      <div
        className={`side-backdrop${sideOpen ? " open" : ""}`}
        id="sideBackdrop"
        onClick={() => setSideOpen(false)}
      ></div>

      <BookTrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />
    </>
  );
}
