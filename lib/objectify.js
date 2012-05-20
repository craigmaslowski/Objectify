var fs = require('fs'),
	Path = require('path'),
	buildExtRegex = function(extensions) {
		var regex = '^(.+)\\.(';

		extensions.forEach(function (ext) {
			regex += ext + '|';
		});
		regex = regex.substring(0, regex.length-1) + ')$';
		return new RegExp(regex);
	};

exports.get = function(directory, userOptions) {
	var result = {},
		options = {
			encoding: 'utf8',
			extensions: ['html']
		},
		files = fs.readdirSync(directory);
	for (var key in userOptions) {
		options[key] = userOptions[key];
	}
	var extRegex = buildExtRegex(options.extensions);


	files.forEach(function(file) {
		var path = Path.join(directory, file),
			stat = fs.lstatSync(path),
			item = null;

		if (stat.isDirectory()) {
			var item = exports.get(path, options);
			if (Object.keys(item).length)
				result[file] = item;
		} else {
			var matches = file.match(extRegex);
			if (matches) {
				result[matches[1]] = fs.readFileSync(path, options.encoding);
			}
		}
	});
	return result;
};