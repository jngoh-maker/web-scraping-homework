# ALU Canvas Assignment Scraper

A Playwright project that scrapes assignment information from my ALU Canvas Frontend Web Development course and saves it as a JSON file.

## What it does

The scraper collects:

* Assignment title
* Due date
* Marks
* Submission status
* Grade
* Description
* Assignment URL

It currently scrapes 23 assignments.

I also created a simple web interface where the scraped assignments can be viewed, searched, and filtered.

## Tools Used

* JavaScript
* Node.js
* Playwright
* HTML
* CSS
* JSON

## Project Structure

```text
web-scraping-homework/
│
├── UI/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── scraper.js
├── canvas_assignments.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## How to Run

Install the dependencies:

```bash
npm install
```

Install Chromium for Playwright:

```bash
npx playwright install chromium
```

Run the scraper:

```bash
node scraper.js
```

Canvas will open in the browser. Log in with the ALU Google account if required.

The scraped data is saved in:

```text
canvas_assignments.json
```

To view the web interface, start a local server:

```bash
npx http-server .
```

Then open:

```text
http://127.0.0.1:8080/UI/
```

## Note

The Canvas login session is stored locally in `canvas-session` and is excluded from GitHub using `.gitignore`.

## Author

Juliana Ngoh
African Leadership University
BSE Software Engineering







