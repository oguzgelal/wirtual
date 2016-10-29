// Wraps each script to be an IIFE (Immediately Invoked Function Expression)
var concat_wrap = [];
// Just concats below scripts
var concat_nowrap = [
  "node_modules/es6-promise/dist/es6-promise.js",
  "node_modules/three/three.js",
  "node_modules/three/examples/js/controls/VRControls.js",
  "node_modules/three/examples/js/effects/VREffect.js",
  "node_modules/webvr-polyfill/build/webvr-polyfill.js",
  "node_modules/webvr-boilerplate/build/webvr-manager.js"
];

// Add webpack bundled source codes
concat_wrap.push('dist/tmp/webpack-out.js');

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      wrap: {
        options: {
          separator: ';\n',
          banner: '(function(){\n',
          footer: '\n})();'
        },
        src: concat_wrap,
        dest: 'dist/tmp/wirtual-wrap.js',
      },
      nowrap: {
        src: concat_nowrap,
        dest: 'dist/tmp/wirtual-nowrap.js',
      },
      finalise: {
        src: ['dist/tmp/wirtual-wrap.js', 'dist/tmp/wirtual-nowrap.js'],
        dest: 'dist/wirtual.js',
      }
    },
    clean: {
      tmp: ['./dist/tmp']
    },
    connect: {
      options: {
        port: 8000,
        livereload: 35729,
        hostname: 'localhost',
        base: ['demo', 'dist']
      },
      livereload: {
        options: {
          open: true,
          base: ['demo', 'dist']
        }
      }
    },
    watch: {
      reload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'dist/**/*',
          'demo/**/*'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('serve', function () { grunt.task.run(['connect:livereload', 'watch']); });
  grunt.registerTask('attach-vendors', ['concat:wrap', 'concat:nowrap', 'concat:finalise', 'clean:tmp']);

};