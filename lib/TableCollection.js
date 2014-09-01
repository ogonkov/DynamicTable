define(
    [
        'backbone',
        'RowModel'
    ],
    function (Backbone, RowModel) {
        var TableCollection, url;

        url = 'https://gist.githubusercontent.com/heydiplo/b1296495b5db998f0b4d/raw/' +
            'afb3efee16797b5fed44966370d0750eb1fe9e46/data.json';

        function flatten(response) {
            var flattered, flatteredModel;

            flattered = [];

            response.forEach(function (model) {
                flatteredModel = model.metrics;

                flatteredModel.id    = model.id;
                flatteredModel.title = model.title;

                flattered.push(flatteredModel);
            });

            flatteredModel = null;

            return flattered;
        }

        TableCollection = Backbone.Collection.extend({
            initialize: function() {
                this.on('change:isSelected', this.checkLimit, this);
            },

            model: RowModel,

            url: url,

            parse: function(response) {
                var data;

                data = flatten(response);

                return data;
            },

            checkLimit: function () {
                this.trigger('limit', {
                    limitReached: this.isLimited()
                });
            },

            isLimited: function() {
                var selected, limit;

                limit = 8;
                selected = this.getSelected();

                return (selected.length === limit);
            },

            getSelected: function () {
                return this.where({isSelected: true});
            }
        });

        return TableCollection;
    }
);