// Get references to the tbody element, input fields and button
let $tbody = document.querySelector("tbody");
let $dateInput = document.querySelector("#datetime");
let $cityInput = document.querySelector("#city");
let $stateInput = document.querySelector("#state");
let $countryInput = document.querySelector("#country");
let $shapeInput = document.querySelector("#shape");
let $durationMinutesInput = document.querySelector("#duration");
let $commentsInput = document.querySelector("#comments");

let button = d3.select("#button");

button.on("click", function() {

// Get a reference to the table body
var tbody = d3.select("tbody");

// Console.log the weather data from data.js
console.log(data);

// // Step 1: Loop Through `data` and console.log each weather report object
data.forEach(function(sightingReport) {
console.log(sightingReport);
});

// // Step 2:  Use d3 to append one table row `tr` for each weather report object
// // Don't worry about adding cells or text yet, just try appending the `tr` elements.
data.forEach(function(sightingReport) {
console.log(sightingReport);
var row = tbody.append("tr");
});

// // Step 3:  Use `Object.entries` to console.log each weather report value
data.forEach(function(sightingReport) {
console.log(sightingReport);
var row = tbody.append("tr");

Object.entries(sightingReport).forEach(function([key, value]) {
console.log(key, value);
});
});

// // Step 4: Use d3 to append 1 cell per weather report value (weekday, date, high, low)
data.forEach(function(sightingReport) {
console.log(sightingReport);
var row = tbody.append("tr");

Object.entries(sightingReport).forEach(function([key, value]) {
console.log(key, value);
//     // Append a cell to the row for each value
//     // in the weather report object
var cell = row.append("td");
});
});

// // Step 5: Use d3 to update each cell's text with
// // weather report values (weekday, date, high, low)
data.forEach((sightingReport) => {
  var row = tbody.append("tr");
  Object.entries(sightingReport).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});

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
}
    renderTable();
});
