// requried libraries
var _getCdl = require('users/czhang11/agkit4ee:/getCdl.js');


// global variables
var _years = ['2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000','1999','1998','1997'];
// var _years = ['2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008'];


var getCdlByRegEx = function(regularizedCdlStack, targetCrop, regEx, options) {
  
  // Init parameters
  options = options || {};
  
  var trustedPixel = regularizedCdlStack.expression('('+regEx+')', {
    
    'regEx_2018': regularizedCdlStack.select('regularizedCropland_2018'),
    'regEx_2017': regularizedCdlStack.select('regularizedCropland_2017'),
    'regEx_2016': regularizedCdlStack.select('regularizedCropland_2016'),
    'regEx_2015': regularizedCdlStack.select('regularizedCropland_2015'),
    'regEx_2014': regularizedCdlStack.select('regularizedCropland_2014'),
    'regEx_2013': regularizedCdlStack.select('regularizedCropland_2013'),
    'regEx_2012': regularizedCdlStack.select('regularizedCropland_2012'),
    'regEx_2011': regularizedCdlStack.select('regularizedCropland_2011'),
    'regEx_2010': regularizedCdlStack.select('regularizedCropland_2010'),
    'regEx_2009': regularizedCdlStack.select('regularizedCropland_2009'),
    'regEx_2008': regularizedCdlStack.select('regularizedCropland_2008'),
    'regEx_2007': regularizedCdlStack.select('regularizedCropland_2007'),
    'regEx_2006': regularizedCdlStack.select('regularizedCropland_2006'),
    'regEx_2005': regularizedCdlStack.select('regularizedCropland_2005'),
    'regEx_2004': regularizedCdlStack.select('regularizedCropland_2004'),
    'regEx_2003': regularizedCdlStack.select('regularizedCropland_2003'),
    'regEx_2002': regularizedCdlStack.select('regularizedCropland_2002'),
    'regEx_2001': regularizedCdlStack.select('regularizedCropland_2001'),
    'regEx_2000': regularizedCdlStack.select('regularizedCropland_2000'),
    'regEx_1999': regularizedCdlStack.select('regularizedCropland_1999'),
    'regEx_1998': regularizedCdlStack.select('regularizedCropland_1998'),
    'regEx_1997': regularizedCdlStack.select('regularizedCropland_1997')
  });
  
  var accumulateList = [];
  var cropValueList = [];
  for (var y = 1; y <= 22; y++) {
      accumulateList.push(y);
      cropValueList.push(targetCrop);
  }
  
  return trustedPixel.remap({from: accumulateList, to: cropValueList});
};


/**
 * @constructor
 * @author: Chen Zhang
 * @this {modelingByCropSqeuence}
 * @param {array<int>} cropSequence - a list of crop sequence, e.g. [1,5,1,5]
 * @param {int} targetCrop - the value of target crop type, e.g. 1
 * @param {int} [targetYear=2019] year of interest, e.g. 2018
 * @returns {ee.Image} Returns the image of trusted pixels
 */
var modelingByCropSqeuence = function(cropSequence, targetCrop, options) {
  
  // Init parameters
  options = options || {};
  var targetYear = options.targetYear || 2019;
  
  var history = cropSequence.length;
  var startYear = targetYear-history;
  var endYear = targetYear-1;
  var cdlCollection = _getCdl.getCdlCollection().filterDate(startYear+'-01-01',endYear+'-12-31');
  
  // Build regularized crop sequence image stack
  var stacking = function(item, stack) {
    
    var cdlStackImage = ee.Image(stack);
    var cdlImage = ee.Image(item);
    
    var index = cdlStackImage.bandNames().length();
    var cropValue = ee.List(cropSequence.reverse()).get(index);
    
    var year = ee.String(ee.Date(cdlImage.get('system:time_start')).get('year'));
    var bandName = ee.String('regularizedCropland_').cat(year);
    
    return cdlStackImage.addBands(cdlImage.select(['cropland']).remap({from: [cropValue], to: [1], defaultValue: 0}).select(['remapped'],[bandName]));
  };
  var regularizedCdlStack = ee.Image(cdlCollection.iterate(stacking, ee.Image([])));
  
  // Generate regEx
  var regEx = 'regEx_'+startYear;
  for (var i=1; i<cropSequence.length; i++) {
    
    var year = startYear + i;
    regEx = regEx + ' && ' + 'regEx_' + year;
  }
  
  // Rename the output image
  var bandName = 'cropSequence_'+targetYear+'_'+cropSequence.reverse().toString().split(",").join("&")+'_'+targetCrop;
  return getCdlByRegEx(regularizedCdlStack, targetCrop, regEx).select(['remapped'],[bandName]);
};
// var trusted = modelingByCropSqeuence([1,5,1,5,1], 5, {targetYear:2019});
// print(trusted);
// Map.addLayer(trusted, {min: 0, max: 254, palette: _getCdl.getCdlPalette(2019)}, 'trusted');


var getTrustedPixelsPatternRegEx = function(targetYear, history, pattern) {
  
  var startYear = targetYear-history;
  var endYear = targetYear-1;
  var bandList = [];
  for (var year=startYear; year<=endYear; year++){
    bandList.unshift('regEx_'+year);
  }

  var exAnd;
  var exOr;
  var length = (history<bandList.length === true) ? history : bandList.length;
  
  // Reliable pattern
  if (pattern == 'mono') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exAnd = bandList[i];
      }
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
    
    return exAnd;
  }
  
  // Reliable pattern
  else if (pattern == 'alternate') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exOr = bandList[i];
      }
      else if (i === 1) {
        exAnd = bandList[i];
      }
      else if (i%2 === 0) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }
  
  // Reliable pattern
  else if (pattern == 'threeYear_ABB') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exOr = bandList[i];
      }
      else if (i === 2) {
        exAnd = bandList[i];
      }
      else if (i%3 === 0 || i%3 === 1) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }
  
  // Reliable pattern
  else if (pattern == 'threeYear_AAB') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exOr = bandList[i];
      }
      else if (i === 1) {
        exAnd = bandList[i];
      }
      else if (i%3 === 0) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }
  
  // Non-Reliable pattern
  else if (pattern == 'threeYear_ABA') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exAnd = bandList[i];
      }
      else if (i === 1) {
        exOr = bandList[i];
      }
      else if (i%3 === 1) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }
  
  // Non-Reliable pattern
  else if (pattern == 'fourYear_ABBB') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exOr = bandList[i];
      }
      else if (i === 3) {
        exAnd = bandList[i];
      }
      else if (i%4 === 0 || i%4 === 1 || i%4 === 2) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }
  
  // Non-Reliable pattern
  else if (pattern == 'fourYear_AABB') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exOr = bandList[i];
      }
      else if (i === 2) {
        exAnd = bandList[i];
      }
      else if (i%4 === 0 || i%4 === 1) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }

  // Non-Reliable pattern  
  else if (pattern == 'fourYear_ABBA') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exAnd = bandList[i];
      }
      else if (i === 1) {
        exOr = bandList[i];
      }
      else if (i%4 === 1 || i%4 === 2) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }
  
  // Reliable pattern
  else if (pattern == 'fourYear_AAAB') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exOr = bandList[i];
      }
      else if (i === 1) {
        exAnd = bandList[i];
      }
      else if (i%4 === 0) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }

  // Non-Reliable pattern  
  else if (pattern == 'fourYear_ABAA') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exAnd = bandList[i];
      }
      else if (i === 2) {
        exOr = bandList[i];
      }
      else if (i%4 === 2) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }

  // Non-Reliable pattern  
  else if (pattern == 'fourYear_AABA') {
    
    for (var i=0; i<length; i++) {
      
      if (i === 0) {
        exAnd = bandList[i];
      }
      else if (i === 1) {
        exOr = bandList[i];
      }
      else if (i%4 === 1) {
        exOr = exOr + ' || ' + bandList[i];
      } 
      else {
        exAnd = exAnd + ' && ' + bandList[i];
      }
    }
  }
  
  else {
    return 'Wrong pattern';
  }
  
  return '(' + exAnd + ')-(' + exOr + ')';
};


/**
 * @constructor
 * @author: Chen Zhang
 * @this {modelingByPattern}
 * @param {string} pattern - specify the crop rotation pattern mono | alternate | threeYear_ABB | threeYear_ABA | threeYear_AAB
 * @param {int} targetCrop - the value of target crop type, e.g. 1
 * @param {int} [targetYear=2019] year of interest, e.g. 2018
 * @param {int} [history=5] length of observer years
 * @returns {ee.Image} Returns the image of trusted pixels
 */
var modelingByPattern = function(pattern, targetCrop, options) {
  
  // Init parameters
  options = options || {};
  var targetYear = options.targetYear || '2019';
  var history = options.history || 5;
  
  var startYear = targetYear-history;
  var endYear = targetYear-1;
  var cdlCollection = _getCdl.getCdlCollection().filterDate(startYear+'-01-01',endYear+'-12-31');
  
  // Generate regEx for trusted pixels
  var regEx = getTrustedPixelsPatternRegEx(targetYear, history, pattern);

  // Build regularized crop sequence image stack
  var stacking = function(item, stack) {
    
    var cdlStackImage = ee.Image(stack);
    var cdlImage = ee.Image(item);
    
    var year = ee.String(ee.Date(cdlImage.get('system:time_start')).get('year'));
    var bandName = ee.String('regularizedCropland_').cat(year);
    
    return cdlStackImage.addBands(cdlImage.select(['cropland']).remap({from: [targetCrop], to: [1], defaultValue: 0}).select(['remapped'],[bandName]));
  };
  var regularizedCdlStack = ee.Image(cdlCollection.iterate(stacking, ee.Image([])));
  
  // Rename the output image
  var bandName = pattern+'_'+targetYear+'_'+targetCrop;
  return getCdlByRegEx(regularizedCdlStack, targetCrop, regEx).select(['remapped'],[bandName]);
};
// // Example
// var trusted = modelingByPattern('alternate', 5, {targetYear: '2019', history:10});
// print(trusted);
// Map.addLayer(trusted, {min: 0, max: 254, palette: _getCdl.getCdlPalette(2018)}, 'trustedByPattern');







/**
 * @constructor
 * @author: Chen Zhang
 * @this {getTrustedPixelsByCropSqeuence}
 * @param {int} targetCrop - the value of target crop type, e.g. 1
 * @param {int} [targetYear=2019] year of interest, e.g. 2018
 * @returns {ee.Image} Returns the image of trusted pixels
 */
var modelingFrequencyByCrop = function(crop, options) {
  
  // Init parameters
  options = options || {};
  var years = options.years || _years;
  
  var history = years.length;
  var cdlCollection = _getCdl.getCdlCollection({years:years});
  
  // Build regularized crop sequence image stack
  var stacking = function(item, stack) {
    
    var cdlStackImage = ee.Image(stack);
    var cdlImage = ee.Image(item);
    
    var year = ee.String(ee.Date(cdlImage.get('system:time_start')).get('year'));
    var bandName = ee.String('regularizedCropland_').cat(year);
    
    return cdlStackImage.addBands(cdlImage.select(['cropland']).remap({from: [crop], to: [1], defaultValue: 0}).select(['remapped'],[bandName]));
  };
  var regularizedCdlStack = ee.Image(cdlCollection.iterate(stacking, ee.Image([])));
  
  return regularizedCdlStack.reduce(ee.Reducer.sum());
};
// var trusted = modelingFrequencyByCrop(24);
// print(trusted);
// Map.addLayer(ee.Image.pixelArea())
// Map.addLayer(trusted, {min: 0, max: 11, palette: _getCdl.getFrequencyPalette()}, 'frequency');



exports = {
  modelingByCropSqeuence: modelingByCropSqeuence,
  modelingByPattern: modelingByPattern,
  modelingFrequencyByCrop: modelingFrequencyByCrop
};


