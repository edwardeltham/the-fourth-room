const root = document.documentElement;

// "What will you fill it with?" picker on the home page
const uses = [
  { id: "startup-circle", k: "Startup circle", c: "var(--neon-pink)", what: "Founders swapping notes, honest feedback and a whiteboard's worth of ideas. Long tables in a U so everyone faces everyone.", setup: "U-shape tables", n: "8–20", len: "2–3 hrs" },
  { id: "listening-circle", k: "Listening circle", c: "var(--neon-violet)", what: "Benches pulled into a ring, the lamp on, phones away. A room quiet enough for people to really hear each other.", setup: "Closed circle", n: "6–16", len: "1.5–2 hrs" },
  { id: "grief-table", k: "Grief table", c: "var(--neon-lime)", what: "One long table, tea, and space to talk about loss without hurrying. Gentle light from the reading nook.", setup: "One long table", n: "6–12", len: "2 hrs" },
  { id: "theatre-class", k: "Theatre class", c: "var(--neon-orange)", what: "Tables pushed to the walls and the floor cleared for warm-ups, games and scene work.", setup: "Open floor", n: "8–20", len: "2–3 hrs" },
  { id: "dance-class", k: "Dance class", c: "var(--neon-cyan)", what: "Cleared floor, AC on high, your playlist on the speaker. Small enough to see every dancer.", setup: "Open floor", n: "6–15", len: "1–2 hrs" },
  { id: "craft-workshop", k: "Craft workshop", c: "var(--neon-lime)", what: "Big flat tables for paper, paint and glue. Finished pieces could end up on the stairwell wall.", setup: "Workshop tables", n: "8–20", len: "2–4 hrs" },
  { id: "origami", k: "Origami afternoon", c: "var(--neon-pink)", what: "Squares of paper, one table, lots of patient folding. A good one for kids and grown-ups together.", setup: "Workshop tables", n: "6–20", len: "1.5–2 hrs" },
  { id: "training-session", k: "Training session", c: "var(--neon-cyan)", what: "Classroom rows facing a screen or flip chart, with plug points along the wall for laptops.", setup: "Classroom rows", n: "10–20", len: "Half / full day" },
  { id: "reading-room", k: "Reading room", c: "var(--neon-orange)", what: "A silent reading hour or a book club, with the shelf under the stairs to borrow from.", setup: "Scattered seating", n: "4–20", len: "1–3 hrs" },
  { id: "something-else", k: "Something else", c: "var(--neon-violet)", what: "Board-game night, a baby shower, a poetry open mic, a résumé clinic. If it's under 20 people, ask us.", setup: "Your call", n: "Up to 20", len: "You tell us" }
];
const chips = document.getElementById("chips");
if (chips) {
  const heroWord = document.getElementById("heroWord");
  const pick = (i, fromUser) => {
    const u = uses[i];
    root.style.setProperty("--fill", u.c);
    [...chips.children].forEach((b, j) => b.setAttribute("aria-pressed", j === i));
    document.getElementById("cardTitle").textContent = u.k;
    document.getElementById("cardWhat").textContent = u.what;
    document.getElementById("cardFacts").innerHTML =
      `<dt>Setup</dt><dd>${u.setup}</dd><dt>Group</dt><dd>${u.n}</dd><dt>Usually</dt><dd>${u.len}</dd>`;
    document.getElementById("cardMore").href = "uses.html#" + u.id;
    if (heroWord && fromUser) heroWord.textContent = i === uses.length - 1 ? "yours" : u.k.toLowerCase().replace(" afternoon", "");
  };
  uses.forEach((u, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip";
    b.textContent = u.k; b.style.setProperty("--c", u.c);
    b.addEventListener("click", () => pick(i, true));
    chips.appendChild(b);
  });
  pick(0, false);
}

// the empty fourth square in the header mark: hover or tap it to fill it with the next neon
const neons = ["--neon-pink", "--neon-lime", "--neon-cyan", "--neon-orange", "--neon-violet"];
let ni = 0;
const headerMark = document.querySelector(".brand .mark");
if (headerMark) {
  headerMark.addEventListener("click", e => {
    e.preventDefault();
    ni = (ni + 1) % neons.length;
    root.style.setProperty("--fill", `var(${neons[ni]})`);
  });
}

const wave = document.getElementById("wave");
if (wave) {
  for (let i = 0; i < 36; i++) {
    const s = document.createElement("span");
    const h = 25 + Math.round(Math.abs(Math.sin(i * 0.7) * 55 + Math.sin(i * 1.9) * 20));
    s.style.setProperty("--h", Math.min(h, 100) + "%");
    s.style.animationDelay = (i * -0.11) + "s";
    wave.appendChild(s);
  }
}
