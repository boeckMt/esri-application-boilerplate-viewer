define(["application/BorderContainerNormal", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/layout/AccordionContainer", "dojo/dom-construct", "dojo/dom-style", "extras/myStatusbar"],
function(BorderContainerNormal, BorderContainer, ContentPane, AccordionContainer, domConstruct, domStyle, myStatusbar){
	
	BorderContainerNormal.layout = function(){
            // create a BorderContainer as the top widget in the hierarchy
            var bc = new BorderContainer({
                style: "height: 100%; width: 100%;",
                gutters: false, //für Rand um und in Contaner
                id: "BorderContainer"
            });
            
            // create a CollapsePanel (AccordionContainer) for the rightPane

            var aContainer = new AccordionContainer({style:"height: 100px", id:"aContainer"}, domConstruct.create('div'));
            aContainer.startup();

        	
            // create a ContentPane as the left pane in the BorderContainer
            var cp1 = new ContentPane({
                region: "right",
                style: "width: 0px",
                content: aContainer,
                id: "rightPane",
            });
            bc.addChild(cp1);
            

            var cp2 = new ContentPane({
                region: "center",
                id: "mapDiv"
            });
            bc.addChild(cp2);

            var HeaderContent = '<div><div id="webmap-toolbar-left"></div><div id="webmap-toolbar-center"></div><div id="webmap-toolbar-right"></div></div>';
            
            
            var cp3 = new ContentPane({
                region: "top",
                style: "height: 35px; width: 100%;",
                id: "header",
                content: HeaderContent
            });
            
            bc.addChild(cp3);
        

            bc.placeAt(document.body);
            bc.startup(); 
            
            //---------------------------------------------------------
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