var profile_tabs,
    profile_tabs_swiper,
    tabHeaderSpacer,
    tabHeader;

$(function ($) {

    $('body').delegate('.patient_card', 'click', function (e) {
        var firedEl = $(e.target);

        console.log(firedEl.hasClass('chzn*') || !!firedEl.parents('.chzn*').length);
        
        if (firedEl.hasClass('skipOpen') || !!firedEl.parents('.skipOpen').length) {

        } else {
            $(this).toggleClass('open_card');
            return false;
        }

    });


    $('.chosen-select').chosen({
        width: "100%",
        disable_search_threshold: 3
    }).on('liszt:showing_dropdown', function (evt, params) {

        //$('.chosen-select')

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


});

