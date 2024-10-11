// Function to fetch and display the CSV data
async function fetchAndDisplayCsv() {
    try {
        const response = await fetch('https://compute.samford.edu/zohauth/clients/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/csv',
            },
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        // Get the text from the response
        const csvData = await response.text();

        // Parse CSV data
        const rows = csvData.split('\n').map(row => row.split(','));

        // Create an HTML table from the CSV data
        let html = '<table border="1"><thead><tr>';
        rows[0].forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr></thead><tbody>';

        // Add rows to the table
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].length > 1) { // Skip empty rows
                html += '<tr>';
                rows[i].forEach(cell => {
                    html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            }
        }
        html += '</tbody></table>';

        // Insert the HTML into the div with id 'data'
        document.getElementById('data').innerHTML = html;

    } catch (error) {
        console.error('Error fetching CSV:', error);
        document.getElementById('data').innerHTML = 'Error fetching data.';
    }
}

// Call the function to fetch and display the CSV data
fetchAndDisplayCsv();
