function filterData() {
  event.preventDefault();

  // Get the start and end dates from the input fields
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;

  // Parse the dates into Date objects for comparison
  var startDateObj = new Date(startdate);
  var endDateObj = new Date(enddate);

  // Log the dates for debugging purposes
  console.log("Start Date:", startdate);
  console.log("End Date:", enddate);

  // Get all rows of the table body (skip the header row)
  var rows = document.querySelectorAll("#pitch-data tr");

  // Loop through each row and hide/show based on the date
  rows.forEach(row => {
    var dateText = row.cells[1].textContent;  // Assuming Date is in the second column (index 1)
    var rowDateObj = new Date(dateText);

    // Check if the row date is within the range
    if (rowDateObj >= startDateObj && rowDateObj <= endDateObj) {
      row.style.display = "";  // Show row if it's in range
    } else {
      row.style.display = "none";  // Hide row if it's out of range
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('pitch-data');

  // Fetch the data from the URL
  fetch('https://compute.samford.edu/zohauth/clients/datajson/1')
      .then(response => response.json())
      .then(data => {
          // Loop through the fetched data and populate the table rows
          data.forEach(pitch => {
              const row = document.createElement('tr');

              row.innerHTML = `
                  <td><a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a></td>
                  <td>${pitch.Date}</td>
                  <td>${pitch.Time}</td>
                  <td>${pitch.Batter}</td>
                  <td>${pitch.Balls}</td>
                  <td>${pitch.Strikes}</td>
                  <td>${pitch.Outs}</td>
                  <td>${pitch.PitchCall}</td>
                  <td>${pitch.KorBB || ''}</td>
                  <td>${pitch.RelSpeed || ''}</td>
                  <td>${pitch.SpinRate || ''}</td>
                  <td>${pitch.SpinAxis || ''}</td>
              `;

              tableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});