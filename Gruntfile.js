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
        src: [
          // Configurations
          "src/config/webvr-config.js",
          "src/config/meta-config.js",
          "src/config/css-config.js",
          // Dependencies
          "node_modules/es6-promise/dist/es6-promise.js",
          "node_modules/three/build/three.min.js",
          "node_modules/three/examples/js/renderers/CSS3DRenderer.js",
          "node_modules/three/examples/js/controls/VRControls.js",
          "node_modules/three/examples/js/effects/VREffect.js",
          "node_modules/three/examples/js/loaders/ColladaLoader.js",
          "node_modules/three/examples/js/loaders/OBJLoader.js",
          "node_modules/three/examples/js/loaders/MTLLoader.js",
          "node_modules/webvr-polyfill/build/webvr-polyfill.js",
          "node_modules/webvr-boilerplate/build/webvr-manager.js",
          "node_modules/jquery/dist/jquery.min.js",
          "node_modules/bootstrap/dist/js/bootstrap.min.js",
          // Source codes
          "dist/tmp/webpack-out.js"
        ],
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
  grunt.registerTask('attach-vendors', ['concat:wrap', 'clean:tmp']);

};