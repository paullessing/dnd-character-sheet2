var serveStatic = require('serve-static');
var historyApiFallback = require('connect-history-api-fallback');

module.exports = function(grunt) {

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
      newer: {
        files: ['app/**/*'],
        tasks: ['newer:copy:main'],
        options: {
          livereload: 30000
        }
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

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('serve', ['copy', 'connect:dev', 'watch']);

};