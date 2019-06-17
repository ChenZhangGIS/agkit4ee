// requried libraries
var _getRoi = require('users/czhang11/agkit4ee:/getRoi.js');
var _getCdl = require('users/czhang11/agkit4ee:/getCdl.js');


// global variables 
var _years = [1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018];
var _product = 'cropland';
var _remap = -1;
var _scale = 30;
var _fileNamePrefix = 'CDL';


/**
 * @constructor
 * @author: Chen Zhang
 * @this {exportCdlByRoi}
 * @param {array<number>} [years=_years] year list
 * @param {array<number>} [remap=_remap] crop of interest (e.g. [1,5]), set as -1 if no specified crop 
 * @param {float} [scale=_scale] scale of the output image
 * @param {string} [fileNamePrefix='CDL'] - year of interest, e.g. 2018
 */
var exportCdlByRoi = function(roi, options) {
  
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || _remap;
  var defaultValue = options.defaultValue;
  var scale = options.scale || _scale;
  var fileNamePrefix = options.fileNamePrefix || _fileNamePrefix;

  for (var i=0; i<years.length; i++) {
    
    var year = years[i];
    var outputImage = _getCdl.getCdlImageByYear(year, {product:product, remap:remap, defaultValue:defaultValue}).clip(roi);
    
    var fileName = fileNamePrefix+'_'+year;
    if (remap != -1) {
      fileName = fileName+'_'+remap.toString().replace(',', '_');
    }
    
    if (product != 'cropland') {
      fileName = fileName+'_'+product;
    }
    
    Export.image.toDrive({
      image: outputImage,
      description: fileName,
      crs: 'EPSG:4326',
      scale: scale,
      maxPixels: 10e12,
      region: roi.geometry()
    });
    
    // console.log(outputImage);
    // Map.addLayer(outputImage, {}, fileName);
    // Map.addLayer(outputImage, {min: 0, max: 254, palette: _getCdl.getCdlPalette(year)}, fileName);
    // console.log(roi.geometry());
    // Map.addLayer(roi.geometry(), {}, fileName+'_roi');
  }
};


/**
 * @constructor
 * @author: Chen Zhang
 * @this {exportCdlByFips}
 * @param {string} fips - fips
 * @param {array<number>} [years=_years] - year list
 * @param {array<number>} [remap=_remap] - crop of interest (e.g. [1,5]), set as -1 if no specified crop 
 * @param {float} [scale=_30] - scale of the output image
 * @param {string} [fileNamePrefix=-1] Prefix of the job name
 */
var exportCdlByFips = function(fips, options) {
  
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || _remap;
  var defaultValue = options.defaultValue;
  var scale = options.scale || _scale;
  var fileNamePrefix = options.fileNamePrefix || _fileNamePrefix;

  exportCdlByRoi(_getRoi.getRoiByFips(fips), {
    years: years,
    product: product,
    remap: remap,
    defaultValue: defaultValue,
    scale: scale,
    fileNamePrefix: fileNamePrefix+'_'+fips
  });
};
// // Example
// exportCdlByFips('2990');
// exportCdlByFips('2990', {product:'confidence', remap:[1,5], years:[2017]});


/**
 * @constructor
 * @author: Chen Zhang
 * @this {exportCdlByWrs}
 * @param {array<number>} wrs2Scene - wrs
 * @param {array<number>} [years=_years] - year list
 * @param {array<number>} [remap=_remap] - crop of interest (e.g. [1,5]), set as -1 if no specified crop 
 * @param {float} [scale=_30] - scale of the output image
 * @param {string} [fileNamePrefix=-1] Prefix of the job name
 */
var exportCdlByWrs = function(wrs2Scene, options) {
  
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || _remap;
  var defaultValue = options.defaultValue;
  var scale = options.scale || _scale;
  var fileNamePrefix = options.fileNamePrefix || _fileNamePrefix;
  
  var wrs_path = ''+wrs2Scene[0]; 
  var wrs_row = ''+wrs2Scene[1];

  fileNamePrefix = fileNamePrefix+'_P';
  if (wrs_path.length === 1) {
    fileNamePrefix = fileNamePrefix+'00'+wrs_path;
  }
  else if (wrs_path.length === 2) {
    fileNamePrefix = fileNamePrefix+'0'+wrs_path;
  }
  else if (wrs_path.length === 3) {
    fileNamePrefix = fileNamePrefix+wrs_path;
  }
  
  if (wrs_row.length === 1) {
    fileNamePrefix = fileNamePrefix+'R00'+wrs_row;
  }
  else if (wrs_row.length === 2) {
    fileNamePrefix = fileNamePrefix+'R0'+wrs_row;
  }
  else if (wrs_row.length === 3) {
    fileNamePrefix = fileNamePrefix+'R'+wrs_row;
  }
  
  exportCdlByRoi(_getRoi.getRoiByWrs2(wrs), {
    years: years,
    product: product,
    remap: remap,
    defaultValue: defaultValue,
    scale: scale,
    fileNamePrefix: fileNamePrefix
  });
};
// // Example
// exportCdlByWrs([30,30], {product:'cropland', remap:[1,5], years:[2018]});


/**
 * @constructor
 * @author: Chen Zhang
 * @this {exportCdlBySen2Tile}
 * @param {string} tile - tile
 * @param {array<number>} [years=_years] - year list
 * @param {array<number>} [remap=_remap] - crop of interest (e.g. [1,5]), set as -1 if no specified crop 
 * @param {float} [scale=_30] - scale of the output image
 * @param {string} [fileNamePrefix=-1] Prefix of the job name
 */
var exportCdlBySen2Tile = function(tile, options) {
  
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || _remap;
  var defaultValue = options.defaultValue;
  var scale = options.scale || _scale;
  var fileNamePrefix = options.fileNamePrefix || _fileNamePrefix;
  
  exportCdlByRoi(_getRoi.getRoiBySen2Tile(tile), {
    years: years,
    product: product,
    remap: remap,
    defaultValue: defaultValue,
    scale: scale,
    fileNamePrefix: fileNamePrefix+'_'+tile
  });
};
// // Example
// exportCdlBySen2Tile('14TPL', {years:[2018]});


// Exported modules
exports = {
  exportCdlByRoi: exportCdlByRoi,
  exportCdlByFips: exportCdlByFips,
  exportCdlByWrs: exportCdlByWrs,
  exportCdlBySen2Tile: exportCdlBySen2Tile
};

