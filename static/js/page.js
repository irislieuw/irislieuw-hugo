function navMenuHandler() {
    if ($(window).width() <= 768) {
        $("#menu-mobile").removeClass("hidden invisible");
        $(".menu-desktop").addClass("invisible");
        $("#menu").addClass("collapsed")
        // Add "collapsed" class to nav object
    } else {
        $("#menu-mobile").addClass("hidden invisible");
        $(".menu-desktop").removeClass("invisible");
        $("#menu").removeClass("collapsed")
        // Remove "collapsed" class to nav object
    }
}

$(document).ready(function(){
    navMenuHandler();

    $(window).resize(function() {
        navMenuHandler()
    });

    var togglemenu = function (event) {
        if (event.target.id === "menu-mobile") {
            // Only toggle class if nav object has "collapsed" class
            if ($("#menu").hasClass("collapsed")) {
                $("#nav-menu").toggleClass("hidden");
            }
        } else {
            $("#nav-menu").addClass("hidden");
        }
        return false;
    };

    // Add our event listeners
    window.addEventListener('click', togglemenu, {passive: false});
    window.addEventListener('touchstart', togglemenu, {passive: false});

});


