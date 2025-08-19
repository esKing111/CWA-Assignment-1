import { STUDENT_NAME, STUDENT_NUMBER } from "../config";
import VideoPlayer from "../components/VideoPlayer";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section aria-labelledby="about-heading">
      <h1 id="about-heading" style={{ fontSize: 32, marginBottom: 12 }}>About</h1>
      <p style={{ marginBottom: 8 }}>
        Name: <strong>{STUDENT_NAME}</strong>
      </p>
      <p style={{ marginBottom: 16 }}>
        Student Number: <strong>{STUDENT_NUMBER}</strong>
      </p>
      <div>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>How to use this website</h2>
        <p style={{ marginBottom: 8 }}>
          Use the menu in the header to navigate between pages. Toggle the theme using the button. The site remembers the last menu tab you visited.
        </p>
        <div style={{ aspectRatio: "16/9", maxWidth: 800 }}>
          <VideoPlayer
            src="/instruction.mp4"
            type="video/mp4"
            ariaLabel="Instructional video showing how to use the website"
            style={{}}
          />
        </div>
      </div>
    </section>
  );
}
