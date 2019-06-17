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
  
  app.targetCrop = 1;
  
  app.yearList = {
    _2018: -1, _2017: -1, _2016: -1, _2015: -1, _2014: -1, _2013: -1, _2012: -1, _2011: -1, _2010: -1,
    _2009: -1, _2008: -1, _2007: -1, _2006: -1, _2005: -1, _2004: -1, _2003: -1, _2002: -1, _2001: -1, _2000: -1, 
    _1999: -1, _1998: -1, _1997: -1,
  };
  
  app.years = [];
  app.currentMap = ee.Image();
};


app.createPanels = function() {
  
  // UI
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'AgKit4EE - Crop Frequency Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app demonstrates the crop frequency modeling function of the AgKit4EE toolkit.'),
      ui.Label('Developer: Chen Zhang (czhang11@gmu.edu)')
    ])
  };
  
  // navigator
  app.productFilter = {
    product: ui.Select({
      items: ['corn', 'cotton', 'rice', 'sorghum', 'soybean', 'durum wheat', 'spring wheat', 'winter wheat'],
      placeholder: 'corn',
      onChange: app.refreshLayer
    }),
  };
  app.productFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select Crop Type', {fontWeight: 'bold'}),
      app.productFilter.product
    ],
    style: app.SECTION_STYLE,
    layout: ui.Panel.Layout.flow('horizontal', true)
  });
  
  
  // Panel of crop of interest
  app.yearFilter = {
    checkbox2018: ui.Checkbox({
      label: '2018', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2018.getValue()===true) {
          app.yearList._2018 = '2018';
        }
        else {
          app.yearList._2018 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2017: ui.Checkbox({
      label: '2017', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2017.getValue()===true) {
          app.yearList._2017 = '2017';
        }
        else {
          app.yearList._2017 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2016: ui.Checkbox({
      label: '2016', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2016.getValue()===true) {
          app.yearList._2016 = '2016';
        }
        else {
          app.yearList._2016 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2015: ui.Checkbox({
      label: '2015', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2015.getValue()===true) {
          app.yearList._2015 = '2015';
        }
        else {
          app.yearList._2015 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2014: ui.Checkbox({
      label: '2014', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2014.getValue()===true) {
          app.yearList._2014 = '2014';
        }
        else {
          app.yearList._2014 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2013: ui.Checkbox({
      label: '2013', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2013.getValue()===true) {
          app.yearList._2013 = '2013';
        }
        else {
          app.yearList._2013 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2012: ui.Checkbox({
      label: '2012', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2012.getValue()===true) {
          app.yearList._2012 = '2012';
        }
        else {
          app.yearList._2012 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2011: ui.Checkbox({
      label: '2011', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2011.getValue()===true) {
          app.yearList._2011 = '2011';
        }
        else {
          app.yearList._2011 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2010: ui.Checkbox({
      label: '2010', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2010.getValue()===true) {
          app.yearList._2010 = '2010';
        }
        else {
          app.yearList._2010 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2009: ui.Checkbox({
      label: '2009', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2009.getValue()===true) {
          app.yearList._2009 = '2009';
        }
        else {
          app.yearList._2009 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2008: ui.Checkbox({
      label: '2008', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2008.getValue()===true) {
          app.yearList._2008 = '2008';
        }
        else {
          app.yearList._2008 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2007: ui.Checkbox({
      label: '2007', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2007.getValue()===true) {
          app.yearList._2007 = '2007';
        }
        else {
          app.yearList._2007 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2006: ui.Checkbox({
      label: '2006', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2006.getValue()===true) {
          app.yearList._2006 = '2006';
        }
        else {
          app.yearList._2006 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2005: ui.Checkbox({
      label: '2005', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2005.getValue()===true) {
          app.yearList._2005 = '2005';
        }
        else {
          app.yearList._2005 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2004: ui.Checkbox({
      label: '2004', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2004.getValue()===true) {
          app.yearList._2004 = '2004';
        }
        else {
          app.yearList._2004 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2003: ui.Checkbox({
      label: '2003', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2003.getValue()===true) {
          app.yearList._2003 = '2003';
        }
        else {
          app.yearList._2003 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2002: ui.Checkbox({
      label: '2002', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2002.getValue()===true) {
          app.yearList._2002 = '2002';
        }
        else {
          app.yearList._2002 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2001: ui.Checkbox({
      label: '2001', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2001.getValue()===true) {
          app.yearList._2001 = '2001';
        }
        else {
          app.yearList._2001 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox2000: ui.Checkbox({
      label: '2000', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox2000.getValue()===true) {
          app.yearList._2000 = '2000';
        }
        else {
          app.yearList._2000 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox1999: ui.Checkbox({
      label: '1999', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox1999.getValue()===true) {
          app.yearList._1999 = '1999';
        }
        else {
          app.yearList._1999 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox1998: ui.Checkbox({
      label: '1998', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox1998.getValue()===true) {
          app.yearList._1998 = '1998';
        }
        else {
          app.yearList._1998 = -1;
        }
        app.refreshLayer();
      }
    }),
    checkbox1997: ui.Checkbox({
      label: '1997', 
      value: false,
      onChange: function() {
        if(app.yearFilter.checkbox1997.getValue()===true) {
          app.yearList._1997 = '1997';
        }
        else {
          app.yearList._1997 = -1;
        }
        app.refreshLayer();
      }
    })
  };
  app.yearFilter.panel = ui.Panel({
    widgets: [
      ui.Label('Select Years of Interest', {fontWeight: 'bold'}),
      app.yearFilter.checkbox2018,
      app.yearFilter.checkbox2017,
      app.yearFilter.checkbox2016,
      app.yearFilter.checkbox2015,
      app.yearFilter.checkbox2014,
      app.yearFilter.checkbox2013,
      app.yearFilter.checkbox2012,
      app.yearFilter.checkbox2011,
      app.yearFilter.checkbox2010,
      app.yearFilter.checkbox2009,
      app.yearFilter.checkbox2008,
      app.yearFilter.checkbox2007,
      app.yearFilter.checkbox2006,
      app.yearFilter.checkbox2005,
      app.yearFilter.checkbox2004,
      app.yearFilter.checkbox2003,
      app.yearFilter.checkbox2002,
      app.yearFilter.checkbox2001,
      app.yearFilter.checkbox2000,
      app.yearFilter.checkbox1999,
      app.yearFilter.checkbox1998,
      app.yearFilter.checkbox1997
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


// Refresh all layers
app.refreshLayer = function() {
  
  function updateYearFilter() {

    // Update year list
    if (app.productFilter.product.getValue() == 'corn') {
      app.targetCrop = 1;
    }
    if (app.productFilter.product.getValue() == 'cotton') {
      app.targetCrop = 2;
    }
    if (app.productFilter.product.getValue() == 'rice') {
      app.targetCrop = 3;
    }
    if (app.productFilter.product.getValue() == 'sorghum') {
      app.targetCrop = 4;
    }
    else if (app.productFilter.product.getValue() == 'soybean') {
      app.targetCrop = 5;
    }
    else if (app.productFilter.product.getValue() == 'durum wheat') {
      app.targetCrop = 22;
    }
    else if (app.productFilter.product.getValue() == 'spring wheat') {
      app.targetCrop = 23;
    }
    else if (app.productFilter.product.getValue() == 'winter wheat') {
      app.targetCrop = 24;
    }
  }
  
  
  app.updateYears = function(remapList) {
    
    if (Math.max.apply(Math, remapList)==-1) {
      app.years = ['2018','2017','2016','2015','2014','2013','2012','2011','2010',
      '2009','2008','2007','2006','2005','2004','2003','2002','2001','2000',
      '1999','1998','1997'];
    }
    else {
      app.years = remapList.filter(function(elem, _index){
        return -1 != elem;
      });
    }
  };
  var yearList = [app.yearList._2018, 
                  app.yearList._2017, 
                  app.yearList._2016, 
                  app.yearList._2015, 
                  app.yearList._2014, 
                  app.yearList._2013, 
                  app.yearList._2012, 
                  app.yearList._2011, 
                  app.yearList._2010, 
                  app.yearList._2009, 
                  app.yearList._2008, 
                  app.yearList._2007, 
                  app.yearList._2006, 
                  app.yearList._2005, 
                  app.yearList._2004, 
                  app.yearList._2003, 
                  app.yearList._2002, 
                  app.yearList._2001, 
                  app.yearList._2000, 
                  app.yearList._1999, 
                  app.yearList._1998, 
                  app.yearList._1997];
  app.updateYears(yearList);
  
  function updateCdlLayers() {
    // Update layers
    Map.clear();
    app.currentMap = _croplandModeling.modelingFrequencyByCrop(app.targetCrop, {years: app.years});
    Map.addLayer(app.currentMap, {min: 0, max: 22, palette: _getCdl.getFrequencyPalette()}, 'Frequency Map');
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
