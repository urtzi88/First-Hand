$(function() {

    $('.js-service-wrapper').delegate('.js-feedback-provider', 'click', function(event) {
        event.preventDefault();
        var form = $(event.currentTarget).siblings('.js-feedback-form')
        form.removeClass('is-hidden');
        $(event.currentTarget).addClass('is-hidden');
    });

    $('.js-service-wrapper').delegate('.js-feedback-form', 'submit', function(event) {
        event.preventDefault();
        var form = event.currentTarget;
        var rating = $(event.currentTarget).children('.control').children(':checked').val();
        var feedback = $(event.currentTarget).children('.control').children('textarea').val();
        var transaction = $(event.currentTarget).children('.control').children('.button').attr('data_transaction');
        var provider = $(event.currentTarget).children('.control').children('.button').attr('data_provider');
        console.log(provider);
        console.log(transaction);
        updateFeedbackOnTransaction(rating, feedback, transaction, provider, form);
    });

    function updateFeedbackOnTransaction(rating, feedback, transaction, user, form) {
        var form = event;
        var pro_feed = {
            rating: rating,
            feedback: feedback
        };
        $.ajax({
            method: 'PATCH',
            url: '/users/' + user + '/transactions/' + transaction + '/feedback',
            data: {rat_feed: pro_feed},
            success: updateDomFeedback.bind(form)
        })
    }

    function updateDomFeedback(data) {
        console.log(data)
        $(this.srcElement).addClass('is-hidden');
        $(this.srcElement).siblings('.js-feedback-provider').removeClass('is-hidden').addClass('is-disabled');
    }

});
