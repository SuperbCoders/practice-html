var profile_tabs,
    profile_tabs_swiper,
    open_chzn,
    tabHeaderSpacer,
    tabHeader;

$(function ($) {

    var tabBlock = $('.tabBlock');

    tabHeader = $('.tabHeader');
    tabHeaderSpacer = $('.tabHeaderSpacer');

    profile_tabs_swiper = new Swiper('.tabListScroller', {
        setWrapperSize: true,
        slidesPerView: 'auto',
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true,
        wrapperClass: 'tab_list',
        slideClass: 'tab_item',
        onInit: function (swiper) {
            profile_tabs = tabBlock.tabs({
                active: 0,
                tabContext: tabBlock.data('tab-context'),
                activate: function (e, u) {

                }
            });
        }
    });

    $('body').delegate('.cloneRowBtn', 'click', function () {
        var row = $(this).closest('.form_row'), clone = row.clone();

        row.after(clone);

        clone.find('input').val('');
        clone.find('label').text('');

        return false;
    });

    var inputEvents = 'keyup,keypress,focus,blur,change'.split(',');

    for (var i in inputEvents) $('.socPrefix').on(inputEvents[i], function (e) {

        //console.log(e.shiftKey, e.metaKey, e.altKey, e.ctrlKey, e);

        if (!(e.shiftKey || e.altKey || e.ctrlKey)) {
            var inp = $(this), inp_val = inp.val(), inp_prefix = inp.attr('data-prefix');
            var expr = new RegExp('^' + inp_prefix, 'ig');

            inp_val = inp_val.replace(expr, '');
            inp_val = inp_val.replace(/ /g, '');

            inp.val(inp_prefix + inp_val);
        }
    });


    if ($('.chosen-select').length) {

        body_var
            .delegate('.chosen_multiple_v1 .extra_control', 'click', function (e) {
                var firedEl = $(this);

                e.preventDefault();

                var chzn_container = firedEl.closest('.chzn-container '),
                    option_ind = firedEl.parents('.chzn_item').attr('data-option-array-index') * 1;

                firedEl.closest('.chzn-container').prev('.chosen-select')
                    .find('option[value=' + option_ind + ']').removeAttr('selected');

                updateDaysRow(chzn_container.prev('.chosen-select').trigger('chosen:updated'));

                return false;

            });

        $('.chosen-select')
            .on('chosen:ready', function (evt, params) {

                if (params.chosen.is_multiple) {
                    $(params.chosen.container).find('.chzn-choices').append($('<li class="chzn-choices-arrow" />'));
                }

            })
            .on('chosen:showing_dropdown', function (evt, params) {

                open_chzn = params.chosen;

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

            })
            .on('chosen:hiding_dropdown', function (evt, params) {

                open_chzn = null;

                var firedEl = $(evt.currentTarget);

                var niceScrollBlock = firedEl.next('.chzn-container').find('.chzn-results');

                niceScrollBlock.getNiceScroll().hide();

                //if (firedEl.parents('.form_validate').length) firedEl.validationEngine('validate');

            })
            .change(function (e) {
                updateDaysRow($(e.target));
            }).chosen({
                autohide_results_multiple: false,
                allow_single_deselect: true,
                width: "100%",
                className: "form_o_b_item form_o_b_value_edit_mode"
            });

    }

    fix_tab_header();

});

function updateDaysRow(slct) {
    var slct_val = slct.val(), chzn_container = slct.next('.chzn-container').find('.chzn-choices'), days = '';

    if (slct_val) {
        for (var i = 0; i < slct_val.length; i++) {
            days += ',' + slct.find('option[value=' + slct_val[i] + ']').attr('data-short')
        }

        days = days.replace(/^,/i, '');

        if (chzn_container.find('.chzn_rzlts').length) {
            chzn_container.find('.chzn_rzlts').text(days);
        } else {
            chzn_container.prepend($('<li class="chzn_rzlts" />').text(days));
        }
    } else {
        chzn_container.find('.chzn_rzlts').remove();
    }

}

function fix_tab_header() {

    if (doc.scrollTop() > 0) {
        tabHeaderSpacer.css('height', tabHeader.height());
        tabHeader.addClass('tab_header_fixed');
    } else {
        tabHeader.removeClass('tab_header_fixed');
        tabHeaderSpacer.css('height', tabHeader.height());
    }

}


$(window).on('scroll', function () {

    fix_tab_header();

}).on('resize', function () {

    fix_tab_header();

});