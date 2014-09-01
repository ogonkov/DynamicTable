require.config({
    baseUrl: 'lib',
    paths: {
        jquery: '../js/vendor/jquery/jquery',
        underscore: '../js/vendor/underscore/underscore',
        backbone: '../js/vendor/backbone/backbone',
        text: '../js/vendor/requirejs/text',
        highcharts: '../js/vendor/highcharts/highcharts',
        'highcharts-adapter': '../js/vendor/highcharts/standalone-framework'
    },

    shim: {
        highcharts: {
            deps: ['highcharts-adapter'],
            exports: 'Highcharts'
        },

        'highcharts-adapter': {
            exports: 'HighchartsAdapter'
        }
    }
});

require(['app'], function() {
    window.app.data.fetch();
});