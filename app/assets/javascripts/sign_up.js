$(function() {
    if($('input:checked').val() == "Provider") {
        $('.js-only-provider').removeClass("hidden");
        console.log($('option:selected'));
    }

    $('.js-user-type').on('click', function() {
        var type = this.getAttribute('value');
        if(type == "Client") {
            $('.js-only-provider').addClass("hidden");
        } else if (type == "Provider") {
            $('.js-only-provider').removeClass("hidden");
        }
    })
});
