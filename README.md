# grunt-swig-templates-msa

> Grunt plugin for swig-templates.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swig-templates-msa --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-swig-templates-msa');
```

## The "swig_templates_msa" task

### Overview
In your project's Gruntfile, add a section named `swig_templates_msa` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  swig_templates_msa: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `"\n"`

A string value that is used to separate the results of rendering multiple templates in a single file.

#### options.extends.filters
Type: `Object`
Default value: `undefined`

Object that contains additional filters for templates.`Key` is the filter name, `value` is `function(input, ...)`.

### Usage Examples

#### Default Options
In this example, the default options are used to render two templates into single file. So if the `simple_text` file has the content `Simple text` and the `simple_template` file had the content `{{ "i like Burritos"|capitalize }}`, the generated result would be `Simple text
I like burritos`

```js
grunt.initConfig({
  swig_templates_msa: {
    options: {},
    files: {
      'tmp/default_options': ['test/fixtures/simple_text', 'test/fixtures/simple_template']
    },
  },
});
```

#### Custom Options
In this example, custom options are used to add to the swig additional filter `attr`. So if the `extends_filters` file has the content `{{ 123|attr('id', 0) }}`, the generated result in this case would be `id="123"`.

```js
function attr(input, attrName, defaultValue) {
  if (input === undefined) {
    if (defaultValue === undefined) {
      return '';
    }
    return attrName + '="' + defaultValue + '"';
  }
  return attrName + '="' + input + '"';
}
attr.safe = true;
  
grunt.initConfig({
  swig_templates_msa: {
    options: {
      extends: {
        filters: {
          attr:  attr
        }
      }
    },
    files: {
      'tmp/custom_options': ['test/fixtures/extends_filters']
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
