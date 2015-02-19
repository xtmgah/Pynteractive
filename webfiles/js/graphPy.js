var ajaxRequest;
var data;
var network;
var timeline;

//crear mapa de edges bidireccionals i no repetir !!!
var edgesBidirectional = {};
//var nodesMap = [];
var nodesMap = new vis.DataSet();
var edgesMap = new vis.DataSet();
var items = new vis.DataSet();
var groups = new vis.DataSet();
var nodes, edges;

var container = document.getElementById('network');

$(function () {
	load(data);
});

setInterval(
	function(){
		SC.send("getGraphUpdates",{},paintUpdates)
  	},2000);

function paintUpdates(obj)
{
	for (index = 0; index < obj.length; index++)
	{
		if (obj[index][0]=='addNode')
			{
				addNode(obj[index][1]);
			}
		else if (obj[index][0]=='addEdge')
		{
			addLink(obj[index][1],obj[index][2]);
		}
	}
}

function load(data) {

	//load node
	addNode("1");
	addNode("2");
	addLink("1","2");

	// create a network
	container = document.getElementById('network');

	var data = {
		nodes: nodesMap,
		edges: edgesMap
	};

	//var options = {stabilize: false};
	var options = {configurePhysics:false, physics: {barnesHut: {springConstant: 0.018}}};
	network = new vis.Network(container, data, options);

};

function addNode(id){
	group = 2;
	title = "id: "+id;
	var n = {"id":id,"label":id, "title":title};
	nodesMap.add(n);
}

function addLink(id1,id2){
	var style = "line";
	label = "label: "+id1+":"+id2;
	var e = {"from":id1,"to":id2, "label": label, "style": style};
	edgesMap.add(e);
}