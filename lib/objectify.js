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

objectify = function(directory, options) {
	var result = {},
		extRegex,
		config = {
			encoding: 'utf8',
			extensions: ['html'],
			api: false
		},
		files = fs.readdirSync(directory);

	for (var key in options) {
		config[key] = options[key];
	}

	if (config.api) config.extensions = ['js'];

	extRegex = buildExtRegex(config.extensions);

	files.forEach(function(file) {
		var path = Path.join(directory, file),
			stat = fs.lstatSync(path),
			item = null,
			matches;

		if (stat.isDirectory()) {
			item = objectify(path, config);
			if (Object.keys(item).length)
				result[file] = item;
		} else {
			matches = file.match(extRegex);
			if (matches) {
				result[matches[1]] = config.api ? require(path) : fs.readFileSync(path, config.encoding);
			}
		}
	});
	return result;
};

module.exports = objectify;