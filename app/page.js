"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("Hello World");
  const [content, setContent] = useState("This is generated content.");
  const [bg, setBg] = useState("#ffffff");
  const [fg, setFg] = useState("#222222");
  const liveRef = useRef(null);

  const html = useMemo(() => {
    return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <title>${escapeHtml(title)}</title>\n</head>\n<body style="margin:0;padding:24px;background:${bg};color:${fg};font-family:Arial, Helvetica, sans-serif;">\n  <header style="margin-bottom:16px;border-bottom:1px solid rgba(0,0,0,0.1);padding-bottom:8px;">\n    <h1 style="margin:0;font-size:28px;">${escapeHtml(title)}</h1>\n  </header>\n  <main>\n    <p style="line-height:1.6;">${escapeHtml(content)}</p>\n    <button id="btn" style="margin-top:12px;padding:8px 12px;border:1px solid ${fg};background:transparent;color:${fg};border-radius:6px;cursor:pointer;">Click me</button>\n  </main>\n  <script>\n    document.getElementById('btn').addEventListener('click', function() {\n      alert('Button clicked!');\n    });\n  <\/script>\n</body>\n</html>`;
  }, [title, content, bg, fg]);

  useEffect(() => {
    const iframe = document.getElementById("preview");
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [html]);

  return (
    <section aria-labelledby="generator-heading">
      <h1 id="generator-heading" style={{ fontSize: 28, marginBottom: 12 }}>
        HTML5 Code Generator
      </h1>
      <form
        aria-label="Code generator form"
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Content</span>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Background</span>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            style={{ padding: 4, height: 40 }}
            aria-label="Background color"
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Text color</span>
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            style={{ padding: 4, height: 40 }}
            aria-label="Text color"
          />
        </label>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Generated HTML</h2>
          <textarea
            aria-label="Generated HTML code"
            readOnly
            value={html}
            style={{ width: "100%", minHeight: 300, fontFamily: "monospace", fontSize: 12, padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
          />
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(html);
                  if (liveRef.current) liveRef.current.textContent = "Code copied to clipboard.";
                  setTimeout(() => { if (liveRef.current) liveRef.current.textContent = ""; }, 1500);
                } catch (e) {
                  if (liveRef.current) liveRef.current.textContent = "Failed to copy.";
                }
              }}
              style={{ padding: "6px 10px", border: "1px solid currentColor", background: "transparent", borderRadius: 6, cursor: "pointer" }}
              aria-label="Copy generated HTML to clipboard"
            >
              Copy
            </button>
          </div>
          <div ref={liveRef} aria-live="polite" style={{ position: "absolute", left: -9999 }} />
        </div>
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Live Preview</h2>
          <iframe
            id="preview"
            title="Live preview"
            style={{ width: "100%", minHeight: 300, border: "1px solid #ccc", borderRadius: 6, background: "#fff" }}
          />
        </div>
      </div>
    </section>
  );
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
