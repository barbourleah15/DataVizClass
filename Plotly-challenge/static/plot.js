function buildMetadata(samples) 
{ 
    // Use `d3.json` to fetch the metadata for a sample
    let url = ("/metadata/"+samples);
    d3.json(url).then(function(response) 
    {
        // console.log(response);

        // Use d3 to select the panel with id of `#sample-metadata`
        let test = d3.select("#samples-metadata");

        // Use `.html("") to clear any existing metadata
        test.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(response).forEach(([key, value]) => test.append("p").text(`${key}: ${value}`));
    });
}
  
function buildCharts(samples) 
{
    let url = ("/samples/"+samples);
    d3.json(url).then(function(response) 
    {
        console.log(response);

        samplesValues = response.samples_values;
        samplesLables = response.otu_ids;
        samplesOtuLables = response.otu_labels;

        let pieObjects = [];
        for(let i =0; i < samplesValues.length; i++)
        {
            pieObjects.push({name:samplesOtuLables[i],age:samplesValues[i],label:samplesLables[i]});
        }
        pieObjects.sort(function(a, b)
        {
            return b.age-a.age
        });

        const left = pieObjects.slice(0, 10);

        let vals = [];
        let hoverIds = [];
        let newIds = [];
        for(let i =0; i < left.length; i++)
        {
            vals.push(left[i].age);   
            hoverIds.push(left[i].name);
            newIds.push(left[i].label);
        }

        var trace1 = 
        {
            labels: newIds,
            values: vals,
            text: hoverIds,
            textinfo: "percent",
            type: "pie"
        };  
        var data = [trace1];
        Plotly.newPlot("pie", data);


        var trace2 = 
        {
            x: samplesLables,
            y: samplesValues,
            text: samplesOtuLables,
            mode: 'markers',
            marker: 
            {
              size: samplesValues,
              color: samplesLables
            }
        };
        var data2 = [trace2];
        var layout2 = 
        {
            showlegend: false,
            xaxis: { title: "OTU ID" }
        };
        Plotly.newPlot('bubble', data2, layout2);
    });
}

function init() 
{
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/names").then((samplesNames) => {
        samplesNames.forEach((samples) => {
        selector
            .append("option")
            .text(samples)
            .property("value", samples);
        });

        // Use the first sample from the list to build the initial plots
        const firstsamples = samplesNames[0];
        buildCharts(firstsamples);
        buildMetadata(firstsamples);
    });
}

function optionChanged(newsamples) 
{
    // Fetch new data each time a new sample is selected
    buildCharts(newsamples);
    buildMetadata(newsamples);
}
  
// Initialize the dashboard
init();