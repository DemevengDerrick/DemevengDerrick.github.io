require([
"esri/Map",
"esri/views/SceneView",
"esri/Camera",
"esri/layers/CSVLayer",
"esri/widgets/Legend",
"dojo/domReady!"
],
function(Map, SceneView, Camera, CSVLayer, Legend){

//url = "http://personal.psu.edu/dcd5396/FinalProject/flood.csv"
url = "flood.csv"

const template = {
    title: "Flood Risk",
    content: "<b>Council</b> : {Arrondissement} <br> <b>Water Height</b> : {Hauteur_deau_au_plus_haut_de_levenement} <br> <b>Rise time</b> : {Vitesse_de_montee_des_eaux} <br> <b>Time of stagnation</b> : {Duree_de_stagnation_de_leau} <br>" +
    "<b>Frequency of rainfall</b> : {Frequence_de_linondation_dans_lannee} <br> <b>Causes</b> : {Causes}"
};

const lon = 9.606127591753548;
const lat = 3.6667980321594014;

var map = new Map({
    basemap:"dark-gray",
    ground: "world-elevation"
});

var view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: new Camera({
      position: [lon, lat, 23906.596632513218],
      heading: 15.1097,
      tilt: 66.7766440193768,
    })
});

const csvLayer = new CSVLayer({
    url: url,
    copyright: "SOGEFI Cameroon",
    popupTemplate: template,
    latitudeField: "latitude",
    longitudeField: "longitude",
});

function symb(col){
  var symbol = {
    type: "point-3d", // autocasts as new PointSymbol3D()
    // for this symbol we use 2 symbol layers, one for the outer circle
    // and one for the inner circle
    symbolLayers: [{
      type: "icon", // autocasts as new IconSymbol3DLayer()
      resource: { primitive: "circle"},
      material: { color: col },
      size: 5
    },
  ]}

  return symbol
}

symb1 = symb("white");
symb2 = symb("blue");
symb3 = symb("yellow");
symb4 = symb("red");

csvLayer.renderer = {
    type: "unique-value", // autocasts as new SimpleRenderer()
    field: "Hauteur_deau_au_plus_haut_de_levenement",
    uniqueValueInfos: [{
      value: "No floods",
      symbol: symb1
    },{
      value: "Au dessus des chevilles",
      symbol: symb2,
      label: "Above the feets"
    },{
      value: "Entre les genoux et la taille",
      symbol: symb3,
      label: "Between the knee and weist"
    },{
      value: "Au dessus de la taille",
      symbol: symb4,
      label: "Above the weist"
    }]
};

var legend = new Legend({
  view: view,
  layerInfos: [{
    layer: csvLayer,
    title: "Water hights wrt an adult",
  }]
});

var modalBox = document.getElementById('modal')

view.on("click", function(){
  modalBox.style.display = "none"
})

view.ui.add(legend, "bottom-left");
view.ui.add(modalBox)
map.add(csvLayer)

})