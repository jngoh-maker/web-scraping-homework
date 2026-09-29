const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
    const browser = await chromium.launchPersistentContext(
        "./canvas-session",
        {
            headless: false
        }
    );

    const page = await browser.newPage();

    console.log("Opening ALU Canvas...");

    await page.goto(
        "https://alueducation.instructure.com/courses/3130/assignments"
    );

    await page.waitForTimeout(3000);

    console.log("Finding assignments...");

    const assignments = await page.locator(".ig-row").evaluateAll(rows => {
        return rows.map(row => {
            const link = row.querySelector(".ig-title");
            const score = row.querySelector(".score-display");
            const status = row.querySelector(".js-score .screenreader-only");

            if (!link) return null;

            return {
                title: link.textContent.trim(),
                url: link.href,
                marks: score
                    ? score.textContent.trim()
                    : "Not available",
                status: status
                    ? status.textContent.trim()
                    : "Not available"
            };
        }).filter(Boolean);
    });

    console.log(`Found ${assignments.length} assignments.`);

    for (let i = 0; i < assignments.length; i++) {
        const assignment = assignments[i];

        console.log(
            `Scraping ${i + 1}/${assignments.length}: ${assignment.title}`
        );

        await page.goto(assignment.url);

        await page.waitForTimeout(500);

        const details = await page.locator("body").innerText();

        const lines = details
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        const dueIndex = lines.indexOf("Due");
        const pointsIndex = lines.indexOf("Points");

        assignment.dueDate =
            dueIndex !== -1 && lines[dueIndex + 1]
                ? lines[dueIndex + 1]
                : "No due date";

        assignment.points =
            pointsIndex !== -1 && lines[pointsIndex + 1]
                ? lines[pointsIndex + 1]
                : "Not available";

        const description = await page
            .locator(".description")
            .first()
            .textContent()
            .catch(() => null);

        assignment.description = description
            ? description.trim()
            : "No additional details were added for this assignment.";
    }

    fs.writeFileSync(
        "canvas_assignments.json",
        JSON.stringify(assignments, null, 2)
    );

    console.log("\nDONE!");
    console.log(`${assignments.length} assignments saved.`);
    console.log("File: canvas_assignments.json");

    await browser.close();
})();