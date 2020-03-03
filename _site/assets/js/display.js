// for viewport height
let vh = window.minnerHeight * 0.01;

// bounding function 
function clamp(num, min, max) {
    if (num <= min)
        return min;
    else if (num >= max)
        return max;
    else 
        return num;
}

$(document).ready(function(){
    $(window).scroll(function() {
        var y = $(this).scrollTop();                // distance from top of page in px
        var opacity = clamp(1 - y / 250, 0, 1);     // opacity lowering calculation

        if (opacity > 0) {
            $("#hero-title").show();
            $(".hero-title-container").css({
                "opacity": opacity
            });
        }
        else
            $("#hero-title").hide();
    });
});