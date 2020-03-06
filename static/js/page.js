function navMenuHandler() {
    if ($(window).width() <= 768) {
        // Show mobile menu
        $("#menu-mobile").removeClass("hidden invisible");
        $(".menu-desktop").addClass("invisible");
        $("#menu").addClass("collapsed")
    } else {
        // Hide mobile menu
        $("#menu-mobile").addClass("hidden invisible");
        $(".menu-desktop").removeClass("invisible");
        $("#menu").removeClass("collapsed")
        $("#nav-mobile").removeClass("nav-mobile-visible")
        $("#overlay-input")[0].checked = false
        $(".main").removeClass("blur")
    }
}

function toggleMobileMenu(checked) {
    switch (checked) {
        case false:
            $("#menu-hb").addClass("hidden");
            $("#nav-mobile").removeClass("nav-mobile-visible")
            $(".main").removeClass("blur")
            $("body").css({"overflow":"scroll"})
            break;
        case true:
            $("#nav-mobile").addClass("nav-mobile-visible")
            $(".main").toggleClass("blur")
            $("body").css({"overflow":"hidden"})
            break;
    }
}

$(document).ready(function(){
    navMenuHandler();

    $(window).resize(function() {
        navMenuHandler()
    });

    var togglemenu = function (event) {
        console.log(event.target.id)
        let otherels = ["overlay-button", "overlay-input"]
        if (otherels.indexOf(event.target.id) == -1) {
            $("#menu-hb").addClass("hidden");
                $("#nav-mobile").removeClass("nav-mobile-visible")
                $(".main").removeClass("blur")
                $("#overlay-input")[0].checked = false
                $("body").css({"overflow":"scroll"})
        }
        return false;
    };

    // Add event listeners
    window.addEventListener('click', togglemenu, {passive: false});
    window.addEventListener('touchstart', togglemenu, {passive: false});

});


