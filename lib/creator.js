var fs = require('fs');


/*
 * Creator Prototype
 * Files for CEFTool Creator
 */
var creator = exports = module.exports = {};

creator.loadFile = function(fileName, projectname) {
	var data = fs.readFileSync(__dirname+fileName, {"encoding":"UTF-8"});
	return data.replace(/{NAME}/g, projectname);
};
/****************/
creator.sln = function(projectname) {
	return creator.loadFile('/helper/visualstudio/sln');
};
creator.vcxproj = function(projectname) {
	return creator.loadFile('/helper/visualstudio/vcxproj');
};
creator.winmaincpp = function(projectname) {
	return creator.loadFile('/helper/visualstudio/maincpp');
};
/****************/
creator.pbxproj = function(projectname) {
	return creator.loadFile('/helper/xcode/pbxproj');
};
creator.macmainmm = function(projectname) {
	return creator.loadFile('/helper/xcode/mainmm');
};
creator.macappdh = function(projectname) {
	return creator.loadFile('/helper/xcode/appdelegateh');
};
creator.macappdmm = function(projectname) {
	return creator.loadFile('/helper/xcode/appdelegatemm');
};
creator.macpch = function(projectname) {
	return creator.loadFile('/helper/xcode/prefixpch');
};
creator.macinfoplist = function(projectname) {
	return creator.loadFile('/helper/xcode/infoplist');
};
creator.maccredits = function(projectname) {
	return creator.loadFile('/helper/xcode/creditsrtf');
};
creator.macinfopliststrings = function(projectname) {
	return creator.loadFile('/helper/xcode/infopliststrings');
};
creator.macmainmenu = function(projectname) {
	return creator.loadFile('/helper/xcode/mainmenuxib');
};
/****************/
creator.clienth = function(projectname) {
	return creator.loadFile('/helper/independent/clienthandlerh');
};
creator.clientcpp = function(projectname) {
	return creator.loadFile('/helper/independent/clienthandlercpp');
};