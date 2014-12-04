define(["extras/xml_config"], function(xml_config) {
	                
/*** function for parsing the xml***/
xml_config.parseXML = function(xml) {
    var configData = {};
    var webmap = {};
    var dlrconfigxml;
    
    //-------------------------------------------------------------------
        dlrconfigxml = $(xml).find('dlrconfig').each(function(){
        	
        		
				//webmap-------------------------------------------------------------------------------------------
                $(this).find("webmap").each(function(){
                    
                    $(this).find("item").each(function(){
                        webmap.item = {};
                        webmap.item.extent = [];
                        $(this).find("extent").each(function(){
                            var min =[parseFloat($(this).attr("xmin")),parseFloat($(this).attr("ymin"))];
                            var max =[parseFloat($(this).attr("xmax")),parseFloat($(this).attr("ymax"))];
                            webmap.item.extent= [min,max];
                        }); 
                    });
                    
                    $(this).find("itemData").each(function(){
                    	webmap.itemData = {};
                    	
                    	
                    	$(this).find("operationalLayers").each(function(){
                    		webmap.itemData.operationalLayers = [];
                    		
                    		
                    		$(this).find("layer").each(function(i){
                    			var layer = {};
                    			//var extent_;
                    			layer.id = $(this).attr("id");
                    			layer.title = $(this).attr("title");
                    			layer.opacity =  parseFloat($(this).attr("opacity"));
                    			layer.visibility = $(this).attr("visibility") == "true";
                    			
                    			($(this).attr("url"))? layer.url = $(this).attr("url"): false;
                    			($(this).attr("type"))? layer.type = $(this).attr("type"): false;
                    			($(this).attr("templateUrl"))? layer.templateUrl = $(this).attr("templateUrl"): false;
                    			($(this).attr("subDomains"))? layer.subDomains = $(this).attr("subDomains").split(",") : false;
                    			($(this).attr("copyright"))? layer.copyright = $(this).attr("copyright") : false;
                    			($(this).attr("visibleLayers"))? layer.visibleLayers = $(this).attr("visibleLayers").split(",") : false;
                    			
                    			($(this).attr("version"))? layer.version = $(this).attr("version") : false;
                    			
                    			if($(this).attr("spatialReferences")){
                    			    var arr = $(this).attr("spatialReferences").split(",");  
                    			    layer.spatialReferences = [];
                    			    for(var s in arr){
                    			         layer.spatialReferences.push(parseInt(arr[s])); 
                    			    }
                    			}
                    			
                    			
                                $(this).find("extent").each(function(){
                                    var min =[parseFloat($(this).attr("xmin")),parseFloat($(this).attr("ymin"))];
                                    var max =[parseFloat($(this).attr("xmax")),parseFloat($(this).attr("ymax"))];
                                    layer.extent = [min,max];
                                }); 
                               
                              
                                
                                //pop-up for ArcGis Layer only
                                if(!$(this).attr("type")){
                                	
                                    
                                    $(this).find("capabilities").each(function(){
                                       layer.capabilities = $(this).text();
                                    });

                         
                                    $(this).find("popupInfo").each(function(){
                                    	layer.popupInfo = {};
	                                    var _title = $(this).attr("title");
	                                    var fields = $(this).attr("content").split(",");
	                                    var fieldsArr = [];
	                                    
	                                    for(var f in fields){
	                                    	var field = {
		                                        "fieldName": fields[f].split(":")[0],
		                                        "label": fields[f].split(":")[1],
		                                        "isEditable": false,
		                                        "tooltip": "",
		                                        "visible": true,
		                                        "format": null,
		                                        "stringFieldOption": "textbox"
                                    		};
	                                    	
	                                    	fieldsArr[f] = field;
	                                    }
	                                    
	                                	layer.popupInfo.title = "{" + _title + "}";

                                    	layer.popupInfo.fieldInfos = fieldsArr;
                                    	
                                	}); 
                                }else{false;} 
                                
                                //Legend for WMS
                                if($(this).attr("type") == "WMS"){
                                	var layers = [];
                                	
                                	for(var l in layer.visibleLayers){
                                		var lay = {};
                                		lay.name = layer.visibleLayers[l];
                                		lay.title = layer.title;
                                		lay.legendURL = layer.url + "?version=" + layer.version + "&service=WMS&request=GetLegendGraphic&layer=" + lay.name + "&format=image/png";
          
                                		layers[l] = lay;	
                                		
                                	}
                                	
                                	layer.layers = layers;
                               	}else{false;} 
								
               
                    			webmap.itemData.operationalLayers[i] = layer;	
                    		});
                            
                    	});
                    	
                    	
                    	$(this).find("baseMap").each(function(){
                            webmap.itemData.baseMap = {};
                            webmap.itemData.baseMap.title = $(this).find("title").text();
                            webmap.itemData.baseMap.baseMapLayers = [];
                            
                            
                            $(this).find("baseMapLayers").each(function(){
                                var _baseMapLayers = [];
                                $(this).find("layer").each(function(i){
                                    var layer = {};
                                    layer.id = $(this).attr("id");
                                    layer.opacity = parseFloat($(this).attr("opacity"));
                                    layer.visibility = $(this).attr("visibility") == "true";
                                    
                                    ($(this).attr("url"))? layer.url = $(this).attr("url"): false;
                                    ($(this).attr("type"))? layer.type = $(this).attr("type"): false;
                                    ($(this).attr("templateUrl"))? layer.templateUrl = $(this).attr("templateUrl"): false;
                                    ($(this).attr("subDomains"))? layer.subDomains = $(this).attr("subDomains").split(",") : false;
                                    ($(this).attr("copyright"))? layer.copyright = $(this).attr("copyright"): false;
                                    ($(this).attr("visibleLayers"))? layer.visibleLayers = $(this).attr("visibleLayers").split(",") : false;
                                    
                                    ($(this).attr("version"))? layer.version = $(this).attr("version") : false;
                                    ($(this).attr("spatialReferences"))? layer.spatialReferences = $(this).attr("spatialReferences").split(",") : false;
                                    
                                    $(this).find("extent").each(function(){
                                        var min =[parseFloat($(this).attr("ymin")),parseFloat($(this).attr("xmin"))];
                                        var max =[parseFloat($(this).attr("ymax")),parseFloat($(this).attr("xmax"))];
                                        layer.extent = [min,max];
                                    }); 
                                    

                                    webmap.itemData.baseMap.baseMapLayers[i] = layer;
                                });
                            });
                        });
                    	
                        webmap.itemData.version = $(this).find("version").text();


                    	$(this).find("bookmarks").each(function(){
                    		webmap.itemData.bookmarks = [];
                    		
                    		$(this).find("mark").each(function(i){
                    			var mark = {};
                    			mark.name = $(this).find("name").text();
                    			
                    			 $(this).find("extent").each(function(){
                    			 	mark.extent = {};
                    			 	mark.extent.spatialReference = {"wkid" : parseInt($(this).attr("wkid"))};
                    			 	mark.extent.xmax = parseFloat($(this).attr("xmax"));
                    			 	mark.extent.xmin = parseFloat($(this).attr("xmin"));
                    			 	mark.extent.ymax = parseFloat($(this).attr("ymax"));
                    			 	mark.extent.ymin = parseFloat($(this).attr("ymin"));
                    			 });
                    			 
                    			 webmap.itemData.bookmarks[i] = mark;
                    		});
                    	});
                    }); 
                });
                
                //application-------------------------------------------------------------------------------------------
                $(this).find("application").each(function(){
                    configData.proxyurl = $(this).find("proxyurl").text();
                    configData.theme = $(this).find("theme").text();
                    configData.bingKey = $(this).find("bingmapskey").text();
                    
                    configData.displayArcGISBasemaps = $(this).find("displayArcGISBasemaps").text() == "true";
                    $(this).find("GalleryBasemaps").each(function(){
                    	
                    
	                    if(configData.displayArcGISBasemaps == false){
	                        var items = $(this).children();
                            items.each(function(index) {
                                var value = $(this).text() == "true";
                                var itemName = this.tagName;
                                configData[itemName] = value;
                            });
	                    }
                    			 	
              		});
                    

                    configData.setZoom = $(this).find("setZoom").text() == "true";
                    if(configData.setZoom == true){
                    	configData.minZoom = parseInt($(this).find("minZoom").text());
                    	configData.maxZoom = parseInt($(this).find("maxZoom").text());
                    	
                    	if(isNaN(configData.minZoom)||isNaN(configData.maxZoom)){
                    	   configData.setZoom = false;   
                    	}
                    }
                                      
                    configData.displayLogos = $(this).find("displayLogos").text() == "true";
                    if(configData.displayLogos == true){
                    	configData.logosStr = $(this).find("logosStr").text();	
                    }
                    
                    configData.displayTitle = $(this).find("displayTitle").text() == "true";
                    if(configData.displayTitle == true){
                    	configData.titleStr = $(this).find("titleStr").text();	
                    }
                    
                    configData.displayBasemapGallery = $(this).find("displayBasemapGallery").text() == "true";
                    configData.displayOverviewMap = $(this).find("displayOverviewMap").text() == "true";
                    configData.displayButtonLabels = $(this).find("displayButtonLabels").text() == "true";
                    
                    configData.displaySearchTool = $(this).find("displaySearchTool").text() == "true";
                    configData.displayMeasureTool = $(this).find("displayMeasureTool").text() == "true";
                    configData.displayEditor = $(this).find("displayEditor").text() == "true";
                    configData.displayLegend = $(this).find("displayLegend").text() == "true";
                    

                    configData.displayAppInfoText = $(this).find("displayAppInfoText").text() == "true";
                    
                    var html;
                    if(configData.displayAppInfoText == true){
                    	html = $(this).find("AppInfoTextStr").text();
                        configData.AppInfoTextStr = html;
                    }

                    configData.displayAppHelp = $(this).find("displayAppHelp").text() == "true";
                    configData.displayLayerList = $(this).find("displayLayerList").text() == "true";
                    configData.displayBookmarks = $(this).find("displayBookmarks").text() == "true";
                    configData.CooOnRightClick = $(this).find("CooOnRightClick").text() == "true";
                    configData.displayScalebar = $(this).find("displayScalebar").text() == "true";
                    configData.displaySlider = $(this).find("displaySlider").text() == "true";
                    configData.sliderStyle = $(this).find("sliderStyle").text();
                    
                    configData.displayPrintDijit = $(this).find("displayPrintDijit").text() == "true";
                    
                    configData.displayDrawTool = $(this).find("displayDrawTool").text() == "true";
                    
                    configData.displayLocateButton = $(this).find("displayLocateButton").text() == "true";
                    
                    configData.displayLayerSwipe = $(this).find("displayLayerSwipe").text() == "true"; 
                    
                    configData.appIsMobile = $(this).find("appIsMobile").text(); 
                    
                    configData.webmap = {};
                    configData.webmap = webmap;
                    
                });

        });


        if(dlrconfigxml.length === 0){
            alert("Error: check Syntax of your XML"+"\n"+"http://validator.w3.org/check");   
        }
	return configData;
};
     
//-----------------------------------------------------------------------------------                
              
    
    return xml_config;
}); 
