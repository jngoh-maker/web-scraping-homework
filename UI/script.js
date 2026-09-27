let assignments = [];

const assignmentsContainer =
    document.getElementById("assignmentsContainer");

const totalAssignments =
    document.getElementById("totalAssignments");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");


// LOAD JSON DATA

async function loadAssignments() {

    try {

        const response =
            await fetch("../canvas_assignments.json");

        if (!response.ok) {
            throw new Error("Could not load assignment data.");
        }

        assignments = await response.json();

        totalAssignments.textContent =
            assignments.length;

        displayAssignments(assignments);

    } catch (error) {

        assignmentsContainer.innerHTML = `
            <p class="no-results">
                Could not load assignments.
                Make sure the project is running through a local server.
            </p>
        `;

        console.error(error);
    }
}


// DISPLAY ASSIGNMENTS

function displayAssignments(data) {

    if (data.length === 0) {

        assignmentsContainer.innerHTML = `
            <p class="no-results">
                No assignments found.
            </p>
        `;

        return;
    }

    assignmentsContainer.innerHTML =
        data.map((assignment, index) => {

            return `
                <article class="assignment-card">

                    <span class="assignment-number">
                        ASSIGNMENT ${index + 1}
                    </span>

                    <h2 class="assignment-title">
                        ${escapeHTML(assignment.title)}
                    </h2>

                    <p class="description">
                        ${escapeHTML(assignment.description)}
                    </p>

                    <div class="details">

                        <div class="detail">
                            <span class="detail-label">
                                DUE DATE
                            </span>

                            <span class="detail-value">
                                ${escapeHTML(assignment.dueDate)}
                            </span>
                        </div>

                        <div class="detail">
                            <span class="detail-label">
                                MARKS
                            </span>

                            <span class="detail-value">
                                ${escapeHTML(assignment.marks)}
                            </span>
                        </div>

                        <div class="detail">
                            <span class="detail-label">
                                STATUS
                            </span>

                            <span class="detail-value">
                                ${escapeHTML(assignment.status)}
                            </span>
                        </div>

                        <div class="detail">
                            <span class="detail-label">
                                GRADE
                            </span>

                            <span class="detail-value">
                                ${escapeHTML(assignment.grade)}
                            </span>
                        </div>

                    </div>

                    <a
                        href="${assignment.url}"
                        target="_blank"
                        class="view-button"
                    >
                        View on Canvas →
                    </a>

                </article>
            `;

        }).join("");
}


// SEARCH + FILTER

function filterAssignments() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const filter =
        statusFilter.value;

    const filtered =
        assignments.filter(assignment => {

            const matchesSearch =
                assignment.title
                    .toLowerCase()
                    .includes(searchTerm);

            let matchesFilter = true;

            if (filter === "graded") {

                matchesFilter =
                    assignment.grade !== "Not graded";
            }

            if (filter === "not-graded") {

                matchesFilter =
                    assignment.grade === "Not graded";
            }

            if (filter === "submitted") {

                matchesFilter =
                    !assignment.status
                        .toLowerCase()
                        .includes("no submission");
            }

            if (filter === "not-submitted") {

                matchesFilter =
                    assignment.status
                        .toLowerCase()
                        .includes("no submission");
            }

            return matchesSearch && matchesFilter;
        });

    displayAssignments(filtered);
}


searchInput.addEventListener(
    "input",
    filterAssignments
);

statusFilter.addEventListener(
    "change",
    filterAssignments
);


// SECURITY

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text ?? "";

    return div.innerHTML;
}


// START

loadAssignments();