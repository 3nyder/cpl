$(function() {
    var snackbarContainer = document.querySelector('#login-toast');

    $('form:first *:input[type!=hidden]:first').focus();

    $("#form-login input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#form-login").submit();
        }
    });

    $('.login-button').click(function(event){
        event.preventDefault();
        $("#form-login").submit();
    });

    $("#form-login").submit(function(event){
        event.preventDefault();

        $.post(config.api + '/login', $( "#form-login" ).serialize(), function(data){
            if('error' in data) {
                snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Usuario o contraseña incorrectos'});
            } else if('success' in data) {
                document.location.href = 'courses.html';
            }
        });

    });

});