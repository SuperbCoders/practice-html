var html_var,
    body_var,
    doc,
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

    notificationBtn.on('mousemove', function () {
        notificationBtn.parent().addClass('notification_open');
    }).on('mouseleave', function () {
        clearTimeout(notificationTimer);

        notificationTimer = setTimeout(function () {
            notificationBtn.parent().removeClass('notification_open');
        }, 1000);

    });

    notificationDropdown.on('mousemove', function () {
        clearTimeout(notificationTimer);
        notificationBtn.parent().removeClass('notification_open');
        notificationDropdown.addClass('open');
    }).on('mouseleave', function () {
        clearTimeout(notificationTimer);

        notificationTimer = setTimeout(function () {
            notificationDropdown.removeClass('open');
        }, 300);

    });

    $('.passBtn').on('click', function () {
        $(this).hide().next('.passInput').show().focus();
        return false;
    });

    $('.openMenu').on('click', function () {
        html_var.addClass('menu_open');
        return false;
    });

    $('.closeMenu').on('click', function () {
        html_var.removeClass('menu_open aside_open');
        return false;
    });

    body_var.delegate('.chosen_multiple_v1 .result-selected', 'click', function () {
        var firedEl = $(this);

        console.log(firedEl.attr('class'));

        var link = firedEl.closest('.chzn-container ').find('.chzn-choices .search-choice-close[rel=' + (1 + firedEl.index()) + ']');

        console.log(link);

        //link.click();


    });

    all_dialog_close();

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