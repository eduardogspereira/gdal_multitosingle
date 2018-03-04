const gdal = require('gdal');
const path = require('path');

module.exports = (srid, inputData, outputName, outputFormat, type, typeCode) => {
  const newDataset = gdal.open(outputName, 'w', outputFormat);
  const layerName = path.basename(outputName).substring(0, outputName.lastIndexOf('.'));
  const newLayer = newDataset.layers.create(layerName, srid, typeCode);
  for (const columnName of inputData.fields.getNames()) {
    newLayer.fields.add(inputData.fields.get(columnName));
  }

  let inputFeature = inputData.features.first();
  while (inputFeature) {
    if (inputFeature.getGeometry().name.toLowerCase() === `${type}`) {
      const feature = new gdal.Feature(newLayer);
      feature.setGeometry(inputFeature.getGeometry());
      for (const columnName of inputData.fields.getNames()) {
        feature.fields.set(columnName, inputFeature.fields.get(columnName));
      }
      newLayer.features.add(feature);
    }

    if (inputFeature.getGeometry().name.toLowerCase() === `multi${type}`) {
      for (const singlepart of inputFeature.getGeometry().children.toArray()) {
        const feature = new gdal.Feature(newLayer);
        feature.setGeometry(singlepart);
        for (const columnName of inputData.fields.getNames()) {
          feature.fields.set(columnName, inputFeature.fields.get(columnName));
        }
        newLayer.features.add(feature);
      }
    }

    inputFeature = inputData.features.next();
  }

  newLayer.flush();
  return outputName;
};
