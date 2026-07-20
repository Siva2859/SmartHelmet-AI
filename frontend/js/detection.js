/* =====================================================
   DETECTION.JS - PART 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadDetectionData();

    initializeSearch();

});

/* ==========================================
   Load Detection Data
========================================== */

function loadDetectionData() {

    const savedData = localStorage.getItem("detectionResult");

    if (!savedData) {

        console.log("No detection data found.");

        return;

    }

    const data = JSON.parse(savedData);

    updateImage(data);

    updateSummary(data);

    updateTable(data);

}

/* ==========================================
   Display Image
========================================== */

function updateImage(data) {

    const image = document.getElementById("detectedImage");

    if (!image) return;

    if (data.annotated_image) {

        image.src = data.annotated_image;

    }

}

/* ==========================================
   Summary
========================================== */

function updateSummary(data) {

    document.getElementById("workerCount").innerText =
        data.total_workers ?? 0;

    document.getElementById("helmetCount").innerText =
        (data.helmet_percentage ?? 0) + "%";

    document.getElementById("vestCount").innerText =
        (data.vest_percentage ?? 0) + "%";

    document.getElementById("violationCount").innerText =
        data.violations ?? 0;

    document.getElementById("workersDetected").innerText =
        data.total_workers ?? 0;

    document.getElementById("helmetSafe").innerText =
        data.helmet_safe ?? 0;

    document.getElementById("vestSafe").innerText =
        data.vest_safe ?? 0;

    document.getElementById("unsafeWorkers").innerText =
        data.violations ?? 0;

}

/* ==========================================
   Detection Table
========================================== */

function updateTable(data) {

    const tbody = document.getElementById("detectionTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (!data.results) return;

    data.results.forEach((worker, index) => {

        tbody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${worker.name}</td>

            <td>

                <span class="status ${worker.helmet ? "success":"error"}">

                    ${worker.helmet ? "Yes":"No"}

                </span>

            </td>

            <td>

                <span class="status ${worker.vest ? "success":"error"}">

                    ${worker.vest ? "Yes":"No"}

                </span>

            </td>

            <td>${worker.confidence}%</td>

            <td>

                <span class="status ${worker.safe ? "success":"warning"}">

                    ${worker.safe ? "Safe":"Violation"}

                </span>

            </td>

        </tr>

        `;

    });

}

/* ==========================================
   Search Table
========================================== */

function initializeSearch() {

    const input = document.querySelector(".search-box input");

    if (!input) return;

    input.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll("#detectionTable tr")
            .forEach(row => {

                row.style.display =
                    row.innerText.toLowerCase().includes(value)
                        ? ""
                        : "none";

            });

    });

}

/* =====================================================
   DETECTION.JS - PART 2
===================================================== */

/* ==========================================
   Buttons
========================================== */

const refreshBtn = document.getElementById("refreshBtn");
const pdfBtn = document.getElementById("pdfBtn");
const csvBtn = document.getElementById("csvBtn");
const downloadImageBtn = document.getElementById("downloadImageBtn");
const newDetectionBtn = document.getElementById("newDetectionBtn");


/* ==========================================
   Refresh Detection
========================================== */

if (refreshBtn) {

    refreshBtn.addEventListener("click", async () => {

        await fetchDetectionResults();

    });

}


/* ==========================================
   Fetch Latest Detection
========================================== */

async function fetchDetectionResults() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/detection/latest"
        );

        if (!response.ok) {

            throw new Error("Failed to fetch data.");

        }

        const data = await response.json();

        localStorage.setItem(
            "detectionResult",
            JSON.stringify(data)
        );

        updateImage(data);

        updateSummary(data);

        updateTable(data);

        console.log("Detection updated.");

    }

    catch (error) {

        console.error(error);

        alert("Unable to fetch latest detection.");

    }

}


/* ==========================================
   Download Annotated Image
========================================== */

if (downloadImageBtn) {

    downloadImageBtn.addEventListener("click", () => {

        const image = document.getElementById("detectedImage");

        if (!image || !image.src) {

            alert("No annotated image available.");

            return;

        }

        const link = document.createElement("a");

        link.href = image.src;

        link.download = "annotated_detection.jpg";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    });

}


/* ==========================================
   Download PDF
========================================== */

if (pdfBtn) {

    pdfBtn.addEventListener("click", () => {

        window.open(

            "http://127.0.0.1:8000/report/pdf",

            "_blank"

        );

    });

}


/* ==========================================
   Download CSV
========================================== */

if (csvBtn) {

    csvBtn.addEventListener("click", () => {

        window.open(

            "http://127.0.0.1:8000/report/csv",

            "_blank"

        );

    });

}


/* ==========================================
   New Detection
========================================== */

if (newDetectionBtn) {

    newDetectionBtn.addEventListener("click", () => {

        window.location.href = "upload.html";

    });

}


/* ==========================================
   Auto Refresh
========================================== */

setInterval(() => {

    fetchDetectionResults();

}, 60000);


/* ==========================================
   Loader
========================================== */

function showLoader() {

    document.body.classList.add("loading");

}

function hideLoader() {

    document.body.classList.remove("loading");

}


/* ==========================================
   Notification
========================================== */

function showMessage(message) {

    console.log(message);

}


/* ==========================================
   Initialize
========================================== */

window.addEventListener("load", () => {

    fetchDetectionResults();

    console.log("Detection Page Ready");

});