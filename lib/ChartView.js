define(
    [
        'backbone',
        'underscore',
        'options',
        'highcharts'
    ],
    function (Backbone, _, options) {
        var ChartView, chartCommonOptions, pointTemplate, dataOrder;

        dataOrder = options.order;
        pointTemplate = '<span style="color:{series.color}">{series.name}</span>:' +
            ' <b>{point.percentage:.1f}%</b> ({point.y:,.0f})<br/>';

        function toGroup(model) {
            var group, data, point;

            group = {};

            group.name = model.get('title');

            _.extend(group, {data: []});

            data = model.omit('id', 'title');

            dataOrder.forEach(function(id) {
                point = data[id];

                if (point !== void 0) {
                    group.data.push(point);
                }
            });

            point = null;

            this.push(group);
        }

        function convert(data) {
            var plotData;

            plotData = [];

            data.forEach(toGroup, plotData);

            return plotData;
        }

        function getTotal() {
            var total, category, index, series, data;

            total = 0;
            category = this.value;
            index = dataOrder.slice(1).indexOf(category);
            series = this.chart.series;

            series.forEach(function(group) {
                data = group.options.data[index];

                if (!data) {
                    return;
                }

                total += data;
            });

            return total;
        }

        chartCommonOptions = {
            legend: {
                enabled: false
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            xAxis: {
                gridLineWidth: 1,
                opposite: true,
                tickInterval: 1,
                tickmarkPlacement: 'on',
                labels: {
                    formatter: getTotal
                }
            },
            yAxis: {
                gridLineWidth: 0,
                title: {
                    enabled: false
                },
                labels: {
                    enabled: false
                }
            },
            tooltip: {
                pointFormat: pointTemplate,
                shared: true
            },
            plotOptions: {
                area: {
                    stacking: 'percent',
                    lineColor: '#ffffff',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#ffffff'
                    }
                }
            }
        };

        ChartView = Backbone.View.extend({
            initialize: function() {
                this.instance = null;

                this.listenTo(app.vent, 'data:compare', this.render);
            },

            renderChart: function(data) {
                var chart, chartOptions, element;

                if (this.instance) {
                    this.instance.destroy();
                }

                element = this.el;
                chartOptions = _.extend(
                    {
                        chart: {
                            type: 'area',
                            renderTo: element,
                            inverted: true
                        }
                    },
                    chartCommonOptions,
                    {
                        series: data
                    }
                );

                chartOptions.xAxis.categories = dataOrder.slice(1);

                chart = new Highcharts.Chart(chartOptions);

                this.instance = chart;
            },

            render: function(options) {
                this.renderChart(convert(options.data));

                return this;
            }
        });

        return ChartView;
    }
);