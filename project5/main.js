require([
// add required modules
"esri/views/MapView", 
"esri/Map", 
"esri/layers/FeatureLayer",
"esri/widgets/Legend",
"esri/renderers/ClassBreaksRenderer",
"esri/symbols/SimpleFillSymbol",

], function(MapView, Map, FeatureLayer,Legend,ClassBreaksRenderer,SimpleFillSymbol) {
//Center coordinates
  const lat = 7.3697;
  const lon = 12.3547;
//Class break renderer
var healthAreaRenderer = new ClassBreaksRenderer({
  field: "SUM_population"
});

var addClass = function(min, max, clr, lbl, renderer) {
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

addClass(0,5000,'#fee5d9','Under 5000',healthAreaRenderer)
addClass(5000,25000,'#fcbba1','5000 - 25000',healthAreaRenderer)
addClass(25000, 50000,'#fc9272','25000 - 50000',healthAreaRenderer)
addClass(50000, 75000,'#fb6a4a','50000 - 75000',healthAreaRenderer)
addClass(75000, 100000,'#de2d26','75000 - 100000',healthAreaRenderer)
addClass(100000, 130000,'#a50f15','Above 100000',healthAreaRenderer)
//Popup template
  var template = {
    title: "Rapid Population Estimate",
    content: "<b>NAME</b>: {Name} <br/> <b>CODE</b>: {Code} <br/> <b>POPULATION</b>: {SUM_population} <br/> <b>SOURCE</b>: {Source}",
    fieldInfos: [{
      fieldName: "SUM_population",
      format: {
        digitSeparator: true, 
        places: 0
      }
    },
  ]
  };
// Rapid population estimate layer
  var rpe = new FeatureLayer({
    portalItem: { 
      id: "228cf89d5b6444739bc64bb11cc18d98"
    },
    outFields: ["Name","Code","Source","SUM_population"],
    popupTemplate: template,
    renderer: healthAreaRenderer,
  });
// map object
  var map = new Map({
    basemap: "oceans",
  });
// view object
  var view = new MapView({
    map: map,
    zoom: 6,
    center : [lon, lat],
    container: "viewDiv",
  });
// add RPE layer to map
  map.add(rpe);
// Legend
  var legend = new Legend({
    view: view,
    layerInfos: [{
      layer: rpe,
      title: "Rapid Population Estimate 2020"
    }]
  });
// add lagend to view
  view.ui.add(legend, "bottom-left");
});