function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function () {
    if (isScrolledIntoView('.noticias')) {
        document.getElementById("ultimasNoticias").style.animationPlayState = "running";
    } else {
        document.getElementById("ultimasNoticias").style.animationPlayState = "paused";
    }
});

$(window).on('scroll', function () {
    if (isScrolledIntoView('.cursos')) {
        document.getElementById("nossosCursos").style.animationPlayState = "running";
    } else {
        document.getElementById("nossosCursos").style.animationPlayState = "paused";
    }
});

$(window).on('scroll', function () {
    if (isScrolledIntoView('.comunidade')) {
        document.getElementById("nossaComunidade").style.animationPlayState = "running";
    } else {
        document.getElementById("nossaComunidade").style.animationPlayState = "paused";
    }
    console.log("comunidade");
});

