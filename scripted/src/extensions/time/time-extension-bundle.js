if(typeof SimileAjax==="undefined"){var SimileAjax;}(function(){var scriptURLs,ajaxURLs;SimileAjax={loaded:false,version:"2.2.1"};SimileAjax.includeJavascriptFiles=Exhibit.includeJavascriptFiles;SimileAjax.includeCssFiles=Exhibit.includeCssFiles;SimileAjax.jQuery=jQuery;SimileAjax.Platform=new Object();SimileAjax.Platform.os={isMac:false,isWin:false,isWin32:false,isUnix:false};SimileAjax.Platform.browser={isIE:false,isNetscape:false,isMozilla:false,isFirefox:false,isOpera:false,isSafari:false,majorVersion:0,minorVersion:0};(function(){var an=navigator.appName.toLowerCase();var ua=navigator.userAgent.toLowerCase();SimileAjax.Platform.os.isMac=(ua.indexOf("mac")!=-1);SimileAjax.Platform.os.isWin=(ua.indexOf("win")!=-1);SimileAjax.Platform.os.isWin32=SimileAjax.Platform.isWin&&(ua.indexOf("95")!=-1||ua.indexOf("98")!=-1||ua.indexOf("nt")!=-1||ua.indexOf("win32")!=-1||ua.indexOf("32bit")!=-1);SimileAjax.Platform.os.isUnix=(ua.indexOf("x11")!=-1);SimileAjax.Platform.browser.isIE=(an.indexOf("microsoft")!=-1);SimileAjax.Platform.browser.isNetscape=(an.indexOf("netscape")!=-1);SimileAjax.Platform.browser.isMozilla=(ua.indexOf("mozilla")!=-1);SimileAjax.Platform.browser.isFirefox=(ua.indexOf("firefox")!=-1);SimileAjax.Platform.browser.isOpera=(an.indexOf("opera")!=-1);SimileAjax.Platform.browser.isSafari=(an.indexOf("safari")!=-1);var parseVersionString=function(s){var a=s.split(".");SimileAjax.Platform.browser.majorVersion=parseInt(a[0]);SimileAjax.Platform.browser.minorVersion=parseInt(a[1]);};var indexOf=function(s,sub,start){var i=s.indexOf(sub,start);return i>=0?i:s.length;};if(SimileAjax.Platform.browser.isMozilla){var offset=ua.indexOf("mozilla/");if(offset>=0){parseVersionString(ua.substring(offset+8,indexOf(ua," ",offset)));}}if(SimileAjax.Platform.browser.isIE){var offset=ua.indexOf("msie ");if(offset>=0){parseVersionString(ua.substring(offset+5,indexOf(ua,";",offset)));}}if(SimileAjax.Platform.browser.isNetscape){var offset=ua.indexOf("rv:");if(offset>=0){parseVersionString(ua.substring(offset+3,indexOf(ua,")",offset)));}}if(SimileAjax.Platform.browser.isFirefox){var offset=ua.indexOf("firefox/");if(offset>=0){parseVersionString(ua.substring(offset+8,indexOf(ua," ",offset)));}}if(!("localeCompare" in String.prototype)){String.prototype.localeCompare=function(s){if(this<s){return -1;}else{if(this>s){return 1;}else{return 0;}}};}})();SimileAjax.Platform.getDefaultLocale=function(){return SimileAjax.Platform.clientLocale;};scriptURLs=[];ajaxURLs=["debug.js","xmlhttp.js","json.js","dom.js","graphics.js","date-time.js","string.js","html.js","data-structure.js","units.js","ajax.js","history.js","window-manager.js"];Exhibit.prefixURLs(scriptURLs,Exhibit.TimeExtension.params.timelinePrefix+"/ajax/2.2.1/scripts/",ajaxURLs);Exhibit.includeJavascriptFiles(document,"",scriptURLs);SimileAjax.loaded=true;}());Exhibit.TimelineView=function(containerElmt,uiContext){var view=this;$.extend(this,new Exhibit.View("time",containerElmt,uiContext));this.addSettingSpecs(Exhibit.TimelineView._settingSpecs);this._accessors={getEventLabel:function(itemID,database,visitor){visitor(database.getObject(itemID,"label"));},getProxy:function(itemID,database,visitor){visitor(itemID);},getColorKey:null,getIconKey:null};this._dom=null;this._selectListener=null;this._largestSize=0;this._iconCoder=null;this._colorCoder=null;this._eventSource=null;this._timeline=null;this._onItemsChanged=function(){view._reconstruct();};$(uiContext.getCollection().getElement()).bind("onItemsChanged.exhibit",view._onItemsChanged);this.register();};Exhibit.TimelineView._intervalChoices=["millisecond","second","minute","hour","day","week","month","year","decade","century","millennium"];Exhibit.TimelineView._settingSpecs={topBandHeight:{type:"int",defaultValue:75},topBandUnit:{type:"enum",choices:Exhibit.TimelineView._intervalChoices},topBandPixelsPerUnit:{type:"int",defaultValue:200},bottomBandHeight:{type:"int",defaultValue:25},bottomBandUnit:{type:"enum",choices:Exhibit.TimelineView._intervalChoices},bottomBandPixelsPerUnit:{type:"int",defaultValue:200},timelineHeight:{type:"int",defaultValue:400},timelineConstructor:{type:"function",defaultValue:null},colorCoder:{type:"text",defaultValue:null},iconCoder:{type:"text",defaultValue:null},selectCoordinator:{type:"text",defaultValue:null},showHeader:{type:"boolean",defaultValue:true},showSummary:{type:"boolean",defaultValue:true},showFooter:{type:"boolean",defaultValue:true}};Exhibit.TimelineView._accessorSpecs=[{accessorName:"getProxy",attributeName:"proxy"},{accessorName:"getDuration",bindings:[{attributeName:"start",type:"date",bindingName:"start"},{attributeName:"end",type:"date",bindingName:"end",optional:true}]},{accessorName:"getColorKey",attributeName:"marker",type:"text"},{accessorName:"getColorKey",attributeName:"colorKey",type:"text"},{accessorName:"getIconKey",attributeName:"iconKey",type:"text"},{accessorName:"getEventLabel",attributeName:"eventLabel",type:"text"},{accessorName:"getHoverText",attributeName:"hoverText",type:"text"}];Exhibit.TimelineView.create=function(configuration,containerElmt,uiContext){var view=new Exhibit.TimelineView(containerElmt,Exhibit.UIContext.create(configuration,uiContext));Exhibit.TimelineView._configure(view,configuration);view._internalValidate();view._initializeUI();return view;};Exhibit.TimelineView.createFromDOM=function(configElmt,containerElmt,uiContext){var configuraton,view;configuration=Exhibit.getConfigurationFromDOM(configElmt);view=new Exhibit.TimelineView(containerElmt!==null?containerElmt:configElmt,Exhibit.UIContext.createFromDOM(configElmt,uiContext));Exhibit.SettingsUtilities.createAccessorsFromDOM(configElmt,Exhibit.TimelineView._accessorSpecs,view._accessors);Exhibit.SettingsUtilities.collectSettingsFromDOM(configElmt,view.getSettingSpecs(),view._settings);Exhibit.TimelineView._configure(view,configuration);view._internalValidate();view._initializeUI();return view;};Exhibit.TimelineView._configure=function(view,configuration){var accessors;Exhibit.SettingsUtilities.createAccessors(configuration,Exhibit.TimelineView._accessorSpecs,view._accessors);Exhibit.SettingsUtilities.collectSettings(configuration,view.getSettingSpecs(),view._settings);accessors=view._accessors;view._getDuration=function(itemID,database,visitor){accessors.getProxy(itemID,database,function(proxy){accessors.getDuration(proxy,database,visitor);});};};Exhibit.TimelineView.prototype.dispose=function(){$(this.getUIContext().getCollection().getElement()).unbind("onItemsChanged.exhibit",this._onItemsChanged);this._timeline=null;if(this._selectListener!==null){this._selectListener.dispose();this._selectListener=null;}this._dom.dispose();this._dom=null;this._dispose();};Exhibit.TimelineView.prototype._internalValidate=function(){var selectCoordinator;if(typeof this._accessors.getColorKey!=="undefined"){if(typeof this._settings.colorCoder!=="undefined"){this._colorCoder=this.getUIContext().getMain().getComponent(this._settings.colorCoder);}if(this._colorCoder===null){this._colorCoder=new Exhibit.DefaultColorCoder(this.getUIContext());}}if(typeof this._accessors.getIconKey!=="undefined"){this._iconCoder=null;if(typeof this._settings.iconCoder!=="undefined"){this._iconCoder=this.getUIContext().getMain().getComponent(this._settings.iconCoder);}}if(typeof this._settings.selectCoordinator!=="undefined"){selectCoordinator=exhibit.getComponent(this._settings.selectCoordinator);if(selectCoordinator!==null){var self=this;this._selectListener=selectCoordinator.addListener(function(o){self._select(o);});}}};Exhibit.TimelineView.prototype._initializeUI=function(){var self,legendWidgetSettings;self=this;legendWidgetSettings={};legendWidgetSettings.colorGradient=(this._colorCoder!==null&&typeof this._colorCoder._gradientPoints!=="undefined");legendWidgetSettings.iconMarkerGenerator=function(iconURL){var elmt=$("<img>").attr("src",iconURL).css("verticalAlign","middle");return elmt.get(0);};$(this.getContainer()).empty();this._dom=Exhibit.ViewUtilities.constructPlottingViewDom(this.getContainer(),this.getUIContext(),this._settings.showSummary&&this._settings.showHeader,{onResize:function(){self._timeline.layout();}},legendWidgetSettings);this._eventSource=new Timeline.DefaultEventSource();self._initializeViewUI();this._reconstruct();};Exhibit.TimelineView.prototype._reconstructTimeline=function(newEvents){var settings,timelineDiv,theme,topIntervalUnit,bottomIntervalUnit,earliest,latest,totalDuration,totalEventCount,totalDensity,intervalDuration,eventsPerPixel,bandInfos,self,listener,i;settings=this._settings;if(this._timeline!==null){this._timeline.dispose();}if(typeof newEvents!=="undefined"&&newEvents!==null){this._eventSource.addMany(newEvents);}timelineDiv=this._dom.plotContainer;if(settings.timelineConstructor!==null){this._timeline=settings.timelineConstructor(timelineDiv,this._eventSource);}else{$(timelineDiv).css("height",settings.timelineHeight+"px").attr("class","exhibit-timelineView-timeline");theme=Timeline.ClassicTheme.create();theme.event.bubble.width=this.getUIContext().getSetting("bubbleWidth");theme.event.bubble.height=this.getUIContext().getSetting("bubbleHeight");if((typeof settings.topBandUnit!=="undefined"&&settings.topBandUnit!==null)||(typeof settings.bottomBandUnit!=="undefined"&&settings.bottomBandUnit!==null)){if(Exhibit.TimelineView._intervalLabelMap===null){Exhibit.TimelineView._intervalLabelMap={millisecond:Exhibit.DateTime.MILLISECOND,second:Exhibit.DateTime.SECOND,minute:Exhibit.DateTime.MINUTE,hour:Exhibit.DateTime.HOUR,day:Exhibit.DateTime.DAY,week:Exhibit.DateTime.WEEK,month:Exhibit.DateTime.MONTH,year:Exhibit.DateTime.YEAR,decade:Exhibit.DateTime.DECADE,century:Exhibit.DateTime.CENTURY,millennium:Exhibit.DateTime.MILLENNIUM};}if(typeof settings.topBandUnit==="undefined"||settings.topBandUnit===null){bottomIntervalUnit=Exhibit.TimelineView._intervalLabelMap[settings.bottomBandUnit];topIntervalUnit=bottomIntervalUnit-1;}else{if(typeof settings.bottomBandUnit==="undefined"||settings.bottomBandUnit===null){topIntervalUnit=Exhibit.TimelineView._intervalLabelMap[settings.topBandUnit];bottomIntervalUnit=topIntervalUnit+1;}else{topIntervalUnit=Exhibit.TimelineView._intervalLabelMap[settings.topBandUnit];bottomIntervalUnit=Exhibit.TimelineView._intervalLabelMap[settings.bottomBandUnit];}}}else{earliest=this._eventSource.getEarliestDate();latest=this._eventSource.getLatestDate();totalDuration=latest.getTime()-earliest.getTime();totalEventCount=this._eventSource.getCount();if(totalDuration>0&&totalEventCount>1){totalDensity=totalEventCount/totalDuration;topIntervalUnit=Exhibit.DateTime.MILLENNIUM;while(topIntervalUnit>0){intervalDuration=Exhibit.DateTime.gregorianUnitLengths[topIntervalUnit];eventsPerPixel=totalDensity*intervalDuration/settings.topBandPixelsPerUnit;if(eventsPerPixel<0.01){break;}topIntervalUnit--;}}else{topIntervalUnit=Exhibit.DateTime.YEAR;}bottomIntervalUnit=topIntervalUnit+1;}bandInfos=[Timeline.createBandInfo({width:settings.topBandHeight+"%",intervalUnit:topIntervalUnit,intervalPixels:settings.topBandPixelsPerUnit,eventSource:this._eventSource,theme:theme}),Timeline.createBandInfo({width:settings.bottomBandHeight+"%",intervalUnit:bottomIntervalUnit,intervalPixels:settings.bottomBandPixelsPerUnit,eventSource:this._eventSource,overview:true,theme:theme})];bandInfos[1].syncWith=0;bandInfos[1].highlight=true;this._timeline=Timeline.create(timelineDiv,bandInfos,Timeline.HORIZONTAL);}self=this;listener=function(eventID){if(self._selectListener!==null){self._selectListener.fire({itemIDs:[eventID]});}};for(i=0;i<this._timeline.getBandCount();i++){this._timeline.getBand(i).getEventPainter().addOnSelectListener(listener);}};Exhibit.TimelineView.prototype._reconstruct=function(){var self,collection,database,settings,accessors,currentSize,unplottableItems,currentSet,hasColorKey,hasIconKey,hasHoverText,colorCodingFlags,iconCodingFlags,events,addEvent,legendWidget,colorCoder,keys,k,key,color,iconCoder,icon,plottableSize,band,centerDate,earliest,latest;self=this;collection=this.getUIContext().getCollection();database=this.getUIContext().getDatabase();settings=this._settings;accessors=this._accessors;currentSize=collection.countRestrictedItems();unplottableItems=[];this._dom.legendWidget.clear();this._eventSource.clear();if(currentSize>0){currentSet=collection.getRestrictedItems();hasColorKey=(this._accessors.getColorKey!==null);hasIconKey=(this._accessors.getIconKey!==null&&this._iconCoder!==null);hasHoverText=(this._accessors.getHoverText!==null);colorCodingFlags={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};iconCodingFlags={mixed:false,missing:false,others:false,keys:new Exhibit.Set()};events=[];addEvent=function(itemID,duration,color,icon,hoverText){var label,evt;accessors.getEventLabel(itemID,database,function(v){label=v;return true;});evt=new Timeline.DefaultEventSource.Event({id:itemID,eventID:itemID,start:duration.start,end:duration.end,instant:duration.end===null,text:label,description:"",icon:icon,color:color,textColor:color,hoverText:hoverText});evt._itemID=itemID;evt.getProperty=function(name){return database.getObject(this._itemID,name);};evt.fillInfoBubble=function(elmt,theme,labeller){self._fillInfoBubble(this,elmt,theme,labeller);};events.push(evt);};currentSet.visit(function(itemID){var durations,color,icon,hoverText,colorKeys,iconKeys,hoverKeys,i;durations=[];self._getDuration(itemID,database,function(duration){if(typeof duration.start!=="undefined"){durations.push(duration);}});if(durations.length>0){color=null;icon=null;hoverText=null;if(hasColorKey){colorKeys=new Exhibit.Set();accessors.getColorKey(itemID,database,function(key){colorKeys.add(key);});color=self._colorCoder.translateSet(colorKeys,colorCodingFlags);}icon=null;if(hasIconKey){iconKeys=new Exhibit.Set();accessors.getIconKey(itemID,database,function(key){iconKeys.add(key);});icon=self._iconCoder.translateSet(iconKeys,iconCodingFlags);}if(hasHoverText){hoverKeys=new Exhibit.Set();accessors.getHoverText(itemID,database,function(key){hoverKeys.add(key);});for(i in hoverKeys._hash){if(hoverKeys._hash.hasOwnProperty(i)){hoverText=i;}}}for(i=0;i<durations.length;i++){addEvent(itemID,durations[i],color,icon,hoverText);}}else{unplottableItems.push(itemID);}});if(hasColorKey){legendWidget=this._dom.legendWidget;colorCoder=this._colorCoder;keys=colorCodingFlags.keys.toArray().sort();if(typeof this._colorCoder._gradientPoints!=="undefined"&&this._colorCoder._gradientPoints!==null){legendWidget.addGradient(this._colorCoder._gradientPoints);}else{for(k=0;k<keys.length;k++){key=keys[k];color=colorCoder.translate(key);legendWidget.addEntry(color,key);}}if(colorCodingFlags.others){legendWidget.addEntry(colorCoder.getOthersColor(),colorCoder.getOthersLabel());}if(colorCodingFlags.mixed){legendWidget.addEntry(colorCoder.getMixedColor(),colorCoder.getMixedLabel());}if(colorCodingFlags.missing){legendWidget.addEntry(colorCoder.getMissingColor(),colorCoder.getMissingLabel());}}if(hasIconKey){legendWidget=this._dom.legendWidget;iconCoder=this._iconCoder;keys=iconCodingFlags.keys.toArray().sort();if(settings.iconLegendLabel!==null){legendWidget.addLegendLabel(settings.iconLegendLabel,"icon");}for(k=0;k<keys.length;k++){key=keys[k];icon=iconCoder.translate(key);legendWidget.addEntry(icon,key,"icon");}if(iconCodingFlags.others){legendWidget.addEntry(iconCoder.getOthersIcon(),iconCoder.getOthersLabel(),"icon");}if(iconCodingFlags.mixed){legendWidget.addEntry(iconCoder.getMixedIcon(),iconCoder.getMixedLabel(),"icon");}if(iconCodingFlags.missing){legendWidget.addEntry(iconCoder.getMissingIcon(),iconCoder.getMissingLabel(),"icon");}}plottableSize=currentSize-unplottableItems.length;if(plottableSize>this._largestSize){this._largestSize=plottableSize;this._reconstructTimeline(events);}else{this._eventSource.addMany(events);}band=this._timeline.getBand(0);centerDate=band.getCenterVisibleDate();earliest=this._eventSource.getEarliestDate();latest=this._eventSource.getLatestDate();if(typeof earliest!=="undefined"&&earliest!==null&&centerDate<earliest){band.scrollToCenter(earliest);}else{if(typeof latest!=="undefined"&&latest!==null&&centerDate>latest){band.scrollToCenter(latest);}}}this._dom.setUnplottableMessage(currentSize,unplottableItems);};Exhibit.TimelineView.prototype._select=function(selection){var itemID,c,i,band,evt;itemID=selection.itemIDs[0];c=this._timeline.getBandCount();for(i=0;i<c;i++){band=this._timeline.getBand(i);evt=band.getEventSource().getEvent(itemID);if(typeof evt!=="undefined"&&evt!==null){band.showBubbleForEvent(itemID);break;}}};Exhibit.TimelineView.prototype._fillInfoBubble=function(evt,elmt,theme,labeller){this.getUIContext().getLensRegistry().createLens(evt._itemID,$(elmt),this.getUIContext());};