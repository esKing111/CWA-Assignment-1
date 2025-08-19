"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { STUDENT_NUMBER } from "../config";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const setCookie = (name, value, days = 365) => {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const last = getCookie("activeTab");
    if (last) {
      setActiveTab(decodeURIComponent(last));
    } else {
      setActiveTab(window.location.pathname || "/");
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCookie("activeTab", activeTab);
    }
  }, [activeTab]);

  const NavLink = ({ href, label }) => (
    <Link
      href={href}
      onClick={() => {
        setActiveTab(href);
        setMenuOpen(false);
      }}
      aria-current={activeTab === href ? "page" : undefined}
      style={{
        textDecoration: activeTab === href ? "underline" : "none",
        padding: "8px 12px",
        display: "block",
        color: "inherit",
      }}
    >
      {label}
    </Link>
  );

  return (
    <header
      role="banner"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--background)",
        color: "var(--foreground)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          maxWidth: 1024,
          margin: "0 auto",
          padding: "10px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span aria-label="Student Number"
            style={{ fontWeight: 600 }}>{STUDENT_NUMBER}</span>
        </div>
        <nav aria-label="Main" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            style={{
              background: "transparent",
              border: "1px solid currentColor",
              padding: "6px 10px",
              borderRadius: 6,
              cursor: "pointer",
              color: "inherit",
            }}
          >
            ⋮
          </button>
          <ul id="main-menu" role="list" style={{ listStyle: "none", margin: 0, padding: 8, display: menuOpen ? "block" : "none", position: "absolute", right: 16, top: 50, background: "var(--background)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <li><NavLink href="/" label="Home" /></li>
            <li><NavLink href="/about" label="About" /></li>
          </ul>
          <div style={{ marginLeft: 8 }}>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
