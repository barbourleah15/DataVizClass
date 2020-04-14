// from tableData.js
var tableData = data;
let jQ = jQuery;

// YOUR CODE HERE!

let UFO = i => {
	let row;
	jQ('#ufoTable tbody').empty();
	i.forEach(d => {
		row = `
			<tr>
				<td>${d.datetime}</td>
				<td>${d.city}</td>
				<td>${d.state}</td>
				<td>${d.country}</td>
				<td>${d.shape}</td>
				<td>${d.durationMinutes}</td>
				<td>${d.comments}</td>
			</tr>
		`;
		jQ('#ufoTable tbody').append(row);
	})
};


UFO(tableData);

jQ('#filter-btn').click(() => {
	let searchDate =  jQ('#datetime').val();
	let searchResults = tableData.filter(d => d.datetime === searchDate);
	UFO(searchResults);
});

jQ('#reset-btn').click(() => {
	UFO(tableData);
});