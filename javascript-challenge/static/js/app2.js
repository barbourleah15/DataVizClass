// Get references to the tbody element, input fields and button
let $tbody = document.querySelector("tbody");
let $dateInput = document.querySelector("#datetime");
let $cityInput = document.querySelector("#city");
let $stateInput = document.querySelector("#state");
let $countryInput = document.querySelector("#country");
let $shapeInput = document.querySelector("#shape");
let $durationMinutesInput = document.querySelector("#duration");
let $commentsInput = document.querySelector("#comments");
//let $searchBtn = document.querySelector("#search");
//let $resetBtn = document.querySelector("#reset");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
// Select the button
let button = d3.select("#button");

button.on("click", function() {

// Create a copy of the data
let tableData = data;

// Build table with non-filtered data
function renderTable() {
  $tbody.innerHTML = "";
  for (let i = 0; i < tableData.length; i++) {
    // Get current address object and fields
    let address = tableData[i];
    console.log(address)
    let fields = Object.keys(address);
    // Create new row in tbody, set index to be i + startingIndex
    let $row = $tbody.insertRow(i);
    for (let j = 0; j < fields.length; j++) {
      // For each field in address object, create new cell and set inner text to be current value at current address field
      let field = fields[j];
      let $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

// Build search table for filtered data
function handleSearchButtonClick() {
  let filterDate = $dateInput.value;
  
  // Filter on date
  if (filterDate != "") {
    tableData = data.filter(function (address) {
      let addressDate = address.datetime;
      return addressDate === filterDate;
    });
  }
  else { tableData };

 // renderTable();
}

// Clear all the fields
//function handleResetButtonClick(){
//  renderTable();
//}

// Render the table for the first time on page load
renderTable();
});