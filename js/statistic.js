// requried libraries
var _getCdl = require('users/czhang11/agkit4ee:/getCdl.js');
var _getRoi = require('users/czhang11/agkit4ee:/getRoi.js');


// global variables
var _years = ['2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008'];
var _product = 'cropland';
var _remap = [1,2,3,4,5,22,23,24];
var _scale = 100;


function getColorList(remap) {
  
  var colorList = [];
  var cdlPaletteList = _getCdl.getCdlPalette();
  for (var i=0; i<remap.length; i++) {
    var value = remap[i];
    var palette = cdlPaletteList[value];
    colorList.push(palette);
  }
  return colorList;
}

// function getCropList(remap) {
//   var cropList = [];
//   var cropType
//   for (var i=0; i<remap.length; i++) {
//     var value = remap[i];
    
//   }
// }

var statisticByRoi = function(roi, options) {
  
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || _remap;
  var scale = options.scale || _scale;
  
  // Get band names
  var getBandNames = function(item) {
    return ee.String(ee.Number(item));
  };
  var bandNames = remap.map(getBandNames);
  
  var cdlCollection = _getCdl.getCdlBandsCollection({years:years, product: product, remap:remap}).select(bandNames);
  
  // Patch the string category
  var remapString = [];
  for(var i=0; i<remap.length; i++) {
    remapString[i] = remap[i]+'';
  }
  var remapString2 = [];
  for(var i=0; i<remap.length; i++) {
    if (remap[i]<10) {
      remapString2[i] = '00'+remap[i];
    }
    else if (remap[i]<100) {
      remapString2[i] = '0'+remap[i];
    }
    else {
      remapString2[i] = remap[i]+'';
    }
  }
  
  var getArea = function(item) {
    var cdlImage = ee.Image(item);
    var areaImage = cdlImage.and(cdlImage).multiply(ee.Image.pixelArea());
    areaImage = areaImage.select(remapString,remapString2);
    return areaImage.copyProperties(cdlImage, ['system:time_start']);
  };
  var areaCollection = cdlCollection.map(getArea);
  // print(getColorList(remap));
  
  // Create an image time series chart.
  var chart = ui.Chart.image.series({
    imageCollection: areaCollection,
    region: roi,
    reducer: ee.Reducer.sum(),
    scale: scale
  });
  
  chart.setOptions({
    title: 'Statistics for the selected area',
    vAxis: {
      title: 'Area (square meters)'
    },
    legend: 'none',
    lineWidth: 2,
    pointSize: 3,
    colors: getColorList(remap),
  });
  
  return chart;
};
// // Example
// var example_countyChart = statisticByCounty('31109', {remap: [1,5,36]});
// print(example_countyChart);
// print(statisticByRoi(_getRoi.getRoiByFips('31109')))




var statisticByCounty = function(fips, options) {
  
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  var remap = options.remap || _remap;
  
  var roi = _getRoi.getRoiByFips(fips);
  
  // Get band names
  var getBandNames = function(item) {
    return ee.String(ee.Number(item));
  };
  var bandNames = remap.map(getBandNames);
  
  var cdlCollection = _getCdl.getCdlBandsCollection({years:years, product: product, remap:remap}).select(bandNames);

  // Create an image time series chart.
  var chart = ui.Chart.image.series({
    imageCollection: cdlCollection,
    region: roi,
    reducer: ee.Reducer.count(),
    scale: 30
  });
  
  chart.setOptions({
    title: 'Cropland Data Layer Statistics for '+fips,
    vAxis: {
      title: 'Pixel Counts'
    },
    legend: 'none',
    lineWidth: 2,
    pointSize: 3
  });

  return chart;
};
// // Example
// var example_countyChart = statisticByCounty('31109', {remap: [1,5,36]});
// print(example_countyChart);


var statisticByPoi = function(poi, options) {
  
  options = options || {};
  var years = options.years || _years;
  var product = options.product || _product;
  // var remap = options.remap || _remap;
  
  var cdlCollection = _getCdl.getCdlCollection({years:years, product: product});
  
  // Create an image time series chart.
  var chart = ui.Chart.image.series({
    imageCollection: cdlCollection,
    region: poi,
    reducer: ee.Reducer.mean(),
    scale: 30
  });
  
  chart.setOptions({
    title: 'Crop sequence for the point of interest',
    vAxis: {
      title: 'Crop type'
    },
    legend: 'none',
    lineWidth: 2,
    pointSize: 3
  });

  return chart;
  
};
// // Example
// var poi = /* color: #d63000 */ee.Geometry.Point([-96.56658256020728, 41.46317266598387]);
// var example_pointTimeSeries = statisticByPoi(poi);
// print(example_pointTimeSeries);


exports = {
  statisticByRoi: statisticByRoi,
  statisticByCounty: statisticByCounty,
  statisticByPoi: statisticByPoi
};
