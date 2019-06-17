/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var usState = ee.FeatureCollection("users/czhang11/boundary/cb_2017_us_state_500k"),
    usCounty = ee.FeatureCollection("users/czhang11/boundary/cb_2017_us_county_500k"),
    usAsd = ee.FeatureCollection("users/czhang11/boundary/ASD_2012_500K"),
    wrs2 = ee.FeatureCollection("users/czhang11/boundary/WRS2_descending_0"),
    sen2tiles = ee.FeatureCollection("users/czhang11/boundary/sentinel2_tiles_world");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * @constructor
 * @author: Chen Zhang
 * @this {getRoiByFips}
 * @param {string} [product='cropland'] band name of CDL image, default value is cropland [options: cropland|confidence|cultivated]
 * @returns {ee.FeatureCollection} Returns the image collection of the chosen band
 */
var getRoiByFips = function(fips, options) {
  
  // Init parameters
  options = options || {};
  
  // County
  if (fips.length == 5) {
    return usCounty.filterMetadata('GEOID', 'equals', fips);
  }
  // ASD
  else if (fips.length == 4) {
    return usAsd.filterMetadata('STASD_A', 'equals', fips);
  }
  // State
  else if (fips.length == 2) {
    return usState.filterMetadata('GEOID', 'equals', fips);
  }
};
// // Example
// Map.addLayer(getRoiByFips('31109'));


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getRoiByWrs2}
 * @param {array<int>} wrs2scene - path/row of the WRS-2 system
 * @returns {ee.FeatureCollection} Returns the output CDL image
 */
var getRoiByWrs2 = function(wrs2scene, options) {
  
  // Init parameters
  options = options || {};
  var path = wrs2scene[0];
  var row = wrs2scene[1];
  
  return wrs2.filter(ee.Filter.and(ee.Filter.eq('PATH', path), ee.Filter.eq('ROW', row)));
};
// // Example
// Map.addLayer(getRoiByWrs2([30,31]));


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getRoiBySen2Tile}
 * @param {string} tile - tile number of the Sentinel-2 grid
 * @returns {ee.FeatureCollection} Returns the output CDL image
 */
var getRoiBySen2Tile = function(tile, options) {
  
  // Init parameters
  options = options || {};
  
  return sen2tiles.filter(ee.Filter.eq('Name', tile));
};
// // Example
// Map.addLayer(getRoiBySen2Tile({tile:'14TPL'}));


// Exported modules
exports = {
  getRoiByFips: getRoiByFips,
  getRoiByWrs2: getRoiByWrs2,
  getRoiBySen2Tile: getRoiBySen2Tile
};

