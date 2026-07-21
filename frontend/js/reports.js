if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

/* =====================================================
   REPORTS.JS - PART 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadReports();

    initializeSearch();

});

/* ==========================================
   Load Reports
========================================== */

function loadReports() {

    const savedReports = localStorage.getItem("reports");

    if (!savedReports) {

        console.log("No reports found.");

        return;

    }

    const reports = JSON.parse(savedReports);

    updateStatistics(reports);

    populateTable(reports);

}

/* ==========================================
   Statistics
========================================== */

function updateStatistics(reports) {

    document.getElementById("totalReports").innerText =
        reports.length;

    const safe =
        reports.filter(r => r.status === "Safe").length;

    const warning =
        reports.filter(r => r.status === "Warning").length;

    const critical =
        reports.filter(r => r.status === "Critical").length;

    document.getElementById("safeReports").innerText = safe;

    document.getElementById("warningReports").innerText = warning;

    document.getElementById("criticalReports").innerText = critical;

}

/* ==========================================
   Report Table
========================================== */

function populateTable(reports) {

    const tbody = document.getElementById("reportTable");

    tbody.innerHTML = "";

    reports.forEach(report => {

        tbody.innerHTML += `

        <tr>

            <td>${report.id}</td>

            <td>${report.date}</td>

            <td>${report.workers}</td>

            <td>${report.violations}</td>

            <td>

                <span class="status ${getStatusClass(report.status)}">

                    ${report.status}

                </span>

            </td>

            <td>

                <button class="action-btn view"

                    onclick="viewReport('${report.id}')">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button class="action-btn download"

                    onclick="downloadReport('${report.id}')">

                    <i class="fa-solid fa-download"></i>

                </button>

                <button class="action-btn delete"

                    onclick="deleteReport('${report.id}')">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

/* ==========================================
   Status Class
========================================== */

function getStatusClass(status) {

    if (status === "Safe") return "success";

    if (status === "Warning") return "warning";

    return "error";

}

/* ==========================================
   Search
========================================== */

function initializeSearch() {

    const input = document.getElementById("searchReport");

    if (!input) return;

    input.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll("#reportTable tr")
            .forEach(row => {

                row.style.display =
                    row.innerText.toLowerCase().includes(value)
                    ? ""
                    : "none";

            });

    });

}

/* =====================================================
   REPORTS.JS - PART 2
===================================================== */

/* ==========================================
   View Report
========================================== */

function viewReport(reportId) {

    localStorage.setItem("selectedReport", reportId);

    window.location.href = "report-details.html";

}

/* ==========================================
   Download Report
========================================== */

function downloadReport(reportId) {

    window.open(

        `http://127.0.0.1:8000/reports/${reportId}/pdf`,

        "_blank"

    );

}

/* ==========================================
   Delete Report
========================================== */

function deleteReport(reportId) {

    if (!confirm("Delete this report?")) return;

    let reports = JSON.parse(

        localStorage.getItem("reports")

    ) || [];

    reports = reports.filter(

        report => report.id !== reportId

    );

    localStorage.setItem(

        "reports",

        JSON.stringify(reports)

    );

    loadReports();

}

/* ==========================================
   Filter Reports
========================================== */

const filterBtn = document.getElementById("filterBtn");

if (filterBtn) {

    filterBtn.addEventListener("click", () => {

        const fromDate = document.getElementById("fromDate").value;

        const toDate = document.getElementById("toDate").value;

        const status = document.getElementById("reportStatus").value;

        let reports = JSON.parse(

            localStorage.getItem("reports")

        ) || [];

        if (status) {

            reports = reports.filter(

                report => report.status === status

            );

        }

        if (fromDate) {

            reports = reports.filter(

                report => report.date >= fromDate

            );

        }

        if (toDate) {

            reports = reports.filter(

                report => report.date <= toDate

            );

        }

        populateTable(reports);

    });

}

/* ==========================================
   Refresh Reports
========================================== */

const refreshBtn = document.getElementById("refreshReports");

if (refreshBtn) {

    refreshBtn.addEventListener("click", () => {

        fetchReports();

    });

}

/* ==========================================
   Fetch Reports
========================================== */

async function fetchReports() {

    try {

        const response = await fetch(

            "http://127.0.0.1:8000/reports"

        );

        if (!response.ok) {

            throw new Error("Unable to fetch reports");

        }

        const reports = await response.json();

        localStorage.setItem(

            "reports",

            JSON.stringify(reports)

        );

        loadReports();

    }

    catch (error) {

        console.error(error);

    }

}

/* ==========================================
   Generate Report
========================================== */

const generateBtn = document.getElementById("generateReport");

if (generateBtn) {

    generateBtn.addEventListener("click", () => {

        window.open(

            "http://127.0.0.1:8000/reports/generate",

            "_blank"

        );

    });

}

/* ==========================================
   Download CSV
========================================== */

const csvBtn = document.getElementById("downloadCSV");

if (csvBtn) {

    csvBtn.addEventListener("click", () => {

        window.open(

            "http://127.0.0.1:8000/reports/csv",

            "_blank"

        );

    });

}

/* ==========================================
   Download PDF
========================================== */

const pdfBtn = document.getElementById("downloadAllPDF");

if (pdfBtn) {

    pdfBtn.addEventListener("click", () => {

        window.open(

            "http://127.0.0.1:8000/reports/pdf",

            "_blank"

        );

    });

}

/* ==========================================
   Print Reports
========================================== */

const printBtn = document.getElementById("printReports");

if (printBtn) {

    printBtn.addEventListener("click", () => {

        window.print();

    });

}

/* ==========================================
   Auto Refresh
========================================== */

setInterval(() => {

    fetchReports();

}, 60000);

/* ==========================================
   Initialize
========================================== */

window.addEventListener("load", () => {

    fetchReports();

    console.log("Reports Module Ready");

});