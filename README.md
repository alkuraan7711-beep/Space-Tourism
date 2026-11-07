# Space Tourism

A responsive four-page website for a fictional space-travel company: Home, Destination, Crew and Technology. Built with plain HTML, CSS and JavaScript (no frameworks, no build step).

**[Live demo](https://space-tourism-opal.vercel.app/)**

![Space-Tourism](./Screenshot%202026-11-07%20220521.png)

> This is a practice project based on a [Frontend Mentor](https://www.frontendmentor.io/) challenge. The design, images and text content come from the challenge; the HTML, CSS and JavaScript are my own.

## Features

- Four pages with a shared navigation and a different background for each page and screen size (mobile, tablet, desktop)
- Tabs on the Destination, Crew and Technology pages that swap the image and text without reloading the page
- Tabs follow the ARIA tabs pattern: `tablist` / `tab` / `tabpanel`, arrow-key navigation with wrap-around, and only the active tab in the Tab order
- Slide-in mobile menu: opens with the hamburger button, closes with `Esc`, and keeps `aria-expanded` in sync
- Images served as WebP with a PNG fallback using `<picture>`
- Content comes from one data file (`js/data.js`), so adding a destination or crew member does not mean editing the HTML
- Respects `prefers-reduced-motion`

## Built with

- HTML5, CSS (custom properties, Grid, Flexbox, media queries), vanilla JavaScript
- Fonts: Bellefair, Barlow and Barlow Condensed from Google Fonts

## Run it locally

No install needed. Open `index.html` in your browser, or serve the folder:

```bash
npx serve .
```

## Project structure

```
index.html, destination.html, crew.html, technology.html
css/style.css     all styles
js/script.js      mobile menu + the reusable setupTabs() function
js/data.js        destinations, crew and technology content
assets/           images and icons
```

## What I learned

- How to build accessible tabs (roles, aria-selected, roving tabindex, keyboard support) -->
- How <picture> picks a different image for each screen size and format
- Why one reusable function (setupTabs) is better than copying code into each page

## Possible improvements

- Load the content with `fetch` from a JSON file (needs a local server)
- Add page transitions and a subtle star-field animation
- Add automated accessibility checks
