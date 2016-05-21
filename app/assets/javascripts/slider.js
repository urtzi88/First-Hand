document.addEventListener("DOMContentLoaded", function(event) {

    function slider(slide) {
        var slide_to = 'slide-' + slide;
        var button_to = 'button-' + slide;
        var slides = document.getElementsByClassName('is-slide');
        for(var i = 0; i < slides.length; i++) {
            var button_sl = 'button-' + (i + 1);
            slides[i].classList.add('is-slide-hidden');
            document.getElementById(button_sl).classList.remove('is-button-active')
        }
        document.getElementById(slide_to).classList.remove('is-slide-hidden');
        document.getElementById(button_to).classList.add('is-button-active');
    }

    document.getElementById('button-1').addEventListener("click", function() {
        var slide = 1;
        slider(slide);
    });

    document.getElementById('button-2').addEventListener("click", function() {
        var slide = 2;
        slider(slide);
    });

    document.getElementById('button-3').addEventListener("click", function() {
        var slide = 3;
        slider(slide);
    });

    var index_slide = 2;
    var switch_slide = setInterval(function() {
        var i = index_slide % 3;
        index_slide += 1;
        i == 0 ? i = 3 : i;
        slider(i);
    }, 5000);

});
