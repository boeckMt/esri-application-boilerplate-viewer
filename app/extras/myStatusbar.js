/**
 * This module creates a bar with a textNode and close button
 * >>> for user feedback
 * widget.set("content", value)
 * widget.show()
 * 
 * @author boeck
 * @module myStatusbar
 * @version 1.0
 */

define("extras/myStatusbar",["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/_base/lang", "dijit/a11yclick", "dojo/on", "dojo/dom-style"],
function(declare, _WidgetBase, _TemplatedMixin, lang, a11yclick, on, domStyle) {
    
    var myStatusbar = declare("extras.myStatusbar",[_WidgetBase,_TemplatedMixin], {
        //-------------------------------------------
        templateString : '<div class="myStatusbar"><span class="myStatusbarTitleBar" >${content}</span><span class="myStatusbarCloseIcon" title="close" data-dojo-attach-point="_closeNode"></span></div>',
        
        options : {
            visible: false,
            content: null, 
            style: "position: fixed; bottom:0px; width:100%; height:25px; z-index:100; visibility:visible;",
            id: null  
        },
        
        //-------------------------------------------
        constructor: function(params, srcNodeRef){
          var o = declare.safeMixin(this.options, params);
          
          this.domNode = srcNodeRef;
          this.set("visible", o.visible);
          this.set("content", o.content);
          this.style = o.style;
          
          this.watch("visible", this._visible);
          this.watch("content", this._upContent);
        },
        
        //-------------------------------------------
        postCreate : function() {
            this.inherited(arguments);
            this.own(on(this._closeNode, a11yclick, lang.hitch(this, this.hide)));
        },
        startup : function() {
            this._init();  
        },
        destroy : function() {
            this.inherited(arguments);
        },
        //-------------------------------------------
        
        show : function() {
            this.set("visible", true);
        },
        hide : function() {
            this.set("visible", false);
        },
        //-------------------------------------------
        
        _init : function() {
            this._visible();
        },
        _visible : function() {
            this.get("visible") ? domStyle.set(this.domNode, "display", "block") : domStyle.set(this.domNode, "display", "none");
        },
        
        _upContent : function() {
            this.get("content") ? this.domNode.children[0].innerHTML = this.get("content") : false;
        }
        
    });

return myStatusbar; 
});
