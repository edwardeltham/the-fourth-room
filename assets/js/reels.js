// "Made at The Fourth Room": renders Instagram reels from assets/data/reels.js on the studio page.
// Instagram's embed script loads only when the section scrolls near the screen.
(function () {
  var box = document.getElementById("reels");
  var list = window.TFR_REELS || [];
  if (!box) return;
  var section = box.closest("section");
  if (!list.length) { if (section) section.hidden = true; return; }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function clean(url) {
    var m = String(url).match(/instagram\.com\/(?:[^\/]+\/)?(reels?|p|tv)\/([\w-]+)/);
    return m ? "https://www.instagram.com/" + (m[1] === "reels" ? "reel" : m[1]) + "/" + m[2] + "/" : null;
  }

  box.innerHTML = list.map(function (r) {
    var url = clean(r.url);
    if (!url) return "";
    var handle = r.handle ? String(r.handle).replace(/^@/, "") : "";
    var name = r.creator || (handle ? "@" + handle : "");
    var credit = name ? (handle ? '<a href="https://www.instagram.com/' + esc(handle) + '/" rel="noopener">' + esc(name) + "</a>" : esc(name)) : "";
    return '<figure class="reel">' +
      '<blockquote class="instagram-media" data-instgrm-permalink="' + url + '" data-instgrm-version="14">' +
      '<a href="' + url + '" rel="noopener">Watch this reel on Instagram</a></blockquote>' +
      (credit ? "<figcaption>Shot at The Fourth Room by " + credit + "</figcaption>" : "") +
      "</figure>";
  }).join("");

  var loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
    }, { rootMargin: "600px 0px" });
    io.observe(box);
  } else {
    load();
  }
})();
