import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA MODEL
// ─────────────────────────────────────────────────────────────────────────────
// Note {
//   id: string (uuid)
//   title: string
//   body: string   (Markdown)
//   tags: string[]
//   notebook: string
//   pinned: boolean
//   createdAt: ISO string
//   updatedAt: ISO string
// }

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

const fmt = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const SAMPLE_NOTES = [
  {
    id: uid(), title: "Project Kickoff Notes",
    body: `# Project Kickoff\n\n**Goal:** Build a note-taking app.\n\n## Tasks\n- [x] Define requirements\n- [ ] Set up repo\n- [ ] Build MVP\n\n> "Start where you are. Use what you have. Do what you can."`,
    tags: ["work", "planning"], notebook: "Work", pinned: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: uid(), title: "React Architecture Patterns",
    body: `# React Patterns\n\n## Custom Hooks\nExtract stateful logic into reusable hooks:\n\n\`\`\`ts\nfunction useLocalStorage<T>(key: string, init: T) {\n  const [val, setVal] = useState(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : init;\n  });\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(val));\n  }, [key, val]);\n  return [val, setVal] as const;\n}\n\`\`\`\n\n## Context + Reducer\nUse for global state — auth, theme, notes store.`,
    tags: ["dev", "react"], notebook: "Learning", pinned: false,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: uid(), title: "Book: The Pragmatic Programmer",
    body: `# The Pragmatic Programmer\n*Hunt & Thomas*\n\n## Key Takeaways\n\n1. **DRY** — Don't Repeat Yourself\n2. **Orthogonality** — decouple systems\n3. **Tracer Bullets** — build end-to-end thin slices first\n4. **Broken Windows** — fix bad code immediately\n\n---\n\n*"You Can't Write Perfect Software"* — and that's okay.`,
    tags: ["reading", "dev"], notebook: "Learning", pinned: false,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: uid(), title: "Weekly Grocery List",
    body: `# Groceries\n\n- [ ] Eggs\n- [ ] Oat milk\n- [ ] Avocados\n- [x] Bread\n- [ ] Greek yogurt\n- [ ] Lemons\n\n**Budget:** ~$60`,
    tags: ["personal"], notebook: "Personal", pinned: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

// Simple Markdown renderer (no external lib — pure JS transforms)
function renderMarkdown(md) {
  if (!md) return "";
  let html = md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // Code blocks
    .replace(/```[\w]*\n?([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold / italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Blockquote
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr>")
    // Checkboxes
    .replace(/- \[x\] (.+)/g, '<li class="checked">✅ $1</li>')
    .replace(/- \[ \] (.+)/g, '<li class="unchecked">⬜ $1</li>')
    // Regular list items
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Numbered list
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Paragraphs
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br>");

  return `<p>${html}</p>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES (injected inline)
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0F1117;
    --surface: #161B27;
    --surface2: #1E2535;
    --surface3: #252D3F;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #E8EAF0;
    --text2: #8892A4;
    --text3: #5A6478;
    --accent: #4F8EF7;
    --accent2: #7B61FF;
    --accent3: #22C55E;
    --danger: #F43F5E;
    --warn: #F59E0B;
    --tag-bg: rgba(79,142,247,0.12);
    --tag-text: #7AB3FF;
    --pin: #F59E0B;
    --radius: 10px;
    --radius-sm: 6px;
    --sidebar-w: 240px;
    --panel-w: 300px;
  }

  body { font-family: 'Outfit', sans-serif; background: var(--bg); color: var(--text); font-size: 14px; }

  /* ── LAYOUT ── */
  .app { display: flex; height: 100vh; overflow: hidden; }
  .sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; }
  .panel { width: var(--panel-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; }
  .editor-area { flex: 1; display: flex; flex-direction: column; min-width: 0; }

  /* ── SIDEBAR ── */
  .sidebar-logo { padding: 20px 18px 16px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border); }
  .logo-icon { width: 30px; height: 30px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; }
  .logo-text { font-family: 'Lora', serif; font-size: 17px; font-weight: 500; color: var(--text); }
  .logo-text span { color: var(--accent); }

  .sidebar-section { padding: 12px 10px 4px; }
  .sidebar-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text3); padding: 0 8px; margin-bottom: 4px; }
  .sidebar-item { display: flex; align-items: center; gap: 9px; padding: 7px 10px; border-radius: var(--radius-sm); cursor: pointer; font-size: 13px; color: var(--text2); transition: all 0.15s; border: none; background: none; width: 100%; text-align: left; }
  .sidebar-item:hover { background: var(--surface2); color: var(--text); }
  .sidebar-item.active { background: rgba(79,142,247,0.14); color: var(--accent); }
  .sidebar-item .count { margin-left: auto; font-size: 11px; background: var(--surface3); padding: 1px 7px; border-radius: 10px; color: var(--text3); }
  .sidebar-item .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  .sidebar-footer { margin-top: auto; padding: 12px 10px; border-top: 1px solid var(--border); }
  .new-note-btn { width: 100%; padding: 9px; background: var(--accent); color: #fff; border: none; border-radius: var(--radius-sm); font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; transition: opacity 0.2s; }
  .new-note-btn:hover { opacity: 0.85; }

  /* ── PANEL ── */
  .panel-header { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
  .panel-title { font-size: 13px; font-weight: 600; color: var(--text); }
  .search-box { display: flex; align-items: center; gap: 8px; background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 7px 10px; }
  .search-box input { background: none; border: none; outline: none; color: var(--text); font-family: 'Outfit', sans-serif; font-size: 13px; flex: 1; }
  .search-box input::placeholder { color: var(--text3); }
  .search-icon { color: var(--text3); font-size: 13px; }

  .tag-filter { display: flex; flex-wrap: wrap; gap: 5px; padding: 10px 16px; border-bottom: 1px solid var(--border); }
  .tag-chip { padding: 3px 10px; border-radius: 20px; font-size: 11px; cursor: pointer; border: 1px solid var(--border); color: var(--text3); background: none; transition: all 0.15s; }
  .tag-chip:hover { border-color: var(--accent); color: var(--accent); }
  .tag-chip.active { background: var(--tag-bg); border-color: var(--accent); color: var(--tag-text); }

  .note-list { flex: 1; overflow-y: auto; padding: 8px; }
  .note-list::-webkit-scrollbar { width: 4px; }
  .note-list::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 2px; }

  .note-card { padding: 12px 14px; border-radius: var(--radius-sm); cursor: pointer; border: 1px solid transparent; margin-bottom: 4px; transition: all 0.15s; position: relative; }
  .note-card:hover { background: var(--surface2); border-color: var(--border); }
  .note-card.active { background: rgba(79,142,247,0.1); border-color: rgba(79,142,247,0.3); }
  .note-card.pinned .note-pin { display: block; }
  .note-pin { display: none; position: absolute; top: 10px; right: 10px; font-size: 11px; color: var(--pin); }
  .note-card-title { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 20px; }
  .note-card-preview { font-size: 12px; color: var(--text3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px; }
  .note-card-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .note-card-date { font-size: 11px; color: var(--text3); }
  .note-card-tag { font-size: 10px; padding: 1px 7px; border-radius: 10px; background: var(--tag-bg); color: var(--tag-text); }

  /* ── EDITOR ── */
  .editor-toolbar { padding: 10px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
  .toolbar-btn { padding: 5px 9px; border: none; background: none; color: var(--text2); border-radius: 5px; cursor: pointer; font-size: 12px; font-family: 'JetBrains Mono', monospace; transition: all 0.15s; }
  .toolbar-btn:hover { background: var(--surface2); color: var(--text); }
  .toolbar-sep { width: 1px; height: 18px; background: var(--border2); margin: 0 2px; }
  .toolbar-spacer { flex: 1; }
  .toolbar-mode-btn { padding: 4px 12px; border: 1px solid var(--border2); border-radius: 5px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 500; transition: all 0.15s; }
  .toolbar-mode-btn.write { background: none; color: var(--text2); }
  .toolbar-mode-btn.preview { background: none; color: var(--text2); }
  .toolbar-mode-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .delete-btn { padding: 4px 10px; background: none; border: 1px solid transparent; color: var(--text3); border-radius: 5px; cursor: pointer; font-size: 12px; transition: all 0.15s; }
  .delete-btn:hover { background: rgba(244,63,94,0.1); border-color: var(--danger); color: var(--danger); }

  .editor-title-bar { padding: 20px 24px 0; }
  .editor-title { width: 100%; background: none; border: none; outline: none; font-family: 'Lora', serif; font-size: 26px; font-weight: 500; color: var(--text); resize: none; }
  .editor-title::placeholder { color: var(--text3); }

  .editor-meta-bar { padding: 10px 24px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; border-bottom: 1px solid var(--border); }
  .meta-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text3); }
  .meta-label { opacity: 0.7; }
  .notebook-select { background: none; border: none; outline: none; color: var(--text2); font-family: 'Outfit', sans-serif; font-size: 11px; cursor: pointer; }
  .tag-input-wrap { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
  .editor-tag { padding: 2px 8px; background: var(--tag-bg); color: var(--tag-text); border-radius: 10px; font-size: 11px; cursor: pointer; }
  .editor-tag:hover::after { content: ' ×'; }
  .add-tag-input { background: none; border: none; outline: none; color: var(--text2); font-size: 11px; width: 80px; font-family: 'Outfit', sans-serif; }
  .autosave-badge { margin-left: auto; font-size: 10px; display: flex; align-items: center; gap: 4px; }
  .autosave-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent3); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .editor-body { flex: 1; display: flex; overflow: hidden; }
  .editor-textarea { flex: 1; padding: 20px 24px; background: none; border: none; outline: none; font-family: 'JetBrains Mono', monospace; font-size: 13.5px; line-height: 1.8; color: var(--text); resize: none; overflow-y: auto; }
  .editor-textarea::-webkit-scrollbar { width: 4px; }
  .editor-textarea::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 2px; }

  /* ── PREVIEW ── */
  .preview-pane { flex: 1; padding: 20px 28px; overflow-y: auto; font-family: 'Lora', serif; line-height: 1.85; font-size: 15px; }
  .preview-pane::-webkit-scrollbar { width: 4px; }
  .preview-pane::-webkit-scrollbar-thumb { background: var(--surface3); }
  .preview-pane h1 { font-size: 22px; margin: 20px 0 10px; color: var(--text); font-weight: 500; }
  .preview-pane h2 { font-size: 18px; margin: 16px 0 8px; color: var(--text); }
  .preview-pane h3 { font-size: 15px; margin: 12px 0 6px; color: var(--text); }
  .preview-pane p { margin: 8px 0; color: var(--text2); }
  .preview-pane strong { color: var(--text); font-weight: 600; }
  .preview-pane em { color: #B8C0D0; }
  .preview-pane code { background: var(--surface3); color: #7AB3FF; padding: 2px 7px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
  .preview-pane pre { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin: 12px 0; overflow-x: auto; }
  .preview-pane pre code { background: none; padding: 0; }
  .preview-pane blockquote { border-left: 3px solid var(--accent); padding: 8px 16px; margin: 12px 0; background: rgba(79,142,247,0.05); border-radius: 0 6px 6px 0; }
  .preview-pane li { margin: 4px 0 4px 20px; color: var(--text2); }
  .preview-pane li.checked { color: var(--text3); }
  .preview-pane hr { border: none; border-top: 1px solid var(--border2); margin: 20px 0; }

  /* ── EMPTY STATE ── */
  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; color: var(--text3); }
  .empty-icon { font-size: 40px; opacity: 0.5; }
  .empty-text { font-size: 13px; }
  .empty-sub { font-size: 12px; opacity: 0.6; }

  /* ── PLAN OVERLAY TABS ── */
  .plan-overlay { display: flex; flex-direction: column; height: 100%; }
  .plan-tabs { display: flex; border-bottom: 1px solid var(--border); padding: 0 16px; gap: 2px; flex-shrink: 0; background: var(--surface); }
  .plan-tab { padding: 11px 14px; font-size: 12px; font-weight: 500; color: var(--text3); border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; }
  .plan-tab:hover { color: var(--text); }
  .plan-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .plan-content { flex: 1; overflow-y: auto; padding: 20px 24px; }
  .plan-content::-webkit-scrollbar { width: 4px; }
  .plan-content::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 2px; }

  .plan-h1 { font-family: 'Lora', serif; font-size: 22px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
  .plan-h2 { font-size: 13px; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; margin: 24px 0 10px; }
  .plan-p { font-size: 13px; line-height: 1.8; color: var(--text2); margin-bottom: 8px; }
  .plan-sub { font-size: 11px; color: var(--text3); margin-bottom: 20px; }

  .code-block { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; font-family: 'JetBrains Mono', monospace; font-size: 11.5px; line-height: 1.7; color: #A8C7FA; overflow-x: auto; margin: 8px 0 16px; white-space: pre; }
  .code-label { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--text3); margin-bottom: 4px; }

  .badge-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 500; }
  .badge-blue { background: rgba(79,142,247,0.15); color: #7AB3FF; }
  .badge-purple { background: rgba(123,97,255,0.15); color: #A89CFF; }
  .badge-green { background: rgba(34,197,94,0.15); color: #4ADE80; }
  .badge-amber { background: rgba(245,158,11,0.15); color: #FCD34D; }

  .phase-card { border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; margin-bottom: 10px; }
  .phase-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .phase-num { width: 24px; height: 24px; border-radius: 50%; background: var(--accent); color: #fff; font-size: 11px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .phase-title { font-size: 13px; font-weight: 600; color: var(--text); }
  .phase-sub { font-size: 11px; color: var(--text3); }
  .phase-items { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
  .phase-item { display: flex; align-items: flex-start; gap: 7px; font-size: 12px; color: var(--text2); }
  .phase-item::before { content: '→'; color: var(--accent); flex-shrink: 0; font-size: 11px; margin-top: 1px; }

  .arch-box { border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 14px; margin-bottom: 6px; background: var(--surface2); }
  .arch-box-title { font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 5px; }
  .arch-box-body { font-size: 11px; color: var(--text3); line-height: 1.7; }
  .arch-arrow { text-align: center; font-size: 18px; color: var(--text3); margin: 2px 0; }

  .kbd { display: inline-flex; align-items: center; padding: 2px 7px; background: var(--surface3); border: 1px solid var(--border2); border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--text2); }

  .toggle-plan { padding: 6px 14px; border: 1px solid var(--border2); border-radius: 5px; background: none; color: var(--text2); font-family: 'Outfit', sans-serif; font-size: 12px; cursor: pointer; transition: all 0.15s; }
  .toggle-plan:hover { border-color: var(--accent); color: var(--accent); }
  .toggle-plan.active { background: rgba(79,142,247,0.12); border-color: var(--accent); color: var(--accent); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────
function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : init;
    } catch { return init; }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);
  return [val, setVal];
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function useAutosave(note, onSave) {
  const debouncedNote = useDebounce(note, 800);
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) { isFirstRun.current = false; return; }
    if (debouncedNote) onSave(debouncedNote);
  }, [debouncedNote]);
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAN CONTENT TABS
// ─────────────────────────────────────────────────────────────────────────────
const PLAN_TABS = ["Overview", "Stack", "Architecture", "Roadmap", "Code Snippets", "Shortcuts"];

function PlanContent({ tab }) {
  const sections = {
    Overview: (
      <div>
        <div className="plan-h1">NoteWise — React Note-Taking App</div>
        <div className="plan-sub">A structured engineering plan + live working demo</div>
        <div className="badge-row">
          <span className="badge badge-blue">React 18 + TypeScript</span>
          <span className="badge badge-purple">Tailwind CSS</span>
          <span className="badge badge-green">localStorage persistence</span>
          <span className="badge badge-amber">Markdown support</span>
        </div>
        <div className="plan-h2">MVP Feature Set</div>
        {["✅ Create / Read / Update / Delete notes","✅ Markdown editor with live preview toggle","✅ Tag system (multi-tag per note, filter by tag)","✅ Notebooks (group notes by category)","✅ Full-text search across title + body","✅ Offline autosave (debounced, 800ms)","✅ Pin notes to top","✅ Keyboard shortcuts for power users"].map(f => (
          <div className="plan-p" key={f}>{f}</div>
        ))}
        <div className="plan-h2">Data Model</div>
        <div className="code-label">TypeScript Interface</div>
        <div className="code-block">{`interface Note {
  id:        string;        // uid()
  title:     string;
  body:      string;        // Markdown
  tags:      string[];
  notebook:  string;
  pinned:    boolean;
  createdAt: string;        // ISO 8601
  updatedAt: string;        // ISO 8601
}`}</div>
        <div className="plan-h2">Project Setup</div>
        <div className="code-label">Bootstrap</div>
        <div className="code-block">{`# Create project
npm create vite@latest notewise -- --template react-ts
cd notewise

# Install dependencies  
npm install
npm install -D tailwindcss postcss autoprefixer
npm install @uiw/react-md-editor   # rich markdown
npm install react-router-dom       # routing
npm install lucide-react           # icons

# Init Tailwind
npx tailwindcss init -p

# Run
npm run dev`}</div>
      </div>
    ),
    Stack: (
      <div>
        <div className="plan-h1">Technology Stack</div>
        <div className="plan-sub">Every choice is justified for this use case</div>
        {[
          { cat: "Core", items: [
            ["React 18 + TypeScript", "Type-safe components, concurrent features, strict mode"],
            ["Vite", "Sub-second HMR, optimal bundling, native ESM"],
            ["React Router v6", "Nested routes: /notebooks/:id, /notes/:id, /search"],
          ]},
          { cat: "State Management", items: [
            ["useState + useReducer", "Local UI state, no boilerplate overhead for MVP"],
            ["React Context", "Global notes store, theme, active filters"],
            ["localStorage", "Zero-backend offline persistence with useLocalStorage hook"],
          ]},
          { cat: "Styling", items: [
            ["Tailwind CSS", "Utility-first, no CSS file drift, dark mode via class strategy"],
            ["CSS Modules (editors)", "Scoped styles for complex editor components"],
            ["Framer Motion", "Smooth transitions for note open/close, sidebar animations"],
          ]},
          { cat: "Editor", items: [
            ["@uiw/react-md-editor", "Full Markdown with GFM, syntax highlighting, split view"],
            ["Custom toolbar", "Bold/italic/heading/checklist buttons via textarea manipulation"],
          ]},
          { cat: "Testing", items: [
            ["Vitest", "Fast unit tests, compatible with Vite"],
            ["React Testing Library", "Component integration tests"],
            ["Playwright", "E2E tests for CRUD flows"],
          ]},
        ].map(({ cat, items }) => (
          <div key={cat}>
            <div className="plan-h2">{cat}</div>
            {items.map(([name, desc]) => (
              <div className="arch-box" key={name}>
                <div className="arch-box-title">{name}</div>
                <div className="arch-box-body">{desc}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ),
    Architecture: (
      <div>
        <div className="plan-h1">Architecture & Component Tree</div>
        <div className="plan-sub">Unidirectional data flow, colocated state</div>
        <div className="plan-h2">Component Hierarchy</div>
        <div className="code-block">{`App
├── NotesProvider (Context)        ← global store
│   ├── Sidebar
│   │   ├── NotebookList
│   │   └── NewNoteButton
│   ├── NoteListPanel
│   │   ├── SearchBar
│   │   ├── TagFilter
│   │   └── NoteList
│   │       └── NoteCard[]
│   └── EditorArea
│       ├── EditorToolbar
│       ├── TitleInput
│       ├── MetaBar (tags, notebook, date)
│       └── NoteEditor (Write | Preview)
└── Router (react-router-dom)
    ├── /                → redirect /notes
    ├── /notes           → all notes
    ├── /notes/:id       → note detail
    ├── /notebooks/:nb   → filtered by notebook
    ├── /tags/:tag       → filtered by tag
    └── /search?q=       → search results`}</div>
        <div className="plan-h2">State Flow</div>
        {[
          ["NotesContext", "notes[], activeNoteId, notebooks[], allTags[]"],
          ["↓ dispatch", "CREATE_NOTE | UPDATE_NOTE | DELETE_NOTE | PIN_NOTE"],
          ["SearchContext", "query string, active tag, active notebook"],
          ["↓ derived", "filteredNotes = useMemo(notes, query, tag, notebook)"],
          ["UIContext", "sidebarOpen, editorMode (write|preview|split)"],
        ].map(([t, b], i) => i % 2 === 0
          ? <div key={t} className="arch-box"><div className="arch-box-title">{t}</div><div className="arch-box-body">{b}</div></div>
          : <div key={t} className="arch-arrow">{t}</div>
        )}
        <div className="plan-h2">Routing Plan</div>
        <div className="code-block">{`// router.tsx
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/notes" /> },
  {
    path: "/",
    element: <AppShell />,          // sidebar + panel
    children: [
      { path: "notes",        element: <NoteListPanel /> },
      { path: "notes/:id",    element: <NoteEditor /> },
      { path: "notebooks/:nb",element: <NoteListPanel /> },
      { path: "tags/:tag",    element: <NoteListPanel /> },
      { path: "search",       element: <SearchResults /> },
    ]
  }
]);`}</div>
      </div>
    ),
    Roadmap: (
      <div>
        <div className="plan-h1">Phased Roadmap</div>
        <div className="plan-sub">3 phases from MVP to production</div>
        {[
          {
            n: "1", title: "MVP — Core App", time: "Week 1–2",
            items: ["Project scaffold with Vite + React + TypeScript","NotesContext with CRUD reducer","localStorage persistence hook","NoteList + NoteCard components","TitleInput + textarea body editor","Basic tag input and tag filter","Search bar (client-side filter)","Autosave with useDebounce hook","Notebook sidebar filter","Responsive two-panel layout","Deploy to Vercel/Netlify"]
          },
          {
            n: "2", title: "Enhanced UX", time: "Week 3–4",
            items: ["@uiw/react-md-editor (full GFM + syntax hl)","Split-view (editor + preview side-by-side)","Framer Motion note transitions","Pin notes to top","Bulk delete / multi-select","Note word/char count in meta bar","Keyboard shortcuts (see Shortcuts tab)","Dark/light theme toggle","Drag-and-drop note reordering","Export note as .md or .txt file","Vitest unit tests for all hooks"]
          },
          {
            n: "3", title: "Advanced Features", time: "Week 5–8",
            items: ["Service Worker + IndexedDB for true offline-first","Conflict-free sync via CRDTs (Yjs)","Supabase backend for multi-user auth","Real-time collaboration (Yjs + Supabase Realtime)","File attachments (images, PDFs)","Note versioning / history","AI summarization via Claude API","Full-text search with Fuse.js or Orama","PWA installable app","E2E tests with Playwright","Performance: virtualized note list (TanStack Virtual)"]
          },
        ].map(p => (
          <div className="phase-card" key={p.n}>
            <div className="phase-card-head">
              <div className="phase-num">{p.n}</div>
              <div>
                <div className="phase-title">{p.title}</div>
                <div className="phase-sub">{p.time}</div>
              </div>
            </div>
            <div className="phase-items">
              {p.items.map(i => <div key={i} className="phase-item">{i}</div>)}
            </div>
          </div>
        ))}
      </div>
    ),
    "Code Snippets": (
      <div>
        <div className="plan-h1">Core Code Snippets</div>
        <div className="plan-sub">Production-ready TypeScript implementations</div>

        <div className="plan-h2">1. useLocalStorage Hook</div>
        <div className="code-block">{`// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, init: T) {
  const [val, setVal] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? (JSON.parse(s) as T) : init;
    } catch {
      return init;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);
  return [val, setVal] as const;
}`}</div>

        <div className="plan-h2">2. Notes Reducer (CRUD)</div>
        <div className="code-block">{`// store/notesReducer.ts
type Action =
  | { type: 'CREATE'; payload: Note }
  | { type: 'UPDATE'; payload: Partial<Note> & { id: string } }
  | { type: 'DELETE'; payload: string }
  | { type: 'PIN';    payload: string };

export function notesReducer(state: Note[], action: Action): Note[] {
  switch (action.type) {
    case 'CREATE':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map(n =>
        n.id === action.payload.id
          ? { ...n, ...action.payload, updatedAt: new Date().toISOString() }
          : n
      );
    case 'DELETE':
      return state.filter(n => n.id !== action.payload);
    case 'PIN':
      return state.map(n =>
        n.id === action.payload ? { ...n, pinned: !n.pinned } : n
      );
    default:
      return state;
  }
}`}</div>

        <div className="plan-h2">3. Search + Filter Hook</div>
        <div className="code-block">{`// hooks/useFilteredNotes.ts
export function useFilteredNotes(
  notes: Note[],
  query: string,
  tag: string | null,
  notebook: string | null
) {
  return useMemo(() => {
    let result = [...notes].sort((a, b) =>
      (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (tag)      result = result.filter(n => n.tags.includes(tag));
    if (notebook) result = result.filter(n => n.notebook === notebook);
    return result;
  }, [notes, query, tag, notebook]);
}`}</div>

        <div className="plan-h2">4. Autosave Hook</div>
        <div className="code-block">{`// hooks/useAutosave.ts
export function useAutosave(note: Note | null, onSave: (n: Note) => void) {
  const debounced = useDebounce(note, 800);
  const isFirst   = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    if (debounced) {
      onSave(debounced);            // dispatches UPDATE
      // Could also push to IndexedDB here for Phase 3
    }
  }, [debounced]);
}`}</div>

        <div className="plan-h2">5. Create New Note</div>
        <div className="code-block">{`// In NotesProvider
function createNote(notebook = "Personal"): Note {
  const note: Note = {
    id:        crypto.randomUUID(),
    title:     "",
    body:      "",
    tags:      [],
    notebook,
    pinned:    false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dispatch({ type: 'CREATE', payload: note });
  navigate(\`/notes/\${note.id}\`);
  return note;
}`}</div>

        <div className="plan-h2">6. Toolbar Text Insertion</div>
        <div className="code-block">{`// Inserts markdown syntax around selected text
function insertMarkdown(
  textarea: HTMLTextAreaElement,
  prefix: string,
  suffix = prefix
) {
  const { selectionStart: s, selectionEnd: e, value } = textarea;
  const selected = value.slice(s, e);
  const inserted = \`\${prefix}\${selected || "text"}\${suffix}\`;
  const next = value.slice(0, s) + inserted + value.slice(e);
  // Update state, then restore cursor
  onChange(next);
  requestAnimationFrame(() => {
    textarea.selectionStart = s + prefix.length;
    textarea.selectionEnd   = s + prefix.length + (selected || "text").length;
    textarea.focus();
  });
}`}</div>

        <div className="plan-h2">7. Export Note as Markdown</div>
        <div className="code-block">{`function exportNote(note: Note) {
  const meta = [
    "---",
    \`title: "\${note.title}"\`,
    \`tags: [\${note.tags.join(", ")}]\`,
    \`notebook: \${note.notebook}\`,
    \`date: \${note.createdAt}\`,
    "---\\n",
  ].join("\\n");
  const blob = new Blob([meta + note.body], { type: "text/markdown" });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), {
    href: url,
    download: \`\${note.title || "untitled"}.md\`,
  });
  a.click();
  URL.revokeObjectURL(url);
}`}</div>
      </div>
    ),
    Shortcuts: (
      <div>
        <div className="plan-h1">Keyboard Shortcuts</div>
        <div className="plan-sub">Full power-user experience with accessibility in mind</div>
        <div className="plan-h2">Global</div>
        {[
          [["⌘", "N"], "Create new note"],
          [["⌘", "K"], "Open search / command palette"],
          [["⌘", "/"], "Toggle sidebar"],
          [["⌘", "\\"], "Toggle editor / preview"],
          [["⌘", "⇧", "D"], "Delete current note"],
          [["⌘", "P"], "Pin / unpin current note"],
          [["Esc"], "Dismiss modal / clear search"],
        ].map(([keys, label]) => (
          <div key={label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
            <span style={{fontSize:12,color:"var(--text2)"}}>{label}</span>
            <div style={{display:"flex",gap:3}}>
              {(keys).map(k => <span key={k} className="kbd">{k}</span>)}
            </div>
          </div>
        ))}
        <div className="plan-h2">Editor</div>
        {[
          [["⌘", "B"], "Bold"],
          [["⌘", "I"], "Italic"],
          [["⌘", "⇧", "K"], "Inline code"],
          [["⌘", "⇧", "C"], "Code block"],
          [["⌘", "⇧", "1"], "Heading 1"],
          [["⌘", "⇧", "2"], "Heading 2"],
          [["⌘", "⇧", "T"], "Insert checklist item"],
          [["Tab"], "Indent list item"],
        ].map(([keys, label]) => (
          <div key={label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
            <span style={{fontSize:12,color:"var(--text2)"}}>{label}</span>
            <div style={{display:"flex",gap:3}}>
              {(keys).map(k => <span key={k} className="kbd">{k}</span>)}
            </div>
          </div>
        ))}
        <div className="plan-h2">Accessibility Notes</div>
        <div className="plan-p">• All interactive elements have proper ARIA labels</div>
        <div className="plan-p">• Focus trap in modal dialogs using focus-trap-react</div>
        <div className="plan-p">• Reduced motion via prefers-reduced-motion media query</div>
        <div className="plan-p">• Color contrast meets WCAG AA (4.5:1 minimum)</div>
        <div className="plan-p">• Skip-to-content link at top of page</div>
        <div className="plan-p">• Editor textarea has aria-label="Note body"</div>
        <div className="plan-p">• Note cards use role="listitem" inside role="list"</div>
      </div>
    ),
  };
  return <div className="plan-content">{sections[tab]}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // Inject styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ── NOTES STATE ──
  const [notes, setNotes] = useLocalStorage("notewise_notes", SAMPLE_NOTES);
  const [activeId, setActiveId] = useState(SAMPLE_NOTES[0].id);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [activeNotebook, setActiveNotebook] = useState(null);
  const [editorMode, setEditorMode] = useState("write"); // write | preview
  const [showPlan, setShowPlan] = useState(false);
  const [planTab, setPlanTab] = useState("Overview");
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const textareaRef = useRef(null);

  const activeNote = useMemo(() => notes.find(n => n.id === activeId), [notes, activeId]);

  // ── DERIVED: all tags, notebooks ──
  const allTags = useMemo(() => {
    const t = new Set();
    notes.forEach(n => n.tags.forEach(tag => t.add(tag)));
    return [...t];
  }, [notes]);

  const notebooks = useMemo(() => {
    const nb = new Set(notes.map(n => n.notebook));
    return [...nb];
  }, [notes]);

  // ── FILTERED NOTES ──
  const filteredNotes = useMemo(() => {
    let result = [...notes].sort((a, b) =>
      (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
      new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (activeTag)      result = result.filter(n => n.tags.includes(activeTag));
    if (activeNotebook) result = result.filter(n => n.notebook === activeNotebook);
    return result;
  }, [notes, search, activeTag, activeNotebook]);

  // ── CRUD ──
  const createNote = useCallback(() => {
    const note = {
      id: uid(), title: "", body: "",
      tags: [], notebook: activeNotebook || "Personal",
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [note, ...prev]);
    setActiveId(note.id);
    setEditorMode("write");
  }, [activeNotebook, setNotes]);

  const updateNote = useCallback((partial) => {
    setNotes(prev => prev.map(n =>
      n.id === partial.id
        ? { ...n, ...partial, updatedAt: new Date().toISOString() }
        : n
    ));
  }, [setNotes]);

  const deleteNote = useCallback((id) => {
    setNotes(prev => {
      const filtered = prev.filter(n => n.id !== id);
      if (id === activeId) setActiveId(filtered[0]?.id ?? null);
      return filtered;
    });
  }, [activeId, setNotes]);

  const pinNote = useCallback((id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  }, [setNotes]);

  // ── AUTOSAVE ──
  const [draftNote, setDraftNote] = useState(activeNote);

  useEffect(() => { setDraftNote(activeNote); }, [activeId]);

  useEffect(() => {
    if (!draftNote) return;
    setSaving(true);
    const t = setTimeout(() => {
      updateNote(draftNote);
      setSaving(false);
    }, 800);
    return () => clearTimeout(t);
  }, [draftNote?.title, draftNote?.body]);

  const setField = (field, value) => {
    setDraftNote(prev => prev ? { ...prev, [field]: value } : prev);
  };

  // ── TAGS ──
  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() && draftNote) {
      const tag = tagInput.trim().toLowerCase();
      if (!draftNote.tags.includes(tag)) {
        const updated = { ...draftNote, tags: [...draftNote.tags, tag] };
        setDraftNote(updated);
        updateNote(updated);
      }
      setTagInput("");
    }
  };
  const removeTag = (tag) => {
    if (!draftNote) return;
    const updated = { ...draftNote, tags: draftNote.tags.filter(t => t !== tag) };
    setDraftNote(updated);
    updateNote(updated);
  };

  // ── TOOLBAR ──
  const insertMd = (prefix, suffix = prefix) => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const sel = value.slice(s, e) || "text";
    const next = value.slice(0, s) + prefix + sel + suffix + value.slice(e);
    setField("body", next);
    requestAnimationFrame(() => {
      el.selectionStart = s + prefix.length;
      el.selectionEnd   = s + prefix.length + sel.length;
      el.focus();
    });
  };

  // ── KEYBOARD ──
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "n") { e.preventDefault(); createNote(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [createNote]);

  // ── EXPORT ──
  const exportNote = () => {
    if (!draftNote) return;
    const meta = `---\ntitle: "${draftNote.title}"\ntags: [${draftNote.tags.join(", ")}]\nnotebook: ${draftNote.notebook}\ndate: ${draftNote.createdAt}\n---\n\n`;
    const blob = new Blob([meta + draftNote.body], { type: "text/markdown" });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement("a"), { href: url, download: `${draftNote.title || "untitled"}.md` });
    a.click();
    URL.revokeObjectURL(url);
  };

  const NOTEBOOK_COLORS = { Work: "#4F8EF7", Learning: "#7B61FF", Personal: "#22C55E", Ideas: "#F59E0B" };

  return (
    <div className="app">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">📝</div>
          <div className="logo-text">Note<span>Wise</span></div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">Views</div>
          <button className={`sidebar-item ${!activeNotebook && !activeTag ? "active" : ""}`}
            onClick={() => { setActiveNotebook(null); setActiveTag(null); }}>
            <span>📋</span> All Notes
            <span className="count">{notes.length}</span>
          </button>
          <button className="sidebar-item" onClick={() => { setActiveNotebook(null); setActiveTag(null); setSearch("pinned"); }}>
            <span>📌</span> Pinned
            <span className="count">{notes.filter(n => n.pinned).length}</span>
          </button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">Notebooks</div>
          {notebooks.map(nb => (
            <button key={nb} className={`sidebar-item ${activeNotebook === nb ? "active" : ""}`}
              onClick={() => { setActiveNotebook(nb); setActiveTag(null); }}>
              <span className="dot" style={{ background: NOTEBOOK_COLORS[nb] || "#888" }} />
              {nb}
              <span className="count">{notes.filter(n => n.notebook === nb).length}</span>
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="new-note-btn" onClick={createNote}>
            <span>+</span> New Note
          </button>
          <div style={{ height: 8 }} />
          <button
            className={`toggle-plan${showPlan ? " active" : ""}`}
            style={{ width: "100%" }}
            onClick={() => setShowPlan(v => !v)}>
            {showPlan ? "← Back to App" : "📐 View Plan"}
          </button>
        </div>
      </aside>

      {/* ── NOTE LIST PANEL ── */}
      {!showPlan && (
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">
              {activeNotebook || activeTag ? (activeNotebook || `#${activeTag}`) : "All Notes"}
              <span style={{ color: "var(--text3)", fontWeight: 400, marginLeft: 6 }}>({filteredNotes.length})</span>
            </div>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                placeholder="Search notes…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search notes"
              />
              {search && <span style={{ cursor: "pointer", color: "var(--text3)", fontSize: 12 }} onClick={() => setSearch("")}>✕</span>}
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="tag-filter" role="group" aria-label="Filter by tag">
              {allTags.map(tag => (
                <button key={tag} className={`tag-chip ${activeTag === tag ? "active" : ""}`}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}>
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <div className="note-list" role="list" aria-label="Notes">
            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div className="empty-text">No notes found</div>
                <div className="empty-sub">Try a different search or create a new note</div>
              </div>
            ) : (
              filteredNotes.map(note => (
                <div key={note.id} role="listitem"
                  className={`note-card ${note.pinned ? "pinned" : ""} ${note.id === activeId ? "active" : ""}`}
                  onClick={() => { setActiveId(note.id); setEditorMode("write"); }}
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && setActiveId(note.id)}>
                  <div className="note-pin">📌</div>
                  <div className="note-card-title">{note.title || "Untitled"}</div>
                  <div className="note-card-preview">
                    {note.body.replace(/[#*`>\-\[\]]/g, "").slice(0, 70) || "No content…"}
                  </div>
                  <div className="note-card-meta">
                    <span className="note-card-date">{fmt(note.updatedAt)}</span>
                    {note.tags.slice(0, 2).map(t => <span key={t} className="note-card-tag">#{t}</span>)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── EDITOR / PLAN ── */}
      <main className="editor-area">
        {showPlan ? (
          <div className="plan-overlay">
            <div className="plan-tabs" role="tablist">
              {PLAN_TABS.map(t => (
                <button key={t} role="tab" aria-selected={planTab === t}
                  className={`plan-tab ${planTab === t ? "active" : ""}`}
                  onClick={() => setPlanTab(t)}>{t}</button>
              ))}
            </div>
            <PlanContent tab={planTab} />
          </div>
        ) : !draftNote ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <div className="empty-text">Select a note or create a new one</div>
            <div className="empty-sub">Press <span className="kbd">⌘N</span> to create</div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="editor-toolbar">
              {[
                ["B", "**", "**"], ["I", "_", "_"], ["`", "`", "`"],
              ].map(([label, pre, suf]) => (
                <button key={label} className="toolbar-btn"
                  title={`Insert ${label}`}
                  onClick={() => insertMd(pre, suf)}
                  style={{ fontWeight: label === "B" ? 700 : label === "I" ? "normal" : 400, fontStyle: label === "I" ? "italic" : "normal" }}>
                  {label}
                </button>
              ))}
              <div className="toolbar-sep" />
              <button className="toolbar-btn" onClick={() => insertMd("## ", "")} title="Heading">H</button>
              <button className="toolbar-btn" onClick={() => insertMd("- [ ] ", "")} title="Checklist">☑</button>
              <button className="toolbar-btn" onClick={() => insertMd("> ", "")} title="Quote">"</button>
              <button className="toolbar-btn" onClick={() => insertMd("\n```\n", "\n```")} title="Code block">{"<>"}</button>
              <div className="toolbar-sep" />
              <button className="toolbar-btn" onClick={() => pinNote(draftNote.id)} title="Pin note">
                {draftNote.pinned ? "📌" : "📍"}
              </button>
              <button className="toolbar-btn" onClick={exportNote} title="Export as .md">⬇</button>
              <div className="toolbar-spacer" />
              <button className={`toolbar-mode-btn write ${editorMode === "write" ? "active" : ""}`}
                onClick={() => setEditorMode("write")}>Write</button>
              <button className={`toolbar-mode-btn preview ${editorMode === "preview" ? "active" : ""}`}
                onClick={() => setEditorMode("preview")}>Preview</button>
              <div className="toolbar-sep" />
              <button className="delete-btn" onClick={() => deleteNote(draftNote.id)} title="Delete note">🗑</button>
            </div>

            {/* Title */}
            <div className="editor-title-bar">
              <textarea
                className="editor-title"
                rows={1}
                placeholder="Untitled"
                value={draftNote.title}
                onChange={e => setField("title", e.target.value)}
                aria-label="Note title"
                style={{ height: "auto" }}
                onInput={e => { e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
              />
            </div>

            {/* Meta bar */}
            <div className="editor-meta-bar">
              <div className="meta-item">
                <span className="meta-label">Notebook:</span>
                <select className="notebook-select"
                  value={draftNote.notebook}
                  onChange={e => { const updated = { ...draftNote, notebook: e.target.value }; setDraftNote(updated); updateNote(updated); }}
                  aria-label="Notebook">
                  {notebooks.map(nb => <option key={nb}>{nb}</option>)}
                  <option value="New Notebook">+ New Notebook</option>
                </select>
              </div>
              <div className="meta-item">
                <span className="meta-label">Updated:</span>
                <span>{fmt(draftNote.updatedAt)}</span>
              </div>
              <div className="meta-item" style={{ gap: 5 }}>
                <span className="meta-label">Tags:</span>
                <div className="tag-input-wrap">
                  {draftNote.tags.map(tag => (
                    <span key={tag} className="editor-tag" onClick={() => removeTag(tag)} title="Click to remove">#{tag}</span>
                  ))}
                  <input className="add-tag-input" placeholder="add tag…"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    aria-label="Add tag"
                  />
                </div>
              </div>
              <div className="autosave-badge">
                <div className="autosave-dot" style={{ background: saving ? "var(--warn)" : "var(--accent3)" }} />
                <span style={{ fontSize: 10, color: "var(--text3)" }}>{saving ? "Saving…" : "Saved"}</span>
              </div>
            </div>

            {/* Body */}
            <div className="editor-body">
              {editorMode === "write" ? (
                <textarea
                  ref={textareaRef}
                  className="editor-textarea"
                  placeholder={`Start writing in Markdown...\n\n# Heading\n**bold** _italic_ \`code\`\n- [ ] checklist item`}
                  value={draftNote.body}
                  onChange={e => setField("body", e.target.value)}
                  aria-label="Note body"
                  spellCheck
                />
              ) : (
                <div className="preview-pane"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(draftNote.body) }}
                  aria-label="Markdown preview"
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
