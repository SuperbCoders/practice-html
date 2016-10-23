var html_var,
    body_var,
    doc,
    login_form,
    recovery_form,
    recovery_success_form,
    reg_success_form,
    global_window_Height,
    popupOrderItem,
    notificationTimer,
    notificationBtn,
    notificationDropdown,
    controlPanelBtn;

$(function ($) {

    body_var = $('body');
    html_var = $('html');
    notificationBtn = $('.notificationBtn');
    notificationDropdown = $('.notificationDropdown');
    doc = $(document);
    global_window_Height = $(window).height();
    popupOrderItem = $('.popup_order_item');
    controlPanelBtn = $('.controlPanelBtn');


    /*
     var header = $('.header'), doc = $(document),
     browserWindow = $(window);

     browserWindow.on('scroll', function () {
     var scrollLeft = doc.scrollLeft();
     header.css('marginLeft', (scrollLeft > 0 ? -scrollLeft : 0));
     });
     */

    var inputEvents = 'keyup,keypress,focus,blur,change'.split(',');

    for (var i in inputEvents) $('.checkEmpty').on(inputEvents[i], function (e) {
        var checkBlock = $(this).closest('.checkEmptyBlock'),
            checkArr = checkBlock.find('.checkEmpty'), isReady = true;

        for (var j = 0; j < checkArr.length; j++) {
            if (!checkArr.eq(j).val().length) {
                isReady = false;
                break;
            }
        }

        if (isReady) {
            checkBlock.find('.disableEmpty').removeClass('disabled_btn_gray');
            checkBlock.find('.disableEmpty').addClass('yellow_black_btn');
        } else {
            checkBlock.find('.disableEmpty').addClass('disabled_btn_gray');
            checkBlock.find('.disableEmpty').removeClass('yellow_black_btn');
        }

    });

    login_form = $('#login_form').dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        dialogClass: "dialog_v1 no_close_mod login_form",
        open: function (event, ui) {

            console.log('open');
        },
        close: function (event, ui) {

            console.log('close');
        }
    });

    recovery_form = $('#recovery_form').dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        dialogClass: "dialog_v1 no_close_mod login_form",
        open: function (event, ui) {

            console.log('open');
        },
        close: function (event, ui) {

            console.log('close');
        }
    });

    recovery_success_form = $('#recovery_success_form').dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        dialogClass: "dialog_v1 no_close_mod login_form",
        open: function (event, ui) {

            console.log('open');
        },
        close: function (event, ui) {

            console.log('close');
        }
    });

    reg_success_form = $('#reg_success_form_2').dialog({
        autoOpen: false,
        modal: true,
        width: 380,
        dialogClass: "dialog_v1 no_close_mod dialog_green_2 msg_form_2 ",
        open: function (event, ui) {
            body_var.addClass('overlay_v2');
        },
        close: function (event, ui) {
            body_var.removeClass('overlay_v2');
        }
    });

    if ($("#change_reception_time").length) {
        $("#change_reception_time").datepicker({
            firstDay: 1,
            // changeMonth: true,
            // changeYear: true,
            yearRange: '1920:2016',
            dateFormat: 'd MM',
            showOn: 'focus',
            //changeYear: $changeYear,
            defaultDate: +1,
            numberOfMonths: 1,
            showOtherMonths: true,
            unifyNumRows: true,
            //buttonImage: $buttonImage,
            //showOn: "both",
            nextText: '',
            prevText: '',
            monthNames: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
            monthNamesShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            beforeShow: function (inp, dp) {
                
                $(inp).parent().addClass('dp_opened');

                $(dp.dpDiv).addClass('change_time_mod');

            },
            onClose: function (inp, dp) {
                console.log(inp, dp);
                $(dp.input).parent().removeClass('dp_opened');
            }
        });


        changeReceptionForm = $('#change_reception_form').dialog({
            autoOpen: false,
            modal: true,
            width: 240,
            dialogClass: "no_close_mod "
        });

        $('.changeReceptionTime').on('click', function (jsEvent) {
            var firedEl = $(this), target = firedEl;

            changeReceptionForm.dialog("option", "position", {
                my: "left bottom-25",
                at: 'right center',
                of: target,
                collision: "flip flip",
                // within: firedEl.parent(),
                using: function (obj, info) {
                    var dialog_form = $(this), koef = 15;

                    if (target.offset().top - obj.top < 25) {
                        dialog_form.addClass("flipped_top");
                        koef = 0;

                        if (target.hasClass('patient_btn')) {
                            koef = 40;
                        }

                    } else {
                        dialog_form.removeClass("flipped_top");
                    }

                    dialog_form.css({
                        opacity: 0,
                        left: (target.offset().left + (target.width() - dialog_form.width()) / 2) + 'px',
                        top: (obj.top - target.height() + koef + 20) + 'px'
                    });

                    setTimeout(function () {
                        dialog_form.animate({opacity: 1, top: (obj.top - target.height() + koef + 10)}, 200);
                    }, 5);

                }
            }).dialog('open');

            return false;
        });
    }

    $('.openLogin').on('click', function () {

        login_form.dialog('open');

        return false;
    });

    $('.openRegSuccess').on('click', function () {

        reg_success_form.dialog('open');

        return false;
    });

    $('.openRecovery').on('click', function () {

        recovery_form.dialog('open');

        return false;
    });

    $('.openRecoverySuccess').on('click', function () {

        recovery_success_form.dialog('open');

        return false;
    });

    body_var.on('click', function (e) {
        if (!($(e.target).hasClass('notificationBtn') || $(e.target).hasClass('notificationDropdown') || $(e.target).closest('.notificationDropdown').length)) {
            notificationBtn.parent().removeClass('notification_open');
        }

        html_var.removeClass('user_menu_open');
    });

    notificationBtn.on('click', function () {
        notificationBtn.parent().toggleClass('notification_open');
    }).on('mouseleave', function () {
        //clearTimeout(notificationTimer);
        //
        //notificationTimer = setTimeout(function () {
        //    notificationBtn.parent().removeClass('notification_open');
        //}, 1000);

    });

    notificationDropdown.on('mousemove', function () {
        //clearTimeout(notificationTimer);
        //notificationBtn.parent().removeClass('notification_open');
        //notificationDropdown.addClass('open');
    }).on('mouseleave', function () {
        //clearTimeout(notificationTimer);
        //
        //notificationTimer = setTimeout(function () {
        //    notificationDropdown.removeClass('open');
        //}, 300);

    });

    $('.passBtn').on('click', function () {
        $(this).hide();
        $('.passForm').show().find('.passInput').focus();
        return false;
    });

    $('.passCancelBtn , .passSaveBtn').on('click', function () {
        $('.passForm').hide();
        $('.passBtn').show();
        return false;
    });

    $('.openMenu').on('click', function () {
        html_var.addClass('menu_open');
        return false;
    });

    $('.userMenu').on('click', function () {
        html_var.toggleClass('user_menu_open');
        return false;
    });

    $('.closeMenu').on('click', function () {
        html_var.removeClass('menu_open aside_open');
        console.log('closeMenu');

        return false;
    });


    $('.chosen-select').each(function (ind) {
        $(this).chosen({
            //allow_single_deselect: true,
            width: "100%",
            disable_search_threshold: 3
        }).on('chosen:showing_dropdown', function (evt, params) {

            var firedEl = $(evt.currentTarget);

            var niceScrollBlock = firedEl.next('.chzn-container').find('.chzn-results');

            if (niceScrollBlock.getNiceScroll().length) {
                niceScrollBlock.getNiceScroll().resize().show();
            } else {

                console.log(firedEl.data('rails_class'));

                niceScrollBlock.niceScroll({
                    cursorwidth: 4,
                    cursorborderradius: 2,
                    cursorborder: 'none',
                    bouncescroll: false,
                    autohidemode: false,
                    horizrailenabled: false,
                    railsclass: firedEl.data('rails_class'),
                    railpadding: {top: 0, right: firedEl.data('rails_r') || 0, left: 0, bottom: 0}
                });
            }
        }).on('chosen:hiding_dropdown', function (evt, params) {
            var firedEl = $(evt.currentTarget);

            var niceScrollBlock = firedEl.next('.chzn-container').find('.chzn-results');

            niceScrollBlock.getNiceScroll().hide();
        });
    });

    all_dialog_close();

});

$(window).on('load', function () {

    setTimeout(function () {
        $('.preloader').fadeOut(800);
    }, 800);

});

function all_dialog_close() {
    body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl() {
    $(".ui-dialog-content").each(function () {
        var $this = $(this);
        if (!$this.parent().hasClass('always_open')) {
            $this.dialog("close");
        }
    });
}