// Renders assets/data/events.js into the Events page and adds Event structured data for search engines.
const renderEvents = () => {
  const events = (window.FOURTH_ROOM_EVENTS || []).filter(e => e && e.title && /^\d{4}-\d{2}-\d{2}$/.test(e.date || ""));
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const day = e => new Date(e.date + "T00:00:00");
  const upcoming = events.filter(e => day(e) >= today).sort((a, b) => day(a) - day(b));
  const past = events.filter(e => day(e) < today).sort((a, b) => day(b) - day(a));
  const neons = ["--neon-pink", "--neon-lime", "--neon-cyan", "--neon-orange", "--neon-violet"];
  const base = document.querySelector('link[rel="canonical"]')?.href.replace(/events\.html$/, "") || location.href.replace(/[^/]*$/, "");

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = u => /^(https?:\/\/|img\/|mailto:)/.test(u || "") ? u : "";
  // "4:00 PM" on 2026-11-14 -> "2026-11-14T16:00:00+05:30" (Chennai time), for search engines
  const iso = (date, t) => {
    const m = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i.exec(String(t || "").trim());
    if (!m) return null;
    let h = +m[1];
    if (m[3]) h = h % 12 + (m[3].toLowerCase() === "pm" ? 12 : 0);
    return `${date}T${String(h).padStart(2, "0")}:${m[2] || "00"}:00+05:30`;
  };
  // An event can have one "image" or several "images"; the first one is shown large
  const images = e => (Array.isArray(e.images) ? e.images : [e.image]).map(safeUrl).filter(Boolean);
  const when = e => {
    const d = day(e).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    return [d, [e.start, e.end].filter(Boolean).join(" – ")].filter(Boolean).join(" · ");
  };

  const card = (e, i, isPast) => {
    const d = day(e);
    const imgs = images(e), link = safeUrl(e.link), qr = safeUrl(e.qr);
    const alt = `Poster for ${esc(e.title)} at The Fourth Room`;
    const thumbs = imgs.length > 1 ? `<div class="event-thumbs">${imgs.map((u, n) =>
      `<button type="button" data-src="${esc(u)}" aria-label="Show poster ${n + 1} of ${imgs.length}" aria-pressed="${!n}"><img src="${esc(u)}" alt="" loading="lazy"></button>`).join("")}</div>` : "";
    return `<article class="event${isPast ? " past" : ""}" style="--nc:var(${neons[i % neons.length]})">
      ${imgs.length ? `<div class="event-posters"><img src="${esc(imgs[0])}" alt="${alt}" loading="lazy">${thumbs}</div>` : ""}
      <div class="event-date" aria-hidden="true"><b>${d.getDate()}</b><span>${d.toLocaleDateString("en-IN", { month: "short" })}</span></div>
      <div class="event-body">
        <h3>${esc(e.title)}</h3>
        <p class="meta">${esc(when(e))}</p>
        <p>${esc(e.description)}</p>
        <dl class="spec">${e.price ? `<dt>Price</dt><dd>${esc(e.price)}</dd>` : ""}${e.host ? `<dt>Host</dt><dd>${esc(e.host)}</dd>` : ""}</dl>
        ${!isPast && link ? `<a class="btn" href="${esc(link)}" rel="noopener">${esc(e.linkText || "Save a spot")}</a>` : ""}
        ${!isPast && qr ? `<figure class="event-qr"><img src="${esc(qr)}" alt="QR code to register for ${esc(e.title)}" width="120" height="120" loading="lazy"><figcaption>Or scan to register</figcaption></figure>` : ""}
      </div>
    </article>`;
  };

  const up = document.getElementById("upcoming"), pa = document.getElementById("past");
  if (upcoming.length) up.innerHTML = upcoming.map((e, i) => card(e, i, false)).join("");
  if (past.length) { pa.innerHTML = past.map((e, i) => card(e, i + 2, true)).join(""); document.getElementById("past-section").hidden = false; }

  // Tapping a small poster swaps it into the large spot
  document.addEventListener("click", ev => {
    const b = ev.target.closest(".event-thumbs button");
    if (!b) return;
    const wrap = b.closest(".event-posters");
    wrap.querySelector(":scope > img").src = b.dataset.src;
    wrap.querySelectorAll(".event-thumbs button").forEach(x => x.setAttribute("aria-pressed", x === b));
  });

  // Event structured data, so search engines can show dates in results
  const ld = events.map(e => {
    const o = {
      "@context": "https://schema.org", "@type": "Event", name: e.title, description: e.description,
      startDate: iso(e.date, e.start) || e.date, eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: "The Fourth Room", address: { "@type": "PostalAddress",
        streetAddress: "214, South First Cross Street, Kapaleeshwarar Nagar", addressLocality: "Neelankarai, Chennai",
        addressRegion: "Tamil Nadu", postalCode: "600041", addressCountry: "IN" } },
      organizer: { "@type": "Organization", name: e.host || "The Fourth Room", url: base }
    };
    const end = iso(e.date, e.end); if (end) o.endDate = end;
    const imgs = images(e); if (imgs.length) o.image = imgs.map(u => new URL(u, base).href);
    if (e.price) {
      const n = String(e.price).replace(/[^\d.]/g, "");
      o.offers = { "@type": "Offer", price: /free/i.test(e.price) ? "0" : n || undefined, priceCurrency: "INR", url: safeUrl(e.link) || base + "events.html" };
    }
    return o;
  });
  if (ld.length) {
    const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }
};

// The events list is edited on GitHub without touching this page, so load it with a
// cache-busting stamp that changes every 5 minutes; browsers never keep a stale list for long.
(() => {
  const s = document.createElement("script");
  s.src = (document.currentScript?.dataset.events || "assets/data/events.js") + "?t=" + Math.floor(Date.now() / 300000);
  s.onload = renderEvents;
  s.onerror = renderEvents;
  document.head.appendChild(s);
})();
