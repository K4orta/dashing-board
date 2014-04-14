module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public',
          livereload: true
        }
      }
    },
    less: {
      development: {
        options: {
        paths: ['public/stylesheets']
        },
        files: {
          './public/css/main.css': './stylesheets/main.less'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      staticFiles: {
        files: ['public/**/*.html', 'public/**/*.js'],
        livereload: true
      },
      styles: {
        tasks: ['less'],
        files: ['stylesheets/**/*.less']
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};