
document.getElementById("PERT").addEventListener("click", PERT);
document.getElementById("GANTT").addEventListener("click", GANTT);
function PERT() {
    var $ = go.GraphObject.make;  // for more concise visual tree definitions

    myDiagram =
      $(go.Diagram, "myDiagram",
        {
          initialAutoScale: go.Diagram.Uniform,
          initialContentAlignment: go.Spot.Center,
          layout: $(go.LayeredDigraphLayout)
        });

    // The node template shows the activity name in the middle as well as
    // various statistics about the activity, all surrounded by a border.
    // The border's color is determined by the node data's ".critical" property.
    // Some information is not available as properties on the node data,
    // but must be computed -- we use converter functions for that.
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "Rectangle",  // the border
          { fill: "white" },
          new go.Binding("stroke", "critical",
                         function (b) { return (b ? "red" : "blue"); })),
        $(go.Panel, "Table",
          { padding: 0.5 },
          $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: "white", coversSeparators: true }),
          $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
          $(go.TextBlock,
            new go.Binding("text", "earlyStart"),
            { row: 0, column: 0, margin: 5, textAlign: "center" }),
          $(go.TextBlock,
            new go.Binding("text", "length"),
            { row: 0, column: 1, margin: 5, textAlign: "center" }),
          $(go.TextBlock,  // earlyFinish
            new go.Binding("text", "",
                           function(d) { return (d.earlyStart + d.length).toFixed(2); }),
            { row: 0, column: 2, margin: 5, textAlign: "center" }),

          $(go.TextBlock,
            new go.Binding("text", "text"),
            { row: 1, column: 0, columnSpan: 3, margin: 5,
              textAlign: "center", font: "bold 14px sans-serif" }),

          $(go.TextBlock,  // lateStart
            new go.Binding("text", "",
                           function(d) { return (d.lateFinish - d.length).toFixed(2); }),
            { row: 2, column: 0, margin: 5, textAlign: "center" }),
          $(go.TextBlock,  // slack
            new go.Binding("text", "",
                           function(d) { return (d.lateFinish - (d.earlyStart + d.length)).toFixed(2); }),
            { row: 2, column: 1, margin: 5, textAlign: "center" }),
          $(go.TextBlock,
            new go.Binding("text", "lateFinish"),
            { row: 2, column: 2, margin: 5, textAlign: "center" })
        )  // end Table Panel
      );  // end Node

    // The link data object does not have direct access to both nodes
    // (although it does have references to their keys: .from and .to).
    // This conversion function gets the GraphObject that was data-bound as the second argument.
    // From that we can get the containing Link, and then the Link.fromNode or .toNode,
    // and then its node data, which has the ".critical" property we need.
    //
    // But note that if we were to dynamically change the ".critical" property on a node data,
    // calling myDiagram.model.updateTargetBindings(nodedata) would only update the color
    // of the nodes.  It would be insufficient to change the appearance of any Links.
    function linkColorConverter(linkdata, elt) {
      var link = elt.part;
      if (!link) return "blue";
      var f = link.fromNode;
      if (!f || !f.data || !f.data.critical) return "blue";
      var t = link.toNode;
      if (!t || !t.data || !t.data.critical) return "blue";
      return "red";  // when both Link.fromNode.data.critical and Link.toNode.data.critical
    }

    // The color of a link (including its arrowhead) is red only when both
    // connected nodes have data that is ".critical"; otherwise it is blue.
    // This is computed by the binding converter function.
    myDiagram.linkTemplate =
      $(go.Link,
        $(go.Shape,
          new go.Binding("stroke", "", linkColorConverter)),
        $(go.Shape,  // arrowhead
          { toArrow: "Standard", stroke: null },
          new go.Binding("fill", "", linkColorConverter))
      );

    // here's the data defining the graph
    var nodeDataArray = [
      { key: 1, text: "Start", length: 0, earlyStart: 0, lateFinish: 0, critical: true },
      { key: 2, text: "a", length: 4, earlyStart: 0, lateFinish: 4, critical: true },
      { key: 3, text: "b", length: 5.33, earlyStart: 0, lateFinish: 9.17, critical: false },
      { key: 4, text: "c", length: 5.17, earlyStart: 4, lateFinish: 9.17, critical: true },
      { key: 5, text: "d", length: 6.33, earlyStart: 4, lateFinish: 15.01, critical: false },
      { key: 6, text: "e", length: 5.17, earlyStart: 9.17, lateFinish: 14.34, critical: true },
      { key: 7, text: "f", length: 4.5, earlyStart: 10.33, lateFinish: 19.51, critical: false },
      { key: 8, text: "g", length: 5.17, earlyStart: 14.34, lateFinish: 19.51, critical: true },
      { key: 9, text: "Finish", length: 0, earlyStart: 19.51, lateFinish: 19.51, critical: true }
    ];
    var linkDataArray = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 4, to: 6 },
      { from: 5, to: 7 },
      { from: 6, to: 8 },
      { from: 7, to: 9 },
      { from: 8, to: 9 }
    ];
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    // create an unbound Part that acts as a "legend" for the diagram
    myDiagram.add(
      $(go.Node, "Auto",
        $(go.Shape, "Rectangle",  // the border
          { fill: "lightblue" } ),
        $(go.Panel, "Table",
          $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { row: 1, separatorStroke: "black", background: "lightblue", coversSeparators: true }),
          $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
          $(go.TextBlock, "Early Start",
            { row: 0, column: 0, margin: 5, textAlign: "center" }),
          $(go.TextBlock, "Length",
            { row: 0, column: 1, margin: 5, textAlign: "center" }),
          $(go.TextBlock, "Early Finish",
            { row: 0, column: 2, margin: 5, textAlign: "center" }),

          $(go.TextBlock, "Activity Name",
            { row: 1, column: 0, columnSpan: 3, margin: 5,
              textAlign: "center", font: "bold 14px sans-serif" }),

          $(go.TextBlock, "Late Start",
            { row: 2, column: 0, margin: 5, textAlign: "center" }),
          $(go.TextBlock, "Slack",
            { row: 2, column: 1, margin: 5, textAlign: "center" }),
          $(go.TextBlock, "Late Finish",
            { row: 2, column: 2, margin: 5, textAlign: "center" })
        )  // end Table Panel
      ));
  }
function GANTT() {
      var $ = go.GraphObject.make;  // for conciseness in defining templates

      myDiagram =
        $(go.Diagram, "myDiagram",  // Diagram refers to its DIV HTML element by id
          {
            _widthFactor: 1,        // a scale for the nodes' positions and widths
            isReadOnly: true,       // deny the user permission to alter the diagram or zoom in or out
            allowZoom: false,
            "grid.visible": true,  // display a grid in the background of the diagram
            "grid.gridCellSize": new go.Size(30, 150)
          });

      // create the template for the standard nodes
      myDiagram.nodeTemplateMap.add("",
        $(go.Node, "Auto",
          // links come from the right and go to the left side of the top of the node
          { fromSpot: go.Spot.Right, toSpot: new go.Spot(0.001, 0, 11, 0) },
          $(go.Shape, "Rectangle",
            { height: 15 },
            new go.Binding("fill", "color"),
            new go.Binding("width", "width", function (w) { return scaleWidth(w); })),
          $(go.TextBlock,
            { margin: 2, alignment: go.Spot.Left },
            new go.Binding("text", "key")),
          // using a function in the Binding allows the value to
          // change when Diagram.updateAllTargetBindings is called
          new go.Binding("location", "loc",
                         function (l) { return new go.Point(scaleWidth(l.x), l.y); })
        ));

      // create the template for the nodes displaying dates
      // no shape, only a TextBlock
      myDiagram.nodeTemplateMap.add("date",
        $(go.Part,
          { selectable: false },
          new go.Binding("location", "loc",
                         function (l) { return new go.Point(scaleWidth(l.x), l.y); }),
          $(go.TextBlock,
            new go.Binding("text", "key"))
        ));

      //create the link template
      myDiagram.linkTemplate =
        $(go.Link,
          {
            routing: go.Link.Orthogonal,
            corner: 3, toShortLength: 2,
            selectable: false
          },
          $(go.Shape,
            { strokeWidth: 2 }),
          $(go.Shape,
            { toArrow: "OpenTriangle" })
        );

      // add the nodes and links to the model
      myDiagram.model = new go.GraphLinksModel(
      [ // node data
        { key: "testName1", color: "Red", width: 30, loc: new go.Point(scaleWidth(0), 40) },
        { key: "testName2", color: "Red", width: 160, loc: new go.Point(scaleWidth(0), 60) },
        { key: "testName3", color: "Red", width: 150, loc: new go.Point(scaleWidth(120), 80) },
        { key: "testName4", color: "Red", width: 190, loc: new go.Point(scaleWidth(120), 100) },
		{ key: "23Jul", category: "date", loc: new go.Point(scaleWidth(0), 0) },
        { key: "30Jul", category: "date", loc: new go.Point(scaleWidth(150), 0) },
        { key: "6Aug", category: "date", loc: new go.Point(scaleWidth(300), 0) },
        { key: "13Aug", category: "date", loc: new go.Point(scaleWidth(450), 0) }
      ]);
	      // scale the number according to the current widthFactor
    function scaleWidth(num) {
      return num * myDiagram._widthFactor;
    }
    }
