var profile_tabs,
    profile_tabs_swiper,
    tabHeaderSpacer,
    tabHeader;

$(function ($) {

    $("#patient_age").datepicker({
        firstDay: 1,
        changeMonth: true,
        changeYear: true,
        yearRange: '1920:2016',
        dateFormat: 'dd / mm / yy',
        //changeYear: $changeYear,
        defaultDate: +1,
        numberOfMonths: 1,
        showOtherMonths: true,
        unifyNumRows: true,
        //buttonImage: $buttonImage,
        //showOn: "both",
        nextText: '',
        prevText: '',
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
    });

    $('.chosen-select').chosen({
        width: "100%",
        disable_search_threshold: 3
    }).on('chosen:showing_dropdown', function (evt, params) {
       
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

    });

});

