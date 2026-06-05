# Day 5 - Context Engineering

## Prompt A (Without Context)
**(Create a 30-day learning roadmap.
Include:
- Weekly milestones
- Daily tasks
- Resources
- Projects
- Final outcome
Make it practical and beginner-friendly.
)**
code:
import { useState } from "react";

const roadmapData = {
  title: "Web Development",
  subtitle: "From zero to building real websites",
  outcome: "Build and deploy a full personal portfolio website with HTML, CSS, JavaScript, and a contact form — ready to show employers or clients.",
  weeks: [
    {
      week: 1,
      theme: "HTML & the Web",
      color: "#FF6B35",
      milestone: "Build a structured webpage from scratch using only HTML",
      days: [
        { day: 1, title: "How the Web Works", task: "Learn what browsers, servers, HTML, CSS, JS are. Set up VS Code.", resource: "MDN: How the Web Works", resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works", type: "read" },
        { day: 2, title: "HTML Basics", task: "Learn tags: headings, paragraphs, links, images. Write your first .html file.", resource: "freeCodeCamp HTML Course", resourceUrl: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "code" },
        { day: 3, title: "HTML Structure", task: "Learn semantic tags: header, nav, main, footer, section, article.", resource: "MDN: HTML elements reference", resourceUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", type: "read" },
        { day: 4, title: "Forms & Inputs", task: "Build a contact form with text, email, textarea, and submit button.", resource: "MDN: Web Forms", resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/Forms", type: "code" },
        { day: 5, title: "Tables & Lists", task: "Create a weekly schedule using an HTML table and nested lists.", resource: "W3Schools HTML Tables", resourceUrl: "https://www.w3schools.com/html/html_tables.asp", type: "code" },
        { day: 6, title: "Mini Project: Bio Page", task: "Build a personal bio page: name, photo, about section, hobbies list.", resource: "Use what you've learned!", resourceUrl: "#", type: "project" },
        { day: 7, title: "Review & Fix", task: "Validate your HTML at validator.w3.org. Fix errors and add accessibility attributes.", resource: "W3C HTML Validator", resourceUrl: "https://validator.w3.org/", type: "review" },
      ]
    },
    {
      week: 2,
      theme: "CSS & Visual Design",
      color: "#A855F7",
      milestone: "Style a full webpage to look polished and professional",
      days: [
        { day: 8, title: "CSS Basics", task: "Learn selectors, properties, colors, fonts. Link a stylesheet to your HTML.", resource: "CSS Tricks: Getting Started", resourceUrl: "https://css-tricks.com/guides/beginner/", type: "read" },
        { day: 9, title: "Box Model", task: "Master margin, padding, border, width, height. Inspect elements in DevTools.", resource: "MDN: The Box Model", resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model", type: "code" },
        { day: 10, title: "Flexbox Layout", task: "Use flexbox to build a navbar and a card row. Play Flexbox Froggy.", resource: "Flexbox Froggy (game)", resourceUrl: "https://flexboxfroggy.com/", type: "code" },
        { day: 11, title: "CSS Grid", task: "Build a photo gallery using CSS Grid. Play Grid Garden.", resource: "Grid Garden (game)", resourceUrl: "https://cssgridgarden.com/", type: "code" },
        { day: 12, title: "Responsive Design", task: "Add media queries so your bio page works on mobile. Use Chrome DevTools device mode.", resource: "MDN: Responsive Design", resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", type: "code" },
        { day: 13, title: "Typography & Colors", task: "Import a Google Font. Build a consistent color palette using CSS variables.", resource: "Google Fonts + Coolors.co", resourceUrl: "https://fonts.google.com", type: "design" },
        { day: 14, title: "Mini Project: Landing Page", task: "Style a product or personal landing page: hero, features section, footer.", resource: "Build it from scratch!", resourceUrl: "#", type: "project" },
      ]
    },
    {
      week: 3,
      theme: "JavaScript Fundamentals",
      color: "#10B981",
      milestone: "Add interactivity: make things respond to user actions",
      days: [
        { day: 15, title: "JS Basics", task: "Variables, data types, console.log. Open browser console and experiment.", resource: "javascript.info: The Basics", resourceUrl: "https://javascript.info/first-steps", type: "read" },
        { day: 16, title: "Functions & Logic", task: "Write functions, if/else, loops. Solve 5 problems on JS basics.", resource: "javascript.info: Functions", resourceUrl: "https://javascript.info/function-basics", type: "code" },
        { day: 17, title: "Arrays & Objects", task: "Work with arrays (map, filter, forEach) and objects. Build a contact list.", resource: "javascript.info: Arrays", resourceUrl: "https://javascript.info/array", type: "code" },
        { day: 18, title: "DOM Manipulation", task: "Use querySelector, addEventListener, innerHTML. Change page content on button click.", resource: "MDN: DOM Manipulation", resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents", type: "code" },
        { day: 19, title: "Events & Forms", task: "Validate a form with JS: check empty fields, show error messages dynamically.", resource: "MDN: Client-side form validation", resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", type: "code" },
        { day: 20, title: "Fetch & APIs", task: "Use fetch() to pull data from a public API (e.g. JSONPlaceholder). Display it on the page.", resource: "javascript.info: Fetch", resourceUrl: "https://javascript.info/fetch", type: "code" },
        { day: 21, title: "Mini Project: To-Do App", task: "Build a to-do list: add, complete, and delete tasks. Store items in localStorage.", resource: "Build it yourself!", resourceUrl: "#", type: "project" },
      ]
    },
    {
      week: 4,
      theme: "Final Project & Launch",
      color: "#F59E0B",
      milestone: "Deploy a live portfolio website on the internet",
      days: [
        { day: 22, title: "Git & GitHub Basics", task: "Install Git, create a GitHub account. Commit and push your projects.", resource: "GitHub: Git Handbook", resourceUrl: "https://guides.github.com/introduction/git-handbook/", type: "read" },
        { day: 23, title: "Plan Your Portfolio", task: "Sketch 3 sections: About Me, Projects, Contact. Write your bio and gather project screenshots.", resource: "Dribbble for inspiration", resourceUrl: "https://dribbble.com/search/portfolio", type: "design" },
        { day: 24, title: "Build: HTML Structure", task: "Code the full HTML skeleton of your portfolio. All sections, semantic markup.", resource: "Your Week 1 skills", resourceUrl: "#", type: "code" },
        { day: 25, title: "Build: Style It", task: "Apply CSS: colors, fonts, grid/flexbox layout, responsive breakpoints.", resource: "Your Week 2 skills", resourceUrl: "#", type: "code" },
        { day: 26, title: "Build: Add JS", task: "Add a working contact form (EmailJS or Formspree), smooth scroll, and animations.", resource: "Formspree.io (free forms)", resourceUrl: "https://formspree.io", type: "code" },
        { day: 27, title: "Deploy to the Web", task: "Deploy your site live on GitHub Pages or Netlify. Share the URL.", resource: "Netlify Drop (drag & drop deploy)", resourceUrl: "https://app.netlify.com/drop", type: "launch" },
        { day: 28, title: "Polish & Optimize", task: "Check Lighthouse scores. Fix performance, accessibility, and SEO issues.", resource: "Chrome Lighthouse (built into DevTools)", resourceUrl: "#", type: "review" },
        { day: 29, title: "Add to LinkedIn/CV", task: "Update your LinkedIn and resume with your new skills and live project link.", resource: "LinkedIn Profile Tips", resourceUrl: "https://www.linkedin.com", type: "career" },
        { day: 30, title: "Celebrate & Plan Next", task: "Review everything you've built. Decide what to learn next: React, Node.js, or a CSS framework?", resource: "The Odin Project (what's next)", resourceUrl: "https://www.theodinproject.com", type: "review" },
      ]
    }
  ]
};

const typeConfig = {
  read:    { label: "Read",    bg: "#EFF6FF", color: "#2563EB", icon: "📖" },
  code:    { label: "Code",    bg: "#F0FDF4", color: "#16A34A", icon: "💻" },
  project: { label: "Project", bg: "#FFF7ED", color: "#EA580C", icon: "🛠" },
  review:  { label: "Review",  bg: "#F5F3FF", color: "#7C3AED", icon: "🔍" },
  design:  { label: "Design",  bg: "#FDF4FF", color: "#A21CAF", icon: "🎨" },
  launch:  { label: "Launch",  bg: "#FEFCE8", color: "#A16207", icon: "🚀" },
  career:  { label: "Career",  bg: "#FFF1F2", color: "#BE123C", icon: "💼" },
};

export default function LearningRoadmap() {
  const [completed, setCompleted] = useState({});
  const [activeWeek, setActiveWeek] = useState(0);
  const [expandedDay, setExpandedDay] = useState(null);

  const totalDays = roadmapData.weeks.reduce((a, w) => a + w.days.length, 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalDays) * 100);

  const toggleComplete = (dayId, e) => {
    e.stopPropagation();
    setCompleted(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const week = roadmapData.weeks[activeWeek];

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      background: "#0F0F13",
      color: "#F0EDE8",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: #1a1a22; }
        ::-webkit-scrollbar-thumb { background: #3a3a50; border-radius: 2px; }
        .week-tab { transition: all 0.2s ease; cursor: pointer; }
        .week-tab:hover { transform: translateY(-2px); }
        .day-card { transition: all 0.2s ease; cursor: pointer; }
        .day-card:hover { transform: translateX(4px); }
        .check-btn { transition: all 0.15s ease; border: none; cursor: pointer; }
        .check-btn:hover { transform: scale(1.1); }
        .resource-link { transition: color 0.15s; }
        .resource-link:hover { opacity: 0.75; }
        .progress-bar { transition: width 0.5s ease; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a28 0%, #0F0F13 100%)",
        borderBottom: "1px solid #2a2a3a",
        padding: "40px 24px 32px",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#888", fontFamily: "Syne, sans-serif" }}>30-Day Roadmap</span>
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
            Learn{" "}
            <span style={{ color: "#FF6B35" }}>{roadmapData.title}</span>
          </h1>
          <p style={{ color: "#9090A8", fontSize: 15, maxWidth: 520, lineHeight: 1.6, marginBottom: 28 }}>
            {roadmapData.subtitle}
          </p>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1, background: "#2a2a3a", borderRadius: 99, height: 6, overflow: "hidden" }}>
              <div className="progress-bar" style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #FF6B35, #A855F7)", borderRadius: 99 }} />
            </div>
            <span style={{ fontSize: 13, color: "#888", whiteSpace: "nowrap" }}>
              {completedCount}/{totalDays} days
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#FF6B35", minWidth: 36 }}>{progressPct}%</span>
          </div>
        </div>
      </div>

      {/* Outcome banner */}
      <div style={{ background: "#1a1a28", borderBottom: "1px solid #2a2a3a", padding: "16px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>🏁</span>
          <div>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#FF6B35", fontWeight: 600 }}>Final Outcome</span>
            <p style={{ fontSize: 14, color: "#C0BDB8", lineHeight: 1.6, marginTop: 3 }}>{roadmapData.outcome}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 24px" }}>

        {/* Week tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {roadmapData.weeks.map((w, i) => {
            const weekCompleted = w.days.filter(d => completed[`day-${d.day}`]).length;
            const isActive = i === activeWeek;
            return (
              <button key={i} className="week-tab" onClick={() => setActiveWeek(i)} style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: isActive ? `2px solid ${w.color}` : "2px solid #2a2a3a",
                background: isActive ? `${w.color}18` : "#1a1a28",
                color: isActive ? w.color : "#888",
                fontFamily: "DM Sans, sans-serif",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
              }}>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14 }}>Week {w.week}</div>
                <div style={{ fontSize: 11, marginTop: 2 }}>{weekCompleted}/{w.days.length} done</div>
              </button>
            );
          })}
        </div>

        {/* Week header */}
        <div style={{
          background: `linear-gradient(135deg, ${week.color}18, ${week.color}08)`,
          border: `1px solid ${week.color}30`,
          borderRadius: 14,
          padding: "20px 22px",
          marginBottom: 20,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: week.color, fontWeight: 600, marginBottom: 5 }}>
                Week {week.week} · {week.days.length} Days
              </div>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800 }}>{week.theme}</div>
            </div>
            <div style={{
              background: `${week.color}20`,
              border: `1px solid ${week.color}40`,
              borderRadius: 8,
              padding: "8px 12px",
              maxWidth: 280,
            }}>
              <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: week.color, marginBottom: 3 }}>Milestone</div>
              <div style={{ fontSize: 13, color: "#D0CCC8", lineHeight: 1.5 }}>{week.milestone}</div>
            </div>
          </div>
        </div>

        {/* Day cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {week.days.map((day) => {
            const dayId = `day-${day.day}`;
            const isDone = completed[dayId];
            const isExpanded = expandedDay === dayId;
            const tc = typeConfig[day.type] || typeConfig.code;

            return (
              <div key={dayId} className="day-card" onClick={() => setExpandedDay(isExpanded ? null : dayId)} style={{
                background: isDone ? "#1a2a1a" : "#1a1a28",
                border: isDone ? "1px solid #2a4a2a" : isExpanded ? `1px solid ${week.color}50` : "1px solid #2a2a3a",
                borderRadius: 12,
                overflow: "hidden",
                opacity: isDone ? 0.75 : 1,
              }}>
                {/* Card header row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                  {/* Day number */}
                  <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: isDone ? "#2a4a2a" : `${week.color}20`,
                    color: isDone ? "#4ade80" : week.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 13,
                    flexShrink: 0,
                  }}>
                    {isDone ? "✓" : `D${day.day}`}
                  </div>

                  {/* Title + type badge */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: isDone ? "#6a9a6a" : "#F0EDE8" }}>{day.title}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 99,
                        background: tc.bg, color: tc.color, letterSpacing: 0.5,
                      }}>{tc.icon} {tc.label}</span>
                    </div>
                  </div>

                  {/* Check button + chevron */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <button className="check-btn" onClick={(e) => toggleComplete(dayId, e)} style={{
                      width: 28, height: 28, borderRadius: 7,
                      background: isDone ? "#4ade80" : "transparent",
                      border: isDone ? "none" : "2px solid #3a3a50",
                      color: isDone ? "#0a2a0a" : "#555",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13,
                    }}>
                      {isDone ? "✓" : ""}
                    </button>
                    <span style={{ color: "#555", fontSize: 12, transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "none" }}>▾</span>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ padding: "0 16px 16px 62px", borderTop: `1px solid ${week.color}20` }}>
                    <p style={{ color: "#A0A0B8", fontSize: 13.5, lineHeight: 1.7, marginTop: 12, marginBottom: 12 }}>
                      {day.task}
                    </p>
                    {day.resourceUrl !== "#" ? (
                      <a href={day.resourceUrl} target="_blank" rel="noopener noreferrer" className="resource-link" style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontSize: 12, color: week.color, textDecoration: "none",
                        background: `${week.color}12`, padding: "5px 10px", borderRadius: 6,
                        border: `1px solid ${week.color}25`,
                      }}>
                        🔗 {day.resource}
                      </a>
                    ) : (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontSize: 12, color: "#888",
                        background: "#2a2a3a", padding: "5px 10px", borderRadius: 6,
                      }}>
                        🛠 {day.resource}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
          <button onClick={() => setActiveWeek(Math.max(0, activeWeek - 1))} disabled={activeWeek === 0} style={{
            padding: "10px 18px", borderRadius: 10, border: "1px solid #2a2a3a",
            background: "transparent", color: activeWeek === 0 ? "#444" : "#F0EDE8",
            fontSize: 13, cursor: activeWeek === 0 ? "not-allowed" : "pointer", fontFamily: "DM Sans, sans-serif",
          }}>← Previous Week</button>
          <button onClick={() => setActiveWeek(Math.min(roadmapData.weeks.length - 1, activeWeek + 1))} disabled={activeWeek === roadmapData.weeks.length - 1} style={{
            padding: "10px 18px", borderRadius: 10, border: "1px solid #2a2a3a",
            background: "transparent", color: activeWeek === roadmapData.weeks.length - 1 ? "#444" : "#F0EDE8",
            fontSize: 13, cursor: activeWeek === roadmapData.weeks.length - 1 ? "not-allowed" : "pointer", fontFamily: "DM Sans, sans-serif",
          }}>Next Week →</button>
        </div>

        <p style={{ textAlign: "center", color: "#444", fontSize: 12, marginTop: 32 }}>
          Click any day to expand · Check the box to mark complete
        </p>
      </div>
    </div>
  );
}
## Screenshot
<img width="1600" height="900" alt="333" src="https://github.com/user-attachments/assets/5e283226-fb44-45e7-a1cd-00ff0959db49" />

<img width="760" height="685" alt="444" src="https://github.com/user-attachments/assets/f03a5318-528a-4b89-858a-4a6838663c9b" />


---

## Prompt B (With Context)

**(Create a 30-day learning roadmap.
Context:
- Current Situation: Computer Science Student
- Current Skills: Java, JavaFX, HTML, CSS, JavaScript, Basic SQL
- Goal: Become a Full Stack Developer and Get an Internship
- Available Time: 3 Hours per Day
- Experience Level: Beginner
- Preferred Learning Style: Videos and Projects
Include:
- Weekly milestones
- Daily tasks
- Resources
- Projects
- Final outcome
Make it practical and beginner-friendly.
Compare both outputs and identify:
1. Which roadmap feels more personalized?
2. Which roadmap would you actually follow?
3. What role did context play in improving the result?)**
 code:
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>30-Day Full Stack Roadmap</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0a0a0f;
    --surface: #13131a;
    --surface2: #1c1c27;
    --accent: #00e5ff;
    --accent2: #7c3aed;
    --accent3: #f59e0b;
    --text: #e8e8f0;
    --muted: #6b6b8a;
    --green: #10b981;
    --red: #ef4444;
    --border: rgba(255,255,255,0.06);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Animated background */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 20% 10%, rgba(0,229,255,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.06) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  /* HEADER */
  header {
    padding: 60px 0 40px;
    text-align: center;
    position: relative;
  }

  .badge {
    display: inline-block;
    background: rgba(0,229,255,0.1);
    border: 1px solid rgba(0,229,255,0.3);
    color: var(--accent);
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    padding: 6px 16px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  h1 {
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -1px;
    margin-bottom: 16px;
  }

  h1 span.highlight {
    color: var(--accent);
  }

  h1 span.dim {
    color: var(--muted);
  }

  .subtitle {
    color: var(--muted);
    font-size: 1rem;
    max-width: 500px;
    margin: 0 auto 40px;
    line-height: 1.6;
    font-weight: 400;
  }

  /* STATS BAR */
  .stats-bar {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 60px;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    max-width: 700px;
    margin: 0 auto 60px;
  }

  .stat {
    flex: 1;
    padding: 16px 20px;
    border-right: 1px solid var(--border);
    text-align: center;
    background: var(--surface);
    transition: background 0.2s;
  }
  .stat:last-child { border-right: none; }
  .stat:hover { background: var(--surface2); }

  .stat-value {
    font-family: 'Space Mono', monospace;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent);
    display: block;
  }
  .stat-label {
    font-size: 0.7rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
  }

  /* COMPARISON SECTION */
  .section-title {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .section-sub {
    color: var(--muted);
    margin-bottom: 28px;
    font-size: 0.9rem;
    font-weight: 400;
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 60px;
  }

  .compare-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 24px;
  }

  .compare-card.bad { border-top: 3px solid var(--red); }
  .compare-card.good { border-top: 3px solid var(--green); }

  .compare-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .compare-label.bad { color: var(--red); }
  .compare-label.good { color: var(--green); }

  .compare-card h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--text);
  }

  .compare-card p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.7;
    font-weight: 400;
  }

  .compare-card ul {
    list-style: none;
    margin-top: 12px;
  }

  .compare-card ul li {
    font-size: 0.82rem;
    color: var(--muted);
    padding: 4px 0;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.5;
    font-weight: 400;
  }

  .compare-card.bad ul li::before { content: '✗'; color: var(--red); flex-shrink: 0; }
  .compare-card.good ul li::before { content: '✓'; color: var(--green); flex-shrink: 0; }

  /* WEEKS NAV */
  .weeks-nav {
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  .week-btn {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--muted);
    padding: 8px 20px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 1px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
    text-transform: uppercase;
  }

  .week-btn:hover, .week-btn.active {
    background: var(--accent);
    color: #000;
    border-color: var(--accent);
    font-weight: 700;
  }

  /* WEEK BLOCKS */
  .week-block {
    display: none;
    animation: fadeIn 0.3s ease;
  }
  .week-block.active { display: block; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .week-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 24px;
    padding: 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 4px solid var(--accent);
    border-radius: 4px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .week-num {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--accent);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .week-title {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }

  .week-goal {
    font-size: 0.85rem;
    color: var(--muted);
    font-weight: 400;
    max-width: 500px;
    line-height: 1.6;
  }

  .week-milestone {
    text-align: right;
  }

  .milestone-tag {
    display: inline-block;
    background: rgba(245,158,11,0.1);
    border: 1px solid rgba(245,158,11,0.3);
    color: var(--accent3);
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 1px;
    padding: 4px 10px;
    border-radius: 2px;
    margin-bottom: 6px;
  }

  .milestone-text {
    font-size: 0.8rem;
    color: var(--muted);
    font-weight: 400;
  }

  /* DAYS GRID */
  .days-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 12px;
    margin-bottom: 32px;
  }

  .day-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 18px;
    transition: border-color 0.2s, background 0.2s;
    cursor: default;
  }

  .day-card:hover {
    border-color: rgba(0,229,255,0.2);
    background: var(--surface2);
  }

  .day-num {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 1px;
    margin-bottom: 6px;
  }

  .day-title {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: var(--text);
    line-height: 1.3;
  }

  .day-tasks {
    list-style: none;
    margin-bottom: 12px;
  }

  .day-tasks li {
    font-size: 0.78rem;
    color: var(--muted);
    padding: 3px 0;
    display: flex;
    gap: 8px;
    align-items: flex-start;
    line-height: 1.5;
    font-weight: 400;
  }

  .day-tasks li::before {
    content: '▸';
    color: var(--accent);
    flex-shrink: 0;
    font-size: 0.7rem;
    margin-top: 1px;
  }

  .day-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
    gap: 6px;
  }

  .resource-tag {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    padding: 3px 8px;
    border-radius: 2px;
    letter-spacing: 0.5px;
  }

  .resource-tag.video {
    background: rgba(239,68,68,0.1);
    color: #f87171;
    border: 1px solid rgba(239,68,68,0.2);
  }

  .resource-tag.project {
    background: rgba(16,185,129,0.1);
    color: #34d399;
    border: 1px solid rgba(16,185,129,0.2);
  }

  .resource-tag.practice {
    background: rgba(124,58,237,0.1);
    color: #a78bfa;
    border: 1px solid rgba(124,58,237,0.2);
  }

  .time-pill {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: var(--muted);
  }

  /* PROJECT CARD */
  .project-section {
    margin-top: 24px;
    padding: 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-top: 3px solid var(--accent2);
    border-radius: 4px;
  }

  .project-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--accent2);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .project-name {
    font-size: 1.1rem;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .project-desc {
    font-size: 0.83rem;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 16px;
    font-weight: 400;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tech-tag {
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    padding: 4px 10px;
    border-radius: 2px;
    letter-spacing: 0.5px;
  }

  /* RESOURCES SECTION */
  .resources-section {
    margin-bottom: 60px;
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 12px;
  }

  .resource-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 18px;
  }

  .resource-card-label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }

  .resource-card h4 {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .resource-card p {
    font-size: 0.78rem;
    color: var(--muted);
    line-height: 1.6;
    font-weight: 400;
  }

  /* OUTCOME SECTION */
  .outcome-section {
    margin-bottom: 60px;
    padding: 40px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .outcome-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
  }

  .outcome-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 24px;
  }

  .outcome-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .outcome-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .outcome-text strong {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .outcome-text p {
    font-size: 0.78rem;
    color: var(--muted);
    line-height: 1.5;
    font-weight: 400;
  }

  /* COMPARISON ANALYSIS */
  .analysis-section {
    margin-bottom: 60px;
  }

  .analysis-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 24px;
    margin-bottom: 12px;
  }

  .analysis-q {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--accent3);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .analysis-card h3 {
    font-size: 1rem;
    font-weight: 800;
    margin-bottom: 10px;
  }

  .analysis-card p {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.8;
    font-weight: 400;
  }

  .analysis-card p strong {
    color: var(--text);
  }

  /* DIVIDER */
  .divider {
    height: 1px;
    background: var(--border);
    margin: 60px 0;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 3px; }

  @media (max-width: 640px) {
    .comparison-grid { grid-template-columns: 1fr; }
    .week-header { flex-direction: column; }
    .week-milestone { text-align: left; }
    .days-grid { grid-template-columns: 1fr; }
    .stats-bar { flex-wrap: wrap; }
  }
</style>
</head>
<body>
<div class="container">

  <!-- HEADER -->
  <header>
    <div class="badge">PERSONALIZED LEARNING ROADMAP</div>
    <h1>30 Days to<br><span class="highlight">Full Stack Dev</span><br><span class="dim">+ Internship Ready</span></h1>
    <p class="subtitle">Built for a CS student who already knows Java & JavaScript. 3 hours/day. Video-first. Project-driven.</p>
  </header>

  <!-- STATS BAR -->
  <div class="stats-bar">
    <div class="stat"><span class="stat-value">30</span><span class="stat-label">Days</span></div>
    <div class="stat"><span class="stat-value">3hrs</span><span class="stat-label">Daily</span></div>
    <div class="stat"><span class="stat-value">4</span><span class="stat-label">Projects</span></div>
    <div class="stat"><span class="stat-value">90hrs</span><span class="stat-label">Total</span></div>
    <div class="stat"><span class="stat-value">∞</span><span class="stat-label">Potential</span></div>
  </div>

  <!-- COMPARISON SECTION -->
  <section>
    <p class="section-title">Generic vs. Personalized Roadmap</p>
    <p class="section-sub">Same goal. Very different results. Here's why context matters.</p>

    <div class="comparison-grid">
      <div class="compare-card bad">
        <div class="compare-label bad">✗ Generic Prompt</div>
        <h3>"Give me a 30-day Full Stack roadmap"</h3>
        <p>A generic prompt returns a generic roadmap — one that ignores who you are, what you already know, and how you actually learn.</p>
        <ul>
          <li>Starts from absolute zero (HTML basics you already know)</li>
          <li>No consideration of your Java/JavaFX background</li>
          <li>Recommends random resources with no rationale</li>
          <li>No reference to internship preparation</li>
          <li>Same pace for everyone — ignores your 3hrs/day limit</li>
          <li>Suggests projects that don't build toward a portfolio</li>
        </ul>
      </div>
      <div class="compare-card good">
        <div class="compare-label good">✓ Context-Rich Prompt</div>
        <h3>Your prompt — with full context</h3>
        <p>Adding your skills, goals, schedule, and learning style transforms the output into something you can actually follow.</p>
        <ul>
          <li>Skips what you already know (HTML/CSS/JS) — moves faster</li>
          <li>Bridges Java knowledge to Node.js/backend concepts</li>
          <li>Video + project combo (Traversy, Fireship, hands-on builds)</li>
          <li>Week 4 dedicated to resume, GitHub, and interview prep</li>
          <li>Calibrated to exactly 3hrs/day with daily task breakdowns</li>
          <li>4 portfolio projects that directly target internship hiring</li>
        </ul>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ROADMAP -->
  <section>
    <p class="section-title">Your 30-Day Roadmap</p>
    <p class="section-sub">Click a week to explore daily tasks, resources, and projects.</p>

    <div class="weeks-nav">
      <button class="week-btn active" onclick="showWeek(1, this)">Week 1</button>
      <button class="week-btn" onclick="showWeek(2, this)">Week 2</button>
      <button class="week-btn" onclick="showWeek(3, this)">Week 3</button>
      <button class="week-btn" onclick="showWeek(4, this)">Week 4</button>
    </div>

    <!-- WEEK 1 -->
    <div class="week-block active" id="week-1">
      <div class="week-header">
        <div>
          <div class="week-num">WEEK 01 — DAYS 1–7</div>
          <div class="week-title">React + Modern JavaScript</div>
          <div class="week-goal">You already know JS basics. Now level up to ES6+, then dive into React — the #1 frontend framework in job listings. You'll build your first dynamic UI by Day 7.</div>
        </div>
        <div class="week-milestone">
          <div class="milestone-tag">🏁 MILESTONE</div>
          <div class="milestone-text">React Todo App deployed on Netlify</div>
        </div>
      </div>

      <div class="days-grid">
        <div class="day-card">
          <div class="day-num">DAY 01</div>
          <div class="day-title">ES6+ JavaScript You Need to Know</div>
          <ul class="day-tasks">
            <li>Arrow functions, destructuring, spread/rest operators</li>
            <li>Promises, async/await (you'll use these daily)</li>
            <li>Modules: import/export syntax</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Fireship: JS in 100 seconds + ES6 deep dive</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 02</div>
          <div class="day-title">React Core Concepts — Part 1</div>
          <ul class="day-tasks">
            <li>What is JSX? Components & props explained</li>
            <li>Setup: Vite + React (faster than Create React App)</li>
            <li>Build: Static profile card component</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Traversy Media: React Crash Course</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 03</div>
          <div class="day-title">State & Events in React</div>
          <ul class="day-tasks">
            <li>useState hook — the most important hook</li>
            <li>Event handling: onClick, onChange</li>
            <li>Build: Interactive counter + toggle component</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ Practice: useState exercises</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 04</div>
          <div class="day-title">Lists, Forms & useEffect</div>
          <ul class="day-tasks">
            <li>Rendering lists with .map() + keys</li>
            <li>Controlled form inputs</li>
            <li>useEffect for side effects & API calls</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Codevolution: React Hooks playlist</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 05</div>
          <div class="day-title">Fetching APIs & React Router</div>
          <ul class="day-tasks">
            <li>fetch() + async/await with a public API</li>
            <li>React Router v6: pages and navigation</li>
            <li>Build: Multi-page weather or joke app</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag project">🔨 Mini Project: API fetch app</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 06</div>
          <div class="day-title">Styling in React — Tailwind CSS</div>
          <ul class="day-tasks">
            <li>Install & configure Tailwind in Vite project</li>
            <li>Utility classes: layout, spacing, typography</li>
            <li>Restyle your Day 5 project with Tailwind</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Traversy: Tailwind CSS Crash Course</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 07</div>
          <div class="day-title">PROJECT: React Todo App</div>
          <ul class="day-tasks">
            <li>Build a full CRUD todo app with React + Tailwind</li>
            <li>Add/edit/delete/complete todos with localStorage</li>
            <li>Deploy on Netlify (free) — share the link!</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag project">🔨 Week 1 Project: Deploy to Netlify</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>
      </div>

      <div class="project-section">
        <div class="project-label">⬡ WEEK 1 DELIVERABLE</div>
        <div class="project-name">React Todo App — Live on the Web</div>
        <p class="project-desc">A fully functional todo application with add, edit, delete, and completion toggling. Styled with Tailwind CSS and deployed to Netlify. This becomes your first portfolio link. The goal isn't perfection — it's shipping something real.</p>
        <div class="tech-stack">
          <span class="tech-tag">React</span>
          <span class="tech-tag">Tailwind CSS</span>
          <span class="tech-tag">Vite</span>
          <span class="tech-tag">localStorage</span>
          <span class="tech-tag">Netlify</span>
        </div>
      </div>
    </div>

    <!-- WEEK 2 -->
    <div class="week-block" id="week-2">
      <div class="week-header">
        <div>
          <div class="week-num">WEEK 02 — DAYS 8–14</div>
          <div class="week-title">Node.js, Express & REST APIs</div>
          <div class="week-goal">Your Java background is a huge advantage here. Backend logic, classes, and OOP will feel familiar. You're just switching from Spring to Express. By Day 14, you'll have a real REST API running.</div>
        </div>
        <div class="week-milestone">
          <div class="milestone-tag">🏁 MILESTONE</div>
          <div class="milestone-text">REST API with CRUD endpoints running on Express</div>
        </div>
      </div>

      <div class="days-grid">
        <div class="day-card">
          <div class="day-num">DAY 08</div>
          <div class="day-title">Node.js Fundamentals</div>
          <ul class="day-tasks">
            <li>How Node works: event loop, non-blocking I/O</li>
            <li>npm & package.json — think Maven for Java</li>
            <li>Built-in modules: fs, path, http</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Traversy: Node.js Crash Course</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 09</div>
          <div class="day-title">Express.js — Your Backend Framework</div>
          <ul class="day-tasks">
            <li>Setting up Express server (like Spring Boot, simpler)</li>
            <li>Routes: GET, POST, PUT, DELETE</li>
            <li>Middleware concept + express.json()</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Traversy: Express Crash Course</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 10</div>
          <div class="day-title">REST API Design Principles</div>
          <ul class="day-tasks">
            <li>What makes a good REST API? (status codes, JSON)</li>
            <li>Test APIs with Postman or Thunder Client</li>
            <li>Build: In-memory users CRUD API</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ Tool: Postman or Thunder Client (VS Code)</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 11</div>
          <div class="day-title">MongoDB + Mongoose</div>
          <ul class="day-tasks">
            <li>Why NoSQL? MongoDB Atlas setup (free tier)</li>
            <li>Mongoose schemas & models — like Java classes</li>
            <li>Connect Express to MongoDB</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Fireship: MongoDB in 100 seconds + setup</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 12</div>
          <div class="day-title">CRUD with MongoDB</div>
          <ul class="day-tasks">
            <li>Create, Read, Update, Delete with Mongoose</li>
            <li>Async/await patterns with database calls</li>
            <li>Error handling middleware</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ Practice: Build notes CRUD API</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 13</div>
          <div class="day-title">Authentication: JWT Basics</div>
          <ul class="day-tasks">
            <li>What is JWT? How auth tokens work</li>
            <li>bcrypt for password hashing</li>
            <li>Register & login endpoints</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Traversy: JWT Authentication tutorial</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 14</div>
          <div class="day-title">PROJECT: Notes REST API</div>
          <ul class="day-tasks">
            <li>Full CRUD notes API with user authentication</li>
            <li>Protected routes with JWT middleware</li>
            <li>Deploy to Render.com (free Node.js hosting)</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag project">🔨 Week 2 Project: Deploy to Render</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>
      </div>

      <div class="project-section">
        <div class="project-label">⬡ WEEK 2 DELIVERABLE</div>
        <div class="project-name">Notes REST API — Auth + CRUD + Live</div>
        <p class="project-desc">A production-ready REST API for a notes app. Users can register, login (JWT-based), and perform full CRUD on their notes. Deployed on Render.com. This is what backend interviews test — you'll have a live URL to demo it.</p>
        <div class="tech-stack">
          <span class="tech-tag">Node.js</span>
          <span class="tech-tag">Express</span>
          <span class="tech-tag">MongoDB</span>
          <span class="tech-tag">Mongoose</span>
          <span class="tech-tag">JWT Auth</span>
          <span class="tech-tag">Render.com</span>
        </div>
      </div>
    </div>

    <!-- WEEK 3 -->
    <div class="week-block" id="week-3">
      <div class="week-header">
        <div>
          <div class="week-num">WEEK 03 — DAYS 15–23</div>
          <div class="week-title">Full Stack Integration — MERN App</div>
          <div class="week-goal">Connect everything. React talks to Express talks to MongoDB. This is where full stack becomes real — and where your portfolio piece comes together. By Day 23, you'll have a complete MERN application.</div>
        </div>
        <div class="week-milestone">
          <div class="milestone-tag">🏁 MILESTONE</div>
          <div class="milestone-text">Full MERN app with auth, deployed end-to-end</div>
        </div>
      </div>

      <div class="days-grid">
        <div class="day-card">
          <div class="day-num">DAY 15</div>
          <div class="day-title">Connecting React to Express</div>
          <ul class="day-tasks">
            <li>Axios for HTTP requests in React</li>
            <li>CORS setup on Express backend</li>
            <li>Environment variables (.env) for API URLs</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Traversy: MERN Stack intro video</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 16</div>
          <div class="day-title">Context API & Global State</div>
          <ul class="day-tasks">
            <li>React Context — share auth state across components</li>
            <li>useContext hook with custom provider</li>
            <li>Store JWT token in context after login</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ Practice: Auth context setup</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 17</div>
          <div class="day-title">Login & Register UI</div>
          <ul class="day-tasks">
            <li>Build Login and Register pages in React</li>
            <li>Form validation with basic error messages</li>
            <li>Connect to your Week 2 auth endpoints</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag project">🔨 Build: Auth UI connected to real backend</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 18</div>
          <div class="day-title">Protected Routes & Dashboard</div>
          <ul class="day-tasks">
            <li>Private routes in React Router (redirect if not auth'd)</li>
            <li>Dashboard page showing logged-in user data</li>
            <li>Logout functionality</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ Practice: Route guard implementation</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 19</div>
          <div class="day-title">CRUD Features in the Frontend</div>
          <ul class="day-tasks">
            <li>Fetch and display notes from API</li>
            <li>Create note form → POST to backend</li>
            <li>Delete and update notes in the UI</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag project">🔨 Build: Notes CRUD in React</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 20</div>
          <div class="day-title">Polish & Error Handling</div>
          <ul class="day-tasks">
            <li>Loading spinners and empty states</li>
            <li>Error messages from API shown in UI</li>
            <li>Toast notifications (react-hot-toast)</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ UX polish sprint</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 21</div>
          <div class="day-title">SQL Refresher + PostgreSQL</div>
          <ul class="day-tasks">
            <li>Leverage your SQL skills — PostgreSQL vs MySQL</li>
            <li>Why SQL matters for internships (most companies use it)</li>
            <li>Practice: joins, aggregates, subqueries</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ Fireship: SQL vs NoSQL explained</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 22</div>
          <div class="day-title">Git & GitHub Best Practices</div>
          <ul class="day-tasks">
            <li>Branching strategy: feature branches, PRs</li>
            <li>Write proper commit messages (conventional commits)</li>
            <li>README files that impress interviewers</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ Rewrite READMEs for all 3 projects</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 23</div>
          <div class="day-title">PROJECT: Deploy MERN App End-to-End</div>
          <ul class="day-tasks">
            <li>Frontend → Netlify, Backend → Render</li>
            <li>Connect production env variables</li>
            <li>Final bug fixes and code cleanup</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag project">🔨 Week 3 Project: Full MERN app live</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>
      </div>

      <div class="project-section">
        <div class="project-label">⬡ WEEK 3 DELIVERABLE</div>
        <div class="project-name">NoteVault — Full MERN Stack App</div>
        <p class="project-desc">A complete full stack notes application with user authentication, protected routes, and full CRUD operations. React frontend on Netlify communicates with Express + MongoDB backend on Render. This is your flagship portfolio project — it demonstrates end-to-end full stack capability.</p>
        <div class="tech-stack">
          <span class="tech-tag">React + Tailwind</span>
          <span class="tech-tag">Node.js + Express</span>
          <span class="tech-tag">MongoDB Atlas</span>
          <span class="tech-tag">JWT Auth</span>
          <span class="tech-tag">Netlify + Render</span>
          <span class="tech-tag">Axios</span>
        </div>
      </div>
    </div>

    <!-- WEEK 4 -->
    <div class="week-block" id="week-4">
      <div class="week-header">
        <div>
          <div class="week-num">WEEK 04 — DAYS 24–30</div>
          <div class="week-title">Internship Prep — Portfolio, Resume & DSA</div>
          <div class="week-goal">The final push. You now have real projects. Week 4 is about presenting yourself like a professional: a polished GitHub, a strong resume, a portfolio site, and enough DSA practice to pass screening rounds.</div>
        </div>
        <div class="week-milestone">
          <div class="milestone-tag">🏁 MILESTONE</div>
          <div class="milestone-text">Portfolio live + 5 internship applications submitted</div>
        </div>
      </div>

      <div class="days-grid">
        <div class="day-card">
          <div class="day-num">DAY 24</div>
          <div class="day-title">GitHub Profile Overhaul</div>
          <ul class="day-tasks">
            <li>Profile README with bio, skills, links</li>
            <li>Pin your 3 best repositories</li>
            <li>Ensure all repos have strong READMEs + screenshots</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ Goal: Recruiter-ready GitHub in 3hrs</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 25</div>
          <div class="day-title">Build Your Portfolio Website</div>
          <ul class="day-tasks">
            <li>Build a personal portfolio in React + Tailwind</li>
            <li>Sections: About, Skills, Projects (3 cards), Contact</li>
            <li>Deploy on Netlify with custom subdomain</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag project">🔨 Project: yourname.netlify.app live</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 26</div>
          <div class="day-title">Resume for Internships</div>
          <ul class="day-tasks">
            <li>One-page resume: use Jake's Resume template (LaTeX)</li>
            <li>Write project bullets using STAR format (action + impact)</li>
            <li>Skills section: Java, React, Node, Express, MongoDB, SQL</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ Resource: Jake's Resume on Overleaf</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 27</div>
          <div class="day-title">DSA: Arrays & Strings (LeetCode)</div>
          <ul class="day-tasks">
            <li>5–7 Easy LeetCode problems: Two Sum, Valid Palindrome</li>
            <li>Solve in JavaScript (shows language flexibility)</li>
            <li>Learn: Big O notation basics for interviews</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag practice">⚡ LeetCode: Arrays & Hashing section</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 28</div>
          <div class="day-title">DSA: Objects, Maps & Basic Sorting</div>
          <ul class="day-tasks">
            <li>HashMaps, frequency counters, sliding window intro</li>
            <li>5 more Easy/Medium problems focused on these patterns</li>
            <li>Practice explaining your logic out loud</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ NeetCode: Roadmap + YouTube explanations</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 29</div>
          <div class="day-title">Mock Interview & Behavioral Prep</div>
          <ul class="day-tasks">
            <li>"Tell me about yourself" — write and rehearse 60-second answer</li>
            <li>STAR stories for 3 projects you built this month</li>
            <li>Top 5 behavioral questions for internships</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag video">▶ CS Dojo: How to prepare for tech interviews</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>

        <div class="day-card">
          <div class="day-num">DAY 30</div>
          <div class="day-title">🚀 Launch: Apply to 5 Internships</div>
          <ul class="day-tasks">
            <li>LinkedIn profile updated with projects + skills</li>
            <li>Apply: Internshala, LinkedIn, company career pages</li>
            <li>Send cold emails to 3 developers/alumni in your field</li>
          </ul>
          <div class="day-footer">
            <span class="resource-tag project">🎯 Goal: 5 applications submitted today</span>
            <span class="time-pill">~3hrs</span>
          </div>
        </div>
      </div>

      <div class="project-section">
        <div class="project-label">⬡ WEEK 4 DELIVERABLE</div>
        <div class="project-name">Portfolio Site + Internship Application Kit</div>
        <p class="project-desc">Your personal portfolio website live on the web, showcasing 3 real projects. A polished one-page resume with strong project descriptions. A recruiter-ready GitHub profile. And 5 internship applications submitted on Day 30. You're no longer a student preparing — you're a developer who ships.</p>
        <div class="tech-stack">
          <span class="tech-tag">Portfolio Site</span>
          <span class="tech-tag">GitHub Profile</span>
          <span class="tech-tag">Resume (PDF)</span>
          <span class="tech-tag">LinkedIn</span>
          <span class="tech-tag">LeetCode</span>
          <span class="tech-tag">5 Applications</span>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- RESOURCES -->
  <section class="resources-section">
    <p class="section-title">Curated Resources</p>
    <p class="section-sub">Video-first, project-focused. All free.</p>

    <div class="resources-grid">
      <div class="resource-card">
        <div class="resource-card-label">▶ YouTube Channel</div>
        <h4>Traversy Media</h4>
        <p>Best crash courses for React, Node, Express. Brad's teaching style is clear, practical, and beginner-friendly. Use his videos as your primary source for Weeks 1–3.</p>
      </div>
      <div class="resource-card">
        <div class="resource-card-label">▶ YouTube Channel</div>
        <h4>Fireship</h4>
        <p>Fast, visual concept explainers (100-second videos). Great for understanding the "why" behind technologies before diving in. Watch before starting each new topic.</p>
      </div>
      <div class="resource-card">
        <div class="resource-card-label">▶ YouTube Channel</div>
        <h4>Codevolution</h4>
        <p>Best for React Hooks deep dives. Very structured, step-by-step format. Ideal for Days 3–5 when hooks feel confusing.</p>
      </div>
      <div class="resource-card">
        <div class="resource-card-label">⚡ Practice Platform</div>
        <h4>LeetCode</h4>
        <p>Focus on Easy problems first. Filter by Arrays & Hashing, then Strings. Solve in JavaScript. Don't grind — 15–20 problems with understanding beats 100 without.</p>
      </div>
      <div class="resource-card">
        <div class="resource-card-label">▶ YouTube + Roadmap</div>
        <h4>NeetCode</h4>
        <p>The best structured DSA roadmap for interview prep. His YouTube explanations are exceptionally clear. Use his roadmap for Week 4 DSA practice.</p>
      </div>
      <div class="resource-card">
        <div class="resource-card-label">📖 Docs</div>
        <h4>React + MDN Web Docs</h4>
        <p>React's official docs (react.dev) are excellent and interactive. MDN is your reference for any JS question. Bookmark both from Day 1.</p>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- OUTCOME -->
  <section class="outcome-section">
    <p class="section-title">Final Outcome: Day 30</p>
    <p class="section-sub" style="margin-bottom:0;">What you'll have built, learned, and shipped.</p>
    <div class="outcome-grid">
      <div class="outcome-item">
        <div class="outcome-icon">⚛️</div>
        <div class="outcome-text">
          <strong>React Proficiency</strong>
          <p>Hooks, routing, state management, API integration — interview-ready React skills.</p>
        </div>
      </div>
      <div class="outcome-item">
        <div class="outcome-icon">🖥️</div>
        <div class="outcome-text">
          <strong>Node + Express Backend</strong>
          <p>REST API design, JWT auth, MongoDB. Your Java OOP background makes this fast to learn.</p>
        </div>
      </div>
      <div class="outcome-item">
        <div class="outcome-icon">🗄️</div>
        <div class="outcome-text">
          <strong>Database Skills</strong>
          <p>MongoDB for NoSQL + your existing SQL knowledge = versatile data layer experience.</p>
        </div>
      </div>
      <div class="outcome-item">
        <div class="outcome-icon">🚀</div>
        <div class="outcome-text">
          <strong>3 Live Projects</strong>
          <p>Todo App, Notes API, and Full MERN App — all deployed with live URLs to share.</p>
        </div>
      </div>
      <div class="outcome-item">
        <div class="outcome-icon">💼</div>
        <div class="outcome-text">
          <strong>Portfolio + Resume</strong>
          <p>Personal site, polished GitHub, one-page resume. Ready to send today.</p>
        </div>
      </div>
      <div class="outcome-item">
        <div class="outcome-icon">🧩</div>
        <div class="outcome-text">
          <strong>DSA Basics Done</strong>
          <p>~15 LeetCode problems solved, Big O understood, patterns recognized for interviews.</p>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ANALYSIS SECTION -->
  <section class="analysis-section">
    <p class="section-title">The Comparison Analysis</p>
    <p class="section-sub">Why context transformed this roadmap.</p>

    <div class="analysis-card">
      <div class="analysis-q">QUESTION 01</div>
      <h3>Which roadmap feels more personalized?</h3>
      <p>This one — by a significant margin. A generic prompt returns a roadmap that <strong>starts at Day 1 teaching HTML</strong> to someone who already knows it. It wastes your first 5 days. The context-rich prompt skipped all of that and opened with ES6+ and React — the actual gap in your skills. It also noted your <strong>Java background as an advantage</strong> for Node.js (the OOP parallels are real), something a generic output would never surface. Every day is calibrated to 3 hours. Every resource is video-first. The projects build toward a specific goal: internships, not just "learning full stack."</p>
    </div>

    <div class="analysis-card">
      <div class="analysis-q">QUESTION 02</div>
      <h3>Which roadmap would you actually follow?</h3>
      <p>The personalized one. The key factor is <strong>specificity on Day 1</strong> — when you open a generic roadmap and see "learn HTML basics," you'll close it. When you open this one and see "ES6+ async/await — watch Fireship, then Traversy," you know exactly what to do in the next 30 minutes. The <strong>daily tasks are atomic enough to start without decision fatigue.</strong> Each day has a clear deliverable. Each week ends with something deployed. That feedback loop — building and shipping — is what keeps beginners going past Day 7.</p>
    </div>

    <div class="analysis-card">
      <div class="analysis-q">QUESTION 03</div>
      <h3>What role did context play in improving the result?</h3>
      <p>Context is what separates a plan from your plan. Each piece of context you provided unlocked a specific optimization: <strong>"Java background"</strong> → Node.js is framed as familiar, not foreign. <strong>"HTML/CSS/JS known"</strong> → Week 1 skips basics and goes straight to React. <strong>"Basic SQL"</strong> → Day 21 is a refresh, not a full intro. <strong>"3 hours/day"</strong> → every day is calibrated; nothing is overcrowded. <strong>"Internship goal"</strong> → Week 4 exists at all. <strong>"Video learner"</strong> → every resource is a YouTube channel or specific video, not a textbook. The quality improvement wasn't luck — it was a direct, traceable consequence of each context item you provided.</p>
    </div>
  </section>

</div>

<script>
  function showWeek(num, btn) {
    document.querySelectorAll('.week-block').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.week-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('week-' + num).classList.add('active');
    btn.classList.add('active');
  }
</script>
</body>
</html> 

## Screenshot

<img width="1600" height="900" alt="1" src="https://github.com/user-attachments/assets/b35be818-8163-4a28-ae6d-30921f0f7b73" />

<img width="1600" height="900" alt="2" src="https://github.com/user-attachments/assets/fe4514dd-32bd-4fca-90c9-d032d55e9c57" />


---

## Comparison

### 1. Which roadmap feels more personalized?

Prompt B is more personalized because it considers my skills, goals, available time, and learning preferences.

### 2. Which roadmap would you actually follow?

I would follow Prompt B because it matches my current situation and career objectives.

### 3. What role did context play in improving the result?

Context helped the AI understand my background, goals, and constraints. As a result, the roadmap became more relevant, practical, and actionable.

---

## Key Learnings

* Context improves AI-generated responses.
* Detailed background information reduces assumptions.
* Personalized roadmaps are more useful than generic plans.
* Context Engineering is essential for building effective AI systems and agents.
