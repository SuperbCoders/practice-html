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


    if ($('.chosen-select').length) {

        body_var
            .delegate('.chosen_multiple_v1 .result-selected', 'click', function () {
                var firedEl = $(this);

                if (!firedEl.hasClass('highlighted')) {
                    var link = firedEl.closest('.chzn-container ').find('.chzn-choices .search-choice-close[data-option-array-index=' + (1 + firedEl.index()) + ']');

                    //firedEl.closest('.chzn-container').prev('.chosen-select').find('option').eq(1 + firedEl.index()).removeAttr('selected');

                    //firedEl.closest('.chzn-container').prev('.chosen-select').trigger('chosen:updated').trigger('chosen:open');

                    //console.log(link);

                    //link.click();

                }


            })
            .delegate('.chzn-choices-arrow', 'click', function (e) {
                //e.stopPropagation();
                //e.preventDefault();
                
                //return false;
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
                var slct = $(e.target), slct_val = slct.val(), chzn_container = slct.next('.chzn-container').find('.chzn-choices'), days = '';

                //slct.find('option').each(function (ind) {
                //    console.log(this.value);
                //    if (!$.inArray(this.value.toString(), slct_val)) {
                //        console.log($(this).data('title'));
                //    }
                //});

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
                }


            }).chosen({
                autohide_results_multiple: false,
                //allow_single_deselect: true,
                width: "100%",
                className: "form_o_b_item form_o_b_value_edit_mode"
            });

    }

    fix_tab_header();

});


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