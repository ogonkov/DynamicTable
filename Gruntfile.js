module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bowercopy: {
            options: {
                clean: true
            },
            js: {
                options: {
                    destPrefix: 'js/vendor'
                },
                files: {
                    jquery: 'jquery/dist/*',
                    backbone: 'backbone/backbone.js',
                    underscore: 'underscore/underscore.js',
                    requirejs: 'requirejs/require.js',
                    'requirejs/text.js': 'requirejs-text/text.js',
                    'highcharts/highcharts.js': 'highcharts/highcharts.js',
                    'highcharts/standalone-framework.js': 'highcharts/adapters/standalone-framework.js'
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('serve', ['connect:server:keepalive']);
    grunt.registerTask('default', ['bowercopy']);
};