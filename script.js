
// Function to fetch the CSV data
async function downloadCsv() {
    try {
        const response = await fetch('https://compute.samford.edu/zohauth/clients/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/csv',
            },
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Create a blob from the response
        const blob = await response.blob();

        // Create a link element
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'random_data.csv';

        // Append the link to the body
        document.body.appendChild(a);
        a.click();

        // Clean up and remove the link
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
}

// Call the function to download the CSV
downloadCsv();
