const uuid = require('uuid');
const simpleFeatures = require('./simpleFeatures');

const processData = (
  inputData,
  outputName = `output_${uuid().replace(/-/g, '')}.shp`,
  outputFormat = 'ESRI Shapefile',
) => {
  try {
    const srid = inputData.srs;
    const geomType = inputData.features.first().getGeometry().name;
    switch (geomType.toLowerCase()) {
      case 'multipolygon':
      case 'polygon':
        return simpleFeatures(srid, inputData, outputName, outputFormat, 'polygon', 3);
      case 'point':
      case 'multipoint':
        return simpleFeatures(srid, inputData, outputName, outputFormat, 'point', 1);
      case 'linestring':
      case 'multilinestring':
        return simpleFeatures(srid, inputData, outputName, outputFormat, 'linestring', 2);
      default:
        throw new Error('Invalid geometry type.');
    }
  } catch (error) {
    throw Error(error);
  }
};

exports.processData = processData;
