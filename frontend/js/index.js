$(function(){

    var $divCourses = $('#cpl-courses');
    var $nav = $('nav');

    function closeCoursesDiv() {
        if($('#cpl-courses').parent().hasClass('open')) {
            $('#cpl-courses').siblings('.collapsible-title').click();
        }
    }


    $.getJSON(config.api + '/courses', function(data) {
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
        var course_name = $(this).closest('.course-card').find('h4').text();
        $('.course-title h5').text(course_name);
        $('#cpl-selected-course').empty();

        $.getJSON(config.api + '/courses/'+idcourse+'/lessons', function(data) {
            var lessons = [];

            for (var i = 0; i < data.length; i++) {
                var elem = data[i];
                lessons.push('<li class="mdl-list__item mdl-list__item--three-line">');
                    lessons.push('<span class="mdl-list__item-primary-content">');
                        if(elem.idlesson % 2 !== 0) {
                            lessons.push('<i class="material-icons mdl-list__item-avatar mdl-color-text--green-300">check</i>');
                        } else {
                            lessons.push('<i class="material-icons mdl-list__item-avatar mdl-color-text--red-300">close</i>');
                        }
                        lessons.push('<span>'+elem.lesson+'</span>');
                        lessons.push('<span class="mdl-list__item-text-body">'+elem.description+'</span>');
                    lessons.push('</span>');
                    lessons.push('<span class="mdl-list__item-secondary-content">');
                        lessons.push('<a class="mdl-list__item-secondary-action" href="/docs/test.pdf" download><i class="material-icons">file_download</i></a>');
                    lessons.push('</span>');
                    lessons.push('<span class="mdl-list__item-secondary-content">');
                        lessons.push('<a class="mdl-list__item-secondary-action open-modal-question" data-idlesson="'+elem.idlesson+'" href="#"><i class="material-icons">live_help</i></a>');
                    lessons.push('</span>');
                lessons.push('</li>');
            }

            $( "<ul/>", {
                "class": "mdl-list",
                html: lessons.join("")
            }).appendTo("#cpl-selected-course").promise().then(function(){
                $('.course-grid').show('slow');
            });

            closeCoursesDiv();

        });
    });

    $('body').on('click', 'a.open-modal-question', function() {
        var dialog = document.querySelector('dialog');
        dialog.showModal();
    });


    $('.collapsible-title').click(function(){
        var $this = $(this);
        $this.siblings('.collapsible-content').slideToggle('slow').promise().then(function(){
            $this.parent().toggleClass('open');
        });
    });

    $('.button-close').click(function(){
        $(this).closest('.course-grid').slideUp('slow').promise().then(function() {
            $('#cpl-courses').siblings('.collapsible-title').click();
        });
    });

});