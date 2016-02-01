var serveStatic = require('serve-static');
var historyApiFallback = require('connect-history-api-fallback');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['app/**/*', 'index.html', 'style/**/*'],
            dest: 'dist'
          }
        ]
      }
    },
    watch: {
      staticFiles: {
        files: ['app/**/*', 'index.html', 'style/**/*'],
        tasks: ['newer:copy:main'],
        options: {
          livereload: 30000
        }
      },
      ts: {
        files: ['app/**/*.ts'],
        tasks: ['ts:app'],
        options: {
          livereload: 30000,
          fast: 'always'
        }
      }
    },
    ts: {
      app: {
        tsconfig: true,
        reference: 'typings/tsd.d.ts'
      }
    },
    connect: {
      dev: {
        options: {
          port: 9000,
          //hostname: 'localhost',
          base: 'dist',
          useAvailablePort: true,
          livereload: 30000,
          open: true,
          middleware: function(connect, options, middlewares) {
            return [
              historyApiFallback()
            ].concat(
              middlewares
            ).concat([
              connect().use(
                '/node_modules',
                serveStatic('./node_modules')
              )
            ]);
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('serve', ['copy', 'connect:dev', 'watch']);

};