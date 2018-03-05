# gdalMultiToSingle

Transform multi-part geometries to single part geometries.

## Dependencies

* [gdal](https://www.npmjs.com/package/gdal)
* [uuid](https://www.npmjs.com/package/uuid)

## Setup

```bash
npm install gdalmultitosingle
```

## Usage

```bash
const gdalMultiToSingle = require('gdalmultitosingle')

const outputPath = gdalMultiToSingle.processData(<inputFeatures>, <outputName>, <outputFormat>);
// Returns the output filepath.
```

## Sample Usage

```bash
const gdalMultiToSingle = require('gdalmultitosingle');
const gdal = require('gdal');

const getFeatures = dataset => gdal.open(dataset).layers.get(0);

const inputLayer = getFeatures('path/to/inputData.geojson');

const singleParts = gdalMultiToSingle.processData(inputLayer, 'path/to/outputData.shp', 'ESRI Shapefile');
```

## Allowed Outputs

Tested with the most common outputs that are listed on [gdal](https://www.npmjs.com/package/gdal). Message me on GitHub if you need some help or find some bug.

You can also use [vsimem](http://www.gdal.org/gdal_virtual_file_systems.html) to save the data temporary on the memory. So the command would be something like:

```bash
const singleParts = gdalMultiToSingle.processData(inputLayer, '/vsimem/temp_output.shp', 'ESRI Shapefile')
```

---

=^]
