define(
    [
        'require',
        'backbone',
        'underscore',
        'TableView',
        'CompareView',
        'ChartView'
    ],
    function (require) {
        var _, Backbone, app, chart, data, table, compare;

        window.app = app = (window.app || {});

        _ = require('underscore');
        Backbone = require('backbone');
        app.vent = _.clone(Backbone.Events);

        chart = require('ChartView');
        chart = new chart({
            el: '.comparison'
        });

        table = require('TableView');
        table = new table({
            el: 'table'
        });

        data = table.collection;

        compare = require('CompareView');
        compare = new compare({
            collection: data,
            el: 'button'
        });

        app.data = data;

        return app;
    }
);