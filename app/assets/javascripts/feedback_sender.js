$(function() {

    $('.js-service-wrapper').delegate('.js-feedback-provider', 'click', function(event) {
        event.preventDefault();
        var form = $(event.currentTarget).closest('.card').children('.card-content').children('.content').children('.js-form-container');
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
        console.log(rating);
        console.log(feedback);
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
            success: updateDomFeedback.bind(form),
        })
    }

    function updateDomFeedback(data) {

        $(this.srcElement).addClass('is-hidden');
        var feedback_btn = $(this.srcElement.parentNode.parentNode.parentNode.parentNode).children('footer').children('.is-item-good');
        feedback_btn.removeClass('is-hidden').addClass('is-disabled');
        var rating = {
            client_rating: data.client_rating,
            provider_rating: data.provider_rating
        };
        console.log(rating);
        $.ajax({
            method: 'PATCH',
            url: '/users/feedback',
            data: {
                rating: rating,
                client: data.client_id,
                provider: data.provider_id
            },
            success: function(data) {
                console.log(data);
            }
        })
    }

});
