define(
    [
        'backbone',
        'options'
    ],
    function (Backbone, options) {
        var RowView, tableDataElement, order;

        tableDataElement = document.createElement('td');
        order = options.order;

        RowView = Backbone.View.extend({
            initialize: function() {
                this.disabled = false;

                this.listenTo(this.model.collection, 'limit', this.disableSelection);
            },

            tagName: 'tr',

            events: {
                'click input': 'select'
            },

            select: function() {
                this.model.trigger('needSelection', {
                    isSelected: this.control.checked
                });
            },

            disableSelection: function(options) {
                var disabled;

                disabled = this.disabled;

                if (options.limitReached && !disabled && !this.model.get('isSelected')) {
                    this.control.setAttribute('disabled', true);
                    this.disabled = true;
                } else if (disabled) {
                    this.control.removeAttribute('disabled');
                    this.disabled = false;
                }
            },

            addCell: function(id) {
                var cell;

                cell = tableDataElement.cloneNode();
                cell.textContent = this.model.get(id);

                this.el.appendChild(cell);
            },

            addSelectionControl: function() {
                var control, isSelected;

                isSelected = this.model.get('isSelected');
                control = tableDataElement.cloneNode();

                control.innerHTML = '<input type="checkbox">';
                control.setAttribute('title', 'Select metric for comparison');

                this.el.appendChild(control);


                this.control = this.el.querySelector('input');

                if (isSelected) {
                    this.control.checked = isSelected;
                }
            },

            render: function () {
                this.addSelectionControl();

                order.forEach(this.addCell, this);

                return this;
            }
        });

        return RowView;
    }
);