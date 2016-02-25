//Loads the google chart packages
google.charts.load('current', {'packages':['timeline', 'orgchart']});

//Event Listeners
document.getElementById("WBT").addEventListener("click", WBT);
document.getElementById("GANTT").addEventListener("click", GANTT);
document.getElementById("PERT").addEventListener("click", PERT);
document.getElementById("addButton").addEventListener("click",inputs);

//Arrays for the charts
var ganttArray = [];
var wbtArray = [];

// Variable that records the current chart in user
var chosen = "WBT";

// Validation of user inputs
function inputValidate(vName, vName2, vStart, vEnd) {
  var inputBool = true;
  if ((vName.length < 1) || (vName2.length < 1) || ((vStart == "") || (vStart == null)) || ((vEnd == "") || (vEnd == null))) {
    inputBool = false;
  }
  if (new Date(vEnd).getDate() < new Date(vStart).getDate()) {
    inputBool = false;
    Alert("Please enter an end date that is after the start date.")
  }
  return inputBool;
}

//Taking user input to create the charts
function inputs() {
  var name = document.getElementById("input").elements[0].value;
  var linkName = document.getElementById("input").elements[1].value;
  var start = document.getElementById("input").elements[2].value;
  var end = document.getElementById("input").elements[3].value;
  var validation = inputValidate(name, linkName, start, end);
  if (validation) {
    var ganttInput = [name, new Date(start), new Date(end)];
    var wbtInput = [name, linkName];
    ganttArray.push(ganttInput);
    wbtArray.push(wbtInput);
    pageRefresh();
  }

}

//WBT function for the chart
function WBT() {
    chosen = "WBT"; // records user's graph choice
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'TopLink');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows(wbtArray);

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('charts'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {allowHtml:false});
      }
}

//GANTT function for the chart
function GANTT() {
      chosen = "Gantt"; // Records user's graph choice
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var container = document.getElementById('charts');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'name' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows(ganttArray);

        chart.draw(dataTable);
      }
}

// Refresh charts
function pageRefresh() {
  console.log("Attempting refresh");
  switch(chosen) {
    case "WBT":
      WBT();
      break;
    case "PERT":
      console.log("No Pert chart yet.");
      break;
    case "Gantt":
      GANTT();
      break;
  }
}
