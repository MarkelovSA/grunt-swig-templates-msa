/*
 * grunt-swig-templates-msa
 * https://github.com/MarkelovSA/grunt-swig-templates-msa
 *
 * Copyright (c) 2016 Markelov Stanislav
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

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
  
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    swig_templates_msa: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/simple_text', 'test/fixtures/simple_template']
        }
      },
      custom_options: {
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
      },
      loader_fs: {
        options: {
          loader: {
            mod: 'fs',
            basepath: __dirname + '/test/fixtures/',
            encoding: "utf8"
          }
        },
        files: [
          {
            cwd: 'test/fixtures/',
            dest: 'tmp/loader_fs',
            src: ['simple_text', 'simple_template']
          }
        ],
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'swig_templates_msa', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
