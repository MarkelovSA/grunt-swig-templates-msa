/*
 * grunt-swig-templates-msa
 * https://github.com/MarkelovSA/grunt-swig-templates-msa
 *
 * Copyright (c) 2016 Markelov Stanislav
 * Licensed under the MIT license.
 */

'use strict';

var Swig = require('swig-templates');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('swig_templates_msa', 'Grunt plugin for swig-templates.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var
    options = this.options({
      separator: "\n",
      opt: {}
    }),
    swig = new Swig.Swig(this.options.opt);
    
    if (options.extends) {
        var filters = (options.extends.filters || {});
        Object.keys(filters).forEach(function(name) {
          this.setFilter(name, filters[name]);
        }, swig);
    }
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        //return grunt.file.read(filepath);
        return swig.renderFile(filepath);
      })
      .join(grunt.util.normalizelf(options.separator));

      // Handle options.
      //src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);
      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });

  });

};
