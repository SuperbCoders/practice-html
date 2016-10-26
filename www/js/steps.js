var subRecordPopup, addSubRecordPopup;

$(function ($) {

    subRecordPopup = $('#subrecord_popup').dialog({
        autoOpen: false,
        modal: true,
        width: 480,
        closeText: '',
        appendTo: '.wrapper',
        dialogClass: "dialog_v4 subrecord_popup always_open dialog_close_butt_mod_1",
        open: function (event, ui) {
            body_var.addClass('overlay_v4');
        },
        close: function (event, ui) {
            body_var.removeClass('overlay_v4');
        }
    });

    $('.manageSubRecordPopup').on ('click', function () {
        subRecordPopup.dialog('open');
        return false;
    });

    addSubRecordPopup = $('#add_subrecord_popup').dialog({
        autoOpen: false,
        modal: true,
        width: 700,
        closeText: '',
        appendTo: '.wrapper',
        dialogClass: "dialog_v5 add_subrecord_item always_open dialog_close_butt_mod_3",
        open: function (event, ui) {
            body_var.addClass('hide_subrecord_popup');
        },
        close: function (event, ui) {
            body_var.removeClass('hide_subrecord_popup');
        }
    });

    $('.openSubRecordAdd').on ('click', function () {
        addSubRecordPopup.dialog('open');
        return false;
    });

    $('.applySubRecord').on ('click', function () {
        var sabRecordItem = $('#new_saubrecord_item');
        $('.addMarker').before($('<li>' + sabRecordItem.val() + '</li>'));
        addSubRecordPopup.dialog('close');
        sabRecordItem.val('').removeClass('not_empty');
        return false;
    });

    $('.checkEmpty').on('keyup blur', function (e) {
        var firedEl = $(this);

        if (firedEl.val().length) {
            firedEl.addClass('not_empty');
        } else {
            firedEl.removeClass('not_empty');
        }

    });
});

