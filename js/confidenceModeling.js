// requried libraries
var _getCdl = require('users/czhang11/agkit4ee:/getCdl.js');


// global variables
var _years = ['2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008'];


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getConfidencePixelBandByYear}
 * @param {int} threshold - threshold value (0-100) of confidence pixels
 * @param {array<int>} [year=2018] target year
 * @returns {ee.Image} Returns the image collection of the chosen band
 */
var getConfidencePixelsByYear = function(year, threshold, options) {
  
  // Init parameters
  options = options || {};
  // var year = options.year || 2018;
  
  var confidencePixelImage = ee.Image(_getCdl.getCdlImageByYear(year, {product: 'confidence'}));
  
  return confidencePixelImage.expression('conf >= threshold', {
      'conf': confidencePixelImage,
      'threshold': threshold
    });
};
// // Examples
// var confidenceImage = getConfidencePixelsByYear(2018, 100);
// console.log(confidenceImage);
// Map.addLayer(confidenceImage);


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getConfidencePixelCollection}
 * @param {int} threshold - threshold value (0-100) of confidence pixels
 * @param {array<int>} [years=-1] target years, e.g. [1999,2000,2001]
 * @returns {ee.ImageCollection} Returns the image collection of the chosen band
 */
var getConfidencePixelsCollection = function(threshold, options) {
  
  // Init parameters
  options = options || {};
  var years = options.years || _years;
  
  var confidencePixelCollection = ee.ImageCollection(_getCdl.getCdlCollection({product: 'confidence', years: years}));

  var confFilter = function(item) {
    var image = ee.Image(item);
    return image.expression('image >= threshold', {
      'image': image,
      'threshold': threshold
    });
  };
  
  return confidencePixelCollection.map(confFilter);
};
// // Examples
// var confidencePixelCollection = getConfidencePixelsCollection(90);
// console.log(confidencePixelCollection);
// Map.addLayer(confidencePixelCollection.first());


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getConfidencePixelStack}
 * @param {int} threshold - threshold value (0-100) of confidence pixels
 * @param {array<int>} [years=-1] target years, e.g. [1999,2000,2001]
 * @returns {ee.Image} Returns the image collection of the chosen band
 */
var getConfidencePixelsStack = function(threshold, options) {
  
  // Init parameters
  options = options || {};
  var years = options.years || _years;
  
  var confidencePixelStack = ee.Image(_getCdl.getCdlImageStack({product: 'confidence', years: years}));
  
  return confidencePixelStack.expression('conf >= threshold', {
    'conf': confidencePixelStack,
    'threshold': threshold
  });
  
};
// // Examples
// var confidencePixelStack = getConfidencePixelsStack(90);
// console.log(confidencePixelStack);
// Map.addLayer(confidencePixelStack);


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getConfidencePixelBand}
 * @param {int} threshold - threshold value (0-100) of confidence pixels
 * @param {array<int>} [years=-1] target years, e.g. [1999,2000,2001]
 * @returns {ee.Image} Returns the image collection of the chosen band
 */
var getTrustedConfidencePixels = function(threshold, options) {
  
  // Init parameters
  options = options || {};
  var years = options.years || _years;
  
  var confidencePixelStack = getConfidencePixelsStack(threshold, {years: years});

  return confidencePixelStack.reduce(ee.Reducer.allNonZero());
};
// // Examples
// var confidencePixelBand = getTrustedConfidencePixels(90, {years: ['2014','2015','2016','2017','2018']});
// console.log(confidencePixelBand);
// Map.addLayer(confidencePixelBand);


// Exported modules
exports = {
  getConfidencePixelsByYear: getConfidencePixelsByYear,
  getConfidencePixelsStack: getConfidencePixelsStack,
  getConfidencePixelsCollection: getConfidencePixelsCollection,
  getTrustedConfidencePixels: getTrustedConfidencePixels
};

