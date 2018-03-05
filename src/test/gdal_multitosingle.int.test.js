const gdalMultitoSingle = require('../index.js');
const gdal = require('gdal');

const getFeatures = data => gdal.open(data).layers.get(0);
const multilines = getFeatures('./src/test/data/multilines.geojson');
const multipolygons = getFeatures('./src/test/data/multipolygons.geojson');
const multipoints = getFeatures('./src/test/data/multipoints.geojson');
const linestrings = getFeatures('./src/test/data/simplelines.shp');

describe('gdalMultiToSingle', () => {
  it('should output the correct single part numbers', () => {
    const simplepoints = gdalMultitoSingle.processData(
      multipoints,
      '/vsimem/points.shp',
      'ESRI Shapefile',
    );
    expect(getFeatures(simplepoints).features.count()).toBe(7);

    const simplelines = gdalMultitoSingle.processData(
      multilines,
      '/vsimem/lines.shp',
      'ESRI Shapefile',
    );
    expect(getFeatures(simplelines).features.count()).toBe(9);

    const simplepolygons = gdalMultitoSingle.processData(
      multipolygons,
      '/vsimem/polygons.shp',
      'ESRI Shapefile',
    );
    expect(getFeatures(simplepolygons).features.count()).toBe(10);

    const simplelinestrings = gdalMultitoSingle.processData(
      linestrings,
      '/vsimem/linestring.shp',
      'ESRI Shapefile',
    );
    expect(getFeatures(simplelinestrings).features.count()).toBe(9);
  });
});
