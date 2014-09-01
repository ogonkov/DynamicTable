define(
    [
        'backbone',
        'TableCollection',
        'RowView'
    ],
    function (Backbone, TableCollection, Row) {
        var TableView;

        TableView = Backbone.View.extend({
            constructor: function(options) {
                options = options || {};

                this.fragment = document.createDocumentFragment();
                this.limitReached = false;

                if (!options.collection) {
                    options.collection = new TableCollection();
                }

                Backbone.View.call(this, options);
            },

            tagName: 'table',

            initialize: function() {
                this.listenTo(this.collection, 'add', this.addItem);
                this.listenTo(this.collection, 'sync', this.render);
            },

            addItem: function (model) {
                var item;

                item = new Row({
                    model: model
                });

                this.fragment.appendChild(item.render().el);
            },

            render: function() {
                this.body = this.el.querySelector('tbody');

                this.body.appendChild(this.fragment);
                this.fragment = null;

                return this;
            }
        });

        return TableView;
    }
);