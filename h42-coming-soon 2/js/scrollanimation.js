// scrollAnimation.js

$(document).ready(function () {
    $('#boton-arriba').click(function () {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#boton-arriba').slideDown(300);
        } else {
            $('#boton-arriba').slideUp(300);
        }
    });
});
