# Nua Store

## Live Demo
[url ](https://nua-store-beige.vercel.app/)


## Tech Stack

- React 18
- Vite
- React Router
- Context API
- SCSS Modules
- Fake Store API

## Features

- Product listing page
- Product detail page
- Product image gallery
- Colour and size selection
- Variant selection reflected in URL
- Add to cart
- Cart drawer
- Update quantity from cart
- Remove items from cart
- Cart count badge in navbar
- Cart persistence using localStorage
- Responsive layout for desktop and mobile

## Setup

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

## Folder Structure

```text
src/
├── components
├── context
├── data
├── pages
├── services
└── styles
```

## Design Decisions

Please refer to `DECISIONS.md`.

## Trade-offs

The Fake Store API does not provide colour and size variants. To support the assignment requirements, variant data was created locally and mapped to products.

Context API was used instead of Redux because the application has a small amount of shared state and does not require a more complex state management solution.

## Lighthouse

A Lighthouse report screenshot is included in:

```text
docs/lighthouse-report.png
```

## Future Improvements

- Add unit tests
- Improve image optimization
- Add better API error handling
- Further improve Lighthouse performance
