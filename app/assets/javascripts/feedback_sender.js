$(function() {

    $('.js-service-wrapper').delegate('.js-feedback-provider', 'click', function(event) {
        event.preventDefault();
        var form = $(event.currentTarget).closest('.card').find('.js-form-container');
        form.removeClass('is-hidden');
        $(event.currentTarget).addClass('is-hidden');
    });

    $('.js-service-wrapper').delegate('.js-feedback-form', 'submit', function(event) {
        event.preventDefault();
        var form = event.currentTarget;
        var rating = $(form).find(':checked').val();
        var feedback = $(form).find('textarea').val();
        var transaction = $(form).find('.button').attr('data_transaction');
        console.log(transaction)
        var provider = $(form).find('.button').attr('data_provider');
        if(rating == null) {
            alert("Please input a rating");
        } else {
            updateFeedbackOnTransaction(rating, feedback, transaction, provider, form);
        }
    });

    function updateFeedbackOnTransaction(rating, feedback, transaction, user, form) {
        var form = event;
        var details = {
            rating: rating,
            feedback: feedback
        };
        $.ajax({
            method: 'PATCH',
            url: '/users/' + user + '/transactions/' + transaction + '/feedback',
            data: {rat_feed: details},
            success: updateDomFeedback.bind(form),
        })
    }

    function updateDomFeedback(data) {
        var $form = $(this.srcElement)
        $form.addClass('is-hidden');
        var feedback_btn = $form.closest('.is-custom-card').find('.is-item-good');
        feedback_btn.removeClass('is-hidden').addClass('is-disabled');
        console.log(data);
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
