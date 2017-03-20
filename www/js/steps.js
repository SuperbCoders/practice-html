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

    $('.manageSubRecordPopup').on('click', function () {
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

    $('.openSubRecordAdd').on('click', function () {
        addSubRecordPopup.dialog('open');
        return false;
    });

    $('.selectRecordName').on('click', function () {
        var name = $(this);

        name.closest('.recordName').find('input').val(name.text());

        return false;
    });

    $('body').delegate('.subRecordTitle', 'keydown', function (e) {
        var inp = $(this);

        if (!inp.val().length && e.keyCode == 8) {
            inp.closest('.new_appointment_block').remove();
        }

    });

    $('.addSubRecordBlock').on('click', function () {
        var docScroll = doc.scrollTop(), newSubRecord = $('<div class="new_appointment_block"><div class="input_w"><input class="form_input input_v10 subRecordTitle" placeholder="Новая запись" value="' + $(this).text() + '"></div><div class="input_w"><textarea class="form_input input_v11 autoSize" placeholder="Текст записи"></textarea></div></div>');

        $('.appointmentControls').before(newSubRecord);

        //newSubRecord.find('textarea').focus();

        docScrollTo(docScroll + newSubRecord.height() + 76, 0);

        return false;
    });

    $('.applySubRecord').on('click', function () {
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

    $('.autoSize').each(function (ind) {
        autoSize(this);
    });

});

