/*global define,location */
/*jslint sloppy:true */
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
define({
    //Default configuration settings for the application. This is where you'll define things like a bing maps key,
    //default web map, default app color theme and more. These values can be overwritten by template configuration settings and url parameters.
    
    "appIsMobile": false,
    "appURL": window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')),
    
    "appid": "",// "b554f0e8ade745ce8c369939f9697a02",
    "webmap": null, //"24e01ef45d40423f95300ad2abc5038a",
    "oauthappid": null, //"AFTKRmv16wj14N3z",
    //Group templates must support a group url parameter. This will contain the id of the group.
    "group": "",
    //Enter the url to the proxy if needed by the application. See the 'Using the proxy page' help topic for details
    //http://developers.arcgis.com/en/javascript/jshelp/ags_proxy.html
    "proxyurl": "extras/proxy.php",
    //Example of a template specific property. If your template had several color schemes
    //you could define the default here and setup configuration settings to allow users to choose a different
    //color theme.
    "theme": "gray", // green // blue
    "bingKey": "", //Enter the url to your organizations bing maps key if you want to use bing basemaps
    
    //Defaults to arcgis.com. Set this value to your portal or organization host name.
    "sharinghost": location.protocol + "//" + "www.arcgis.com", //Defaults to arcgis.com. Set this value to your portal or organization host name. 
    "units": null,
    
    //"GeometryServiceURL" : "http://www.zki.dlr.de/arcgis/rest/services/Utilities/Geometry/GeometryServer",
    "helperServices": {
        "geometry": {
            "url": "http://www.zki.dlr.de/arcgis/rest/services/Utilities/Geometry/GeometryServer"
        },
        "printTask": {
            "url": "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        },
        "elevationSync": {
            "url": null
        },
        "geocode": [{
            "url": null
        }]
    },
    
    //Basemaps-------------------------------
         "displayBasemapGallery" : false,
         "displayArcGISBasemaps": false, //default false!
         //Basemaps-------------------------------
         "WorldImagery":false,
         "World_Street_Map":false,
         "World_Topo_Map":false,
         "World_Light_Gray":false,
         "NatGeo_World_Map":false,
         "BingMapsRoad":false,
         "BingMapsAerial":false,
         "BingMapsHybrid":false,
         
         "TomTom":false,
         "CLC2006_Dyna":false,
         "landscan2010":false,
         "OSM_Mapnik":false,
         "OSM_DE":false,
         "OSM_Geofabrik":false,
         "OpenTopoMap": false,
         "OSM_Transport":false,
         "mapQuest":false,
         "OSM_Stamen_Toner":false,
         
         "osm_cycle": false,
         "osm_hikebike":false,
         "osm_landscape":false,
         "osm_publicTransport":false,
         "osm_roads":false,
         "falk_osm":false,
         
         //---------------------------------------
         
         //object for BasemapGallery
         _layersObj : {
                        "WorldImagery" : {
                            "title" : "World Imagery",
                            "url" : "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
                            "copy" : " ",
                            "icon" : "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/7/45/68"
                        },
                        "World_Street_Map" : {
                            "title" : "World Street Map",
                            "url" : "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
                            "copy" : " ",
                            "icon" : "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/11/712/1091"
                        },
                        "World_Topo_Map" : {
                            "title" : "World Topo Map",
                            "url" : "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer",
                            "copy" : " ",
                            "icon" : "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/11/710/1091"
                        },
                        "World_Light_Gray" : {
                            "title" : "World Light Gray",
                            "url" : "http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer",
                            "copy" : " ",
                            "icon" : "http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/7/41/61"
                        },
                        "NatGeo_World_Map" : {
                            "title" : "NatGeo World Map",
                            "url" : "http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer",
                            "copy" : " ",
                            "icon" : "http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/7/41/66"
                        },
                        "Ocean_Basemap" : {
                            "title" : "Ocean Basemap",
                            "url" : "http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer",
                            "copy" : " ",
                            "icon" : "http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/7/41/66"
                        },
                        "BingMapsRoad" : {
                            "title" : "BingMaps Road",
                            "type" : "BingMapsRoad",
                            "icon" : "http://ecn.t2.tiles.virtualearth.net/tiles/r12020333321.jpeg?g=2204&mkt=en-US&shading=hill"
                        },
                        "BingMapsAerial" : {
                            "title" : "BingMaps Aerial",
                            "type" : "BingMapsAerial",
                            "icon" : "http://ecn.t2.tiles.virtualearth.net/tiles/a1202121.jpeg?g=2204"
                        },
                        "BingMapsHybrid" : {
                            "title" : "BingMaps Hybrid",
                            "type" : "BingMapsHybrid",
                            "icon" : "http://ecn.t1.tiles.virtualearth.net/tiles/h12022102.jpeg?g=2204&mkt=en-US"
                        },

                        "TomTom" : {
                            "title" : "TomTom",
                            "type" : "WebTiledLayer",
                            "url" : "http://${subDomain}.routes.tomtom.com/lbs/map/1/basic/{level}/{col}/{row}/2bbdd0e2-6452-494a-b6b6-5aceb39048eb",
                            "copy" : "© TomTom",
                            "icon" : "http://a.routes.tomtom.com/lbs/map/1/basic/8/137/88/2bbdd0e2-6452-494a-b6b6-5aceb39048eb",
                            "subDomains" : "a,b,c,d"
                        },
                        "CLC2006_Dyna" : {
                            "title" : "Corine Landcover 2006",
                            "url" : "http://discomap.eea.europa.eu/arcgis/rest/services/Land/CLC2006_Dyna_WM/MapServer",
                            "copy" : " ",
                            "icon" : "http://discomap.eea.europa.eu/arcgis/rest/services/Land/CLC2006_Dyna_WM/MapServer/export?dpi=96&transparent=true&format=png8&bbox=354789.1973210132%2C5787280.597950609%2C2004606.015827812%2C6601793.571357228&bboxSR=102100&imageSR=102100&size=1349%2C666&f=image"
                        },
                        "landscan2010" : {
                            "title" : "Landscan 2010",
                            "url" : "http://www.zki.dlr.de/arcgis/rest/services/geobasisdata/landscan2010/MapServer",
                            "copy" : " ",
                            "icon" : "http://www.zki.dlr.de/arcgis/rest/services/geobasisdata/landscan2010/MapServer/export?dpi=96&transparent=true&format=png8&bbox=321768.401101826%2C5929147.722447858%2C1971585.2196086247%2C6743660.695854477&bboxSR=102100&imageSR=102100&size=1349%2C666&f=image"
                        },
                        "OSM_Mapnik" : {
                            "title" : "OSM Mapnik",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.tile.openstreetmap.org/{level}/{col}/{row}.png",
                            "copy" : "© OpenStreetMap contributors",
                            "icon" : "http://b.tile.openstreetmap.org/7/64/43.png",
                            "subDomains" : "a,b,c"
                        },
                        "OSM_DE" : {
                            "title" : "OSM DE",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.tile.openstreetmap.de/tiles/osmde/{level}/{col}/{row}.png",
                            "copy" : "© OpenStreetMap contributors",
                            "icon" : "http://c.tile.openstreetmap.de/tiles/osmde/7/70/41.png",
                            "subDomains" : "a,b,c"
                        },
                        "OSM_Geofabrik" : {
                            "title" : "OSM Geofabrik",
                            "type" : "WebTiledLayer",
                            "url" : "http://${subDomain}.tile.geofabrik.de/15173cf79060ee4a66573954f6017ab0/{level}/{col}/{row}.png",
                            "copy" : "© Geofabrik GmbH and OpenStreetMap contributors",
                            "icon" : "http://c.tile.geofabrik.de/15173cf79060ee4a66573954f6017ab0/8/136/86.png",
                            "subDomains" : "a,b,c"
                        },
                        "OpenTopoMap" : {
                            "title" : "Open Topo Map",
                            "type" : "WebTiledLayer",
                            "url" : "http://${subDomain}.tile.opentopomap.org/tiles/{level}/{col}/{row}.png",
                            "copy" : "© OpenStreetMap contributors",
                            "icon" : "http://opentopomap.org/tiles/8/137/86.png",
                            "subDomains" : "a,b,c"
                        },
                        "OSM_Transport" : {
                            "title" : "OSM Transport",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.tile2.opencyclemap.org/transport/{level}/{col}/{row}.png",
                            "copy" : "© OpenStreetMap contributors",
                            "icon" : "http://a.tile2.opencyclemap.org/transport/8/138/87.png",
                            "subDomains" : "a,b,c"
                        },
                        "mapQuest" : {
                            "title" : "mapQuest",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.mqcdn.com/tiles/1.0.0/osm/{level}/{col}/{row}.jpg",
                            "copy" : "MapQuest © 2012",
                            "icon" : "http://otile4.mqcdn.com/tiles/1.0.0/osm/10/549/335.png",
                            "subDomains" : "otile1,otile2,otile3,otile4"
                        },
                        "OSM_Stamen_Toner" : {
                            "title" : "OSM Stamen Toner",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.tile.stamen.com/toner/{level}/{col}/{row}.png",
                            "copy" : "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.",
                            "icon" : "http://b.tile.stamen.com/toner/8/137/89.png",
                            "subDomains" : "a,b,c,d"
                        },
                        "osm_cycle":{
                            "title" : "osm cycle",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.tile.opencyclemap.org/cycle/{level}/{col}/{row}.png",
                            "copy" : "© OpenStreetMap",
                            "icon" : "http://a.tile.opencyclemap.org/cycle/13/4359/2842.png",
                            "subDomains" : "a,b,c"
                        },
                        "osm_hikebike":{
                            "title" : "osm hikebike",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.www.toolserver.org/tiles/hikebike/{level}/{col}/{row}.png",
                            "copy" : "© OpenStreetMap",
                            "icon" : "http://d.www.toolserver.org/tiles/hikebike//16/34877/22748.png",
                            "subDomains" : "a,b,c"
                        },
                        "osm_landscape":{
                            "title" : "osm landscape",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.tile3.opencyclemap.org/landscape/{level}/{col}/{row}.png",
                            "copy" : "© OpenStreetMap",
                            "icon" : "http://c.tile3.opencyclemap.org/landscape/13/4358/2843.png",
                            "subDomains" : "a,b,c"
                        },
                        "osm_publicTransport":{
                            "title" : "osm Public Transport",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.memomaps.de/tilegen/{level}/{col}/{row}.png",
                            "copy" : "© OpenStreetMap",
                            "icon" : "http://tile.memomaps.de/tilegen/12/2180/1421.png",
                            "subDomains" : "tile"
                        },
                        "osm_roads":{
                            "title" : "osm roads",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.geog.uni-heidelberg.de:8001/tms_r.ashx?x={col}&y={row}&z={level}",
                            "copy" : "© OpenStreetMap",
                            "icon" : "http://korona.geog.uni-heidelberg.de:8001/tms_r.ashx?x=545&y=355&z=10",
                            "subDomains" : "korona"
                        },
                        "falk_osm":{
                            "title" : "falk osm",
                            "type" : "WebTiledLayer",
                            "url" : "http://{subDomain}.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX={col}&TileY={row}&ZoomLevel={level}&Experience=falk&MapStyle=Falk%20OSM",
                            "copy" : "© OpenStreetMap",
                            "icon" : "http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX=35&TileY=22&ZoomLevel=6&Experience=falk&MapStyle=Falk%20OSM",
                            "subDomains" : "ec2"
                        }
                },
                //Basemaps end-------------------------------
     
        
        "setZoom":false,
        "minZoom": 7,  // 0 -> Welt    | 7 bis 5 -> Länder   | 10 bis 12 -> Städte  |  ab ca. 14 -> Gebäude  |  17 bis 18 -> Autos
        "maxZoom": 15, 
        
        "displayScalebar" : false,
        
        "displaySlider" : false,
        "sliderStyle" : "small", //small / large
        
        "displayLogos": false,
        "logosStr" : "images/zki-logo.png, images/charter.png, images/vabene_logo.png",
        
        "displayTitle": false,
        "titleStr" : "ZKI Test Aktivierung",
        
        "displayOverviewMap": false,
       
        "displayButtonLabels": false,
        
        "displaySearchTool" : false,
        
        "displayMeasureTool": false,
        
        "displayEditor": false,
        
        "displayLegend": false,
        
        "displayAppInfoText": false,
        "AppInfoTextStr" : "Framework: The products elaborated...",
        
        "displayLayerList": false,
        
        "displayBookmarks": false,
        
        "CooOnRightClick":false,
        
        "displayPrintDijit": false,
        
        "displayDrawTool": false,
        
        "displayLocateButton": false,
        
        "displayLayerSwipe": false,
        
        //-------------------------------------
        "displayAppHelp": false,
        //"AppHelpInfo": "<h5>error handling</h5>" + "<ul>" + "<li>the loading.gif remains at start ->try to refresh the Browser</li>" + "</ul>" + "<h5>Navigation with Mouse/Keyboard</h5>" + "<ul>" + "<li>SHIFT + Drag the mouse to zoom in</li>" + "<li>SHIFT + CTRL + Drag the mouse to zoom out</li>" + "<li>SHIFT + Click to recenter</li>" + "<li>Double Click to Center and Zoom in</li>" + "<li>Use arrow keys to pan</li>" + "<li>Right Click on the map to get coordinates</li>" + "</ul>" + "<h5>Editor</h5>" + "<ul>" + "<li>To start Editing: a editable Layer has to be checked in the Layerlist</li>" + "<li>To create features: click a template then start drawing on the map</li>" + "<li>To move features: click and drag the feature to a new location</li>" + "<li>To edit features: click the feature to display the vertices and the attributes</li>" + "</ul>",
        "AppHelpInfo":'<h5>Tools</h5><table class="helpTools"><tr> <td><span class="esriInfoIcon"></td> <td>Map Information</td></tr><tr> <td><span class="esriDrawIcon"></td> <td>Draw Tool</td></tr><tr> <td><span class="esriLocateIcon"></td> <td>Geolocation</td></tr><tr> <td><span class="esriBasemapIcon"></td> <td>Basemaps</td></tr><tr> <td><span class="esriMeasureIcon"></td> <td>Measure Tool</td></tr><tr> <td><span class="esriLayerIcon"></td> <td>Layer Tree</td></tr><tr> <td><span class="esriBookmarkIcon"></td> <td>Bookmarks</td></tr><tr> <td><span class="esriLegendIcon"></td> <td>Map Legend</td></tr><tr> <td><span class="esriPrintIcon"></td> <td>Print Map</td></tr><tr> <td><span class="esriEditIcon"></td> <td>Draw on Feature Layer</td></tr><tr> <td><span class="esriSearchIcon"></td> <td>Find Address</td></tr></table> <h5>Navigation with Mouse/Keyboard</h5><ul> <li> SHIFT + Drag the mouse to zoom in </li> <li> SHIFT + CTRL + Drag the mouse to zoom out </li> <li> SHIFT + Click to recenter </li> <li> Double Click to Center and Zoom in </li> <li> Use arrow keys to pan </li> <li> Right Click on the map to get coordinates </li></ul><h5>Editor</h5><ul> <li> To start Editing: a editable Layer has to be checked in the Layerlist </li> <li> To create features: click a template then start drawing on the map </li> <li> To move features: click and drag the feature to a new location </li> <li> To edit features: click the feature to display the vertices and the attributes </li></ul>',
        
        "rightPaneToggleWidth":"270px"
});
