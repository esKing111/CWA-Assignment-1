"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoPlayer({
  src,
  type = "video/mp4",
  width = "100%",
  style,
  poster,
  ariaLabel = "Video player",
}) {
  const videoRef = useRef(null);
  const [supports, setSupports] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const vid = document.createElement("video");
    const can = vid.canPlayType(type || "video/mp4");
    setSupports(!!can);
  }, [type]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        preload="metadata"
        width={width}
        poster={poster}
        playsInline
        aria-label={ariaLabel}
        style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", ...style }}
        onError={() => setError("Playback error")}
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
      {(!supports || error) && (
        <div role="status" style={{ marginTop: 8 }}>
          <p style={{ margin: 0 }}>
            This video can’t be played in your browser. Ensure the file exists at {src} and is encoded with H.264 video and AAC audio.
          </p>
          <p style={{ margin: "4px 0 0" }}>
            You can also <a href={src} target="_blank" rel="noreferrer">open the file</a> or <a href={src} download>download it</a>.
          </p>
        </div>
      )}
    </div>
  );
}
