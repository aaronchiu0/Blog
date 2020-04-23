import { clamp } from "./modules/helpers.js";

$(document).ready(function(){
    $(window).scroll(onScroll);
    $(window).on('load', onScroll);

    function onScroll() {
        var y = $(window).scrollTop();    // distance from top of page in px
        var opacity = clamp(1 - y / 250, 0, 1);      // opacity lowering calculation

        if (opacity > 0) {
            $("#hero-title").show();
            $(".hero-title-container").css({
                "opacity": opacity
            });
        }
        else
            $("#hero-title").hide();
    }
});