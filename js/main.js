(function($) {
    $.fn.vAlign = function() {
        return this.each(function(i) {
            var h = $(this).height();
            var oh = $(this).outerHeight();
            var mt = (h + (oh - h)) / 2;
            $(this).css("margin-top", "-" + mt + "px");
            $(this).css("top", "50%");
            $(this).css("position", "absolute");
        });
    };
})(jQuery);


(function($) {
    $.fn.hAlign = function() {
        return this.each(function(i) {
            var w = $(this).width();
            var ow = $(this).outerWidth();
            var ml = (w + (ow - w)) / 2;
            $(this).css("margin-left", "-" + ml + "px");
            $(this).css("left", "50%");
            $(this).css("position", "absolute");
        });
    };
})(jQuery);


function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

$(document).ready(function() {
    if ($.browser.msie && $.browser.version == "6.0") {
        $(document).pngFix();
    }

    var or = $("#content-wrap").css('background-image');
    if ($(window).width() > 1280 && $(window).height() > 812) {
        if (or) {
            var ne = or.substring(or.lastIndexOf('/') + 1, or.lastIndexOf('.')) + '-large.jpg';
            $("#content-wrap").css({
                'background-image': "url('img/bg/" + ne + "')",
                'width': '1280px',
                'height': '812px'
            });

            $("#wrap").css({
                'width': '1280px',
                'height': '812px'
            });

            $("#images").append('<img src="img/bg/mask-large.jpg" />')
					.append('<img src="img/bg/feathers-large.jpg" />')
					.append('<img src="img/bg/disco-large.jpg" />')
					.append('<img src="img/bg/spiral-large.jpg" />');

        }
    } else {
        $("#images").append('<img src="img/bg/mask.jpg" />')
					.append('<img src="img/bg/feathers.jpg" />')
					.append('<img src="img/bg/disco.jpg" />')
					.append('<img src="img/bg/spiral.jpg" />');

    }


    $("#nav a").click(function(e) {
        e.preventDefault()
        $("#content-wrap").fadeOut("fast", "linear", function() {
            window.location = e.currentTarget.href;
        });

    });

    $("#wrap").hAlign().vAlign();

    if (getCookie('introDone') == "") {

        var intro = $('<div id="intro"><img src="img/intro.jpg" alt="Marilyn Grace" id="intro-logo" /><img src="img/tagline.jpg" alt="An event to remember" id="intro-tagline" /></div>');
        $('body').prepend(intro);
        $("#wrap").hide();
        $("#content-wrap").hide();
        $('#intro-tagline').hide();
        $("#intro").vAlign().hAlign().css('visibility', 'visible');
        $('#intro').children("#intro-logo").hide().fadeIn(2000).delay(2000).fadeOut(1000, "linear", function() {
            $(this).next().fadeIn(2000).delay(2000).fadeOut(1000, "linear", function() {
                setCookie('introDone', 'yes');
                $("#intro").hide();
                $("#wrap").show();
                $("#content-wrap").fadeIn();
            });
        });

    } else {
        $("#wrap").show();
        $("#content-wrap").fadeIn();
    }




});