// global variables
var _years = ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010',
              '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', 
              '1999', '1998', '1997'];
var _product = 'cropland';
var _remap = -1;


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getCdlPalette}
 * @param {int} [year=2018] - year of interest, e.g. 2018
 * @returns {list} Returns the list of palette
 * 
 * @example
 * getCdlPalette(2004);
 */
var getCdlPalette = function(options) {
  
  // Init parameters
  options = options || {};
  var year = options.year || 2018;
  
  if (year>=2018) {
    
    return ['000000', 'ffd300', 'ff2626', '00a8e5', 'ff9e0c', '267000', 'ffff00', '000000', '000000', '000000', // 0-9
            '70a500', '00af4c', 'dda50c', 'dda50c', '7fd3ff', '000000', '000000', '000000', '000000', '000000', // 10-19
            '000000', 'e2007c', '896354', 'd8b56b', 'a57000', 'd69ebc', 'd69ebc', 'ad007c', 'a05989', '700049', // 20-29
            'd69ebc', 'd1ff00', '7f99ff', 'd6d600', 'd1ff00', '00af4c', 'ffa5e2', 'a5f28c', '00af4c', 'd69ebc', // 30-39
            '000000', 'a800e5', 'a50000', '702600', '00af4c', 'b27fff', '702600', 'ff6666', 'ff6666', 'ffcc66', // 40-49
            'ff6666', '00af4c', '00ddaf', '54ff00', 'f2a377', 'ff6666', '00af4c', '7fd3ff', 'e8bfff', 'afffdd', // 50-59
            '00af4c', 'bfbf77', '000000', '93cc93', 'c6d69e', 'ccbfa3', 'ff00ff', 'ff8eaa', 'ba004f', '704489', // 60-69
            '007777', 'b29b70', 'ffff7f', '000000', 'b5705b', '00a582', 'ead6af', 'b29b70', '000000', '000000', // 70-79
            '000000', 'f2f2f2', '9b9b9b', '4c70a3', '000000', '000000', '000000', '7fb2b2', 'e8ffbf', '000000', // 80-89
            '000000', '000000', '00ffff', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 90-99
                    
            '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 100-109
            '000000', '4c70a3', 'd3e2f9', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 110-119
            '000000', '9b9b9b', '9b9b9b', '9b9b9b', '9b9b9b', '000000', '000000', '000000', '000000', '000000', // 120-129
            '000000', 'ccbfa3', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 130-139
            '000000', '93cc93', '93cc93', '93cc93', '000000', '000000', '000000', '000000', '000000', '000000', // 140-149
            '000000', '000000', 'c6d69e', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 150-159
            '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 160-169
            '000000', '000000', '000000', '000000', '000000', '000000', 'e8ffbf', '000000', '000000', '000000', // 170-179
            '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 180-189
            '7fb2b2', '000000', '000000', '000000', '000000', '7fb2b2', '000000', '000000', '000000', '000000', // 190-199
                    
            '000000', '000000', '000000', '000000', '00ff8c', 'd69ebc', 'ff6666', 'ff6666', 'ff6666', 'ff6666', // 200-209
            'ff8eaa', '334933', 'e57026', 'ff6666', 'ff6666', '00AF4D', 'ff6666', 'b29b70', 'ff8eaa', 'ff6666', // 210-219
            'ff8eaa', 'ff6666', 'ff6666', 'ff8eaa', '00af4c', 'ffd300', 'ffd300', 'ff6666', '000000', 'ff6666', // 220-229
            '896354', 'ff6666', 'ff2626', 'e2007c', 'ff9e0c', 'ff9e0c', 'a57000', 'ffd300', 'a57000', '267000', // 230-239
            '267000', 'ffd300', '000099', 'ff6666', 'ff6666', 'ff6666', 'ff6666', 'ff6666', 'ff6666', 'ff6666', // 240-249
            'ff6666', 'ffd300', '267000', 'a57000', '267000'];                                                  // 250-254
  }
  else {
    
    return ['000000', 'ffd300', 'ff2626', '00a8e5', 'ff9e0c', '267000', 'ffff00', '000000', '000000', '000000', // 0-9
            '70a500', '00af4c', 'dda50c', 'dda50c', '7fd3ff', '000000', '000000', '000000', '000000', '000000', // 10-19
            '000000', 'e2007c', '896354', 'd8b56b', 'a57000', 'd69ebc', 'd69ebc', 'ad007c', 'a05989', '700049', // 20-29
            'd69ebc', 'd1ff00', '7f99ff', 'd6d600', 'd1ff00', '00af4c', 'ffa5e2', 'a5f28c', '00af4c', 'd69ebc', // 30-39
            '000000', 'a800e5', 'a50000', '702600', '00af4c', 'b27fff', '702600', 'ff6666', 'ff6666', 'ffcc66', // 40-49
            'ff6666', '00af4c', '00ddaf', '54ff00', 'f2a377', 'ff6666', '00af4c', '7fd3ff', 'e8bfff', 'afffdd', // 50-59
            '00af4c', 'bfbf77', '000000', '93cc93', 'c6d69e', 'ccbfa3', 'ff00ff', 'ff8eaa', 'ba004f', '704489', // 60-69
            '007777', 'b29b70', 'ffff7f', '000000', 'b5705b', '00a582', 'ead6af', 'b29b70', '000000', '000000', // 70-79
            '000000', 'f2f2f2', '9b9b9b', '4c70a3', '000000', '000000', '000000', '7fb2b2', 'e8ffbf', '000000', // 80-89
            '000000', '000000', '00ffff', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 90-99
                    
            '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 100-109
            '000000', '4c70a3', 'd3e2f9', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 110-119
            '000000', '9b9b9b', '9b9b9b', '9b9b9b', '9b9b9b', '000000', '000000', '000000', '000000', '000000', // 120-129
            '000000', 'ccbfa3', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 130-139
            '000000', '93cc93', '93cc93', '93cc93', '000000', '000000', '000000', '000000', '000000', '000000', // 140-149
            '000000', '000000', 'c6d69e', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 150-159
            '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 160-169
            '000000', '000000', '000000', '000000', '000000', '000000', 'e8ffbf', '000000', '000000', '000000', // 170-179
            '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', '000000', // 180-189
            '7fb2b2', '000000', '000000', '000000', '000000', '7fb2b2', '000000', '000000', '000000', '000000', // 190-199
                    
            '000000', '000000', '000000', '000000', '00ff8c', 'd69ebc', 'ff6666', 'ff6666', 'ff6666', 'ff6666', // 200-209
            'ff8eaa', '334933', 'e57026', 'ff6666', 'ff6666', '000000', 'ff6666', 'b29b70', 'ff8eaa', 'ff6666', // 210-219
            'ff8eaa', 'ff6666', 'ff6666', 'ff8eaa', '00af4c', 'ffd300', 'ffd300', 'ff6666', '000000', 'ff6666', // 220-229
            '896354', 'ff6666', 'ff2626', 'e2007c', 'ff9e0c', 'ff9e0c', 'a57000', 'ffd300', 'a57000', '267000', // 230-239
            '267000', 'ffd300', '000099', 'ff6666', 'ff6666', 'ff6666', 'ff6666', 'ff6666', 'ff6666', 'ff6666', // 240-249
            'ff6666', 'ffd300', '267000', 'a57000', '267000'];                                                  // 250-254
  }
};



var getFrequencyPalette = function(options) {
  
  // Init parameters
  options = options || {};
  var history = options.history || 22;
  
  if (history > 10) {
    return ['EFEFEF', 'f0f9de', 'f0f9ba', 'f0f921', 'f9de24', 'fec328', 'fdab33', 'f89541', 
            'f17f4f', 'e66b5c', 'd9596a', 'cb4778', 'bc3587', 'a92296', '9510a1', '7e03a8', 
            '6500a8', '4c02a1', '300497', '0d0887', '06044a', '000000'];
  }
  else {
    return ['EFEFEF', 'F4F4DB', 'A0512D', 'FED600', 'FEA501', 'A0512D', 
            'A52829', 'FE0E00', 'AF3160', 'A024EF', '6523EF', '4C26FE'];
  }
};




/**
 * @constructor
 * @author: Chen Zhang
 * @this {getCdlImageByYear}
 * @param {string} year - target year
 * @param {string} [product='cropland'] product of CDL image, default value is cropland [options: cropland|confidence|cultivated].
 * @param {array<int>} [remap=-1] remap list, e.g. [].
 * @param {defaultValue} [defaultValue=null] default value of masked pixels.
 * @param {string} [bandName=year+'_'+product] the name of the band to remap.
 * @returns {ee.Image} Returns the image stack of the chosen years and bands.
 */
var getCdlImageByYear = function(year, options) {
  
  // Init parameters
  year = parseInt(year);
  options = options || {};
  var product = options.product || _product;
  var remap = options.remap || _remap;
  var defaultValue = options.defaultValue;
  
  if (product != 'cropland' && product != 'confidence' && product != 'cultivated'){
    
    console.log('Please select a valid product layer (cropland, confidence, cultivated)');
    return 0;
  }
  
  var cdlImageByYear;
  // if (year == 2019) {
    
  //   if (product == 'cropland') {
  //     cdlImageByYear = ee.Image('users/czhang11/18CDL/cdl_30m_r_conus_2018_albers').select(['b1'],[product]);
  //   }
  //   else if (product == 'confidence') {
  //     cdlImageByYear = ee.Image('users/czhang11/18CDL/cdl_30m_r_conus_2018_albers_confidence').select(['b1'],[product]);
  //   }
  //   else if (product == 'cultivated') {
  //     // console.log('The 2018 cultivated product is currently unavailable');
  //     return 0;
  //   }
  // }
  if (year <= 2018 && year >= 2008) {
    
    cdlImageByYear = ee.Image('USDA/NASS/CDL/'+year);
  }
  else if (year <= 2007 && year >= 1997) {
    
    var maskImage = ee.Image('USDA/NASS/CDL/2017').select([product],['masking_conus']);
    
    if (year == 2007 || year == 2005) {
      cdlImageByYear = ee.Image('USDA/NASS/CDL/'+year+'a').blend(ee.Image('USDA/NASS/CDL/'+year+'b')).mask(maskImage);
    }
    else {
      cdlImageByYear = ee.Image('USDA/NASS/CDL/'+year).mask(maskImage);
    }
  }
  else {
    console.log('Please enter a valid year (1997-2018)');
    return 0;
  }
  
  // Change the band name for 2018 CDL data
  if (year == 2018 && product == 'cultivated') {
      cdlImageByYear = cdlImageByYear.select(['cultivated_land'], [product]);
  }
  
  // Remap
  if (remap != -1) {
    
    return cdlImageByYear.remap({from:remap, to:remap, defaultValue:defaultValue}).select(['remapped'], [product]);
  }
  else {
    
    return cdlImageByYear.select([product],[product]);
  }
};
// // Examples
// var example1 = getCdlImageByYear('2007', {product: 'cropland', remap:[1,5], defaultValue:0});
// console.log(example1);
// Map.addLayer(example1, {min:0, max:254, palette:getCdlPalette()});
// var example2 = getCdlImageByYear('2018', {product: 'confidence'});
// console.log(example2);
// Map.addLayer(example2, {min:0, max:100});
// var example3 = getCdlImageByYear('2014', {product: 'confidence'});
// console.log(example3);
// Map.addLayer(example3, {min:0, max:100});


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getCdlCollection}
 * @param {array<string>} [years=_years] target years, e.g. ['1999','2000','2001']
 * @param {string} [product='cropland'] band name of CDL image, default value is cropland [options: cropland|confidence|cultivated]
 * @param {array<int>} [remap=-1] remap list, e.g. [1,5]
 * @param {defaultValue} [defaultValue=null] default value of masked pixels.
 * @returns {ee.ImageCollection} Returns the image collection of the chosen band
 */
var getCdlCollection = function(options) {
  
  // Init parameters
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || _remap;
  var defaultValue = options.defaultValue;
  
  // Build complete CDL image collection
  var cdlCollection;
  var cdl18 = getCdlImageByYear('2018', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl17 = getCdlImageByYear('2017', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl16 = getCdlImageByYear('2016', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl15 = getCdlImageByYear('2015', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl14 = getCdlImageByYear('2014', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl13 = getCdlImageByYear('2013', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl12 = getCdlImageByYear('2012', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl11 = getCdlImageByYear('2011', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl10 = getCdlImageByYear('2010', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl09 = getCdlImageByYear('2009', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl08 = getCdlImageByYear('2008', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl07 = getCdlImageByYear('2007', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl06 = getCdlImageByYear('2006', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl05 = getCdlImageByYear('2005', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl04 = getCdlImageByYear('2004', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl03 = getCdlImageByYear('2003', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl02 = getCdlImageByYear('2002', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl01 = getCdlImageByYear('2001', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl00 = getCdlImageByYear('2000', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl99 = getCdlImageByYear('1999', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl98 = getCdlImageByYear('1998', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl97 = getCdlImageByYear('1997', {product: product, remap:remap, defaultValue:defaultValue});
  
  if (product == 'cropland') {
    cdlCollection = ee.ImageCollection([cdl18, cdl17, cdl16, cdl15, cdl14, cdl13, cdl12, cdl11, 
                                        cdl10, cdl09, cdl08, cdl07, cdl06, cdl05, cdl04, cdl03, cdl02, cdl01, 
                                        cdl00, cdl99, cdl98, cdl97]);
  }
  else if (product == 'confidence') {
    cdlCollection = ee.ImageCollection([cdl18, cdl17, cdl16, cdl15, cdl14, cdl13, cdl12, cdl11, 
                                        cdl10, cdl09, cdl08]);
  }
  else if (product == 'cultivated') {
    cdlCollection = ee.ImageCollection([cdl18, cdl17, cdl16, cdl15, cdl14, cdl13]);
  }
  else {
    console.log('Please select a valid product layer (cropland, confidence, cultivated)');
    return 0;
  }
  
  var composing = function(item, collection) {
    
    var selectedCdlCollection = ee.ImageCollection(collection);
    var cdlImage = ee.Image(item);
    
    var year = ee.String(ee.Date(cdlImage.get('system:time_start')).get('year'));
    
    return ee.Algorithms.If(ee.List(years).indexOf(year).gte(0), selectedCdlCollection.merge(cdlImage), selectedCdlCollection);
  };
  return ee.ImageCollection(cdlCollection.iterate(composing, ee.ImageCollection([])));
};
// // Examples
// var example1 = getCdlCollection({years: ['2012','2001','2018'], product: 'confidence'});
// console.log(example1);
// Map.addLayer(example1.first(), {min:0, max:254, palette:getCdlPalette()});
// console.log(ee.ImageCollection('USDA/NASS/CDL'));
// console.log(getCdlCollection({product: 'cultivated'}));


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getCdlImageStack}
 * @param {string} [product='cropland'] band name of CDL image, default value is cropland [options: cropland|confidence|cultivated]
 * @param {array<int>} [years=_years] target years, e.g. [1999,2000,2001]
 * @param {array<int>} [remap=-1] remap list, e.g. []
 * @param {defaultValue} [defaultValue=null] default value of masked pixels.
 * @returns {ee.Image} Returns the image stack of the chosen years and bands
 */
var getCdlImageStack = function(options) {
  
  // Init parameters
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || _remap;
  var defaultValue = options.defaultValue;
  
  var cdlCollection = getCdlCollection({years:years, product:product, remap:remap, defaultValue:defaultValue});

  if (years == -1) {
    
    var stacking = function(item, stack) {
      
      var cdlStackImage = ee.Image(stack);
      var cdlImage = ee.Image(item);
      return cdlStackImage.addBands(cdlImage);
    };
    
    return ee.Image(cdlCollection.iterate(stacking, ee.Image([])));
  }
  else {
    
    var stackingByYears = function(item, stack) {
      
      var cdlStackImage = ee.Image(stack);
      var cdlImage = ee.Image(item);
      
      var year = ee.String(ee.Date(cdlImage.get('system:time_start')).get('year'));
      
      return ee.Algorithms.If(ee.List(years).indexOf(year).gte(0), cdlStackImage.addBands(cdlImage.select([product], [ee.String(product+'_').cat(year)])), cdlStackImage);
    };
    
    return ee.Image(cdlCollection.iterate(stackingByYears, ee.Image([])));
  }
};
// // Examples
// var cdlStack = getCdlImageStack({years: ['1999','2000','2001','2002','2015'], product:'cropland', remap:[1,5]});
// var cdlStack = getCdlImageStack({years: ['2018','2000','2001','2014','2015'], product:'confidence'});
// console.log(cdlStack);
// Map.addLayer(cdlStack);


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getCdlImageStack}
 * @param {string} year - target year
 * @param {string} [product='cropland'] band name of CDL image, default value is cropland [options: cropland|confidence|cultivated]
 * @param {array<int>} [remap=[1,2,3,4,5,23,24,36]] remap list, e.g. []
 * @param {defaultValue} [defaultValue=null] default value of masked pixels.
 * @returns {ee.Image} Returns the image stack of the chosen years and bands
 */
var getCdlBandsByYear = function(year, options) {
  
  // Init parameters
  options = options || {};
  var product = options.product || _product;
  var remap = options.remap || [1,2,3,4,5,23,24];
  var defaultValue = options.defaultValue;
  var bandName = options.bandName || year+'_'+product+'_';
  
  var cdlImage = getCdlImageByYear(year, {product: product, remap:remap});
  
  var decomposing = function(item, stack) {
    
    var cdlImageStack = ee.Image(stack);
    var cropValue = ee.Number(item);
    
    var cdlBand = cdlImage.remap({from: [cropValue], to: [cropValue]}).select(['remapped'], [ee.String(cropValue)]);

    return cdlImageStack.addBands(cdlBand);
  };
  var cdlBandsImage = ee.Image(ee.List(remap).iterate(decomposing, ee.Image([])));

  return ee.Image(cdlBandsImage.copyProperties(cdlImage, ['system:time_start']));
};
// // Example
// var cdlBands_example = getCdlBandsByYear('2018');
// console.log(cdlBands_example);
// Map.addLayer(cdlBands_example.select('1'), {min:0, max:254, palette:getCdlPalette()}, 'bands');


/**
 * @constructor
 * @author: Chen Zhang
 * @this {getCdlBandsCollection}
 * @param {array<int>} [years=_years] target years, e.g. [1999,2000,2001]
 * @param {string} [product='cropland'] band name of CDL image, default value is cropland [options: cropland|confidence|cultivated]
 * @param {array<int>} [remap=[1,2,3,4,5,23,24,36]] remap list, e.g. []
 * @param {defaultValue} [defaultValue=null] default value of masked pixels.
 * @returns {ee.Image} Returns the image stack of the chosen years and bands
 */
var getCdlBandsCollection  = function(options) {
  
  // Init parameters
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || [1,2,3,4,5,23,24];
  var defaultValue = options.defaultValue;
  
  // Build complete CDL image collection
  var cdlCollection;
  var cdl18 = getCdlBandsByYear('2018', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl17 = getCdlBandsByYear('2017', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl16 = getCdlBandsByYear('2016', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl15 = getCdlBandsByYear('2015', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl14 = getCdlBandsByYear('2014', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl13 = getCdlBandsByYear('2013', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl12 = getCdlBandsByYear('2012', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl11 = getCdlBandsByYear('2011', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl10 = getCdlBandsByYear('2010', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl09 = getCdlBandsByYear('2009', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl08 = getCdlBandsByYear('2008', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl07 = getCdlBandsByYear('2007', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl06 = getCdlBandsByYear('2006', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl05 = getCdlBandsByYear('2005', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl04 = getCdlBandsByYear('2004', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl03 = getCdlBandsByYear('2003', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl02 = getCdlBandsByYear('2002', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl01 = getCdlBandsByYear('2001', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl00 = getCdlBandsByYear('2000', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl99 = getCdlBandsByYear('1999', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl98 = getCdlBandsByYear('1998', {product: product, remap:remap, defaultValue:defaultValue});
  var cdl97 = getCdlBandsByYear('1997', {product: product, remap:remap, defaultValue:defaultValue});
  
  if (product == 'cropland') {
    cdlCollection = ee.ImageCollection([cdl18, cdl17, cdl16, cdl15, cdl14, cdl13, cdl12, cdl11, 
                                        cdl10, cdl09, cdl08, cdl07, cdl06, cdl05, cdl04, cdl03, cdl02, cdl01, 
                                        cdl00, cdl99, cdl98, cdl97]);
  }
  else if (product == 'confidence') {
    cdlCollection = ee.ImageCollection([cdl18, cdl17, cdl16, cdl15, cdl14, cdl13, cdl12, cdl11, 
                                        cdl10, cdl09, cdl08]);
  }
  else if (product == 'cultivated') {
    cdlCollection = ee.ImageCollection([cdl17, cdl16, cdl15, cdl14, cdl13]);
  }
  else {
    console.log('Please select a valid product layer (cropland, confidence, cultivated)');
    return 0;
  }
  
  var composing = function(item, collection) {
    
    var selectedCdlCollection = ee.ImageCollection(collection);
    var cdlImage = ee.Image(item);
    
    var year = ee.String(ee.Date(cdlImage.get('system:time_start')).get('year'));
    
    return ee.Algorithms.If(ee.List(years).indexOf(year).gte(0), selectedCdlCollection.merge(cdlImage), selectedCdlCollection);
  };
  return ee.ImageCollection(cdlCollection.iterate(composing, ee.ImageCollection([])));
};
// // Examples
// var example1 = getCdlBandsCollection({years:['2018', '2017', '2016', '2015', '2014'], product: 'cropland'});
// console.log(example1);
// Map.addLayer(example1.first().select('1'), {min:0, max:254, palette:getCdlPalette()});


// Exported modules
exports = {
  getCdlImageByYear: getCdlImageByYear,
  getCdlCollection: getCdlCollection,
  getCdlImageStack: getCdlImageStack,
  getCdlBandsByYear: getCdlBandsByYear,
  getCdlBandsCollection: getCdlBandsCollection,
  getCdlPalette: getCdlPalette,
  getFrequencyPalette: getFrequencyPalette
};

