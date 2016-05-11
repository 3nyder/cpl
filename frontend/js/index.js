var base = 'http://localhost:3000';

$(function(){

    var $divCourses = $('.cpl-courses');
    var $nav = $('nav');


    $.getJSON(base+'/courses', function(data) {
        $divCourses.empty();
        $nav.empty();

        var cards = [];
        var nLink = [];
        for (var i = 0; i < data.length; i++) {
            var elem = data[i];
            cards.push('<div class="mdl-cell mdl-cell--4-col">');
                cards.push('<div class="course-card mdl-card mdl-shadow--2dp">');
                    cards.push('<div class="mdl-card__title mdl-card--expand">');
                        cards.push('<h4>'+elem.course+'</h4>');
                    cards.push('</div>');
                    cards.push('<div class="mdl-card__supporting-text">'+elem.description+'</div>');
                    cards.push('<div class="mdl-card__actions mdl-card--border">');
                        cards.push('<a data-idcourse="'+elem.idcourse+'" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">');
                            cards.push('Iniciar Curso');
                        cards.push('</a>');
                        cards.push('<div class="mdl-layout-spacer"></div>');
                        cards.push('<i class="material-icons">library_books</i>');
                    cards.push('</div>');
                cards.push('</div>');
            cards.push('</div>');

            nLink.push('<a class="mdl-navigation__link" data-idcourse="'+elem.idcourse+'">'+elem.course+'</a>');
        }

        $divCourses.append(cards.join(""));
        $nav.append(nLink.join(""));
    });

    $('body').on('click', '.course-card a', function() {
        var idcourse = $(this).data('idcourse');
        $.getJSON(base+'/courses/'+idcourse+'/lessons', function(data) {
            var lessons = [];

            for (var i = 0; i < data.length; i++) {
                var elem = data[i];
                lessons.push('<li class="mdl-list__item">');
                    lessons.push('<span class="mdl-list__item-primary-content">');
                        lessons.push(elem.lesson);
                    lessons.push('</span>');
                lessons.push('</li>');
            }

            $( "<ul/>", {
                "class": "mdl-list",
                html: lessons.join("")
            }).appendTo(".cpl-content");

        });
    });

});