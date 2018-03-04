const gdalMultiToSingle = require('./src/index');
const gdal = require('gdal');

const getFeatures = data => gdal.open(data).layers.get(0);

const multipoints = getFeatures('./src/test/data/multilines.geojson');
const simplepoints = gdalMultiToSingle.processData(multipoints);

console.log(simplepoints);
