var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('.admin-add-fab');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});

var actionCell = function(id) {
    var html = [];
    html.push('<td>');
        html.push('<button class="crud-edit mdl-button mdl-js-button mdl-button--icon" data-id="' + id + '">');
            html.push('<i class="material-icons">edit</i>');
        html.push('</button>');
        html.push('<button class="crud-delete mdl-button mdl-js-button mdl-button--icon" data-id="' + id + '">');
            html.push('<i class="material-icons">delete</i>');
        html.push('</button>');
    html.push('</td>');

    return html.join('');
};

var regularCell = function(text) {
    return '<td class="mdl-data-table__cell--non-numeric">' + text + '</td>';
};

$(function(){
    var servicePath = $('.crud-table').data('path');
    var primaryKey  = $('.crud-table').data('pkey');
    var loadTable  = function(){
        $.get(config.api + servicePath, function(rows) {
            var tbody = [];
            $('.crud-table tbody').remove();
            for (var i = 0; i < rows.length; i++) {
                row = rows[i];
                tbody.push('<tr>');
                    for (var key in row) {
                        if(key == primaryKey) { continue; }
                        tbody.push(regularCell(row[key]));
                    }
                    tbody.push(actionCell(row[primaryKey]));
                tbody.push('</tr>');
            }
            $("<tbody/>", {
                html: tbody.join('')
            }).appendTo('.crud-table');
        });
    };
    loadTable();

    $('.button-add').click(function(){
        $.post(config.api + servicePath, $('.crud-form').serialize(), function(data) {
            if(primaryKey in data) {
                if(dialog.open) { dialog.close(); }
                console.log('reg agregado');
                loadTable();
            }
        });
    });

    $('body').on('click', '.crud-delete', function(){
        id = $(this).data('id');
        if(confirm('¿Está seguro que desea borrar el registro?')) {
            $.ajax({
                url: config.api + servicePath + '/' + id,
                type: 'DELETE',
                success: function(data) {
                    if(data == 1) {
                        console.log('borrado');
                        loadTable();
                    }
                }
            });
        }
    });

});