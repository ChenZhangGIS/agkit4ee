/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var usCounty = ee.FeatureCollection("users/czhang11/boundary/cb_2017_us_county_5m"),
    usAsd = ee.FeatureCollection("users/czhang11/boundary/ASD_2012_500K"),
    usState = ee.FeatureCollection("users/czhang11/boundary/cb_2017_us_state_5m");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// requried modules
var _export = require('users/czhang11/agkit4ee:/export.js');
var _getRoi = require('users/czhang11/agkit4ee:/getRoi.js');
var _getCdl = require('users/czhang11/agkit4ee:/getCdl.js');
var _statistic = require('users/czhang11/agkit4ee:/statistic.js');
var _croplandModeling = require('users/czhang11/agkit4ee:/croplandModeling.js');
var _confidenceModeling = require('users/czhang11/agkit4ee:/confidenceModeling.js');


// The namespace for our application.  All the state is kept in here.
var app = {};


app.createConstants = function() {
  
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.BOUNDARY_STYLE = {color: '6e6e6e', fillColor: '00000000', width:1};
  app.HIGHLIGHT_STYLE = {color: '6e6e6e', fillColor: '0065ffC0'};
};


app.createVariables = function() {
  
  app.remapList = {
    corn: -1,
    cotton: -1,
    rice: -1,
    sorghum: -1,
    soybean: -1,
    durumWheat: -1,
    springWheat: -1,
    winterWheat: -1,
    dblCropWinWhtCorn: -1,
    dblCropOatsCorn: -1
  };
  
  app.remap = [1,5];
  
  app.currentMap = ee.Image();
};


app.createPanels = function() {
  
  // UI
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'AgKit4EE - CDL Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app demonstrates the statistic capability of the AgKit4EE toolkit.'),
      ui.Label('Developer: Chen Zhang (czhang11@gmu.edu)')
    ])
  };
  
  // navigator
  app.productFilter = {
    product: ui.Select({
      items: ['cropland', 'confidence', 'cultivated'],
      placeholder: 'cropland',
      onChange: app.refreshLayer
    }),
  };
  app.productFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select CDL Product', {fontWeight: 'bold'}),
      app.productFilter.product
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  
  // year selection panel
  app.yearFilter = {
    year: ui.Slider({
      min: 1997,
      max: 2018,
      value: 2018,
      step: 1,
      style: {width: '240px'},
      onChange: app.refreshLayer
    })
  };
  app.yearFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select Year', {fontWeight: 'bold'}),
      app.yearFilter.year
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  
  // Panel of crop of interest
  app.cropFilter = {
    cornCheckbox: ui.Checkbox({
      label: 'Corn', 
      value: false,
      onChange: function() {
        if(app.cropFilter.cornCheckbox.getValue()===true) {
          app.remapList.corn = 1;
        }
        else {
          app.remapList.corn = -1;
        }
        app.refreshLayer();
      }
    }),
    cottonCheckbox: ui.Checkbox({
      label: 'Cotton', 
      value: false,
      onChange: function() {
        if(app.cropFilter.cottonCheckbox.getValue()===true) {
          app.remapList.cotton = 2;
        }
        else {
          app.remapList.cotton = -1;
        }
        app.refreshLayer();
      }
    }),    
    riceCheckbox: ui.Checkbox({
      label: 'Rice', 
      value: false,
      onChange: function() {
        if(app.cropFilter.riceCheckbox.getValue()===true) {
          app.remapList.rice = 3;
        }
        else {
          app.remapList.rice = -1;
        }
        app.refreshLayer();
      }
    }),
    sorghumCheckbox: ui.Checkbox({
      label: 'Sorghum', 
      value: false,
      onChange: function() {
        if(app.cropFilter.sorghumCheckbox.getValue()===true) {
          app.remapList.sorghum = 4;
        }
        else {
          app.remapList.sorghum = -1;
        }
        app.refreshLayer();
      }
    }),
    soybeanCheckbox: ui.Checkbox({
      label: 'Soybean', 
      value: false,
      onChange: function() {
        if(app.cropFilter.soybeanCheckbox.getValue()===true) {
          app.remapList.soybean = 5;
        }
        else {
          app.remapList.soybean = -1;
        }
        app.refreshLayer();
      }
    }),
    durumWheatCheckbox: ui.Checkbox({
      label: 'Durum Wheat', 
      value: false,
      onChange: function() {
        if(app.cropFilter.durumWheatCheckbox.getValue()===true) {
          app.remapList.durumWheat = 22;
        }
        else {
          app.remapList.durumWheat = -1;
        }
        app.refreshLayer();
      }
    }),
    springWheatCheckbox: ui.Checkbox({
      label: 'Spring Wheat', 
      value: false,
      onChange: function() {
        if(app.cropFilter.springWheatCheckbox.getValue()===true) {
          app.remapList.springWheat = 23;
        }
        else {
          app.remapList.springWheat = -1;
        }
        app.refreshLayer();
      }
    }),
    winterWheatCheckbox: ui.Checkbox({
      label: 'Winter Wheat', 
      value: false,
      onChange: function() {
        if(app.cropFilter.winterWheatCheckbox.getValue()===true) {
          app.remapList.winterWheat = 24;
        }
        else {
          app.remapList.winterWheat = -1;
        }
        app.refreshLayer();
      }
    }),
    dblCropWinWhtCornCheckbox: ui.Checkbox({
      label: 'Double Cropping Winter Wheat/Corn', 
      value: false,
      onChange: function() {
        if(app.cropFilter.dblCropWinWhtCornCheckbox.getValue()===true) {
          app.remapList.dblCropWinWhtCorn = 225;
        }
        else {
          app.remapList.dblCropWinWhtCorn = -1;
        }
        app.refreshLayer();
      }
    }),
    dblCropOatsCornCheckbox: ui.Checkbox({
      label: 'Double Cropping Oats/Corn', 
      value: false,
      onChange: function() {
        if(app.cropFilter.dblCropOatsCornCheckbox.getValue()===true) {
          app.remapList.dblCropOatsCorn = 226;
        }
        else {
          app.remapList.dblCropOatsCorn = -1;
        }
        app.refreshLayer();
      }
    }),
    stackingLayerCheckbox: ui.Checkbox({
      label: 'Stack selected layers', 
      value: true,
      onChange: app.refreshLayer,
      style: {fontWeight:'bold'}
    })
  };
  app.cropFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select Crop Types', {fontWeight: 'bold'}),
      app.cropFilter.cornCheckbox,
      app.cropFilter.cottonCheckbox,
      app.cropFilter.riceCheckbox,
      app.cropFilter.sorghumCheckbox,
      app.cropFilter.soybeanCheckbox,
      app.cropFilter.durumWheatCheckbox,
      app.cropFilter.springWheatCheckbox,
      app.cropFilter.winterWheatCheckbox,
      app.cropFilter.dblCropWinWhtCornCheckbox,
      app.cropFilter.dblCropOatsCornCheckbox
      // app.cropFilter.stackingLayerCheckbox
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  
  // ROI selector
  app.boundarySelector = {
    boundary: ui.Select({
      items: ['County', 'ASD', 'State'],
      placeholder: 'County',
      onChange: app.refreshLayer
    }),
  };
  app.boundarySelector.panel = ui.Panel({
    widgets: [
      ui.Label('Select Boundary', {fontWeight: 'bold'}),
      app.boundarySelector.boundary,
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
};


app.updateRemapList = function(remapList) {
  
  if (Math.max.apply(Math, remapList)==-1) {
    app.remap = [1,2,3,4,5,22,23,24,225,226];
  }
  else {
    app.remap = remapList.filter(function(elem, _index){
      return -1 != elem;
    });
  }
};


// Refresh all layers
app.refreshLayer = function() {
  
  function updateYearFilter() {
    
    // Update year list
    if (app.productFilter.product.getValue() == 'cropland') {
      app.yearFilter.year.setMin(1997);
    }
    else if (app.productFilter.product.getValue() == 'confidence') {
      app.yearFilter.year.setMin(2008);
    }
    else if (app.productFilter.product.getValue() == 'cultivated') {
      app.yearFilter.year.setMin(2013);
    }
  }
  
  function updateCdlLayers() {
    
    var remapList = [app.remapList.corn, 
                     app.remapList.cotton, 
                     app.remapList.rice, 
                     app.remapList.sorghum, 
                     app.remapList.soybean, 
                     app.remapList.durumWheat, 
                     app.remapList.springWheat, 
                     app.remapList.winterWheat,
                     app.remapList.dblCropWinWhtCorn,
                     app.remapList.dblCropOatsCorn];
    app.updateRemapList(remapList);
    
    var year = app.yearFilter.year.getValue()+'';
    
    // Update layers
    Map.clear();
    if (Math.max.apply(Math, remapList)==-1) {
      app.currentMap = _getCdl.getCdlImageByYear(year, {product: app.productFilter.product.getValue()});
      Map.addLayer(app.currentMap, _getCdl.getCdlPalette(), 'CDL_'+year);
    }
    else {
      app.currentMap = _getCdl.getCdlImageByYear(year, {product:app.productFilter.product.getValue(), remap:remapList, defaultValue: null});
      Map.addLayer(app.currentMap, _getCdl.getCdlPalette(), 'CDL_'+year);
    }
  }
  
  function updateBoundaryLayers() {
    
    if (app.boundarySelector.boundary.getValue() == 'ASD') {
      Map.addLayer(usAsd.style(app.BOUNDARY_STYLE), {}, 'U.S. ASD boundary');
    }
    else if  (app.boundarySelector.boundary.getValue() == 'State') {
      Map.addLayer(usState.style(app.BOUNDARY_STYLE), {}, 'U.S. state boundary');
    }
    else {
      Map.addLayer(usCounty.style(app.BOUNDARY_STYLE), {}, 'U.S. county boundary');
    }
  }

  updateYearFilter();
  updateCdlLayers();
  updateBoundaryLayers();
  
  app.stat();
};


app.stat = function() {
  
  // Updates the map overlay using the currently-selected countries.
  function updateOverlay() {
    
    var overlay = app.roi.style(app.HIGHLIGHT_STYLE);
    Map.layers().set(2, ui.Map.Layer(overlay, {}, 'Region of interest'));
    Map.layers().set(3, ui.Map.Layer(app.poi, {color: 'FF0000'}, 'Point of interest'));
  }
  
  function updateRoiChart() {
    
    if (app.boundarySelector.boundary.getValue() == 'ASD') {
      app.main.widgets().set(5, _statistic.statisticByRoi(app.roi, {remap:app.remap, scale: 300}));
    }
    else if  (app.boundarySelector.boundary.getValue() == 'State') {
      app.main.widgets().set(5, _statistic.statisticByRoi(app.roi, {remap:app.remap, scale: 900}));
    }
    else {
      app.main.widgets().set(5, _statistic.statisticByRoi(app.roi, {remap:app.remap, scale: 90}));
    }
  }
  
  function updatePoiChart() {
    
    app.main.widgets().set(6, _statistic.statisticByPoi(app.poi));
  }
  
  function addExportButtion() {

    app.main.widgets().set(7, ui.Button({
      label: 'Export the image of ROI to Drive',
      onClick: function () {
        print(app.currentMap);
        Export.image.toDrive({
          image: app.currentMap,
          scale: 30,
          region: app.roi,
          crs: 'EPSG:4326',
          maxPixels: 10e12,
          description: 'export'
        });
      }
    }));
    
    app.main.widgets().set(8, 
      ui.Label('Currently the Earth Engine Apps platform does not support the data export function. To export the map for the selected region, the app must be run through the Earth Engine Code Editor.')
    );
  }
  
  app.handleMapClick = function(coords) {
    
    app.poi = ee.Geometry.Point([coords.lon, coords.lat]);
    
    if (app.boundarySelector.boundary.getValue() == 'ASD') {
      app.roi = usAsd.filterBounds(app.poi);
    }
    else if  (app.boundarySelector.boundary.getValue() == 'State') {
      app.roi = usState.filterBounds(app.poi);
    }
    else {
      app.roi = usCounty.filterBounds(app.poi);
    }
    
    updateOverlay();
    updatePoiChart();
    updateRoiChart();
    addExportButtion();
  };
  
  Map.onClick(app.handleMapClick);
  Map.style().set('cursor', 'crosshair');
};


/** Creates the application interface. */
app.boot = function() {
  
  app.createConstants();
  app.createVariables();
  app.createPanels();
  
  app.main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.productFilter.panel,
      app.yearFilter.panel,
      app.cropFilter.panel,
      app.boundarySelector.panel
    ],
    style: {width: '360px', padding: '5px'}
  });
  Map.setZoom(5);
  ui.root.insert(0, app.main);
  
  app.refreshLayer();
  app.stat();
};

app.boot();
