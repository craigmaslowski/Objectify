var util = require('util'),
	path = require('path'),
	objectify = require('../../lib/objectify.js');

describe('objectify', function () {
	var result;

	afterEach(function () {
		result = undefined;
	});

	describe('when in text mode', function () {
		beforeEach(function () {
			result = objectify(path.join(__dirname, '../demo'), { extensions: ['txt', 'html'] });
		});

		it('should create an object for each subdirectory', function () {
			expect(result.nested).toBeDefined('nested');
			expect(result.nested.furtherNested).toBeDefined('furthernested');
		});

		it('should create a property for each file', function () {
			expect(result.rootFile).toBeDefined('rootFile');
			expect(result.nested.firstNested).toBeDefined('nested.firstNested');
			expect(result.nested.secondNested).toBeDefined('nested.secondNested');
			expect(result.nested.htmlFile).toBeDefined('nested.htmlFile');
			expect(result.nested.furtherNested.wayDeep).toBeDefined('nested.furtherNested.wayDeep');
		});

		it('should read the contents of each file that matches an extension into the property', function (){
			expect(result.rootFile).toEqual('This is my root file.', 'rootFile');
			expect(result.nested.firstNested).toEqual('This is the first nested file.', 'nested.firstNested');
			expect(result.nested.secondNested).toEqual('This is the second nested file.', 'nested.secondNested');
			expect(result.nested.htmlFile).toEqual('<p>This matches.</p>', 'nested.htmlFile');
			expect(result.nested.furtherNested.wayDeep).toEqual('This file is nested even further.', 'nested.furtherNested.wayDeep');
		});

		it('should not add a property if a directory is empty', function() {
			expect(result.empty).toBeUndefined('empty');
			expect(result.nested.nomatchingfiles).toBeUndefined('nomatchingfiles');
		});

		it("should not add a property if the file's extension doesn't match", function() {
			expect(result.notamatch).toBeUndefined('notamatch');
		});
	});

	describe('when in api mode', function () {
		beforeEach(function () {
			result = objectify(path.join(__dirname, '../api'), { api: true });
			console.log(util.inspect(result));
		});

		it('should require all .js files', function () {
			expect(result.root.functionOne).toBeDefined('root.functionOne');
			expect(result.root.functionTwo).toBeDefined('root.functionTwo');
			expect(result.root.propertyOne).toBeDefined('root.propertyOne');
		});

		it('should create an object for each subdirectory', function () {
			expect(result.models).toBeDefined('models');
			expect(result.models.person).toBeDefined('models.person');
			expect(result.models.person).toBeDefined('models.person.find');
		});
	});
});