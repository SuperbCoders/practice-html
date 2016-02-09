$(function ($) {

    $('.chosen-select').chosen({
        width: "100%",
        disable_search_threshold: 3
    }).on('liszt:showing_dropdown', function (evt, params) {

        $('.chosen-select');

        var firedEl = $(evt.currentTarget);

        var niceScrollBlock = firedEl.next('.chzn-container').find('.chzn-results');

        if (niceScrollBlock.getNiceScroll().length) {
            niceScrollBlock.getNiceScroll().resize().show();
        } else {
            niceScrollBlock.niceScroll({
                //cursorcolor : "#5c9942",
                cursorwidth: 4,
                cursorborderradius: 2,
                cursorborder: 'none',
                bouncescroll: false,
                autohidemode: false,
                horizrailenabled: false,
                railsclass: firedEl.data('rails_class'),
                railpadding: {top: 0, right: 0, left: 0, bottom: 0}
            });
        }

    }).on('liszt:hiding_dropdown', function (evt, params) {
        var firedEl = $(evt.currentTarget);

        var niceScrollBlock = firedEl.next('.chzn-container').find('.chzn-results');

        niceScrollBlock.getNiceScroll().hide();

        //if (firedEl.parents('.form_validate').length) firedEl.validationEngine('validate');

    });

    $.notify.addStyle('attach', {
        html: "<div>" +
        " <div class='clearfix'> <p>" +
        " <span class='title' data-notify-html='title'/>" +
        " <a href='#' class='attach_rm_cancel gl_link white_link'><span>отменить</span></a>" +  
        " </p></div>" +
        " </div>"
    });

    $('.rmAttachBtn').on('click', function () {

        $.notify({
            title: 'Фотография rentgen-10-12-2015.jpg удалена, '
        }, {
            style: 'attach',
            autoHide: false,
            clickToHide: false,
            className: 'removed',
            autoHideDelay: 5000
        });

        return false;
    });


});