/*
 * grunt-posthtml
 * https://github.com/TCotton/grunt-posthtml
 *
 * Copyright (c) 2015 Andy Walpole
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

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

    jscs: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        config: '.jscsrc',
        esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
        fix: false // Autofix code style violations when possible.
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/tmp/']
    },

    // Configuration to be run (and then tested).
    posthtml: {
      options: {
        use: [
          require('posthtml-head-elements')({headElements: 'test/config/head.json'}),
          require('posthtml-doctype')({doctype: 'HTML 5'}),
          require('posthtml-include')({encoding: 'utf-8'})
        ]
      },
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'test/html/',
          src: ['*.html'],
          dest: 'test/tmp/'
        }]
      },
      single: {
        files: [
          {src: 'test/html2/single.html', dest: 'test/tmp/single.html'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  })
  ;

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'posthtml', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'jscs', 'test']);

};