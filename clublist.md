<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>List of Clubs</title>
</head>
<body>
<h1>List of Clubs</h1>
<table id="clubsTable">
  <thead>
  <tr>
    <th>Club Name</th>
    <th>Registration Start Date</th>
    <th>Registration End Date</th>
    <th>Category</th>
    <th>Contact Email</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
  <!-- Rows will be added here by JavaScript -->
  </tbody>
</table>

<script>
  // Function to fetch CSV file and generate HTML table
  async function loadClubsData() {
    const response = await fetch('UH Mānoa Approved RIOs - 2023-2024 UHM Approved RIOs.csv')
    const data = await response.text();
    const tableBody = document.querySelector("#clubsTable tbody");

    // Split CSV into lines
    const lines = data.split('\n').slice(1); // Adjust slice as necessary to skip headers or initial lines

    lines.forEach(line => {
      const cols = line.split(','); // Adjust as necessary for your CSV structure
      const row = document.createElement('tr');
      cols.forEach(col => {
        const td = document.createElement('td');
        td.textContent = col.trim();
        row.appendChild(td);
      });
      tableBody.appendChild(row);
    });
  }

  // Call the function when the page loads
  window.addEventListener('load', loadClubsData);
</script>
</body>
</html>
