"use strict";

$(function () {
    let app = new Vue({
        el: "#app",
        components: {
            'table-team': TableTeams,
            'table-drivers': TableDrivers
        },
        data: {
            data: [],
            dataRequired: '',
            disableButtons: false
        },
        methods: {
            request: function (uri) {
                this.disableButtons = true;
                this.data = [];
                this.dataRequired = uri;
                $.getJSON('/api/' + uri)
                    .done(data => {
                        console.log(data);
                        app.data = data;
                    })
                    .fail((jqxhr, textStatus, error) => {
                        console.log(jqxhr, textStatus, error);
                    })
                    .always(() => this.disableButtons = false);
            }
        }
    });

    
});