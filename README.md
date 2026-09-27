\# ALU Canvas Assignment Scraper



A Node.js web scraping project built with Playwright to collect assignment information from an ALU Canvas course and display the results in a simple web interface.



\## Project Overview



This project automatically visits the ALU Canvas assignments page using Playwright, collects assignment information, and saves the scraped data into a JSON file.



The project also includes a simple dashboard that displays the scraped assignments in a user-friendly format.



\## Features



\- Scrapes assignments from ALU Canvas

\- Uses Playwright browser automation

\- Supports manual Canvas login with Google SSO and 2FA

\- Uses a persistent browser session

\- Extracts:

&#x20; - Assignment title

&#x20; - Due date

&#x20; - Marks

&#x20; - Submission status

&#x20; - Grade

&#x20; - Assignment description

&#x20; - Canvas assignment URL

\- Saves the results to `canvas\_assignments.json`

\- Includes a searchable assignment dashboard

\- Includes assignment filtering

\- Provides links back to the original Canvas assignments

\- Responsive interface for different screen sizes



\## Technologies Used



\- JavaScript

\- Node.js

\- Playwright

\- HTML

\- CSS

\- JSON



\## Project Structure



```text

web-scraping-homework/

│

├── UI/

│   ├── index.html

│   ├── script.js

│   └── style.css

│

├── canvas\_assignments.json

├── scraper.js

├── package.json

├── package-lock.json

├── .gitignore

└── README.md

