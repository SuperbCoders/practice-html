var calendar,
    timelineInterval,
    add_patient_form,
    patient_info_form,
    newEventDate,
    win,
    calTimer,
    calendarHolder,
    regDate = moment('2016-01-12'),
//regDate = new Date(),
    dayArr = ['mon', 'tue', 'web', 'thu', 'fri', 'sat', 'sun']
    ;

$(function ($) {

    win = $(window);
    calendarHolder = $('.calendarHolder');

    add_patient_form = $('#add_patient_form').dialog({
        autoOpen: false,
        modal: true,
        width: 340,
        dialogClass: "dialog_v1 no_close_mod"
    });

    $('.checkEmpty').on('keydown blur', function (e) {
        var firedEl = $(this);

        if (firedEl.val().length) {
            firedEl.addClass('not_empty');
        } else {
            firedEl.removeClass('not_empty');
        }

    });


    body_var.delegate('.patient_card', 'click', function (e) {
        var firedEl = $(e.target), patient_card = $(this);

        if (firedEl.hasClass('skipOpen') || !!firedEl.parents('.skipOpen').length) {

        } else {
            patient_card.toggleClass('open_card');

            if (patient_card.closest('.popup_form')) {
                //console.log('repos');
            }

            return false;
        }

    }).delegate('.fc-widget-content', 'mouseenter', function (e) {
        var firedEl = $(e.target), patient_card = $(this);
        //console.log(e, firedEl);

    }).delegate('.fc-widget-content', 'mouseleave', function (e) {
        var firedEl = $(e.target), patient_card = $(this);
        //console.log(e, firedEl);

    });

    patient_info_form = $('#patient_info_form').dialog({
        autoOpen: false,
        modal: true,
        width: 360,
        appendTo: '.dayInfoBlock',
        dialogClass: "dialog_v1 no_close_mod no_title_mod",
        close: function (event, ui) {
            $('.event_open').removeClass('event_open');
        }
    });

    calendar = $('#calendar').fullCalendar({
        firstDay: 1,
        height: getCalendarHeight(),
        //height: 'auto',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'οюнь', 'οюль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'οюнь', 'οюль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesShort: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
        buttonText: {
            prev: " ",
            next: " ",
            prevYear: "Год назад",
            nextYear: "Год вперед",
            today: "Сегодня",
            month: "Месяц",
            twoweek: '2 week',
            week: "Неделя",
            day: "День"
        },

        header: {
            left: 'title',
            center: 'agendaDay,agendaWeek',
            right: 'prev,next'
        },
        columnFormat: {
            month: 'ddd',
            week: 'ddd, D',
            day: 'dddd, D'
        },
        titleFormat: {
            day: 'MMMM YYYY',
            week: 'MMMM YYYY'
        },

        //titleFormat: {
        //    twoweek: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}"
        //},
        //defaultView: 'twoweek',


        slotDuration: '00:30:00',
        timezone: 'local',
        defaultView: 'agendaDay',
        weekMode: 'fixed',
        //minTime: '06:30:00',
        //maxTime: '21:00:00',
        defaultDate: regDate,
        //businessHours: true, // display business hours
        editable: true,
        allDaySlot: false,
        slotLabelFormat: 'H:mm',
        timeFormat: 'H:mm',
        defaultEventMinutes: 60,

        viewRender: function (view, element) {
            calendarHolder.toggleClass('day_mode', 'agendaDay' == view.name);

            if (timelineInterval !== void 0) setTimeline();

        },

        eventMouseover: function (event, jsEvent, view) {
            //console.log(event, jsEvent, view);
        },

        dayClick: function (date, jsEvent, view) {

            //console.log(date, jsEvent, view);

            $(add_patient_form[0]).find('form')[0].reset();
            $(add_patient_form[0]).find('.newPatientBtn span').text('Записать на ' +
                date.format('DD') + ' ' + (date.format('MMMM')).toString().toLowerCase().replace(/.$/, 'я') + ', в ' + date.format('HH:mm'));

            newEventDate = date;
            console.log(jsEvent);
            add_patient_form.dialog("option", "position", {
                my: "left+15 top-150",
                of: jsEvent,
                collision: "flip fit",
                within: '.fc-view-container',
                using: function (obj, info) {

                    var dialog_form = $(this),
                        cornerY = jsEvent.pageY - obj.top - 40;

                    if (info.horizontal != "left") {
                        dialog_form.addClass("flipped_left");
                    } else {
                        dialog_form.removeClass("flipped_left");
                    }

                    dialog_form.css({
                        left: obj.left + 'px',
                        top: obj.top + 'px'
                    }).find('.form_corner').css({
                        top: Math.min(Math.max(cornerY, -20), dialog_form.height() - 55) + 'px'
                    });
                }
            }).dialog('open');
        },

        events: [
            {
                title: 'All Day Event',
                start: '2016-01-01'
            },
            {
                title: 'Long Event',
                start: '2016-01-07',
                end: '2016-01-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2016-01-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2016-01-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2016-01-11',
                end: '2016-01-13'
            },
            {
                title: 'Meeting',
                start: '2016-01-12T10:30:00',
                end: '2016-01-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2016-01-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2016-01-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2016-01-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2016-01-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2016-01-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2016-01-28'
            },

            {
                title: 'Самойлов Я.Г.',
                start: '2016-01-23T13:00:00',
                //constraint: 'businessHours',
                className: 'status_blue',
                allDay: false
            },
            {
                title: 'Meeting',
                start: '2016-01-14T11:00:00',
                end: '2016-01-14T14:00:00',
                className: 'status_red',
                allDay: false
            },
            {
                title: 'Meeting',
                start: '2016-01-15T11:00:00',
                end: '2016-01-15T14:00:00',
                className: 'status_orange',
                allDay: false
            },
            {
                title: 'Meeting',
                start: '2016-01-16T11:00:00',
                end: '2016-01-16T14:00:00',
                className: 'status_green',
                allDay: false
            },
            {
                title: 'Введите имя или телефон',
                start: '2016-01-16T16:00:00',
                end: '2016-01-16T18:00:00',
                className: 'status_violet'
            },
            {
                title: 'Ульянов К.С. test',
                start: '2016-01-13T11:00:00',
                //end: '2016-01-13T11:30:00',
                //constraint: 'availableForMeeting', // defined below
                className: 'status_blue',
                allDay: false
            },
            {
                title: 'Мурысева О.П.',
                start: '2016-01-18T10:00:00',
                end: '2016-01-18T14:00:00',
                className: 'status_red',
                allDay: false
            },
            {
                title: 'Осинцев К.С.',
                start: '2016-01-29T20:00:00',
                allDay: false
            },

            // areas where "Meeting" must be dropped
            //{
            //    id: 'availableForMeeting',
            //    start: '2016-01-11T09:00:00',
            //    end: '2016-01-11T16:00:00',
            //    rendering: 'background',
            //    allDay: false
            //},
            //{
            //    id: 'availableForMeeting',
            //    start: '2016-01-13T10:00:00',
            //    end: '2016-01-13T14:00:00',
            //    rendering: 'background',
            //    allDay: false
            //},

            // red areas where no events can be dropped
            {
                start: '2016-01-24T08:00:00',
                end: '2016-01-28T10:00:00',
                overlap: false,
                rendering: 'background',
                color: '#ff9f89',
                allDay: false
            },
            {
                start: '2016-01-06T10:00:00',
                end: '2016-01-08T10:15:00',
                overlap: false,
                rendering: 'background',
                color: '#ff9f89',
                allDay: false
            }
        ]
    });

    $('.chosen-select').chosen({
        width: "100%",
        disable_search_threshold: 3
    }).on('chosen:showing_dropdown', function (evt, params) {

        //$('.chosen-select');

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

    $('.newPatientBtn').on('click', function () {
        var newPatientState = $('.newPatientState');

        calendar.fullCalendar('renderEvent', {
            title: $('#new_patient_name').val() || 'Test',
            start: newEventDate.subtract(30, 'minutes'),
            end: newEventDate,
            className: newPatientState.find('option').eq(newPatientState.val()).attr('class').replace('state_pin', ''),
            allDay: false
        });

        add_patient_form.dialog('close');

        return false;
    });

    body_var.delegate('.fc-event', 'click', function (e) {
        var btn = $(this);

        btn.addClass('event_open');
        console.log(e);
        patient_info_form.dialog("option", "position", {
            my: "left+15 top-150",
            of: e,
            collision: "flip fit",
            within: '.fc-view-container',
            using: function (obj, info) {

                console.log(obj, info);
                
                var dialog_form = $(this),
                    cornerY = e.pageY - obj.top - 190;

                if (info.horizontal != "left") {
                    dialog_form.addClass("flipped_left");
                } else {
                    dialog_form.removeClass("flipped_left");
                }

                dialog_form.css({
                    left: (obj.left || 0) + 'px',
                    top: obj.top + 'px'
                }).find('.form_corner').css({
                    top: Math.min(Math.max(cornerY, -20), dialog_form.height() - 55) + 'px'
                });
            }
        }).dialog('open');
    });

    /*body_var.delegate('.fc-event', 'click', function (e) {
     var btn = $(this), form = $(add_patient_form[0]).find('form');

     form[0].reset();

     form.find('#new_patient_name').val(btn.find('.fc-title').text());
     form.find('.newPatientBtn').text('Сохранить');

     add_patient_form.dialog("option", "position", {
     my: "left+20 top-150",
     of: e,
     collision: "flip",
     within: '.fc-view-container',
     using: function (obj, info) {

     if (info.vertical != "top") {
     $(this).addClass("flipped_top");
     } else {
     $(this).removeClass("flipped_top");
     }
     if (info.horizontal != "left") {
     $(this).addClass("flipped_left");
     } else {
     $(this).removeClass("flipped_left");
     }

     $(this).css({
     left: obj.left + 'px',
     top: obj.top + 'px'
     });
     }
     }).dialog('open');
     });*/

    setTimeline();

    switchToAgendaDay();

});


$(window).resize(function () {
    clearTimeout(calTimer);

    calTimer = setTimeout(function () {
        console.log(getCalendarHeight());
        calendar.fullCalendar('option', 'height', getCalendarHeight());
    }, 3);

});

function getCalendarHeight() {

    var newHeight = (win.height() + (win.width() > 1200 ? 40 : -50) - $('.wrapper').css('paddingTop').replace('px', '') * 1);

    return Math.max(newHeight, 300);
}

function setTimeline() {
    var parentDiv = $(".fc-agenda-view");
    var slats = parentDiv.find(".fc-slats");
    var timeline = parentDiv.find(".timeline");

    if (timeline.length == 0) { //if timeline isn't there, add it
        timeline = $("<div />").addClass("timeline").append("<span />");
        parentDiv.find('.fc-slats').append(timeline);
    }

    var curTime = new Date();

    timeline.find('span').text(moment(curTime).format("HH:mm"));

    var curCalView = calendar.fullCalendar("getView"),
        dayEnd = (moment(0, 'HH')._d).toString().replace(/00:00:00/i, slats.find('tr:last').attr('data-time')),
        dayStart = (moment(0, 'HH')._d).toString().replace(/00:00:00/g, slats.find('tr:first').attr('data-time'));

    //console.log(curCalView.start._d, curCalView.end._d);

    //console.log(dayStart, dayEnd, curTime, regDate.day());

    timeline.toggle(moment(dayStart).isBefore(moment(curTime)) && moment(curTime).isBefore(moment(dayEnd)));

    curTime = moment(curTime).subtract(0, 'h');

    var curSeconds = (curTime.hours() * 60 * 60) + (curTime.minutes() * 60) + curTime.seconds();
    var percentOfDay = curSeconds / moment(dayEnd).diff(dayStart, 's');
    var topLoc = Math.floor(parentDiv.find('.fc-body .fc-slats').height() * percentOfDay);

    timeline.css({"top": topLoc + "px", "left": curCalView.axisWidth + "px"});

    $('.active-day').removeClass('active-day');

    $('.fc-day-header[data-date=' + moment(regDate).format('YYYY-MM-DD') + ']').addClass('active-day');

    clearInterval(timelineInterval);
    timelineInterval = setInterval(setTimeline, 60 * 1000);
}

function switchToAgendaDay() {
    setTimeout(function () {
        if (win.height() < 1200)  $('.fc-agendaDay-button').click();
    }, 0);
}

$(window).resize(function () {

    switchToAgendaDay()

});