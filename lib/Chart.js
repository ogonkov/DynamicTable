define(
    [
        'underscore',
        'options',
        'highcharts'
    ],
    function (_, options) {
        var dataOrder, Provider, chartCommonOptions, pointTemplate;

        Provider  = Highcharts.Chart;
        dataOrder = options.order.slice(1);
        pointTemplate = '<span style="color:{series.color}">{series.name}</span>:' +
            ' <b>{point.percentage:.1f}%</b> ({point.y:,.0f})<br/>';

        function toGroup(model) {
            var group, data;

            group = {};

            group.name = model.get('title');

            _.extend(group, {data: []});

            data = model.omit('id', 'title');

            dataOrder.forEach(function(id) {
                group.data.push(data[id]);
            });

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
            index = dataOrder.indexOf(category);
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

        function Chart(options) {
            this.instance = null;
            this.element = options.el;

            if (options.data) {
                this.data = convert(options.data);
            }

            this.build();
        }

        Chart.prototype.data = [];

        Chart.prototype.build = function() {
            var chart, options;

            options = _.extend(
                {
                    chart: {
                        type: 'area',
                        renderTo: this.element,
                        inverted: true
                    }
                },
                chartCommonOptions,
                {
                    series: this.data
                }
            );
            options.xAxis.categories = dataOrder;

            chart = new Provider(options);

            this.instance = chart;
        };

        Chart.prototype.destroy = function() {
            this.instance.destroy();
        };

        return Chart;
    }
);