/*global define,document */
/*jslint sloppy:true,nomen:true */
/*
 | Copyright 2014 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define(["dojo/ready",
"dojo/_base/declare",
"dojo/_base/lang",
"esri/arcgis/utils",
"dojo/dom",
"dojo/dom-class",
"dojo/on",

"dojo/dom-construct",
"dijit/layout/ContentPane",
"dijit/form/Button",
"dijit/form/DropDownButton",
"dijit/form/ToggleButton",
"dijit/Menu",
"dijit/PopupMenuItem",
"dijit/form/HorizontalSlider",
"dojox/layout/FloatingPane",
"dojo/_base/connect"],
function (
    ready,
    declare,
    lang,
    arcgisUtils,
    dom,
    domClass,
    on,

    domConstruct,
    ContentPane,
    Button,
    DropDownButton,
    ToggleButton,
    Menu,
    PopupMenuItem,
    HorizontalSlider,
    FloatingPane,
    connect
) {
    return declare(null, {
        config: {},
        startup: function (config) {
            // config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information.
            if (config) {
                this.config = config;

                function addCSS(url){
                    var ss = document.createElement("link");
                    ss.type = "text/css";
                    ss.rel = "stylesheet";
                    ss.href = url;
                    document.getElementsByTagName("head")[0].appendChild(ss);
                }

                addCSS(this.config.appURL + "/css/mainDesktop.css");

                //load the specified theme
                if (this.config.theme) {
                    addCSS(this.config.appURL + "/css/" + this.config.theme + ".css");
                }


                // document ready
                ready(lang.hitch(this, function () {
                    //supply either the webmap id or, if available, the item info
                    var itemInfo = this.config.itemInfo || this.config.webmap;

                    this._createWebMap(itemInfo);
                }));
            } else {
                var error = new Error("Main:: Config is not defined");
                this.reportError(error);
            }
        },
        reportError: function (error) {
            // remove loading class from body
            domClass.remove(document.body, "app-loading");
            domClass.add(document.body, "app-error");
            // an error occurred - notify the user. In this example we pull the string from the
            // resource.js file located in the nls folder because we've set the application up
            // for localization. If you don't need to support multiple languages you can hardcode the
            // strings here and comment out the call in index.html to get the localization strings.
            // set message
            var node = dom.byId("loading_message");
            if (node) {
                if (this.config && this.config.i18n) {
                    node.innerHTML = this.config.i18n.map.error + ": " + error.message;
                } else {
                    node.innerHTML = "Unable to create map: " + error.message;
                }
            }
        },
        // Map is ready
        _mapLoaded: function () {
            // Map is ready
            console.log('map loaded');
            /*** add Widgets to the app ***/

            //(if) ? "true" : "false"; wie if - else
            /*** App Help Button ***/
            (this.config.displayAppHelp == true)? this._createAppHelp(this.config) : console.log("AppHelp not activated");

            /*** Scalebar ***/
            (this.config.displayScalebar == true) ? this._createScalebar(this.map) : console.log("Scalebar not activated");

            /*** BasemapGallery ***/
            (this.config.displayBasemapGallery == true) ? this._createBasemapGallery(this.map, this.config, this) : console.log("BasemapGallery not activated");

            /*** SearchTool ***/
            (this.config.displaySearchTool == true) ? this._createSearchTool(this.map, this.config) : console.log("SearchTool not activated");

            /*** MeasureTool ***/
            (this.config.displayMeasureTool == true) ? this._createMeasureTool(this.map, this.config, this.clickHandler, this.clickListener) : console.log("MeasureTool not activated");

            /*** HeaderLogos ***/
            (this.config.displayLogos == true) ? this._createHeaderLogos(this.config) : console.log("HeaderLogos not activated");

            /*** HeaderTitle ***/
            (this.config.displayTitle == true) ? this._createHeaderTitle(this.config) : console.log("HeaderTitle not activated");

            /*** Legende ***/
            (this.config.displayLegend == true) ? this._createLegend(this.map, this.map.layerInfo, this.config) : console.log("Legend not activated");

            /*** OverviewMap ***/
            (this.config.displayOverviewMap == true) ? this._createOverviewMap(this.map, false) : console.log("OverviewMap not activated");

            /*** AppInfoText ***/
            (this.config.displayAppInfoText == true) ? this._createAppInfoText(this.config) : console.log("AppInfoText not activated");

            /*** LayerList ***/
            (this.config.displayLayerList == true) ? this._createLayerList(this.map._layers, this.map.layerInfo, this.config, this.map) : console.log("LayerList not activated");

            /*** Bookmarks ***/
            (this.config.displayBookmarks == true) ? this._createBookmarks(this.config, this.response, this.map) : console.log("Bookmarks not activated");

            /*** Editor ***/
            (this.config.displayEditor == true) ? this._createEditor(this.config, this.map, this.map._layers, this.map.layerInfo, this.clickHandler, this.clickListener) : console.log("Editor not activated");

            /*** CooOnRightClick ***/
            (this.config.CooOnRightClick == true) ? this._CooOnRightClick(this.map) : console.log("CooOnRightClick not activated");

            /*** Print ***/
            (this.config.displayPrintDijit == true) ? this._createPrintDijit(this.config, this.map) : console.log("displayPrintDijit not activated");

            /*** Draw Tool ***/
            (this.config.displayDrawTool == true) ? this._createDrawTool(this.config, this.map) : console.log("displayPrintDijit not activated");

            /*** Locate Tool ***/
           (this.config.displayLocateButton == true)? this._createlocate(this.config, this.map) : console.log("displayLocateButton not activated");

            /*** LayerSwipe ***/
           (this.config.displayLayerSwipe == true)? this._createLayerSwipe(this.map, this.map.layerInfo, this.config) : console.log("LayerSwipe not activated");



            // remove loading class from body
            domClass.remove(document.body, "app-loading");
        },
        // create a map based on the input web map id
        _createWebMap: function (itemInfo) {

            var MyWebMap = this.config.webmap;
            var mapOptions, _minZoom, _maxZoom;

            if (this.config.setZoom == true) {
                _minZoom = this.config.minZoom;
                _maxZoom = this.config.maxZoom;

                mapOptions = {
                    minZoom : _minZoom,
                    maxZoom : _maxZoom,
                    slider : this.config.displaySlider,
                    sliderStyle : this.config.sliderStyle
                };

            } else {
                mapOptions = {
                    slider : this.config.displaySlider,
                    sliderStyle : this.config.sliderStyle
                };
            }


            arcgisUtils.createMap(itemInfo, "mapDiv", {
                mapOptions: mapOptions,
                bingMapsKey: this.config.bingKey
            }).then(lang.hitch(this, function (response) {
                // Once the map is created we get access to the response which provides important info
                // such as the map, operational layers, popup info and more. This object will also contain
                // any custom options you defined for the template. In this example that is the 'theme' property.
                // Here' we'll use it to update the application to match the specified color theme.
                // console.log(this.config);

                this.clickHandler = response.clickEventHandle;
                this.clickListener = response.clickEventListener;
                this.map = response.map;

                this.config.itemLayers = response.itemInfo.itemData.operationalLayers;
                this.response = response;

                // make sure map is loaded
                if (this.map.loaded) {
                    this.map.layerInfo = {};
                    this.map.layerInfo = arcgisUtils.getLegendLayers(response);
                    this.map.__Basemap = response.itemInfo.itemData.baseMap;

                    // do something with the map
                    this._mapLoaded();
                } else {
                    on.once(this.map, "load", lang.hitch(this, function () {
                        // do something with the map
                        this._mapLoaded();
                    }));
                }
            }), this.reportError);
        },

        //-------------------------------------------------------------------------------------------------------

        /*** Help Button ***/
        _createAppHelp : function(config) {
            require(["dojo/dom-construct", "dojo/dom-style", "dojo/domReady!"], function(domConstruct, domStyle) {
                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                var _content = config.AppHelpInfo;
                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                domConstruct.create("div", {
                    id : "AppHelpFloater"
                }, "mapDiv");
                domConstruct.create("div", {
                    id : "AppHelpDiv"
                }, "AppHelpFloater");

                var height = window.innerHeight;
                var width = window.innerWidth;
                var _floaterH = 200;
                var _floaterW = 300;
                var top = (window.innerHeight / 2) - (_floaterH);
                var right = (window.innerWidth / 2) - (_floaterW / 2);

                var pos = "position:absolute;top:" + top + "px;right:" + right + "px;width:" + _floaterW + "px;height:" + _floaterH + "px;z-index:100;visibility:hidden;";

                var fp = new FloatingPane({
                    title : config.i18n.tools.help.title,
                    resizable : false,
                    dockable : false,
                    closable : false,
                    content : _content,
                    style : pos,
                    id : 'AppHelpFloater'
                }, dom.byId('AppHelpFloater'));
                fp.startup();

                var mylabel;
                (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.help.label;

                (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.help.label : mylabel = " ";

                var toggleButton = new ToggleButton({
                    label : mylabel,
                    title : config.i18n.tools.help.title,
                    id : "AppHelp",
                    iconClass : "esriHelpIcon",
                    checked : false,
                    onClick : function() {
                        toggleFloter();
                    }
                });

                var toolbarR = dom.byId('webmap-toolbar-right');
                toolbarR.appendChild(toggleButton.domNode);


                function toggleFloter() {
                    var floater = dijit.byId('AppHelpFloater');
                    if (dom.byId('AppHelpFloater').style.visibility === 'hidden') {
                        floater.show();
                    } else {
                        floater.hide();
                        dijit.byId('AppHelp').set('checked', false);
                        //uncheck the measure toggle button
                    }
                }


            });
        },

        /*** Scalebar ***/
        _createScalebar : function(map) {
            require(["esri/dijit/Scalebar", "dojo/domReady!"], function(Scalebar) {

                var scalebar = new Scalebar({
                    map : map,
                    // "dual" displays both miles and kilmometers
                    // "english" is the default, which displays miles
                    // use "metric" for kilometers
                    scalebarUnit : "dual",
                    attachTo : "bottom-left"

                });
            });

        },


        /*** BasemapGallery ***/
        _createBasemapGallery : function(map, config, myThis) {
            require(["esri/dijit/BasemapGallery", "esri/dijit/BasemapLayer", "esri/dijit/Basemap", "dojo/domReady!"], function(BasemapGallery, BasemapLayer, Basemap) {



                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                var myBasemapsArr = [];

                if (config.displayArcGISBasemaps == false) {
                    myBasemapsArr = addBasemapsArr();
                } else {
                    myBasemapsArr = [];
                }

                //--------------------------------------------------------------
                function addBasemapsArr() {
                    //var configlayers = [];
                    var Arr = [];
                    var layersObj = {};


                    //Layer Object stores all Layers for the BasemapGallery
                    var _layersObj = config._layersObj;


                    // checks if Basemaps true
                    var str = "";
                    for(var o in _layersObj){
                        str = o.toString();
                        (config[o] == true) ? layersObj[str] = _layersObj[str] : false;
                    }


                    //TODO Tiled and ArcGIS Dynamic from webMap und WMTS
                    function getBasemapFromWebMap(__Basemap){
                        var Layer = {};
                        Layer.title = __Basemap.title;
                        Layer.icon =  config.appURL + "/images/basemap.png";
                        (__Basemap.baseMapLayers[0].url)? Layer.url = __Basemap.baseMapLayers[0].url : false;
                        (__Basemap.baseMapLayers[0].templateUrl)? Layer.url = __Basemap.baseMapLayers[0].templateUrl : false;
                        (__Basemap.baseMapLayers[0].type)? Layer.type = __Basemap.baseMapLayers[0].type : false;
                        (__Basemap.baseMapLayers[0].subDomains)? Layer.subDomains = __Basemap.baseMapLayers[0].subDomains.toString() : false;
                        (__Basemap.baseMapLayers[0].copyright)? Layer.copy = __Basemap.baseMapLayers[0].copyright : false;

                        if(__Basemap.baseMapLayers[0].wmtsInfo){
                            Layer.copy = __Basemap.baseMapLayers[0].layerObject.copyright;
                            Layer.tileInfo = {};
                            Layer.layersObject = {};
                            Layer.tileInfo = __Basemap.baseMapLayers[0].tileInfo;
                            Layer.layersObject = __Basemap.baseMapLayers[0].layerObject;
                            Layer.title = __Basemap.baseMapLayers[0].title;
                            Layer.type = "WMTS";
                        }
                        return Layer;
                    }
                    layersObj["webBasemap"] = getBasemapFromWebMap(map.__Basemap);
                    //console.log(map.__Basemap);



                    //bis jetzt nur WebTiled und ArcGIS Dynamic implementiert
                    var temp;
                    for (var i in layersObj) {
                        var Layer = layersObj[i];
                        if (Layer.type == "WebTiledLayer") {

                            Arr.push(new Basemap({
                                title : Layer.title,
                                thumbnailUrl : Layer.icon,

                                layers : [temp = new BasemapLayer({
                                    type : Layer.type,
                                    url : Layer.url,
                                    subDomains: Layer.subDomains.split(","),
                                    copyright : Layer.copy

                                })]
                            }));


                        }
                        else if (Layer.type == "WMTS") {
                            Arr.push(new Basemap({
                                title : Layer.title,
                                thumbnailUrl : Layer.icon,

                                layers : [new BasemapLayer({
                                    type : Layer.type,
                                    url : Layer.url,
                                    tileInfo: Layer.tileInfo,
                                    layersObject: Layer.layersObject,
                                    copyright : Layer.copy

                                })]

                            }));
                        }
                         else if (!Layer.type) {
                            Arr.push(new Basemap({
                                title : Layer.title,
                                thumbnailUrl : Layer.icon,

                                layers : [new BasemapLayer({
                                    url : Layer.url,
                                    copyright : Layer.copy
                                })]
                            }));
                        } else if (Layer.type == "BingMapsRoad" || Layer.type == "BingMapsAerial" || Layer.type == "BingMapsHybrid") {
                            Arr.push(new Basemap({
                                title : Layer.title,
                                thumbnailUrl : Layer.icon,
                                layers : [new BasemapLayer({
                                    type : Layer.type
                                })]
                            }));
                        } else {
                            console.log(Layer.type + " not defined");
                        }

                    }

                    return Arr;
                }

                var basemapGallery = new BasemapGallery({
                    showArcGISBasemaps : config.displayArcGISBasemaps,
                    basemaps : myBasemapsArr,
                    bingMapsKey : config.bingKey,
                    map : map
                }, domConstruct.create('div'));
                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                var panBasemap = new ContentPane({
                    title : config.i18n.tools.basemap.label,
                    id : "panBasemap",
                    //class: "AccordionPane",
                    iconClass : 'esriBasemapIcon',
                    content : basemapGallery
                });

                var aContainer = dijit.byId("aContainer");
                aContainer.addChild(panBasemap);

                var mylabel;
                (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.basemap.label;

                (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.basemap.label : mylabel = " ";


                var toButton = new ToggleButton({
                    showLabel : true,
                    label : mylabel,
                    title : config.i18n.tools.basemap.title,
                    checked : false,
                    iconClass : "esriBasemapIcon",
                    id : "basemapBtn",
                    onChange : function(val) {
                        //display the left panel if hidden
                        var leftPaneWidth = dojo.style(dom.byId("rightPane"), "width");
                        if (leftPaneWidth === 0) {

                            aContainer.selectChild(panBasemap);

                            dojo.style(dom.byId("rightPane"), "width", config.rightPaneToggleWidth);
                            dijit.byId("BorderContainer").resize();
                        } else {
                            dojo.style(dom.byId("rightPane"), "width", "0px");
                            dijit.byId("BorderContainer").resize();
                        }
                    }
                });

                dojo.byId('webmap-toolbar-center').appendChild(toButton.domNode);


                //nur noch ein Layer für Übersichtskarte
                /*
                on(basemapGallery, "selection-change", function() {
                    //close the basemap window when an item is selected
                    //destroy and recreate the overview map  - so the basemap layer is modified.

                    myThis._destroyOverviewMap(myThis);
                });
                */

                basemapGallery.startup();

            });

        },

        /*** OverviewMap ***/
        _createOverviewMap : function(map, isVisible) {
            require(["esri/dijit/OverviewMap", "esri/layers/OpenStreetMapLayer", "dojo/domReady!"], function(OverviewMap, OpenStreetMapLayer) {

                var size = (window.innerWidth / 5);
                if(size <= 100){
                    size = 100;
                }

                var overLayer = new OpenStreetMapLayer(); //nur noch ein Layer

                var overviewMapDijit = new OverviewMap({
                    map : map,
                    attachTo : "top-right",
                    baseLayer: overLayer, //nur noch ein Layer
                    opacity : 0.5,
                    color : "#000000",
                    expandfactor : 1,
                    height : (size / 2),
                    width : size,
                    maximizeButton : false,
                    visible : isVisible,
                    id : 'overviewMap'
                });

                overviewMapDijit.startup();
            });
        },

        _destroyOverviewMap : function(myThis) {
            var ov = dijit.byId('overviewMap');
            if (ov) {
                var vis = ov.visible;
                ov.destroy();
                myThis._createOverviewMap(myThis.map, vis);
            }
        },

        /*** SearchTool ***/
        _createSearchTool : function(map, config) {
            require(["esri/dijit/Geocoder", "esri/symbols/PictureMarkerSymbol", "esri/graphic", "dijit/TooltipDialog", "dojo/domReady!"], function(Geocoder, PictureMarkerSymbol, Graphic, TooltipDialog) {

                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                var geocodeOptions = {};
                geocodeOptions.placeholder = config.i18n.tools.search.title;

                var geocoder = new Geocoder({
                    map : map,
                    geocoderMenu:true,
                    //theme : "simpleGeocoder",
                    arcgisGeocoder : geocodeOptions
                }, domConstruct.create('div'));

                geocoder.startup();

                on(geocoder, "find-results", function() {
                    var mapPoint;
                    var pic = new PictureMarkerSymbol("images/map_marker_base.png",48,48);
                    mapPoint = geocoder.results[0].extent.getCenter();
                    map.graphics.add(new Graphic(mapPoint, pic));
                });

                on(geocoder, "clear", function() {
                    map.graphics.clear();
                });


                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                var cp = new TooltipDialog({
                    id : 'SearchTool',
                    style : "height:auto; width:auto; border:none;"
                });


                cp.set('content', geocoder.domNode);

                var mylabel;
                (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.search.label;

                (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.search.label : mylabel = " ";

                var button = new DropDownButton({
                    label : mylabel,
                    id : "SearchBtn",
                    iconClass : "esriSearchIcon",
                    style : "float:right;",
                    title : config.i18n.tools.search.title,
                    dropDown : cp
                });


                dojo.byId('webmap-toolbar-center').appendChild(button.domNode);
            });

        },

        /*** MeasureTool ***/
        _createMeasureTool : function(map, config, clickHandler, clickListener) {
            require(["esri/dijit/Measurement", "dojo/domReady!"], function(Measurement) {
                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                var measure = new Measurement({
                    map : map,
                    id : 'measureTool'
                }, domConstruct.create('div'));

                measure.startup();
                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


                domConstruct.create("div", {
                    id : "MeasureFloater"
                }, "mapDiv");

                var fp = new FloatingPane({
                    title : config.i18n.tools.measure.title,
                    resizable : false,
                    dockable : false,
                    closable : false,
                    style : "position:absolute;top:0;left:60px;width:280px;height:175px;z-index:100;visibility:hidden;",
                    id : 'MeasureFloater'
                }, dom.byId('MeasureFloater'));

                fp.startup();

                fp.setContent(measure);


                var mylabel;
                (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.measure.label;

                (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.measure.label : mylabel = " ";

                var toggleButton = new ToggleButton({
                    label : mylabel,
                    title : config.i18n.tools.measure.title,
                    id : "toggleMeasure",
                    iconClass : "esriMeasureIcon",
                    checked : false,
                    onClick : function() {
                        toggleMeasure(measure,fp);
                    }
                });

                dom.byId('webmap-toolbar-center').appendChild(toggleButton.domNode);
            });

            //TODO Measure Tool geht manchmal nicht richtig???
            function toggleMeasure(measureTool,MeasureFloater) {
                var measure = measureTool;
                var floater = MeasureFloater;

                if (config.displayEditor == true) {
                    var editorWidget = dijit.byId('EDiv');
                }
                if (dom.byId(floater.id.toString()).style.visibility === 'hidden') {
                    floater.show();

                    //if the editor widget exists popups are already disabled.
                    if (config.displayEditor == true) {
                        if (!editorWidget) {
                            disablePopups();

                            //disable map popups otherwise they interfere with measure clicks
                        } else {
                            console.log('Editor widget exists so no disabling');
                        }
                    }
                } else {
                    floater.hide();

                    //deactivate the tool and clear the results
                    measure.clearResult();
                    if (measure.activeTool) {
                        measure.setTool(measure.activeTool, false);
                    }

                    if (config.displayEditor == true) {
                        if (!editorWidget) {
                            enablePopups();
                            //enable map popup windows
                        }
                    }
                    dijit.byId('toggleMeasure').set('checked', false);
                    //uncheck the measure toggle button
                }

            }

            function enablePopups() {
                if (clickListener) {
                    clickHandler = connect.connect(map, "onClick", clickListener);
                }
            }

            function disablePopups() {
                if (clickHandler) {
                    connect.disconnect(clickHandler);
                }
            }

        },

        /*** Editor ***/
        _createEditor : function(config, map, layers, layerInfo, clickHandler, clickListener) {
            require(["esri/dijit/editing/Editor", "esri/dijit/editing/TemplatePicker", "esri/dijit/AttributeInspector", "esri/layers/FeatureLayer", "dojo/domReady!"], function(Editor, TemplatePicker, AttributeInspector, FeatureLayer) {
                var editorWidget;

                domConstruct.create("div", {
                    id : "EditorFloater"
                }, "mapDiv");

                var fp = new FloatingPane({
                    label : config.i18n.tools.editor.label,
                    title : config.i18n.tools.editor.label,
                    resizable : true,
                    dockable : false,
                    closable : false,
                    style : "position:absolute;top:0;left:60px;width:320px;height:265px;z-index:100;visibility:hidden;",
                    id : 'EditorFloater'
                }, dom.byId('EditorFloater'));
                fp.startup();

                var mylabel;
                (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.editor.label;

                (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.editor.label : mylabel = " ";

                var toggleButton = new ToggleButton({
                    label : mylabel,
                    title : config.i18n.tools.editor.title,
                    id : "toggleEditor",
                    iconClass : "esriEditIcon",
                    checked : false,
                    onClick : function() {
                        toggleEditor();
                    }
                });

                dom.byId('webmap-toolbar-center').appendChild(toggleButton.domNode);

                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                var editLayers = hasEditableLayers(layerInfo);

                //----------functions-------------------------------------------------
                function toggleEditor() {

                    if (dom.byId('EditorFloater').style.visibility === 'hidden') {
                        dijit.byId('EditorFloater').show();

                        createEditor(editLayers);
                        var templatePi = dijit.byId('TDiv');

                        if (config.displayMeasureTool == true) {
                            var measure = dijit.byId('measureTool');
                            on(templatePi, "selection-change", function() {
                                if (measure.activeTool) {
                                    measure.clearResult();
                                    measure.setTool(measure.activeTool, false);
                                }
                            });

                        }
                    } else {
                        dijit.byId('EditorFloater').hide();
                        destroyEditor();

                    }

                }

                function createEditor(editLayers) {
                    if (editorWidget) {
                        return;
                    }

                    domConstruct.create("div", {
                        id : "EditorDiv",
                        innerHTML : "<div id='TDiv'></div><div id='EDiv'></div>"
                    }, fp.containerNode);

                    if (editLayers.length > 0) {
                        var editLayerInfo = editLayers;
                        //add field infos if applicable - this will contain hints if defined in the popup. Also added logic to hide fields that have visible = false. The popup takes
                        //care of this for the info window but not for the edit window.

                        dojo.forEach(editLayerInfo, function(layer) {

                            //-------------------------------------------------------------------------
                            //TODO arcgisUtils.createMap übernimmt keine capabilities -> ArcGis Bug ??
                            //try catch als Umgehung für arcgis online webmap

                            // try {
                                var webMapLayer = config.webmap.itemData.operationalLayers;
                                for (var l in webMapLayer) {
                                    var layID = webMapLayer[l].id;

                                    if (layID == layer.featureLayer.id) {
                                        if(layer.featureLayer.capabilities){
                                            layer.featureLayer.capabilities = webMapLayer[l].capabilities;
                                        }

                                    }
                                }
                            // } catch(e) {
                                // console.log(e);
                            // }

                            //--------------------------------------------------------------------------
                            if(layer.featureLayer.capabilities){
                                var capabilities = layer.featureLayer.capabilities.split(",");

                                var _Create = $.inArray('Create', capabilities) > -1;
                                //var _Query = $.inArray('Query', capabilities) > -1;
                                //var _Uploads = $.inArray('Uploads', capabilities) > -1;
                                var _Update = $.inArray('Update', capabilities) > -1;
                                var _Editing = $.inArray('Editing', capabilities) > -1;

                                layer.featureLayer.allowGeometryUpdates = _Editing;
                                layer.isEditable = _Update;
                            }


                            if (layer.featureLayer && layer.featureLayer.infoTemplate && layer.featureLayer.infoTemplate.info && layer.featureLayer.infoTemplate.info.fieldInfos) {
                                //only display visible fields

                                var fields = layer.featureLayer.fields;

                                var fieldInfos = dojo.map(fields, function(field) {
                                    if (field.name === 'description') {
                                        return {
                                            'fieldName' : field.name,
                                            'label' : 'Details',
                                            stringFieldOption : AttributeInspector.STRING_FIELD_OPTION_TEXTAREA
                                        };
                                    } else {
                                        return {
                                            'fieldName' : field.name,
                                            'lable' : field.alias
                                        };
                                    }
                                });
                                layer.fieldInfos = fieldInfos;

                            }

                        });

                        var templateLayers = [];
                        for (var l in editLayers) {
                            var featureLayer = editLayers[l].featureLayer;
                            var _layer = editLayers[l];
                            //console.log(editLayers[l]);
                            //if(featureLayer.visible == true && _layer.isEditable == true){
                            if (featureLayer.visible) {
                                templateLayers.push(featureLayer);
                            }

                        }

                        var templatePicker = new TemplatePicker({
                            featureLayers : templateLayers,
                            showTooltip : false,
                            grouping : true,
                            rows : "auto",
                            columns : "auto"
                            //style: "height:" + editPanelHeight + " width:" + editPanelWidth
                        }, "TDiv");
                        templatePicker.startup();

                        //-----------------------------------------------------------------------------------------------------------

                        var settings = {
                            map : map,
                            layerInfos : editLayerInfo,
                            //layerInfos: templateLayers, hier wird keine Toolbar gezeigt und kein editieren ist möglich
                            templatePicker : templatePicker,
                            createOptions : {
                                polylineDrawTools : [Editor.CREATE_TOOL_POLYLINE],
                                polygonDrawTools : [Editor.CREATE_TOOL_POLYGON, Editor.CREATE_TOOL_CIRCLE, Editor.CREATE_TOOL_TRIANGLE, Editor.CREATE_TOOL_RECTANGLE]
                            },

                            toolbarOptions : {
                                reshapeVisible : false,
                                cutVisible : false,
                                mergeVisible : false
                            },
                            enableUndoRedo : true,
                            toolbarVisible : true

                        };

                        var params = {
                            settings : settings
                        };

                        map.enableSnapping({
                            snapKey : dojo.keys.copyKey
                        });

                        var params = {
                            settings : settings
                        };

                        editorWidget = new Editor(params, "EDiv");

                        editorWidget.startup();
                        console.log(editorWidget);
                        disablePopups();
                    }

                }

                //Determine if the webmap has any editable layers
                function hasEditableLayers(layerInfo) {

                    var layerInfos = layerInfo;
                    var editableLayers = [];

                    for (var i in layerInfos) {
                        var layer = layerInfos[i].layer;
                        if (layer._editable == true) {

                            var eLayer = layer;

                            if ( eLayer instanceof FeatureLayer && eLayer.isEditable()) {
                                console.log(eLayer.capabilities);
                                if (eLayer.capabilities && eLayer.capabilities === "Query") {

                                    //is capabilities set to Query if so then editing was disabled in the web map so
                                    //we won't add to editable layers.
                                } else {

                                    editableLayers.push({
                                        'featureLayer' : eLayer
                                    });
                                }
                            }
                        }
                    }
                    return editableLayers;
                }

                function destroyEditor() {
                    if (editorWidget) {
                        editorWidget.destroy();
                        editorWidget = null;
                        enablePopups();
                    }

                }

                function enablePopups() {
                    if (clickListener) {
                        clickHandler = connect.connect(map, "onClick", clickListener);
                    }
                }

                function disablePopups() {
                    if (clickHandler) {
                        connect.disconnect(clickHandler);
                    }
                }

            });

        },

        /*** HeaderLogos ***/
        _createHeaderLogos : function(config) {
            var head_cont_left = dom.byId('webmap-toolbar-left');

            function setLeftContainer(div, logos) {
                var array = logos.split(",");
                domConstruct.place("<div id='headerLogos' class='headerLogos'></di>", div);

                for(var i in array) {
                    if (array[i] === "") {
                        console.log("logoList ends with a comma");
                    } else {
                        //domConstruct.place("<img src='" + array[i] + "' alt='logo" + i + "' height='30'> ", 'headerLogos');
                        domConstruct.place("<img src='" + array[i] + "' alt='logo" + i + "' height='30'> ", 'headerLogos');
                    }

                }
            }

            setLeftContainer(head_cont_left, config.logosStr);

        },

        /*** HeaderTitle ***/
        _createHeaderTitle : function(config) {

            var head_cont_left = dom.byId('webmap-toolbar-left');
            function setLeftContainer(divID, title) {
                domConstruct.place("<div class='headerTitle' ><h4 alt='title'>" + title + "</h4></div> ", divID);
            }

            setLeftContainer(head_cont_left, config.titleStr);

        },

        /*** CoordinatesOnRightClick ***/
        _CooOnRightClick : function(map) {
            require(["dijit/form/Textarea", "esri/geometry/Point", "esri/geometry/Extent", "esri/dijit/Measurement", "esri/geometry/webMercatorUtils", "dojo/domReady!"], function(Textarea, Point, Extent, Measurement, WebMercatorUtils) {
                // Creates right-click context menu for map
                var textFeld1 = new Textarea({
                    id : "myText1",
                    value : " ",
                    style : "width:150px; font-size:12px;"
                });
                textFeld1.startup();

                var textFeld2 = new Textarea({
                    id : "myText2",
                    value : " ",
                    style : "width:170px; font-size:12px;"
                });
                textFeld2.startup();

                var currentLocation;

                var ctxMenuForMap = new Menu({
                    //class: "ctxMenuForMap",
                    onOpen : function(box) {
                        // Lets calculate the map coordinates where user right clicked.
                        // We'll use this to create the graphic when the user clicks
                        // on the menu item to "Add Point"
                        currentLocation = getMapPointFromMenuPosition(box);
                    }
                });
                ctxMenuForMap.startup();
                ctxMenuForMap.bindDomNode(map.container);

                function round(d) {
                    var n = 10000000000;
                    var wert = Math.round(d * n) / n;
                    return wert;
                }

                var measure_ = new Measurement({
                    map : map,
                    id : 'measure_'
                });
                measure_.startup();
                // measure_._showCoordinates
                //console.log(measure_);

                var subMenu1 = new Menu({
                    onOpen : function() {
                        textFeld1.setValue("x='" + round(currentLocation.x) + "'" + "\n" + "y='" + round(currentLocation.y) + "'");
                        textFeld1.focus();
                        dojo.byId('myText1').select();
                    }
                });
                subMenu1.addChild(textFeld1);
                //TODO Measur macht keine KooTransformation -> bei CRS in nicht Mercator oder wgs 84 einfach Koordinaten der Karte
                var subMenu2 = new Menu({
                    onOpen : function() {
                        var mapExtent;

                        if (map.geographicExtent) {
                            mapExtent = map.geographicExtent;
                        } else {
                            var ext = map.extent;
                            var a = {};
                            a.mapPoint = new Point(ext.xmin, ext.ymin, ext.spatialReference);
                            var minP = measure_._getGCSLocation(a).mapPoint;
                            var b = {};
                            b.mapPoint = new Point(ext.xmax, ext.ymax, ext.spatialReference);
                            var maxP = measure_._getGCSLocation(b).mapPoint;

                            mapExtent = new Extent(minP.x, minP.y, maxP.x, maxP.y, maxP.spatialReference);
                        }

                        textFeld2.setValue("xmin='" + round(mapExtent.xmin) + "'" + "\n" + "ymin='" + round(mapExtent.ymin) + "'" + "\n" + "xmax='" + round(mapExtent.xmax) + "'" + "\n" + "ymax='" + round(mapExtent.ymax) + "'");
                        textFeld2.focus();
                        dojo.byId('myText2').select();
                    }
                });
                subMenu2.addChild(textFeld2);

                ctxMenuForMap.addChild(new PopupMenuItem({
                    label : "Coordinates",
                    popup : subMenu1
                }));

                ctxMenuForMap.addChild(new PopupMenuItem({
                    label : "MapExtent",
                    popup : subMenu2
                }));

                subMenu1.startup();
                ctxMenuForMap.startup();
                ctxMenuForMap.bindDomNode(map.container);
                //ctxMenuForMap.addChild(textFeld);

                //-------------------------------------------------------------
                function getMapPointFromMenuPosition(box) {
                    var point, mapPointvar, screenPoint;
                    var x = box.x, y = box.y;
                    switch( box.corner ) {
                        case "TR":
                            x += box.w;
                            break;
                        case "BL":
                            y += box.h;
                            break;
                        case "BR":
                            x += box.w;
                            y += box.h;
                            break;
                    }

                    screenPoint = new Point(x - map.position.x, y - map.position.y);
                    mapPoint = map.toMap(screenPoint);

                    // use function from esri/dijit/Measurement
                    var a = {};
                    a.mapPoint = mapPoint;
                    var crs = mapPoint.spatialReference;
                    //console.log(a);
                    if (crs.isWebMercator()) {
                        point = WebMercatorUtils.webMercatorToGeographic(mapPoint);
                    } else {
                        point = measure_._getGCSLocation(a).mapPoint;
                    }

                    return point;
                }

            });
        },

        /*** Legende ***/
        _createLegend : function(map, layerInfo, config) {
            require(["esri/dijit/Legend", "dojo/domReady!"], function(Legend) {

                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                var legendDijit = new Legend({
                    map : map,
                    layerInfos : layerInfo
                }, domConstruct.create('div'));
                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


                var panLegend = new ContentPane({
                    title : config.i18n.tools.legend.label,
                    id : "panLegend",
                    //class: "AccordionPane",
                    iconClass : 'esriLegendIcon',
                    content : legendDijit
                });

                var aContainer = dijit.byId("aContainer");
                aContainer.addChild(panLegend);

                var mylabel;
                (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.legend.label;

                (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.legend.label : mylabel = " ";

                var toButton = new ToggleButton({
                    showLabel : true,
                    label : mylabel,
                    title : config.i18n.tools.legend.title,
                    checked : false,
                    iconClass : 'esriLegendIcon',
                    id : 'legendButton',
                    onChange : function(val) {
                        //display the left panel if hidden
                        var leftPaneWidth = dojo.style(dom.byId("rightPane"), "width");
                        if (leftPaneWidth === 0) {

                            aContainer.selectChild(panLegend);

                            dojo.style(dom.byId("rightPane"), "width", config.rightPaneToggleWidth);
                            dijit.byId("BorderContainer").resize();
                        } else {
                            dojo.style(dom.byId("rightPane"), "width", "0px");
                            dijit.byId("BorderContainer").resize();
                        }
                    }
                });

                dojo.byId('webmap-toolbar-center').appendChild(toButton.domNode);

                legendDijit.startup();
                legendDijit.refresh();
                //damit Layer nicht doppelt angezeigt werden

            });
        },

        /*** AppInfoText ***/
        _createAppInfoText : function(config) {
            var panInfo = new ContentPane({
                title : config.i18n.tools.MapInfo.label,
                id : "panInfo",
                //class: "AccordionPane",
                iconClass : 'esriInfoIcon',
                content : config.AppInfoTextStr
            });


            //console.log(panInfo);

            var aContainer = dijit.byId("aContainer");
            aContainer.addChild(panInfo);

            var mylabel;
            (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.MapInfo.label;

            (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.MapInfo.label : mylabel = " ";

            var toButton = new ToggleButton({
                showLabel : true,
                label : mylabel,
                title : config.i18n.tools.MapInfo.title,
                checked : false,
                iconClass : 'esriInfoIcon',
                id : 'infoButton',
                onChange : function(val) {
                    //display the left panel if hidden
                    var leftPaneWidth = dojo.style(dom.byId("rightPane"), "width");
                    if (leftPaneWidth === 0) {

                        aContainer.selectChild(panInfo);
                        //shows InfoPan on open rightPane

                        dojo.style(dom.byId("rightPane"), "width", config.rightPaneToggleWidth);
                        dijit.byId("BorderContainer").resize();
                    } else {
                        dojo.style(dom.byId("rightPane"), "width", "0px");
                        dijit.byId("BorderContainer").resize();
                    }
                }
            });

            dojo.byId('webmap-toolbar-center').appendChild(toButton.domNode);

        },

        /*** LayerList ***/
        _createLayerList : function(layers, layerInfo, config, map) {
            require(["esri/geometry/Extent", "esri/SpatialReference", "esri/tasks/GeometryService", "esri/geometry/Point", "esri/tasks/ProjectParameters", "dijit/form/CheckBox", "dojo/domReady!"], function(Extent, SpatialReference, GeometryService, esriPoint, ProjectParameters, CheckBox) {
                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                var layerList = config.itemLayers;


                if (layerList.length > 0) {
                    //create a menu of layers
                    layerList.reverse();
                   //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                    var panLayers = new ContentPane({
                        title : config.i18n.tools.layers.label,
                        id : "layerMenu",
                        iconClass : "esriLayerIcon"
                    });

                    var aContainer = dijit.byId("aContainer");
                    aContainer.addChild(panLayers);

                    var mylabel;
                    (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.layers.label;

                    (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.layers.label : mylabel = " ";

                    var toButton = new ToggleButton({
                        showLabel : true,
                        label : mylabel,
                        title : config.i18n.tools.layers.title,
                        checked : false,
                        iconClass : "esriLayerIcon",
                        id : "layerBtn",
                        onChange : function(val) {
                            //display the left panel if hidden
                            var leftPaneWidth = dojo.style(dom.byId("rightPane"), "width");
                            if (leftPaneWidth === 0) {

                                aContainer.selectChild(panLayers);

                                dojo.style(dom.byId("rightPane"), "width", config.rightPaneToggleWidth);
                                dijit.byId("BorderContainer").resize();
                            } else {
                                dojo.style(dom.byId("rightPane"), "width", "0px");
                                dijit.byId("BorderContainer").resize();
                            }
                        }
                    });

                    //create Layer list-------------------------------------------------------------------------
                    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                    var layerTable = domConstruct.create("table", {
                        id : "layerTable"
                    });
                    dojo.forEach(layerList, function(layer) {

                        var row1 = layerTable.insertRow(-1);
                        var row2 = layerTable.insertRow(-1);
                        var row3 = layerTable.insertRow(-1);

                        var chk = new CheckBox({
                            label : layer.title,
                            title : "Layer on/off",
                            name : layer.title,
                            checked : layer.visibility, //undefined
                            onChange : function() {

                                if (layer.layerObject.featureCollection) {
                                    //turn off all the layers in the feature collection even
                                    //though only the  main layer is listed in the layer list
                                    // bei welchem LayerTyp ???????????????
                                    dojo.forEach(layer.layerObject.featureCollection.layers, function(layer) {
                                        layer.layerObject.setVisibility(!layer.layerObject.visible);
                                    });
                                } else {
                                    layer.layerObject.setVisibility(!layer.layerObject.visible);

                                }
                            }
                        });
                        //------------------------------------

                        var slider = new HorizontalSlider({
                            name : "slider",
                            title : "Layer opacity",
                            value : 1,
                            minimum : 0,
                            maximum : 1,
                            intermediateChanges : true,
                            style : "width:160px;",
                            onChange : function(value) {
                                var layObj = layer.layerObject;
                                if (layer.layerObject.featureCollection) {
                                    //turn off all the layers in the feature collection even
                                    //though only the  main layer is listed in the layer list
                                    dojo.forEach(layer.layerObject.featureCollection.layers, function(layer) {

                                        layer.layerObject.setOpacity(value);
                                    });
                                } else if (layer.layerObject.declaredClass == "esri.layers.GeoRSSLayer") {
                                    for (var fl in layer.layerObject._fLayers) {
                                        layer.layerObject._fLayers[fl].setOpacity(value);
                                    }
                                } else if (layer.layerObject.declaredClass == "esri.layers.KMLLayer") {

                                    if(layer.layerObject._groundLyr){
                                        layer.layerObject._groundLyr.setOpacity(value);

                                        for (var fl in layer.layerObject._fLayers) {
                                            layer.layerObject._fLayers[fl].setOpacity(value);
                                        }
                                    }else{
                                        var lays = layer.layerObject.getLayers();
                                            for (var fl in lays) {
                                                var flay = lays[fl]._fLayers;

                                                for (var l in flay) {
                                                    flay[l].setOpacity(value);
                                                }
                                            }
                                    }

                                } else {
                                    layer.layerObject.setOpacity(value);
                                }

                            }
                        });

                        slider.startup();

                        var zoomBtn = new Button({
                            name : layer.title,
                            title : "zoom to Layer",
                            iconClass : "esriZoomToIcon",
                            onClick : function(evt) {
                                zoomTo(layer.layerObject);
                            }
                        });
                        zoomBtn.startup();

                        //table for Layers
                        var cell1 = row1.insertCell(0);
                        var cell2 = row1.insertCell(1);
                        cell2.innerHTML = layer.title;

                        var cell3 = row2.insertCell(0);
                        var cell4 = row2.insertCell(1);

                        var cell5 = row3.insertCell(0);
                        cell5.innerHTML = "<hr>";

                        chk.placeAt(cell1);
                        slider.placeAt(cell4);
                        zoomBtn.placeAt(cell3);

                    });
                    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                    panLayers.set("content", layerTable);

                    dojo.byId('webmap-toolbar-center').appendChild(toButton.domNode);
                }//<- wenn keine Layer in confog dann keine Anzeige der Layer Button

                //-----------------------------

                /** Zoom to Layer **/
                function zoomTo(_layer) {
                    var map_crs = map.spatialReference;
                    var layExtent, extent;


                    if (_layer.fullExtent) {
                        var lay_crs = _layer.fullExtent.spatialReference;

                        if (sameCRS(map_crs, lay_crs)) {
                            console.log("same CRS");
                            console.log("fullExtent");

                            if ( typeof map_crs.wkid === "string" || typeof lay_crs.wkid === "number") {
                                console.log("arcgis BUG");
                                //console.log(_layer);
                                lay_crs.wkid = lay_crs.wkid.toString();
                                layExtent = _layer.fullExtent;
                                extent = new Extent(layExtent);
                                map.setExtent(extent, !0);
                            } else {
                                //console.log(_layer);
                                layExtent = _layer.fullExtent;
                                extent = new Extent(layExtent);
                                map.setExtent(extent, !0);
                            }

                        } else {
                            console.log("different CRS");
                            console.log(_layer);
                            ProjectExtent(_layer, _layer.fullExtent, map_crs);
                        }
                    } else if (_layer.declaredClass == "esri.layers.KMLLayer") {
                        console.log("KML");
                        var _extent = getKmlExtent(_layer);
                        var lay_crs = _extent.spatialReference;

                        if (sameCRS(map_crs, lay_crs)) {
                            console.log("same CRS");
                            console.log("fullExtent");

                            if ( typeof map_crs.wkid === "string" || typeof lay_crs.wkid === "number") {
                                console.log("arcgis BUG");
                                console.log(_layer);
                                lay_crs.wkid = lay_crs.wkid.toString();
                                layExtent = _extent;
                                extent = new Extent(layExtent);
                                map.setExtent(extent, !0);
                            } else {
                                layExtent = _extent;
                                extent = new Extent(layExtent);
                                map.setExtent(extent, !0);
                            }
                        } else {
                            console.log("different CRS");
                            ProjectExtent(_layer, _extent, map_crs);
                        }

                    } else {
                        console.log("Layer Type not defined");

                    }

                    //--------------------------------------------------

                    function sameCRS(crs1, crs2) {
                        var same;
                        if (crs1.isWebMercator() == crs2.isWebMercator()) {
                            same = true;
                        } else if (crs1.wkid == crs2.wkid) {
                            same = true;
                        } else {
                            same = false;
                        }
                        return same;
                    }

                    function getKmlExtent(layer) {
                        var _ext;

                        if (layer._fLayers) {

                            for (var l in layer._fLayers) {
                                _ext = layer._fLayers[l].fullExtent;
                                console.log(_ext);
                                console.log(layer._fLayers[l]._zoomConnect);
                            }
                        } else if (layer.getLayers()) {
                            _layArr = layer.getLayers();
                            for (var i in _layArr) {
                                _lay = _layArr[i];

                                if (_lay._fLayers) {
                                    for (var l in _lay._fLayers) {
                                        _ext = _lay._fLayers[l].fullExtent;
                                        console.log(_ext);
                                    }
                                }
                            }
                        }
                        return _ext;
                    }

                }

                //-------------------------------------------------------

                //Project Extent
                function ProjectExtent(layer, extent, mapCrs) {
                    var geometryService = new GeometryService(config.helperServices.geometry.url);
                    console.log("ProjectExtent");
                    console.log(extent);

                    var new_extent;
                    var pointArr = [];
                    var _pointArr = [round(extent.xmin), round(extent.ymin), round(extent.xmax), round(extent.ymax)];

                    function round(point){
                        var p = (Math.round(point * 1000) / 1000);
                        return p;
                    }

                    for (var p in _pointArr) {
                        if (mapCrs.isWebMercator()) {
                            switch(_pointArr[p]) {
                                case 180:
                                    _pointArr[p] = 189.9;
                                    break;
                                case -180:
                                    _pointArr[p] = -189.9;
                                    break;
                                case 90:
                                    _pointArr[p] = 85;
                                    break;
                                case -90:
                                    _pointArr[p] = -85;
                                    break;
                                default:
                                    //console.log(_pointArr[p]);
                                    break;
                            }
                        } else {
                            switch(_pointArr[p]) {
                                case 180:
                                    _pointArr[p] = 189.9;
                                    break;
                                case -180:
                                    _pointArr[p] = -189.9;
                                    break;
                                case 90:
                                    _pointArr[p] = 89.9;
                                    break;
                                case -90:
                                    _pointArr[p] = -89.9;
                                    break;
                                default:
                                    //console.log(_pointArr[p]);
                                    break;
                            }
                        }

                    }

                    var minPoint = {
                        x : _pointArr[0],
                        y : _pointArr[1],
                        crs : extent.spatialReference
                    };
                    pointArr.push(minPoint);

                    var maxPoint = {
                        x : _pointArr[2],
                        y : _pointArr[3],
                        crs : extent.spatialReference
                    };
                    pointArr.push(maxPoint);

                    projectPoints(pointArr);

                    function projectPoints(extPoints) {
                        console.log("projectPoint");
                        var inputPmin = new esriPoint(extPoints[0].x, extPoints[0].y, extPoints[0].crs);
                        var inputPmax = new esriPoint(extPoints[1].x, extPoints[1].y, extPoints[1].crs);

                        var PrjParams = new ProjectParameters();
                        PrjParams.geometries = [inputPmin, inputPmax];
                        console.log(PrjParams.geometries);

                        PrjParams.outSR = mapCrs;
                        // if (datumtrans != 'Default') { PrjParams.transformation = {wkid: parseInt(datumtrans)}; };

                        geometryService.project(PrjParams, function(Arr) {
                            console.log("project complete");
                            console.log(Arr);
                            new_extent = new Extent(Arr[0].x, Arr[0].y, Arr[1].x, Arr[1].y, Arr[0].spatialReference);

                            /**change extent and crs from layer **/
                            //layer.fullExtent = new_extent;
                            //layer.spatialReference = Arr[0].spatialReference;
                            console.log(new_extent);
                            map.setExtent(new_extent, !0);
                        });
                    }

                }

            });
        },

        /*** Bookmarks ***/
        _createBookmarks : function(config, info, map) {
            require(["esri/dijit/Bookmarks", "dojo/domReady!"], function(Bookmarks) {
                //does the web map have any bookmarks
                if (info.itemInfo.itemData.bookmarks) {
                    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                    var bookmarks = new Bookmarks({
                        map : map,
                        bookmarks : info.itemInfo.itemData.bookmarks
                    }, domConstruct.create("div"));
                    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                    on(bookmarks, "onClick", function() {
                        //close the bookmark window when an item is clicked
                        dijit.byId('bookmarkButton').closeDropDown();
                    });

                    var cp = new ContentPane({
                        id : 'bookmarkView'
                    });
                    cp.set('content', bookmarks.bookmarkDomNode);

                    var mylabel;
                    (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.bookmark.label;

                    (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.bookmark.label : mylabel = " ";

                    var button = new DropDownButton({
                        label : mylabel,
                        id : "bookmarkButton",
                        iconClass : "esriBookmarkIcon",
                        title : config.i18n.tools.bookmark.title,
                        dropDown : cp
                    });
                    dojo.byId('webmap-toolbar-center').appendChild(button.domNode);
                }

            });

        },


        /*** locate Tool ***/
        _createlocate : function(config,map) {
            //require(["esri/dijit/LocateButton", "esri/symbols/PictureMarkerSymbol", "dojo/domReady!"], function(LocateButton, PictureMarkerSymbol) {
            require(["extras/myLocateButton", "esri/symbols/PictureMarkerSymbol", "dojo/domReady!"], function(LocateButton, PictureMarkerSymbol) {

                    var geoLocate = new LocateButton({
                         //theme: "locateButton",
                         map: map,
                         visible: true,
                         showPointer: true,
                         symbol: new PictureMarkerSymbol(config.appURL + '/images/map_marker_base.png', 35, 35),
                         scale: 5000,
                         geolocationOptions: {
                            maximumAge: 0,
                            timeout: 15000,
                            enableHighAccuracy: true
                         }
                    });
                    geoLocate.startup();


                    //geoLocate.symbol.url = config.appURL + '/images/map_marker_base.png';

                    //console.info(geoLocate);

                    var mylabel;
                    (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.locate.label;

                    (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.locate.label : mylabel = " ";

                    var button = new ToggleButton({
                        label : mylabel,
                        id : "_locatekButton",
                        iconClass : "esriLocateIcon",
                        title : config.i18n.tools.locate.title,
                        onChange: function(evt) {
                            if(evt == true){
                               this.set("title",config.i18n.tools.locate.remove);
                               geoLocate.locate();
                            }else{
                               geoLocate.clear();
                               this.set("title",config.i18n.tools.locate.title);
                            }
                        }
                    });

                    dojo.byId('webmap-toolbar-center').appendChild(button.domNode);

            });

        },

        /*** Print ***/
        //TODO mit DLR Service geht noch nicht liegt aber an Service
        // keine Operationalen Layer wie WMS ???
        // Druck von Tiled keine Transparenz
        _createPrintDijit : function(config, map) {
            require(["esri/dijit/Print", "esri/tasks/PrintTemplate", "esri/request", "dojo/_base/array", "dojo/domReady!"], function(Print, PrintTemplate, esriRequest, arrayUtils) {

                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                console.log(config.helperServices.printTask.url);
                var printInfo = esriRequest({
                    "url" : config.helperServices.printTask.url,
                    "content" : {
                        "f" : "json"
                    },
                    callbackParamName : "callback"
                });

                printInfo.then(handlePrintInfo, handleError);

                function handlePrintInfo(resp) {
                    var layoutTemplate, templateNames, mapOnlyIndex, templates;

                    layoutTemplate = arrayUtils.filter(resp.parameters, function(param, idx) {
                        return param.name === "Layout_Template";
                    });

                    if (layoutTemplate.length == 0) {
                        console.log("print service parameters name for templates must be \"Layout_Template\"");
                        return;
                    }
                    templateNames = layoutTemplate[0].choiceList;

                    // remove the MAP_ONLY template then add it to the end of the list of templates
                    mapOnlyIndex = arrayUtils.indexOf(templateNames, "MAP_ONLY");
                    if (mapOnlyIndex > -1) {
                        var mapOnly = templateNames.splice(mapOnlyIndex, mapOnlyIndex + 1)[0];
                        templateNames.push(mapOnly);
                    }

                    // create a print template for each choice
                    templates = arrayUtils.map(templateNames, function(ch) {
                        var plate = new PrintTemplate();
                        plate.layout = plate.label = ch;
                        plate.format = "PDF";
                        plate.layoutOptions = {
                            "authorText" : "Made by: DLR",
                            "copyrightText" : "<copyright DLR>",
                            "legendLayers" : [],
                            "titleText" : config.titleStr,
                            "scalebarUnit" : "Miles"
                        };

                        return plate;
                    });

                    // create the print dijit
                    var printer = new Print({
                        "map" : map,
                        "templates" : templates,
                        url : config.helperServices.printTask.url
                    }, dom.byId("print_"));
                    printer.startup();

                    printer._printoutText = "zum Ausdruck";

                }

                function handleError(err) {
                    console.log("Something broke: ", err);
                }

                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                 var panPrint = new ContentPane({
                    title : config.i18n.tools.print.label,
                    id : "printInfo",
                    //class: "AccordionPane",
                    iconClass : 'esriPrintIcon',
                    content : "<div id='print_'></div>"
                });

                var aContainer = dijit.byId("aContainer");
                aContainer.addChild(panPrint);

                var mylabel;
                (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.print.label;

                (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.print.label : mylabel = " ";

                var toButton = new ToggleButton({
                    showLabel : true,
                    label : mylabel,
                    title : config.i18n.tools.print.title,
                    checked : false,
                    iconClass : 'esriPrintIcon',
                    id : 'PrintButton',
                    onChange : function(val) {
                        //display the left panel if hidden
                        var leftPaneWidth = dojo.style(dom.byId("rightPane"), "width");
                        if (leftPaneWidth === 0) {

                            aContainer.selectChild(panPrint);
                            //shows InfoPan on open rightPane

                            dojo.style(dom.byId("rightPane"), "width", config.rightPaneToggleWidth);
                            dijit.byId("BorderContainer").resize();
                        } else {
                            dojo.style(dom.byId("rightPane"), "width", "0px");
                            dijit.byId("BorderContainer").resize();
                        }
                    }
                });

                dojo.byId('webmap-toolbar-center').appendChild(toButton.domNode);
            });

        },

        /*** Draw Tool ***/
        _createDrawTool : function(config, map) {
            require(["esri/toolbars/draw", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/CartographicLineSymbol", "esri/graphic", "esri/geometry/webMercatorUtils", "dojo/_base/Color", "extras/FileSaver", "esri/tasks/ProjectParameters", "esri/tasks/GeometryService", "esri/SpatialReference", "dojo/domReady!"], function(Draw, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, CartographicLineSymbol, Graphic, webMercatorUtils, Color, FileSaver, ProjectParameters, GeometryService, SpatialReference) {
                var tb;
                var _GeometryArr = [];
                var getKmlBtn;

                var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0, 0.25]));

                var lineSymbol = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2, CartographicLineSymbol.CAP_ROUND, CartographicLineSymbol.JOIN_MITER, 5);

                var fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2), new Color([255, 0, 0, 0.25]));

                function initToolbar() {
                    tb = new Draw(map);
                    tb.on("draw-end", addGraphic);

                    // event delegation so a click handler is not
                    // needed for each individual button
                    on(dom.byId("drawOptions"), "click", function(evt) {
                        if (evt.target.id === "drawOptions") {
                            return;
                        }
                        var tool = evt.target.id.toLowerCase();
                        map.disableMapNavigation();
                        tb.activate(tool);
                    });


                    var deselectBtn = new Button({
                            label : config.i18n.tools.draw.deselect,
                            title : config.i18n.tools.draw.deselectTool,
                            onClick : function(evt) {
                                tb.deactivate();
                                map.enableMapNavigation();
                            }
                        });
                    deselectBtn.placeAt(dom.byId("deselect"));

                    var clearBtn = new Button({
                                label : config.i18n.tools.draw.clear,
                                title : config.i18n.tools.draw.clearTool,
                                onClick : function(evt) {
                                    console.log("test1");
                                    map.graphics.clear();
                                    tb.deactivate();
                                    _GeometryArr.length = 0;
                                    //Array null setzen
                                    map.enableMapNavigation();
                                    getKmlBtn.set('disabled', true);
                                    getKmlBtn.set('title', config.i18n.tools.draw.getToolDe);
                                }
                            });
                    clearBtn.placeAt(dom.byId("clear"));

                    getKmlBtn = new Button({
                                label : config.i18n.tools.draw.get,
                                //title : config.i18n.tools.draw.getToolDe,
                                iconClass : "esriSaveIcon",
                                //disabled: true,
                                onClick : function(evt) {
                                    console.log(_GeometryArr[0].spatialReference.wkid); // = 4326
                                    if(_GeometryArr[0].spatialReference.wkid === 4326 || _GeometryArr[0].spatialReference.wkid === "4326"){
                                        console.log("test4");
                                        createKML(_GeometryArr);
                                    }
                                    else{
                                        console.log("test3");
                                        console.log(_GeometryArr);
                                        projectArr(_GeometryArr,4326);
                                    }



                                }
                            });
                    getKmlBtn.placeAt(dom.byId("getKml"));
                    getKmlBtn.set('disabled', true);
                    getKmlBtn.set('title', config.i18n.tools.draw.getToolDe);
                }

                function addGraphic(evt) {
                    //deactivate
                     //the toolbar and clear existing graphics

                    tb.deactivate();
                    map.enableMapNavigation();

                    // figure out which symbol to use
                    var symbol;
                    if (evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
                        symbol = markerSymbol;
                    } else if (evt.geometry.type === "line" || evt.geometry.type === "polyline") {
                        symbol = lineSymbol;
                    } else {
                        symbol = fillSymbol;
                    }


                    var Geometry;
                    if (evt.geometry.spatialReference.isWebMercator()) {
                        Geometry = webMercatorUtils.webMercatorToGeographic(evt.geometry);
                    } else {
                        Geometry = evt.geometry;
                    }
                    //------------------------
                    _GeometryArr.push(Geometry);
                    map.graphics.add(new Graphic(evt.geometry, symbol));

                    if (getKmlBtn.disabled == true) {
                        getKmlBtn.set('disabled', false);
                        getKmlBtn.set('title', config.i18n.tools.draw.getToolAk);
                    }
                }
                function projectArr (GeometryArr,wkid) {
                    config.statusbar.set("content", config.i18n.tools.draw.project);
                    config.statusbar.show();

                    var geometryService = new GeometryService(config.helperServices.geometry.url);
                    var PrjParams = new ProjectParameters();
                    PrjParams.geometries = GeometryArr;
                    var crs = new SpatialReference(wkid);
                    PrjParams.outSR = crs;

                    geometryService.project(PrjParams, function(Arr) {
                        console.log("project complete");
                        console.log(Arr);

                        createKML(Arr);
                    });
                }


                //TODO create KML geht nur wenn WebMercator oder geographic
                function createKML(GeometryArr) {
                    //Geomerty Types "esri.geometry.Polyline" ,"esri.geometry.Extent",  "esri.geometry.Point", "esri.geometry.Polygon"
                    console.log("test1");
                    var kml = {
                        kmlStr : "",
                        //dataUrl geht nicht in allen Browsern und kml mit falschen Koordinaten??
                        dataUrl : function(content) {
                            var uriContent = "data:application/octet-stream;charset=utf-8," + encodeURIComponent(content);
                            newWindow = window.open(uriContent, 'neuesDokument');
                        },
                        winOpenTextarea : function (txt){

                            var arr = txt.split("><");
                            var len = arr.length;
                            var newTxt = "";

                            for(var i = 0; i < len; i++){
                                if(i < len -1){
                                    newTxt += arr[i] +">"+ "\n" +"<";
                                }
                                else{
                                    newTxt += arr[i];
                                }

                            }
                            var wnd = window.open("", "_blank");

                            wnd.document.write('<h4>' + config.i18n.tools.draw.getKml + '</h4>'+'<textarea id="text" style="width:100%;height:95%">' + newTxt + '</textarea>');
                            wnd.document.close();

                        },

                        saveHTML5 : function(blob){
                            FileSaver(blob, "test.kml");

                            // var blob = new Blob([txt], {type: "text/plain;charset=utf-8"});
                            // FileSaver(blob, "helloworld.txt");
                        }

                    };
                    var kmlCont = "";
                    console.log(GeometryArr);

                    var kmlPoint, kmlLine, kmlPoly;

                    for (var e in GeometryArr) {
                        var paths, rings;
                        var _arr;

                        if (GeometryArr[e].declaredClass == "esri.geometry.Point") {
                            console.log(GeometryArr[e]);
                            kmlPoint = '<Placemark><name>point</name><Point><gx:drawOrder>1</gx:drawOrder><coordinates>' + GeometryArr[e].x + ',' + GeometryArr[e].y + ',0' + '</coordinates></Point></Placemark>';
                            kmlCont += kmlPoint;
                        } else if (GeometryArr[e].declaredClass == "esri.geometry.Polyline") {
                            paths = GeometryArr[e].paths[0];
                            for (var co in paths) {
                                paths[co].push(0);
                            }
                            console.log(paths.toString());
                            kmlLine = '<Placemark><name>line</name><LineString><tessellate>1</tessellate><coordinates>' + paths.toString() + '</coordinates></LineString></Placemark>';
                            kmlCont += kmlLine;
                        } else if (GeometryArr[e].declaredClass == "esri.geometry.Extent") {
                            //console.log(GeometryArr[e]);
                            paths = [];
                            _arr = [GeometryArr[e].xmin, GeometryArr[e].ymin, 0];
                            paths[0] = _arr;
                            _arr = [GeometryArr[e].xmin, GeometryArr[e].ymax, 0];
                            paths[1] = _arr;
                            _arr = [GeometryArr[e].xmax, GeometryArr[e].ymax, 0];
                            paths[2] = _arr;
                            _arr = [GeometryArr[e].xmax, GeometryArr[e].ymin, 0];
                            paths[3] = _arr;
                            _arr = [GeometryArr[e].xmin, GeometryArr[e].ymin, 0];
                            paths[4] = _arr;

                            kmlPoly = '<Placemark><name>poly</name><Polygon><tessellate>1</tessellate><outerBoundaryIs><LinearRing><coordinates>' + paths.toString() + '</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark>';
                            kmlCont += kmlPoly;
                        } else if (GeometryArr[e].declaredClass == "esri.geometry.Polygon") {
                            console.log(GeometryArr[e]);
                            rings = GeometryArr[e].rings[0];
                            for (var co in rings) {
                                rings[co].push(0);
                            }
                            rings.push(rings[0]);
                            kmlPoly = '<Placemark><name>poly</name><Polygon><tessellate>1</tessellate><outerBoundaryIs><LinearRing><coordinates>' + rings.toString() + '</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark>';
                            kmlCont += kmlPoly;
                        } else {
                            console.log("geometryTyp not defined");
                        }
                    }


                    kml.kmlStr = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom"><Document><name>draw KML</name><Folder>' + kmlCont + '</Folder></Document></kml>';

                    try{
                        var blob = new Blob([kml.kmlStr], {type: "text/xml;charset=utf-8"});
                        kml.saveHTML5(blob);
                    }catch(e){
                        kml.winOpenTextarea(kml.kmlStr);
                    }

                }

                //---------------------------------------------
                var _content = '<div id="draDiv">' + '<div id="drawOptions">' + config.i18n.tools.draw.info + '<ul>' + '<li><div id="Point" title="' +config.i18n.tools.draw.point + '" class="drawPoint"></div>' + '<div id="Polyline" title="' +config.i18n.tools.draw.line + '" class="drawLine"></div>' + '<div id="Extent" title="' +config.i18n.tools.draw.rectangle + '" class="drawRect"></div>' + '<div id="Polygon" title="' +config.i18n.tools.draw.polygon + '" class="drawPoly"></div>' + '<div id="Ellipse" title="' +config.i18n.tools.draw.ellipsis + '" class="drawElli"></vdi></li>' + '</ul>' +
                '</div>' + '<div id="drawClear">' + '<ul>' + '<li id="deselect" class="drawButton"></li>' + '<li id="clear" class="drawButton"></li>' + '<li id="getKml"  class="drawButton" disabled></li>' + '</ul>' + '</div>' + '</div>';


                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                var panDraw = new ContentPane({
                    title : config.i18n.tools.draw.label,
                    id : "panDraw",
                    //class: "AccordionPane",
                    iconClass : 'esriDrawIcon',
                    content : _content
                });

                panDraw.startup();

                var aContainer = dijit.byId("aContainer");
                aContainer.addChild(panDraw);

                var mylabel;
                (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.draw.label;

                (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.draw.label : mylabel = " ";

                var toButton = new ToggleButton({
                    showLabel : true,
                    label : mylabel,
                    title : config.i18n.tools.draw.title,
                    checked : false,
                    iconClass : 'esriDrawIcon',
                    id : 'drawButton',
                    onChange : function(val) {
                        //display the left panel if hidden
                        var leftPaneWidth = dojo.style(dom.byId("rightPane"), "width");
                        if (leftPaneWidth === 0) {

                            aContainer.selectChild(panDraw);
                            //shows InfoPan on open rightPane

                            dojo.style(dom.byId("rightPane"), "width", config.rightPaneToggleWidth);
                            dijit.byId("BorderContainer").resize();
                        } else {
                            dojo.style(dom.byId("rightPane"), "width", "0px");
                            dijit.byId("BorderContainer").resize();
                        }
                    }
                });

                dojo.byId('webmap-toolbar-center').appendChild(toButton.domNode);
                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                initToolbar();

            });
        },

        /*** LayerSwipe ***/
        _createLayerSwipe : function(map, layerInfo, config) {
            require(["esri/dijit/LayerSwipe", "dojo/domReady!"], function(LayerSwipe) {

                //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                //only if Layers on the Map
                if(layerInfo.length > 0){

                    var swipeHelp = domConstruct.create("div",{id:"swipeHelp"});
                    //-------------
                    var dropDown = domConstruct.create("select",{id:"swipeDrop"});
                    //var options = [{text: "January",val: "jan",},{text: "February",val: "feb",},{text: "March",val: "mar",}];
                    var options = layerInfo;

                    for (var i = 0; i < options.length; i++){
                        dropDown[i] = new Option(options[i].title,options[i].layer.id,false,false);
                    }

                    //---------------------------------------
                    var swipeLayer = map.getLayer(options[0].layer.id);
                    var swipeWidget = new LayerSwipe({
                    type: "vertical",  //Try switching to "scope" or "horizontal"
                    map: map,
                    layers: [swipeLayer]
                    }, domConstruct.create("div", {id : "swipeDiv"}, "mapDiv_layers"));
                    swipeWidget.startup();
                    swipeWidget.disable();
                     //---------------------------------------




                    dropDown.onchange = function () {
                        swipeWidget.layers.splice(0,1);
                        var select = dropDown.options[dropDown.selectedIndex].value;
                        var layer = map.getLayer(select);
                        swipeWidget.layers.push(layer);

                        //console.log(dropDown.options[dropDown.selectedIndex].value);
                        //console.log(swipeWidget.layers);
                    };


                    var startSwipe = new Button({
                                    label : config.i18n.tools.swipe.start,
                                    title : config.i18n.tools.swipe.start,
                                    onClick : function(evt) {
                                        swipeWidget.enable();
                                    }
                                });

                    var endSwipe = new Button({
                                    label : config.i18n.tools.swipe.end,
                                    title : config.i18n.tools.swipe.end,
                                    onClick : function(evt) {
                                        swipeWidget.disable();;
                                    }
                                });


                    swipeHelp.appendChild(dropDown);
                    startSwipe.placeAt(swipeHelp);
                    endSwipe.placeAt(swipeHelp);
                    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


                    var panLayerSwipe = new ContentPane({
                        title : config.i18n.tools.swipe.label,
                        id : "panLayerSwipe",
                        iconClass : 'esriSwipeIcon',
                        content : swipeHelp
                    });

                    var aContainer = dijit.byId("aContainer");
                    aContainer.addChild(panLayerSwipe);

                    var mylabel;
                    (config.appIsMobile == true) ? mylabel = " " : mylabel = config.i18n.tools.swipe.label;

                    (config.displayButtonLabels == true) ? mylabel = config.i18n.tools.swipe.label : mylabel = " ";

                    var toButton = new ToggleButton({
                        showLabel : true,
                        label : mylabel,
                        title : config.i18n.tools.swipe.title,
                        checked : false,
                        iconClass : 'esriSwipeIcon',
                        id : 'swipeButton',
                        onChange : function(val) {
                            //display the left panel if hidden
                            var leftPaneWidth = dojo.style(dom.byId("rightPane"), "width");
                            if (leftPaneWidth === 0) {

                                aContainer.selectChild(panLayerSwipe);

                                dojo.style(dom.byId("rightPane"), "width", config.rightPaneToggleWidth);
                                dijit.byId("BorderContainer").resize();
                            } else {
                                dojo.style(dom.byId("rightPane"), "width", "0px");
                                dijit.byId("BorderContainer").resize();
                            }
                        }
                    });

                    dojo.byId('webmap-toolbar-center').appendChild(toButton.domNode);
                }
            });
        }
    });
});
