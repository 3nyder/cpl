var base = 'http://localhost:3000';

$(function(){

    var $divContent = $('.cpl-content');
    var $nav = $('nav');


    $.getJSON(base+'/courses', function(data) {
        $divContent.empty();
        $nav.empty();

        var cards = "";
        var nLink = "";
        for (var i = 0; i < data.length; i++) {
            var elem = data[i];
            cards += '<div class="mdl-cell mdl-cell--4-col">';
                cards += '<div class="course-card mdl-card mdl-shadow--2dp">';
                    cards += '<div class="mdl-card__title mdl-card--expand">';
                        cards += '<h4>'+elem.course+'</h4>';
                    cards += '</div>';
                    cards += '<div class="mdl-card__supporting-text">'+elem.description+'</div>';
                    cards += '<div class="mdl-card__actions mdl-card--border">';
                        cards += '<a data-idcourse="'+elem.idcourse+'" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">';
                            cards += 'Iniciar Curso';
                        cards += '</a>';
                        cards += '<div class="mdl-layout-spacer"></div>';
                        cards += '<i class="material-icons">library_books</i>';
                    cards += '</div>';
                cards += '</div>';
            cards += '</div>';

            nLink += '<a class="mdl-navigation__link" data-idcourse="'+elem.idcourse+'">'+elem.course+'</a>';
        }

        $divContent.append(cards);
        $nav.append(nLink);
    });

});