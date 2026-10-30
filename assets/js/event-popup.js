// Home page popup for the next upcoming event, read from assets/data/events.js.
// Each visitor sees it once per event: closing it is remembered in localStorage,
// so when a new event is added, returning visitors see the popup again for that one.
(() => {
  const STYLE = `
.ev-pop { padding: 0; border: 0; background: var(--wall); color: var(--ink); width: min(760px, calc(100vw - 32px)); max-height: calc(100dvh - 32px); overflow: auto; box-shadow: 0 0 0 4px var(--neon-pink), 0 24px 60px rgba(0,0,0,.45); }
.ev-pop::backdrop { background: rgba(17,17,19,.72); }
.ev-pop-in { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); }
.ev-pop-poster { display: block; width: 100%; height: 100%; object-fit: contain; background: #111113; }
.ev-pop-body { padding: 28px 26px 26px; display: flex; flex-direction: column; gap: 12px; }
.ev-pop-kicker { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.ev-pop-kicker span { background: var(--neon-lime); color: #111113; padding: 3px 8px; }
.ev-pop h2 { font-family: var(--display); font-weight: 400; font-size: clamp(26px, 4vw, 34px); line-height: 1.1; margin: 0; }
.ev-pop-when { margin: 0; font-weight: 600; }
.ev-pop-when b { display: block; font-size: 20px; box-shadow: inset 0 -.38em var(--neon-cyan); width: fit-content; color: var(--ink); }
.ev-pop-meta { margin: 0; color: var(--muted); font-size: 15px; }
.ev-pop-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: auto; padding-top: 6px; }
.ev-pop-actions .btn { background: var(--neon-pink); color: #111113; }
.ev-pop-actions .btn:hover { background: var(--ink); color: var(--wall); }
.ev-pop-actions .btn.ghost { background: transparent; color: var(--ink); }
.ev-pop-actions .btn.ghost:hover { background: var(--ink); color: var(--wall); }
.ev-pop-close { position: absolute; top: 10px; right: 10px; width: 40px; height: 40px; border: 0; border-radius: 50%; background: #111113; color: #fff; font-size: 24px; line-height: 1; cursor: pointer; display: grid; place-items: center; z-index: 1; }
.ev-pop-close:hover { background: var(--neon-orange); color: #111113; }
@media (max-width: 620px) {
  .ev-pop-in { grid-template-columns: 1fr; }
  .ev-pop-poster { aspect-ratio: auto; height: auto; max-height: 42dvh; object-fit: contain; }
  .ev-pop-body { padding: 18px 18px 20px; gap: 8px; }
  .ev-pop-actions .btn { flex: 1 1 auto; justify-content: center; }
}`;

  const show = () => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const day = e => new Date(e.date + "T00:00:00");
    // The soonest event from today on, skipping any marked popup: false
    const e = (window.FOURTH_ROOM_EVENTS || [])
      .filter(e => e && e.title && e.popup !== false && /^\d{4}-\d{2}-\d{2}$/.test(e.date || "") && day(e) >= today)
      .sort((a, b) => day(a) - day(b))[0];
    if (!e || !window.HTMLDialogElement) return;

    const key = "fourthroom-popup-seen:" + e.date + ":" + e.title;
    try { if (localStorage.getItem(key)) return; } catch (_) {}
    const remember = () => { try { localStorage.setItem(key, "1"); } catch (_) {} };

    const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const safeUrl = u => /^(https?:\/\/|img\/|mailto:)/.test(u || "") ? u : "";
    const poster = safeUrl((Array.isArray(e.images) ? e.images : [e.image])[0]);
    const link = safeUrl(e.link) || "events.html";
    const date = day(e).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
    const time = [e.start, e.end].filter(Boolean).join(" – ");
    const meta = [e.price, e.host && "Hosted by " + e.host].filter(Boolean).join(" · ");

    const st = document.createElement("style"); st.textContent = STYLE; document.head.appendChild(st);
    const d = document.createElement("dialog");
    d.className = "ev-pop";
    d.setAttribute("aria-labelledby", "ev-pop-title");
    d.innerHTML = `<button type="button" class="ev-pop-close" aria-label="Close">&times;</button>
      <div class="ev-pop-in">
        ${poster ? `<img class="ev-pop-poster" src="${esc(poster)}" alt="Poster for ${esc(e.title)}">` : ""}
        <div class="ev-pop-body">
          <p class="ev-pop-kicker"><span>Coming up at The Fourth Room</span></p>
          <h2 id="ev-pop-title">${esc(e.title)}</h2>
          <p class="ev-pop-when"><b>${esc(date)}</b>${esc(time)}</p>
          ${meta ? `<p class="ev-pop-meta">${esc(meta)}</p>` : ""}
          <div class="ev-pop-actions">
            <a class="btn" href="${esc(link)}" rel="noopener">${esc(e.linkText || "Register now")}</a>
            <a class="btn ghost" href="events.html">More details</a>
          </div>
        </div>
      </div>`;
    if (!poster) d.querySelector(".ev-pop-in").style.gridTemplateColumns = "1fr";
    d.querySelector(".ev-pop-close").addEventListener("click", () => d.close());
    d.querySelectorAll("a").forEach(a => a.addEventListener("click", remember));
    d.addEventListener("click", ev => { if (ev.target === d) d.close(); }); // tap outside to close
    d.addEventListener("close", () => { remember(); d.remove(); });
    document.body.appendChild(d);
    d.showModal();
    d.querySelector(".ev-pop-close").focus();
  };

  // Load the events list fresh (same 5-minute stamp as the Events page), then wait a moment
  // so the page is visible before the popup appears.
  const s = document.createElement("script");
  s.src = (document.currentScript?.dataset.events || "assets/data/events.js") + "?t=" + Math.floor(Date.now() / 300000);
  s.onload = () => setTimeout(show, 1500);
  document.head.appendChild(s);
})();
