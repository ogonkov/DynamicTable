define(
    [
        'backbone'
    ],
    function (Backbone) {
        var CompareView;

        CompareView = Backbone.View.extend({
            initialize: function () {
                this.listenTo(this.collection, 'change:isSelected', this.toggle);
            },

            events: {
                click: 'compare'
            },

            attributes: {
                title: 'Compare selected metrics'
            },

            toggle: function () {
                var selected;

                selected = this.collection.getSelected().length;

                if (selected >= 2) {
                    this.el.removeAttribute('disabled');
                } else {
                    this.el.setAttribute('disabled', true);
                }
            },

            compare: function() {
                app.vent.trigger('data:compare', {
                    data: this.collection.getSelected()
                });
            }
        });

        return CompareView;
    }
);