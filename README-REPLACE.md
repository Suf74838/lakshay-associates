# Lakshay website: what to replace

Everything you are likely to change is listed here. Nothing on this list
requires touching the design or the stylesheet.

---

## 1. The one file you will edit most

`assets/js/config.js`

Open it in any text editor. Every setting has a comment above it explaining
what it does. The settings are:

| Setting | What it does | Current value |
|---|---|---|
| `WHATSAPP_NUMBER` | Number the floating button and all WhatsApp links open | `918755798121` (confirmed) |
| `WHATSAPP_MESSAGE` | The message pre-typed for the visitor | "Hello Lakshay Associates & Consultants..." |
| `PHONE_PRIMARY` / `PHONE_SECONDARY` | Numbers behind every click-to-call link | `918755798121` / `916367863594` |
| `EMAIL` | Address behind every email link | `lakshayc78@gmail.com` |
| `FORM_ENDPOINT` | Where enquiries are sent. See section 3 | empty (WhatsApp mode) |
| `INTRO_ENABLED` | Opening logo animation on or off | `true` |
| `INTRO_SHOW_ONCE` | Play once per visit instead of every page | `false` |
| `MAP_EMBED_URL` | Google Maps link for the contact page | empty |

---

## 2. Still needed from the client

These are the only outstanding items.

1. **Google Maps link.** The contact page shows a marked placeholder box
   until this is supplied. Open Google Maps, find the office, choose
   Share, then Embed a map, copy the `src` URL out of the iframe and
   paste it into `MAP_EMBED_URL`. No coordinates have been invented.
2. **Client logos.** Twelve empty slots are ready on the homepage. See
   `assets/img/clients/README.txt`.
3. **Testimonials.** Three cards on the homepage read "Client testimonial
   goes here" and are labelled as placeholders on the page itself. Replace
   the quote, name and designation in `index.html`. The five stars are
   demo content, so remove them if you do not have real ratings.
4. **Photography.** See section 5.
5. **Live domain.** Replace `https://example.com/` in `sitemap.xml`,
   `robots.txt` and the `og:` tags at the top of each HTML file.

---

## 3. Where enquiries go

A GitHub Pages site cannot send email by itself, so there are two options.

**Option A, active now.** Submitting the form opens WhatsApp with the
enquiry already typed out: name, company, phone, email, chosen standard
and message. The visitor presses send. Nothing to set up.

**Option B, email instead.** Create a free endpoint at formspree.io, paste
the URL into `FORM_ENDPOINT` in `config.js`, and enquiries arrive in the
inbox instead. The form switches over automatically.

---

## 4. The numbers on the homepage

Figures as supplied: 7+ years, 150+ clients, 200+ certifications assisted,
13 ISO standards. To change one, edit the `data-count` value on that line
in `index.html`, `about.html` and `iso-services.html`. There is a comment
block marking the spot in each file.

Note: "Standard 200+" was read as certifications assisted, with 13 kept as
the number of ISO standards supported. Say the word if that was meant
differently.

Nothing else on the site states a figure that has not been supplied.

---

## 5. Photography

Every image slot is filled with a navy and gold brand graphic generated for
this build. They are real files, so nothing is broken or missing, but they
are placeholders for real photography.

To swap one in: save your photo as a `.jpg` with **exactly the same
filename** into `assets/img/photos/` and it appears everywhere that slot is
used. No code changes.

| File | Where it appears | Photo to shoot or licence |
|---|---|---|
| `hero.jpg` | Homepage hero, full screen | Consultant walking through a premium manufacturing facility |
| `about.jpg` | About block, portrait crop | Consultant reviewing documentation with a client |
| `why-choose.jpg` | Why Lakshay, portrait crop | Management team meeting |
| `cta-band.jpg` | Full width band, all pages | Wide industrial or corporate interior, cinematic |
| `page-header.jpg` | Header of the four inner pages | Modern corporate office environment |
| `iso-9001.jpg` | Featured card | Quality inspection on a production line |
| `iso-14001.jpg` | Featured card | Sustainable manufacturing, environment |
| `iso-45001.jpg` | Featured card | Worker safety on an industrial site |
| `iso-27001.jpg` | Featured card | Data centre or IT security operations |
| `iso-22000.jpg` | Featured card | Food processing facility |
| `iso-42001.jpg` | Featured card | AI and technology environment |
| `ind-*.jpg` | Ten industry tiles | Named by sector in the filename |
| `business-services.jpg` | Business services page | Professional consultation, documents |
| `contact.jpg` | Enquiry panel background | Office reception or meeting room |

Suggested sizes: hero and band images 2000px wide, portrait images
1200x1400, cards 900x700, industry tiles 800x600. Photos of Indian business
professionals will suit the audience better than generic foreign stock.
Avoid handshake shots and anything that looks AI generated.

Alt text is already written for each slot, so update it in the HTML if the
subject of a photo changes.

---

## 6. Files in this project

```
index.html                 Homepage
about.html                 About
iso-services.html          All 13 ISO standards, with an anchor for each
business-services.html     Consulting, GST, financial, startup support
contact.html               Contact details, enquiry form, map slot, FAQs
robots.txt, sitemap.xml    Search engine files, domain still to be set
.nojekyll                  Tells GitHub Pages to serve the folder as is

assets/css/style.css       All styling, in numbered sections
assets/js/config.js        Your settings. Start here
assets/js/main.js          Behaviour: animations, form, menu
assets/fonts/              Sora and Inter, self hosted, SIL licensed
assets/img/                Logo files, favicon, photos, client logos
```

The logo was not redesigned. It was cut out of the supplied JPG into
transparent PNGs: a dark version for light backgrounds, a reversed version
for navy, plus the monogram and wordmark used in the header lockup.

---

## 7. Publishing to GitHub Pages

Upload the contents of this folder to the repository root and enable Pages
in the repository settings. Every link and asset path is relative, so the
site works both at a domain root and inside a subfolder such as
`/lakshay/`. No absolute paths are used anywhere.

---

## 8. Things deliberately left out

- No "Government Approved", "Internationally Accredited" or "Guaranteed
  Certification" wording, and no accreditation body logos.
- The "ISO Certified" badge from the printed poster is not used in the
  hero, because on a consultancy site it reads as a claim about Lakshay
  rather than the service offered. The floating badge says "13 ISO
  Management Standards" instead. Say the word if you want it changed.
- No invented client names, project counts or testimonials.
