\# ALU Canvas Assignment Scraper



This project uses \*\*Playwright\*\* to scrape assignment information from my ALU Canvas course.



The scraper opens Canvas, allows me to log in manually using Google SSO and 2FA, then goes through the assignment pages and saves the information in a JSON file.



I also created a small web page to display the scraped assignments.



\## What it collects



For each assignment, the scraper collects:



\* Assignment title

\* Due date

\* Marks

\* Submission status

\* Grade

\* Description

\* Canvas URL



The scraper currently collects \*\*23 assignments\*\* from the Frontend Web Development course.



\## Technologies



\* JavaScript

\* Node.js

\* Playwright

\* HTML

\* CSS

\* JSON



\## Files



```text

web-scraping-homework/

│

├── UI/

│   ├── index.html

│   ├── script.js

│   └── style.css

│

├── scraper.js

├── canvas\_assignments.json

├── package.json

├── package-lock.json

├── .gitignore

└── README.md

```



\## How to run the scraper



First install the dependencies:



```bash

npm install

```



Then install the Playwright browser:



```bash

npx playwright install chromium

```



Run the scraper:



```bash

node scraper.js

```



Canvas will open in a browser. If necessary, log in using the ALU Google account and complete 2FA.



The scraped data will be saved in:



```text

canvas\_assignments.json

```



\## How to view the dashboard



Start a local server from the project folder:



```bash

npx http-server .

```



Then open:



```text

http://127.0.0.1:8080/UI/

```



The dashboard shows the assignments and allows them to be searched and filtered.



\## Note



The `canvas-session` folder contains the saved browser session and is ignored by Git so that login information is not uploaded to GitHub.



\## Author



\*\*Juliana Ngoh\*\*

African Leadership University

BSE Software Engineering







