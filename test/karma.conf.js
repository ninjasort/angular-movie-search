module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['browserify', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'app/lib/angular/angular.js',
      'app/lib/angular-sanitize/angular-sanitize.js',
      'app/lib/angular-ui-router/release/angular-ui-router.js',
      'app/lib/angular-mocks/angular-mocks.js',
      'app/scripts/config.js',
      'app/scripts/services/*.js',
      'app/scripts/controllers/search.js',
      'app/scripts/controllers/details.js',
      'app/scripts/**/*.js',
      'test/spec/**/*.js'
    ],

    preprocessors: {
      'app/scripts/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [ 'babelify' ]
    },

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8000,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

  });
};
