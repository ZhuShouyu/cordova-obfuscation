#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cwd = process.cwd();
var scriptPath = __dirname;

var paths = [ path.join(cwd, '..', '..', 'hooks'), path.join(cwd, '..', '..', 'hooks', 'after_prepare') ];

paths.forEach(function (pathName) {
	if (!fs.existsSync(pathName)) {
		console.log('Creating directory: ' + pathName);
		fs.mkdirSync(pathName);
	}
});

var afterPrepare = [
	'020_remove_sass_from_platforms.js',
	'030_clean_dev_files_from_platforms.js',
	'040_move_dist_files_to_platforms.js',
	'050_clean_obfuscation.js',
	'060_uglify.js'
];
var beforePrepare = [
	'01_jshint.js'
];

afterPrepare.forEach(function(fileName) {
	var tempFilePath = path.join(cwd, 'after_prepare', fileName);
	var fileData = fs.readFileSync(tempFilePath);
	var newFilePath = path.join(paths[1], fileName);
	console.log('Copying ' + fileName + ' file to ionic hooks/after_prepare...');
	fs.writeFileSync(newFilePath, fileData);
});

beforePrepare.forEach(function(fileName) {
	var tempFilePath = path.join(cwd, 'after_prepare', fileName);
	var fileData = fs.readFileSync(tempFilePath);
	var newFilePath = path.join(paths[1], fileName);
	console.log('Copying ' + fileName + ' file to ionic hooks/before_prepare...');
	fs.writeFileSync(newFilePath, fileData);
});

console.log('Finished installing. Try running ionic build --release \n');
