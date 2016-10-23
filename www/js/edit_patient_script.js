$(function ($) {


    $('.addTolist').on('click', function () {
        var firedEl = $(this), newValInput = firedEl.closest('.writeCtrl').removeClass('show_custom_field').find('.addParamVal');

        var newVal = newValInput.val();

        newValInput.val('');

        if (newVal.length) {
            var slct = firedEl.closest('.writeCtrl').find(".paramSelect");

            slct.find("option[data-action='custom']").before($('<option value="' + newVal + '">' + newVal + '</option>'));

            slct.trigger('chosen:updated');
        }

        return false;
    });


    $('.chosen-select').on('chosen:showing_dropdown', function (evt, params) {

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

    }).on('chosen:hiding_dropdown', function (evt, params) {
        var firedEl = $(evt.currentTarget);

        var niceScrollBlock = firedEl.next('.chzn-container').find('.chzn-results');

        niceScrollBlock.getNiceScroll().hide();

        //if (firedEl.parents('.form_validate').length) firedEl.validationEngine('validate');

    }).on('change', function () {
        var firedEl = $(this);

        firedEl.closest('.writeCtrl').toggleClass('show_custom_field', firedEl.find('option:selected').attr('data-action') == 'custom');

        return false;
    }).chosen({
        //allow_single_deselect: true,
        width: "100%",
        disable_search_threshold: 3
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

        var firedEl = $(this).closest('.attach_item');

        firedEl.addClass('removed');

        setTimeout(function () {

            firedEl.hide();

            $.notify({
                title: 'Фотография rentgen-10-12-2015.jpg удалена, '
            }, {
                style: 'attach',
                autoHide: true,
                clickToHide: false,
                arrowShow: false,
                className: 'removed',
                showAnimation: 'slideDown',
                // show animation duration
                showDuration: 400,
                // hide animation
                hideAnimation: 'slideUp',
                // hide animation duration
                hideDuration: 200,
                autoHideDelay: 5000,
                destroyDelay: 500,
                onShow: function (e) {
                    e.wrapper.parent().find('.notifyjs-wrapper:gt(2)').addClass('closed');

                    setTimeout(function () {
                        e.wrapper.addClass('opened');
                    }, 3);
                },
                beforeHide: function (e) {
                    e.wrapper.addClass('closed');
                }
            });

        }, 800);


        return false;
    });


});