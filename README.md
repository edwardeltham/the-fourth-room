# The Fourth Room

Website for The Fourth Room, a community room for hire for small gatherings of up to 20 people, with a podcast studio for solo creators.

It's a plain static site (HTML, CSS and a little JavaScript) with no build step, so GitHub Pages can host it for free.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home page |
| `uses.html` | "What fits": the ten kinds of gathering and how the room sets up for each |
| `studio.html` | The podcast studio |
| `events.html` | Upcoming and past events, read from `assets/data/events.js` |
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

## Adding an event

Open `assets/data/events.js` on GitHub, click the pencil icon, copy the example block at the top of the file into the `[ ]` list, fill it in and commit. Dates are written `YYYY-MM-DD`. The Events page sorts events into "Coming up" and "Past events" by date, and adds Event structured data for Google. Put event photos in `img/events/`. New or edited events show on the live site within about 10 minutes of committing.

## Adding a blog post

1. Copy an existing post in `blog/` and give it a short, descriptive file name, such as `blog/how-to-run-a-craft-workshop.html`.
2. Change the title, description, canonical and `og:` URLs, date, image and text.
3. Add a card for it in `blog/index.html` and a line for it in `sitemap.xml`.

## Hosting and custom domain

The live site at https://thefourthroom.co/ is hosted on Hostinger: the files are uploaded as a zip into `public_html` (Hostinger File Manager), so every change to `main` needs a fresh zip of the site files uploaded there. The repo is also published on GitHub Pages at https://edwardeltham.github.io/the-fourth-room/. The `CNAME` file only matters if the domain is ever pointed at GitHub Pages instead (four `A` records for `@` to 185.199.108.153 to 185.199.111.153 and a `www` `CNAME` to `edwardeltham.github.io`).

All canonical, `og:` and sitemap URLs use `https://thefourthroom.co/`. `404.html` uses links that start with `/`, so it works at any missing address.
