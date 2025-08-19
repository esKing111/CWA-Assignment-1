import { STUDENT_NAME, STUDENT_NUMBER } from "../config";

export default function Footer() {
  const date = new Date();
  const dateStr = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <footer role="contentinfo" style={{
      borderTop: "1px solid rgba(0,0,0,0.1)",
      marginTop: 24,
      padding: "16px",
      textAlign: "center",
      color: "var(--foreground)",
      background: "var(--background)",
    }}>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} · {STUDENT_NAME} · {STUDENT_NUMBER} · {dateStr}
      </p>
    </footer>
  );
}
