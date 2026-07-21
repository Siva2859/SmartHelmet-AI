document.addEventListener("DOMContentLoaded", () => {

    loadHistory();

});

async function loadHistory() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/history"
        );

        const data = await response.json();

        const table =
            document.getElementById("historyTable");

        table.innerHTML = "";

        data.forEach(item => {

            table.innerHTML += `
            <tr>

                <td>${item.id}</td>

                <td>${item.image_name}</td>

                <td>${item.total_workers}</td>

                <td>${item.helmet_count}</td>

                <td>${item.violations}</td>

                <td>${item.created_at}</td>

            </tr>
            `;

        });

    }

    catch(err){

        console.error(err);

    }

}