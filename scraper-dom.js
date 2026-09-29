const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    console.log("Opening ALU Canvas...");

    await page.goto("https://alueducation.instructure.com/courses/3130/assignments");

    console.log("Log in to Canvas if needed.");

    await page.waitForURL("**/courses/3130/assignments", {
        timeout: 120000
    });

    console.log("Canvas is ready!");

    fs.writeFileSync("dom.html", await page.content());

    console.log("Canvas HTML saved to dom.html");

    await browser.close();
})();