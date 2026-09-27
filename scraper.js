const { chromium } = require('playwright');
const fs = require('fs');

async function scrapeALUCanvas() {
    const context = await chromium.launchPersistentContext(
        './canvas-session',
        {
            headless: false
        }
    );

    const page = await context.newPage();

    console.log("Opening ALU Canvas...");

    await page.goto(
        "https://alueducation.instructure.com/courses/3130/assignments",
        {
            waitUntil: "domcontentloaded",
            timeout: 60000
        }
    );

    console.log("Please log in if Canvas asks you to.");

    await page.waitForURL("**/courses/**", { timeout: 0 });

    console.log("Login successful!");
    console.log("Canvas is ready!");

    const assignmentRows = await page.locator(".ig-row").all();

    console.log(`Found ${assignmentRows.length} assignment rows.`);

    const assignments = [];

    for (const row of assignmentRows) {
        const titleElement = row.locator(".ig-title");

        const title = (await titleElement.innerText()).trim();
        const href = await titleElement.getAttribute("href");

        const rowText = await row.innerText();

        const lines = rowText
            .split("\n")
            .map(line => line.trim())
            .filter(line => line !== "");

        const marks = lines.find(line =>
            line.includes("pts")
        ) || "No marks";

        const status = lines.find(line =>
            line.includes("Score:") ||
            line.includes("No submission") ||
            line.includes("Not Yet Graded")
        ) || "No status";

        console.log(`\nScraping: ${title}`);

        const assignmentPage = await context.newPage();

        try {
            await assignmentPage.goto(href, {
                waitUntil: "domcontentloaded",
                timeout: 60000
            });

            await assignmentPage.waitForTimeout(1500);

            const pageText = await assignmentPage.locator("body").innerText();

            // Get due date
            let dueDate = "No due date";

            const dueMatch = pageText.match(
                /Due\s+([\s\S]*?)\s+Points/i
            );

            if (dueMatch) {
                dueDate = dueMatch[1]
                    .replace(/\n/g, " ")
                    .replace(/\s+/g, " ")
                    .trim();
            }

            // Get description
            let description = "No description";

            if (pageText.includes("No additional details were added for this assignment.")) {
                description = "No additional details were added for this assignment.";
            } else {
                const titleIndex = pageText.indexOf(title);

                const dueIndex = pageText.indexOf("Due", titleIndex);

                if (titleIndex !== -1 && dueIndex !== -1) {
                    const possibleDescription = pageText
                        .substring(titleIndex + title.length, dueIndex)
                        .trim();

                    if (possibleDescription.length > 0) {
                        description = possibleDescription
                            .replace(/\n+/g, " ")
                            .replace(/\s+/g, " ")
                            .trim();
                    }
                }
            }

            // Get grade if available
            let grade = "Not graded";

            const gradeMatch = pageText.match(
                /Grade:\s*([^\n]+)/i
            );

            if (gradeMatch) {
                grade = gradeMatch[1].trim();
            }

            assignments.push({
                title: title,
                dueDate: dueDate,
                status: status,
                marks: marks,
                grade: grade,
                description: description,
                url: href
            });

            console.log("Due date:", dueDate);
            console.log("Marks:", marks);
            console.log("Grade:", grade);
            console.log("Status:", status);

        } catch (error) {
            console.log(`Could not scrape: ${title}`);
            console.log(error.message);

            assignments.push({
                title: title,
                dueDate: "Could not retrieve",
                status: status,
                marks: marks,
                grade: "Could not retrieve",
                description: "Could not retrieve",
                url: href
            });
        }

        console.log("--------------------");

        await assignmentPage.close();
    }

    fs.writeFileSync(
        "canvas_assignments.json",
        JSON.stringify(assignments, null, 2)
    );

    console.log("\n====================================");
    console.log("SCRAPING COMPLETE!");
    console.log(`Total assignments: ${assignments.length}`);
    console.log("Saved to: canvas_assignments.json");
    console.log("====================================");

    await context.close();
}

scrapeALUCanvas();