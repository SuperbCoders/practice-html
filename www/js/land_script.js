var header = $('.header'), doc = $(document),
    browserWindow = $(window);

$(function ($) {

    header = $('.header');
    doc = $(document);
    browserWindow = $(window);

    browserWindow.on('scroll', function () {
        header.toggleClass('_white', doc.scrollTop() > header.outerHeight());
    });

    $('.scrollTo').on('click', function () {
        var firedEl = $(this);

        console.log($((firedEl).attr('href')).offset().top);
        
        docScrollTo($((firedEl).attr('href')).offset().top - header.outerHeight(), 800);

        return false;
    });

});

function docScrollTo(pos, speed, callback) {

    $('html,body').animate({'scrollTop': pos}, speed, function () {
        if (typeof(callback) == 'function') {
            callback();
        }
    });
}