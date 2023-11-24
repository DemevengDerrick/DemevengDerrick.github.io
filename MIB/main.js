require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/tasks/Geoprocessor",
  "esri/tasks/support/FeatureSet",
  "esri/config",
  "dojox/widget/Standby",
  "dojo/domReady!"
],
function(Map,
  SceneView,
  GraphicsLayer,
  Graphic,
  Point,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  Geoprocessor,
  FeatureSet,
  esriConfig,
  Standby) {

  esriConfig.request.corsDetection = false;

  var gpEndpoint =
    "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_Currents_World/GPServer/MessageInABottle";

  var inputs = document.getElementById("inputs")
  var instructions = document.getElementById("instructionsDiv")

  var days = document.getElementById("days").value


  const lon = 11.5167;
  const lat = 3.8667;
  
  var map = new Map({
    basemap: "national-geographic"
  });

  var view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [lon, lat],
    zoom: 3
  });

  var standby = new Standby({
    target: "viewDiv",
    color: null
  });

  document.body.appendChild(standby.domNode); 
  standby.startup();     
  
  var pathLayer = new GraphicsLayer();
  map.add(pathLayer);

  var markerSym = new SimpleMarkerSymbol({
    color: [0, 0, 255],
    outline: { 
      color: [255, 255, 255],
      width: 2
    }
  });

  var pathSymbole = new SimpleLineSymbol({
    color: "red",
    width: 5
  });
  
  var gp = new Geoprocessor({
    url: gpEndpoint
  });
  
  view.on("click", findBottlePath);

  function findBottlePath(evt) {
    standby.show();

    pathLayer.removeAll();
    
    var pt = new Point({
      longitude: evt.mapPoint.longitude,
      latitude: evt.mapPoint.latitude
    });

    var ptGraphic = new Graphic({
      geometry: pt,
      symbol: markerSym
    });

    pathLayer.add(ptGraphic);

    var featureSet = new FeatureSet();
    featureSet.features = [ptGraphic];

    var params = {
      "Input_Point": featureSet,
      "Days": days
    };
    gp.execute(params).then(drawPath);

  }

  function drawPath(gpResponse) {
    console.log("got a response");
    var paths = gpResponse.results[0].value.features;

    var pathGraphics = paths.map(function(path) {
      path.symbol = pathSymbole;
      return path;
    });

    pathLayer.addMany(pathGraphics);

    view.goTo({
      target: pathGraphics
    });
    
    standby.hide();
  }

  view.ui.add(instructions, "top-right");
  view.ui.add(inputs, "top-right");
});