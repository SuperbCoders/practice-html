var profile_tabs,
    profile_tabs_swiper,
    tabHeaderSpacer,
    appointmentForm,
    changeReceptionForm,
    subRecordPopup,
    tabHeader;

$(function ($) {

    body_var.delegate('.cardOverview', 'click', function (e) {
        var firedEl = $(e.target);

        // console.log(firedEl.hasClass('chzn*') || !!firedEl.parents('.chzn*').length);

        if (firedEl.hasClass('skipOpen') || !!firedEl.parents('.skipOpen').length) {

        } else {
            $(this).toggleClass('open_card');
            return false;
        }
    });

    $(".fancybox").fancybox({
        //openEffect: 'none',
        //closeEffect: 'none',
        padding: 0,
        //width : 500,
        //height : 500

        fitToView: true,
        autoSize: true,
        closeClick: true,

        helpers: {
            title: {
                type: 'inside'
            },
            overlay: {
                locked: false

                //showEarly: false
            }
        },
        afterLoad: function () {
            this.title = (this.index + 1) + '/' + this.group.length + (this.title ? ' - ' + this.title : '');
        }
    });

    $('.openMenu').on('click', function () {
        html_var.addClass('menu_open');
        return false;
    });

    $('.closeMenu').on('click', function () {
        html_var.removeClass('menu_open aside_open');
        return false;
    });

    body_var.delegate('.cardAsideOverview', 'click', function (e) {
        var firedEl = $(e.target);

        if (firedEl.hasClass('skipOpen') || !!firedEl.parents('.skipOpen').length) {

        } else {
            html_var.addClass('aside_open');
            return false;
        }
    });

    var tabBlock = $('.tabBlock');

    tabBlock.tabs({
        active: 0,
        tabContext: tabBlock.data('tab-context'),
        activate: function (e, u) {

        }
    });

    $('#first_run_schedule').dialog({
        autoOpen: false,
        modal: true,
        width: 325,
        closeText: '',
        appendTo: '.wrapper',
        dialogClass: "dialog_v2 dialog_close_butt_mod_1 dialog_yellow",
        open: function (event, ui) {
            body_var.addClass('overlay_v2');
        },
        close: function (event, ui) {
            body_var.removeClass('overlay_v2');
        }
    });

    $('#promo').dialog({
        autoOpen: false,
        modal: true,
        width: 380,
        closeText: '',
        appendTo: '.wrapper',
        dialogClass: "dialog_v2 msg_form_2 dialog_close_butt_mod_1 dialog_blue",
        open: function (event, ui) {
            body_var.addClass('overlay_v2');
        },
        close: function (event, ui) {
            body_var.removeClass('overlay_v2');
        }
    });

    appointmentForm = $('#appointment_form').dialog({
        autoOpen: false,
        modal: true,
        width: 920,
        closeText: '',
        appendTo: '.wrapper',
        dialogClass: "dialog_v3 appointment_form_2 dialog_close_butt_mod_2 always_open",
        open: function (event, ui) {
            body_var.addClass('overlay_v3');
        },
        close: function (event, ui) {
            body_var.removeClass('overlay_v3');
        }
    });

    $('.openAppointmentForm').on ('click', function () {
        appointmentForm.dialog('open');
        return false;
    });

    body_var.delegate('.write2Card', 'click', function (e) {

        html_var.addClass('edit_patient');

        var firedEl = $(this),
            avatarCatcher = $('.avatarCatcher'),
            patient_list = firedEl.closest('.patients_list'),
            patient_card = firedEl.closest('.patient_unit'),
            avatar_clone = $('<li class="avatar_clone" />').append(patient_card.find('.patient_avatar').clone().removeClass('skipOpen write2Card').addClass('cardAsideOverview')),
            patient_card_clone = patient_card.clone();

        avatarCatcher.empty();

        var oldTop = patient_card.offset().top - avatarCatcher.offset().top,
            oldLeft = patient_card.offset().left - avatarCatcher.offset().left - avatarCatcher.outerWidth() / 2;

        patient_card_clone.css({
            width: patient_card.outerWidth(),
            height: patient_card.outerHeight(),
            '-webkit-transform': 'translate(' + oldLeft + 'px , ' + oldTop + 'px)',
            '-ms-transform': 'translate(' + oldLeft + 'px , ' + oldTop + 'px)',
            'transform': 'translate(' + oldLeft + 'px , ' + oldTop + 'px)',
            top: 0,
            left: '50%'
        });

        var newTop = 0,
            newLeft = avatarCatcher.outerWidth();

        avatarCatcher.prepend(patient_card_clone.addClass('card_edit'));

        setTimeout(function () {
            patient_card_clone.addClass('go_to_avatar');
            body_var.removeClass('body_gray');
        }, 10);

        setTimeout(function () {
            avatarCatcher.empty();
            avatarCatcher.prepend(avatar_clone);
            $('#open_edit').click();
        }, 1020);

        patient_card_clone.css({
            //width: 40,
            //height: 40,
            //'-webkit-transform': 'translate(' + newLeft + 'px , ' + newTop + 'px)',
            //'-ms-transform': 'translate(' + newLeft + 'px , ' + newTop + 'px)',
            //'transform': 'translate(' + newLeft + 'px , ' + newTop + 'px)'
        });

        return false;
    });

    $('.saveCard').on('click', function () {
        html_var.removeClass('edit_patient');
        $('#open_read').click();
        return false;
    });

    $('.addAppointment').on('click', function () {
        appointmentForm.dialog('close');
        return false;
    });

    $('.printCard').on('click', function () {
        printCard();
        return false;
    });

    /*
     $('.chosen-select').chosen({
     //allow_single_deselect: true,
     width: "100%",
     disable_search_threshold: 3
     }).on('chosen:showing_dropdown', function (evt, params) {

     console.log(evt, params);

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

     }).on('chosen:hiding_dropdown', function (evt, params) {
     var firedEl = $(evt.currentTarget);

     var niceScrollBlock = firedEl.next('.chzn-container').find('.chzn-results');

     niceScrollBlock.getNiceScroll().hide();

     //if (firedEl.parents('.form_validate').length) firedEl.validationEngine('validate');

     });*/


});

function printCard(param) {
    var url = "print_card.html";
    var windowParams = "menubar=no,location=yes,resizable=yes,scrollbars=no,status=no,width=500,height=400";
    window.open(url, "Print", windowParams);
}