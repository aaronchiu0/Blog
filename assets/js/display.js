let vh = window.innerHeight * 0.01;

$(window).scroll(function() {
    var y = $(this).scrollTop();
    $(".hero-title-container").css("opacity", 1 - y / 250);
});

/* $(window).scroll(function() {
    var y = $(this).scrollTop();
    console.log(y);
    if (y > vh*210 && y < vh*320) {
        $(".skills-text-container").css("opacity", (y-vh*210)*1/250);
    }
    else if (y > vh*320) {
        $(".skills-text-container").css("opacity", 1 - (y-vh*320)/250);
    }
    else {
        $(".skills-text-container").css("opacity", 0);
    }
}); */

/* $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > vh * 100 && vh * 200 > y) {
      $('.skills-text-container').fadeIn();
    } else {
      $('.skills-text-container').fadeOut();
    }
}); */