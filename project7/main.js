require([
// add required modules
"esri/views/MapView", 
"esri/Map", 
"esri/layers/FeatureLayer",
"esri/widgets/Legend",
"esri/renderers/ClassBreaksRenderer",
"esri/symbols/SimpleFillSymbol",
"esri/tasks/support/Query",
"esri/Graphic",

], function(MapView, Map, FeatureLayer,Legend,ClassBreaksRenderer,SimpleFillSymbol,Query,Graphic) {

//Center coordinates
const lat = 37.0902;
const lon = -95.7129;
//var state = prompt("Enter a state code");
// drop-down list of state codes
var stateCodes = document.getElementById('drop-downs')
// list nodes
var listNode = document.getElementById("list_counties");
//console.log(state)

//var whereClause = "ST = " + "'" + state.toUpperCase() + "'";
//var whereClause = "ST = 'IA'"
//console.log(whereClause)

var electRenderer = new ClassBreaksRenderer({
  valueExpression: "($feature.Percent_Dem_2020 - $feature.Percent_GOP_2020)",
});

var addClass = function(min, max, clr, lbl, renderer){
  renderer.addClassBreakInfo({
    minValue: min,
    maxValue: max,
    symbol: new SimpleFillSymbol({
      color:clr,
      outline: {   
        color: 'gray',
        size: 0.01
      },
    }),
    label: lbl
  });      
}

addClass(-100,0,'#eff3ff','< 0%',electRenderer)
addClass(0,10,'#c6dbef','0% - 10%',electRenderer)
addClass(10, 20,'#9ecae1','10% - 20%',electRenderer)
addClass(20, 100,'#6baed6','> 20%',electRenderer)

//Popup template
var template = {
  title: "{Name} county",
  content: "<b>FIPS</b>: {FIPS} <br/> <b>State</b>: {ST} <br/> <b>Percentage Democratic </b>: {Percent_Dem_2020}<br/> <b>Percentage GOP</b>: {Percent_GOP_2020}",
  fieldInfos: [{
    fieldName: "Percent_Dem_2020",
    format: {
      digitSeparator: true, 
      places: 2
    }
  },
  {
    fieldName: "Percent_GOP_2020",
    format: {
      digitSeparator: true, 
      places: 2
    }
  }
]
};
// US Elections Layer
var US_elections = new FeatureLayer({
  portalItem: { 
    id: "a630b7db333c464caa003f8806e329a3"
  },
  //definitionExpression: whereClause,
  renderer : electRenderer,
  outFields: ['FIPS', 'Name', 'ST', 'Percent_Dem_2020', 'Percent_GOP_2020'],
  popupTemplate :template,
});

// map object
var map = new Map({
  basemap: "oceans",
});
// view object
var view = new MapView({
  map: map,
  zoom: 3,
  center : [lon, lat],
  container: "viewDiv",
});

view.when(function(){
  return US_elections.when(function() {
    var query = US_elections.createQuery();
    return US_elections.queryFeatures(query);
  });
}).then(getValues).then(getUniqueValues).then(addToSelect);

// State code field values
function getValues(response) {
  var features = response.features;
  var values = features.map(function(feature) {
    return feature.attributes.ST;
  });
  return values;
}

// Get Unique values for states
function getUniqueValues(values) {
  var uniqueValues = [];

  values.forEach(function(item, i) {
    if ((uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) && item !== "") {
      uniqueValues.push(item);
    }
  });
  return uniqueValues;
}

// Add the unique values to the drop-down select list
function addToSelect(values) {
  values.sort();
  values.forEach(function(value) {
    var option = document.createElement("option");
    option.text = value;
    states.add(option);
  });

  return setUS_electionsDefinitionExpression(states.value);
}

function setUS_electionsDefinitionExpression(newValue) {

  US_elections.definitionExpression = "ST = '" + newValue + "'";

  US_elections.queryExtent().then(function(results){
    view.goTo(results.extent);
  });

  if (!US_elections.visible) {
    US_elections.visible = true;
  }

  return US_elections.queryFeatures().then(displayResults);
}

// evenListerner to the drop-down list of states

document.getElementById("states").addEventListener("change", queryFeature)

function queryFeature(){
  US_elections.definitionExpression = "ST = '" + states.value + "'";
  US_elections.queryExtent().then(function(results){
    view.goTo(results.extent);
  });

  US_elections.queryFeatures().then(displayResults);
}

// Display the names of the cities in a table
//var graphics = [];

function displayResults(results) {
  graphics = [];
  var fragment = document.createDocumentFragment();
  //console.log(results.features[0].attributes)
  results.features.forEach(function(county, index) {
    county.popupTemplate = template;
    graphics.push(county);

    var attributes = county.attributes;
    var name = attributes.Name
      
    var li = document.createElement("li");
    li.classList.add("panel-result");
    li.tabIndex = 0;
    li.setAttribute("data-result-id", index);
    li.textContent = name;

    fragment.appendChild(li);
  });

  listNode.innerHTML = "";
  listNode.appendChild(fragment); 
}

// add evenListener to endnode
listNode.addEventListener("click", onListClickHandler);

function onListClickHandler(event) {   
  var target = event.target;
  var resultId = target.getAttribute("data-result-id");

  var result = resultId && graphics && graphics[parseInt(resultId,10)];

  if (result) {
    view.popup.open({
      features: [result],
      location: result.geometry.centroid
    });
  }
}

map.add(US_elections)  

// Legend
var legend = new Legend({
  view: view,
  layerInfos: [{
    layer: US_elections,
    title: "US 2020 Presidential Elections (Democratic margin of victory)"
  }]
});
// add lagend to view
view.ui.add(legend, "bottom-left");
view.ui.add(stateCodes, "top-right");

});