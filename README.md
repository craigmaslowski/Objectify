Objectify
=========
[![Build Status](https://secure.travis-ci.org/craigmaslowski/objectify.png)](http://travis-ci.org/craigmaslowski/objectify)

Objectify recurses over a directory and builds an object tree that matches the directory's structure while reading the contents of each file into a property on the tree.

~~~
npm install objectify
~~~

## Usage

Assuming the following directory structure:
~~~
templates
	admin
		dashboard.html
	blog
		post
			create.html
			show.html
			edit.html
		comment
			create.html
			show.html
			edit.html
~~~ 

Then calling: 

```JavaScript
var objectify = require('objectify');

var result = objectify('./templates', {	extensions: ['html'] });
```

Would populate the result variable with an object like so:

~~~
{
	admin: {
		dashboard: '' // populated with the contents of ./templates/admin/dashboard.html
	},
	blog: {
		post: {
			create: '', // populated with the contents of ./templates/post/create.html
			show: '', // populated with the contents of ./templates/post/show.html
			edit: '', // populated with the contents of ./templates/post/edit.html
		},
		comment: {
			create: '', // populated with the contents of ./templates/comment/create.html
			show: '', // populated with the contents of ./templates/comment/show.html
			edit: '', // populated with the contents of ./templates/comment/edit.html
		}
	}
}
~~~

### Encoding
Objectify reads text files using utf8 encoding by default. You can specify encoding like so.

```JavaScript
var objectify = require('objectify');

var result = objectify('./templates', {	extensions: ['html'], encoding: 'ascii' });
```

Please note: All file operations are performed synchronously. As such, it's best to use objectify when your app starts.