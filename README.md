# The Fourth Room

Website for The Fourth Room, a community room for hire for small gatherings of up to 20 people, with a podcast studio for solo creators.

It's a plain static site (HTML, CSS and a little JavaScript) with no build step, so GitHub Pages can host it for free.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home page |
| `uses.html` | "What fits": the ten kinds of gathering and how the room sets up for each |
| `studio.html` | The podcast studio |
| `book.html` | Booking steps, contact details and FAQ |
| `blog/` | The Journal. One HTML file per post, plus `blog/index.html` |
| `404.html` | Not-found page |

Shared styles are in `assets/css/site.css` and scripts in `assets/js/site.js`. Photos are in `img/`.

## Still to add

- The studio's equipment list and a photo of it (marked `TODO` in `studio.html`)
- The brand's own neon colours, if they differ from the placeholders at the top of `assets/css/site.css`

## SEO

- Every page has its own title, description, canonical URL and social share tags (Open Graph and Twitter).
- Structured data: `EventVenue` on the home page, `FAQPage` on the booking page, `Service` on the studio page, and `BlogPosting` on each post.
- `sitemap.xml` lists every page. Submit it in [Google Search Console](https://search.google.com/search-console) once the site is live.
- All photos have descriptive alt text and explicit sizes so pages load without jumping.

## Adding a blog post

1. Copy an existing post in `blog/` and give it a short, descriptive file name, such as `blog/how-to-run-a-craft-workshop.html`.
2. Change the title, description, canonical and `og:` URLs, date, image and text.
3. Add a card for it in `blog/index.html` and a line for it in `sitemap.xml`.

## Hosting and custom domain

The site is served by GitHub Pages from the `main` branch at https://edwardeltham.github.io/the-fourth-room/.

If you add a custom domain later (for example `thefourthroom.in`), replace `https://edwardeltham.github.io/the-fourth-room/` with the new address in every HTML file, `sitemap.xml` and `robots.txt`, and change the two `/the-fourth-room/` links in `404.html` to `/`. `robots.txt` only takes effect at the root of a domain, so it starts to count once a custom domain is set up.
