define(
    [
        'backbone',
        'underscore',
        'Chart'
    ],
    function (Backbone, _, Chart) {
        var ChartView;

        ChartView = Backbone.View.extend({
            initialize: function() {
                this.instance = null;

                this.listenTo(app.vent, 'data:compare', this.render);
            },

            renderChart: function(data) {
                var chart;

                if (this.instance) {
                    this.instance.destroy();
                }

                chart = new Chart({
                    data: data,
                    el: this.el
                });

                this.instance = chart;
            },

            render: function(options) {
                this.renderChart(options.data);

                return this;
            }
        });

        return ChartView;
    }
);