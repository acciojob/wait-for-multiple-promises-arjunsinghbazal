//your JS code here. If required.
// Get the table body element
const tableBody = document.querySelector("#output");

// Create an array with 3 Promises
const promises = [
  createRandomPromise(),
  createRandomPromise(),
  createRandomPromise()
];

// Add a loading row to the table
const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.setAttribute("colspan", "2");
loadingCell.textContent = "Loading...";
loadingRow.appendChild(loadingCell);
tableBody.appendChild(loadingRow);

// Wait for all the Promises to resolve using Promise.all
Promise.all(promises)
  .then(results => {
    // Remove the loading row from the table
    tableBody.removeChild(loadingRow);

    // Populate the table with the Promise results
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = `Promise ${i + 1}`;
      const timeCell = document.createElement("td");
      timeCell.textContent = `${result.toFixed(3)}`;
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      tableBody.appendChild(row);
    }

    // Add a row for the total time taken
    const totalTime = results.reduce((acc, curr) => acc + curr, 0);
    const totalRow = document.createElement("tr");
    const totalNameCell = document.createElement("td");
    totalNameCell.textContent = "Total";
    const totalTimeCell = document.createElement("td");
    totalTimeCell.textContent = `${totalTime.toFixed(3)}`;
    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    tableBody.appendChild(totalRow);
  });

// Helper function to create a Promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise() {
  const randomTime = Math.floor(Math.random() * 3000) + 1000;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(randomTime / 1000);
    }, randomTime);
  });
}