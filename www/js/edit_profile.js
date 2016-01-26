var profile_tabs,
    profile_tabs_swiper,
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
        $('.chosen-select').chosen({
            width: "100%",
            className: "form_o_b_item form_o_b_value_edit_mode"
        }).change(function (e) {
            var slct = $(e.target), slct_val = slct.val(), chzn_container = slct.next('.chzn-container').find('.chzn-choices'), days = '';

            //slct.find('option').each(function (ind) {
            //    console.log(this.value);
            //    if (!$.inArray(this.value.toString(), slct_val)) {
            //        console.log($(this).data('title'));
            //    }
            //});

            for (var i = 0; i < slct_val.length; i++) {
                days += ',' + slct.find('option[value=' + slct_val[i] + ']').attr('data-short')
            }

            days = days.replace(/^,/i, '');

            if (chzn_container.find('.chzn_rzlts').length) {
                chzn_container.find('.chzn_rzlts').text(days);
            } else {
                chzn_container.prepend($('<li class="chzn_rzlts" />').text(days));
            }
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