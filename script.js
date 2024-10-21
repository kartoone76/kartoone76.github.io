function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log(startdate);
  console.log(enddate);
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