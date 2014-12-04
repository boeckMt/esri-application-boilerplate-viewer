# esri-application-boilerplate-viewer

This Application is a configurable web mapping viewer like the arcgis-viewer-flex (https://github.com/Esri/arcgis-viewer-flex) 
and is build on the application-boilerplate-js (https://github.com/Esri/application-boilerplate-js).


The project was createt in my bachelor thesis in cooperation with the Institute DFD (German Remote Sensing Data Center) from the DLR (German Aerospace Center) (http://www.dlr.de/eoc/en/desktopdefault.aspx/tabid-5278/8856_read-15911/)

## Features
The App extends the application-boilerplate-js with two layouts and functions like basemaps, search, measure... :

*	Use your ArcGIS Online webmap to power the viewer.
*	Use a XML or JSON file to configure the viewer and create the webmap.
*	A mobile and desktop layout.

## All functions
*	Show or hide a overview map.
*	Show a legend of map layers.
*	Manage map layers in a list.
*	Add a scale bar.
*	Add the measure dijit.
*	Show icons in the layout header.
*	Add a BasemapGallery.
*	Add the editor dijit.
*	Navigate through bookmarks
*	Get coordinates with a context menu.
*	Draw shapes and save the as KML.
*	Geolocate your position.
*	Swipe layers of your layer list. 


I hope it is helping someone who don't knows how to start building a Template with the application-boilerplate-js.
[View it live](coming soon...)

## Getting Started

Review the following ArcGIS.com help topics for details on Templates:

*	[Writing your first application](https://developers.arcgis.com/en/javascript/jstutorials/intro_firstmap_amd.html)
*   [About web application templates](http://resources.arcgis.com/en/help/arcgisonline/#/*   About_web_application_templates/010q000000nt000000/)
*   [Creating web application templates](http://resources.arcgis.com/en/help/arcgisonline/#/Creating_web_application_templates/010q00000072000000)
*   [Adding configurable parameters to templates](http://resources.arcgis.com/en/help/arcgisonline/#/Adding_configurable_parameters_to_templates/010q000000ns000000/)
	
	
## Folders and Files

The template consists of the following folders and files:

**/config/:** A folder for your application's default configuration file. 

*   **defaults.js:** Define the default configuration information for the template. You can use this file to specify things like a default web map id, a proxy url, default services, a Bing maps key, default color theme and other template-specific settings.

**/configFiles/:** A folder for your application's configuration files (XML or JSON).

**/css/:** Contains the CSS files for the application.

*	**boarderContainer.css** This file contains all styles for the basic layout
*	**mainDesktop.css** This file contains margin, padding and sizes for the desktop layout.
*	**mainMobile.css** This file contains margin, padding and sizes for the mobile layout.
*	**blue.css** This file contains colors and images... for a blue theme.
*	**gray.css** This file contains colors and images... for a gray theme.
*	**green.css** This file contains colors and images... for a green theme.
*	**androidApp.css** This file contains colors and images form android design for a colorful theme.


**/extras/:** A folder with customised ArcGIS moduls and own created modules.

**/images/**: Contains images used by the application.

**/js/**: Contains 6 JavaScript files and 1 folder:

*   **/nls/:** The nls folder contains a file called resources.js that contains the strings used by the application. If the application needs to be supported by [multiple locales](https://developers.arcgis.com/en/javascript/jshelp/localization.html) you can create a folder for each locale and inside that folder add a resources.js file with the translated strings. See the resources.js file in the nls/fr folder for an example of this in French.
*	**BorderContainerMobile.js:** Creates the mobile layout with a header, map-container and a overlapping menu.
*	**BorderContainerNormal.js:** Creates the desktop layout with a header, map-container and a Side Panel menu.
*   **main.js:** Creates the map based on configuration info. You will write all your main application logic in here.
*   **mainMobile.js:** Creates the map based on configuration info for the mobile layout.
*   **template.js:** Module that takes care of "template"-specific work like retrieving the application configuration settings by appid, getting the url parameters (web map id and appid), handling localization details and retrieving organization specific info if applicable. You will most likely not need to modify this file. Also sets the [proxy](https://developers.arcgis.com/en/javascript/jshelp/ags_proxy.html) and geometry service if the url's have been provided in the defaults.js file or are available from the org. Once executed you'll have access to an object that contains properties that give you access to the following:
    *   Template specific properties
    *   appid
    *   webmap
    *   helperServices: geometry, print, locator service urls
    *   i18n: Strings and isRightToLeft property that can be used to determine if the application is being viewed from a language where text is read left-to-right like Hebrew or Arabic.
    *   proxy  url
	
	*	get config files over ajax request (if the url parameter config is set the webmap and all other configuration comes from your config file).
*   **templateOptions.js:** Options file for configuring your template to query for specific resources and items. You can edit this file and your template can enable or disable querying for things such as localization files, ArcGIS group information, group items, custom url parameters, etc.
    
**index.html**: The default html file for the application (there is a query if it should be mobile or desktop).

**/resources/**: Contains helpful files for your application.
*   **resources/configurationPanel.js** Default configuration panel settings for the template. This is only applicable to configurable templates for your ArcGIS online web app. When the templateConfig.js module retrieves any configurable settings you'll get the theme name back in a parameter named theme. Then you can apply the necessary css to your application to apply the new colors - like change the border color etc. See the [Adding configurable parameters to templates](http://resources.arcgis.com/en/help/arcgisonline/#/Adding_configurable_parameters_to_templates/010q000000ns000000/) help topic for more details.

## Instructions

1. Download and unzip the .zip file or clone the repository.
2. Web-enable the directory.
3. In the browser navigate to ../index.html?webmap=24e01ef45d40423f95300ad2abc5038a
	or ../index.html?config=confi.json
	or ../index.html?config=config2.xml
4. Start writing your own template!

[New to Github? Get started here.](https://github.com/)

## Requirements

* Text or HTML editor.
* A little background with JavaScript, CSS, HTML, XML or json.
* Experience with the [ArcGIS JavaScript API](http://www.esri.com/) would help.

## Resources

* [Community](https://developers.arcgis.com/en/javascript/jshelp/community.html)
* [ArcGIS for JavaScript API Resource Center](http://help.arcgis.com/en/webapi/javascript/arcgis/index.html)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Licensing
Copyright 2014 DLR

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt].

[](Esri Tags: ArcGIS ArcGIS Online Web Application boilerplate template widget dijit Esri JavaScript application configuration xml json)
[](Esri Language: JavaScript)
