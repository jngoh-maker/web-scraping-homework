const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launchPersistentContext(
        "./canvas-session",
        {
            headless: false
        }
    );

    const page = await browser.newPage();

    await page.goto(
        "https://alueducation.instructure.com/courses/3130/assignments/45852"
    );

    console.log("Opening assignment page...");

    await page.waitForTimeout(5000);

    const text = await page.locator("body").innerText();

    console.log("\n--- PAGE TEXT ---\n");
    console.log(text);

    await browser.close();
})();