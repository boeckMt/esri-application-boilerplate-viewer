define(["application/BorderContainerMobile", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/layout/AccordionContainer", "dojo/dom-construct",  "dojo/dom", "extras/myStatusbar"],
function(BorderContainerMobile, BorderContainer, ContentPane, AccordionContainer, domConstruct, dom, myStatusbar){
    
    BorderContainerMobile.layout = function(){
           // create a BorderContainer as the top widget in the hierarchy
            var bc = new BorderContainer({
                style: "height: 100%; width: 100%;",
                gutters: false, //für Rand um und in Contaner
                id: "BorderContainer"
            });
         
            var cp2 = new ContentPane({
                region: "center",
                id: "mapDiv"
            });
            bc.addChild(cp2);
            

            var HeaderContent = '<div><div id="webmap-toolbar-left"></div><div id="webmap-toolbar-center"></div><div id="webmap-toolbar-right"></div></div>';
            
            
            var cp3 = new ContentPane({
                region: "top",
                style: "height: 40px; width: 100%;",
                id: "header",
                content: HeaderContent
            });
            
            bc.addChild(cp3);
        

            bc.placeAt(document.body);
            bc.startup(); 
            
            //---------------------------------------------------------

            var pos = "position: fixed; top:" + 44 + "px;right:" + 2 + "px;width:" + (window.innerWidth- 4) + "px;height:" + (window.innerHeight - 44) + "px;z-index:100;visibility:hidden;";
            var _rightPane = domConstruct.create("div", {
                id : "_rightPane",
                style:pos
            }, "mapDiv");
            
            var supportsOrientationChange = "onorientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
            window.addEventListener(orientationEvent, function() {
            	dojo.style(dom.byId("rightPane"), "width", ((window.innerWidth- 4) + "px"));
			}, false);
            
            var cp1 = new ContentPane({
                id: "rightPane",
            },"_rightPane");
            
            
            //---------------------------
            /*
            var bar = domConstruct.create("div", {
                id : "_bar"
            }, "mapDiv");

            var sBar = new myStatusbar({
                id: "statusbar",
                visible: false
            },"_bar");
            sBar.startup();
*/

    };
    
    
});