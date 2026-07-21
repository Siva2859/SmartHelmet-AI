document.addEventListener("DOMContentLoaded", () => {

    loadWorkers();

});

function loadWorkers() {

    const savedData = localStorage.getItem("detectionResult");

    if (!savedData) {

        alert("No worker data found.");

        return;

    }

    const data = JSON.parse(savedData);

    const tbody = document.querySelector("#workersTable tbody");

    tbody.innerHTML = "";

    let id = 1;

    data.detections.forEach(item => {

        tbody.innerHTML += `

        <tr>

            <td>${id}</td>

            <td>

                <img
                    src="../assets/images/Profile.png"
                    width="50"
                    height="50"
                    style="border-radius:50%;object-fit:cover;">

            </td>

            <td>Worker ${id}</td>

            <td>

                <span class="safe">

                    ${item.class === "Hardhat" ? "Yes" : "No"}

                </span>

            </td>

            <td>

                <span class="warning">

                    Unknown

                </span>

            </td>

            <td>

                ${(item.confidence * 100).toFixed(1)}%

            </td>

            <td>

                <span class="safe">

                    Safe

                </span>

            </td>

            <td>

                <button
                    class="primary-btn"
                    onclick="viewWorker(${id})">

                    View

                </button>

            </td>

        </tr>

        `;

        id++;

    });

}

function viewWorker(id){

    alert("Worker " + id + " details coming soon.");

}

