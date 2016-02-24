document.getElementById("WBT").addEventListener("click", WBT);
document.getElementById("GANTT").addEventListener("click", GANTT);
function WBT() {
	google.charts.load('current', {packages:["orgchart"]});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'TopLink');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows([

          ['Jim','Andy'],
          ['Alice', 'Andy'],
          ['alex','Andy'],
          ['Jerry','Andy'],
          ['Fred', 'Alice'],
          ['Bob', 'Jim'],
          ['Carol', 'Bob']
        ]);

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('charts'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {allowHtml:true});
      }
}
function GANTT() {
	  google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var container = document.getElementById('charts');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'name' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows([
          ['This', new Date(2015, 0, 2), new Date(2015, 0, 4) ],
          ['Is',   new Date(2015, 0, 4),  new Date(2015, 0, 6) ],
          ['A', new Date(2015, 0, 6),  new Date(2015, 0, 8)],
          ['Test', new Date(2015, 0, 8),  new Date(2015, 0, 14)]
          ]);

        chart.draw(dataTable);
      }
}
