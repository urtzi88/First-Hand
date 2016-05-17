$(function() {

    $('.js-pending-services').delegate('.js-accept-service', 'click', function(event) {
        event.preventDefault();
        var client_id = $(event.currentTarget).data('client');
        var transaction_id = $(event.currentTarget).data('transaction');
        var button = event.currentTarget;
        ajaxQuery(client_id, transaction_id, "Accepted", button);
    });

    $('.js-accepted-services').delegate('.js-pend-service', 'click', function(event) {
        event.preventDefault();
        var client_id = $(event.currentTarget).data('client');
        var transaction_id = $(event.currentTarget).data('transaction');
        var button = event.currentTarget;
        ajaxQuery(client_id, transaction_id, "Pending", button);
    });

    function ajaxQuery(user, transaction, status, button) {
        var button = button;
        var obj = {button: button,
                   status: status
               }
        $.ajax({
            method: 'PATCH',
            url: '/users/' + user + '/transactions/' + transaction,
            data: { status: status },
            success: modifyDomServices.bind(obj)
        })
    }

    function modifyDomServices(data) {
        var status = this.status;
        var button = this.button;
        if(status == "Accepted") {
            moveToApproved(data, status, button);
        } else if (status == "Pending") {
            moveToPending(data, status, button);
        }
    }

    function moveToApproved(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var button = $(button).siblings('.js-pend-service').removeClass('is-hidden');
        $(button).siblings('.js-accept-service').text('Mark as complete');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        card.remove();
        $('.js-accepted-services').append(card_content);
    }

    function moveToPending(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var button = $(button).siblings('.js-accept-service').text('Accept Service');
        $(button).siblings('.js-pend-service').addClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        card.remove();
        $('.js-pending-services').append(card_content);
    }

});
