var regDate = moment('2016-01-12'), appointments_form, popup_calendar;

$(function ($) {

    appointments_form = $('#appointments_form').dialog({
        autoOpen: false,
        modal: true,
        width: 480,
        dialogClass: "dialog_v1 no_close_mod dialog_title_v1"
    });

    $('.openAppointmentBtn').on('click', function () {
        appointments_form.dialog('open');
        return false;
    });


    $('.appointmentTimeBtn').on('click', function () {
        var firedEl = $(this);
        $(firedEl.attr('href')).addClass('open_page');
        return false;
    });

    popup_calendar = $('#popup_calendar').fullCalendar({
        firstDay: 1,
        height: 300,
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
            center: 'agendaDay',
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


        //slotDuration: '00:30:00',
        timezone: 'local',
        defaultView: 'agendaDay',
        weekMode: 'fixed',
        //minTime: '06:30:00',
        //maxTime: '21:00:00',
        defaultDate: regDate,
        //businessHours: true, // display business hours
        editable: true,
        //allDaySlot: false,
        slotLabelFormat: 'H:mm',
        timeFormat: 'H:mm',

        viewRender: function (view, element) {

        },

        dayClick: function (date, jsEvent, view) {

           
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
    
});
