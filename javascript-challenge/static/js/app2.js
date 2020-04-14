// from tableData.js
var tableData = data;
let jQ = jQuery;

// YOUR CODE HERE!

let UFOtable = i => {
	let row;
	jQ('#UFO tbody').empty();
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
		jQ('#UFO tbody').append(row);
	})
};


UFOtable(tableData);

jQ('#button').click(() => {
	let Date =  $('#datetime').val();
	let Results = tableData.filter(d => d.datetime === Date);
	UFOtable(Results);
});
