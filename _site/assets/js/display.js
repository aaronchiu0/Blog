// for viewport height
let vh = window.innerHeight * 0.01;

// bounding function 
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

$(document).ready(function(){
    $(window).scroll(function() {
        var y = $(this).scrollTop();    // distance from top of page in px
        var opacity = 1 - y / 250;      // opacity lowering calculation
        $(".hero-title-container").css({
            "opacity": clamp(opacity, 0, 1)
        });
    });
});

/* $(window).scroll(function() {
    var y = $(this).scrollTop();
    console.log(y);
    if (y < vh*320) {
        $(".skills-container").css("position", "sticky");
    }
    else if (y > vh*320) {
        $(".skills-container").css("position", "relative");
        $(".skills-container").css("bottom", 0);
    }
    else {
        ;//$(".skills-container").css("opacity", 0);
    }
}); */

/* $.fn.followTo = function (pos) {
    var $this = this,
        $window = $(window);

    $window.scroll(function (e) {
        if ($window.scrollTop() > pos) {
            $this.css({
                position: 'relative',
                top: pos
            });
        } else {
            $this.css({
                position: 'sticky',
            });
        }
    });
};

$('.skills-container').followTo(vh*340); */

/* $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > vh * 100 && vh * 200 > y) {
      $('.skills-text-container').fadeIn();
    } else {
      $('.skills-text-container').fadeOut();
    }
}); */