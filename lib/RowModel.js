define(
    [
        'backbone'
    ],
    function (Backbone) {
        var RowModel;

        RowModel = Backbone.Model.extend({
            initialize: function () {
                this.on('needSelection', this.toggleSelected, this);
            },

            defaults: {
                isSelected: false
            },

            toggleSelected: function (options) {
                this.set('isSelected', options.isSelected);
            }
        });

        return RowModel;
    }
);