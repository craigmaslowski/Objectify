var objectify = require('../../lib/objectify.js');

describe('objectify', function () {
	it('should have a get function', function () {
		expect(objectify.get).toBeDefined();
		expect(typeof objectify.get).toEqual('function');
	});

	describe('get', function () {
		it('should create an object for each subdirectory', function () {
			var result = objectify.get('./test/demo', { extensions: ['txt', 'html'] });
			expect(result.nested).toBeDefined('nested');
			expect(result.nested.furtherNested).toBeDefined('furthernested');
		});

		it('should create a property for each file', function () {
			var result = objectify.get('./test/demo', { extensions: ['txt', 'html'] });
			expect(result.rootFile).toBeDefined('rootFile');
			expect(result.nested.firstNested).toBeDefined('nested.firstNested');
			expect(result.nested.secondNested).toBeDefined('nested.secondNested');
			expect(result.nested.htmlFile).toBeDefined('nested.htmlFile');
			expect(result.nested.furtherNested.wayDeep).toBeDefined('nested.furtherNested.wayDeep');
		});

		it('should read the contents of each file that matches an extension into the property', function (){
			var result = objectify.get('./test/demo', { extensions: ['txt', 'html'] });
			expect(result.rootFile).toEqual('This is my root file.', 'rootFile');
			expect(result.nested.firstNested).toEqual('This is the first nested file.', 'nested.firstNested');
			expect(result.nested.secondNested).toEqual('This is the second nested file.', 'nested.secondNested');
			expect(result.nested.htmlFile).toEqual('<p>This matches.</p>', 'nested.htmlFile');
			expect(result.nested.furtherNested.wayDeep).toEqual('This file is nested even further.', 'nested.furtherNested.wayDeep');
		});

		it('should not add a property if a directory is empty', function() {
			var result = objectify.get('./test/demo', { extensions: ['txt', 'html'] });
			expect(result.empty).toBeUndefined('empty');
			expect(result.nested.nomatchingfiles).toBeUndefined('nomatchingfiles');
		});

		it("should not add a property if the file's extension doesn't match", function() {
			var result = objectify.get('./test/demo', { extensions: ['txt', 'html'] });
			expect(result.notamatch).toBeUndefined('notamatch');
		});
	});
});