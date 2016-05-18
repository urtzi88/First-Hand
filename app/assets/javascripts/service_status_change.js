$(function() {
    $('.js-service-wrapper').delegate('.js-action-service-provider', 'click', function(event) {
        event.preventDefault();
        var user_id = $(event.currentTarget).data('client');
        var transaction_id = $(event.currentTarget).data('transaction');
        var status = {
            provider_status: $(event.currentTarget).data('status'),
            client_status: ""
        }
        var button = event.currentTarget;
        ajaxQuery(user_id, transaction_id, status, button);
    });

    $('.js-service-wrapper').delegate('.js-action-service-client', 'click', function(event) {
        event.preventDefault();
        var user_id = $(event.currentTarget).data('provider');
        var transaction_id = $(event.currentTarget).data('transaction');
        var status = {
            provider_status: $(event.currentTarget).data('prov-status'),
            client_status: $(event.currentTarget).data('status')
        }
        var button = event.currentTarget;
        ajaxQuery(user_id, transaction_id, status, button);
    });

    function ajaxQuery(user, transaction, status, button) {
        var button = button;
        var obj = {button: button,
                   status: status
               };
        if(status != 'Archived') {
            $.ajax({
                method: 'PATCH',
                url: '/users/' + user + '/transactions/' + transaction,
                data: { status: status },
                success: modifyDomServices.bind(obj)
            })
        } else {
            console.log('functionality not implemented yet');
        }
    }

    function modifyDomServices(data) {
        var prov_status = this.status.provider_status;
        var cli_status = this.status.client_status;
        var button = this.button;
        if(prov_status == "Accepted" && cli_status == '') {
            moveToApproved(data, status, button);
        } else if (prov_status == "Complete" && cli_status == '') {
            moveToComplete(data, status, button);
        } else if (prov_status == "Pending" && cli_status == '') {
            moveToPending(data, status, button);
        } else if (prov_status == "Rejected" && cli_status == '') {
            moveToRejected(data, status, button);
        } else if (cli_status == "Cancelled") {
            moveToCancelled(data, prov_status, button);
        } else if (cli_status == "Requested") {
            moveBackFromCancelled(data, prov_status, cli_status, button);
        }
    }

    function moveToApproved(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).removeClass('is-hidden').attr('data-status', 'Complete').text('Mark as complete');
        $(button).siblings('[data-color="red"]').removeClass('is-hidden').attr('data-status', 'Rejected').text('Reject service');
        $(button).siblings('[data-color="blue"]').removeClass('is-hidden').attr('data-status', 'Pending').text('Pend service');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-accepted-services').append(card_content);
        line_req.remove();
        $('.js-accepted-requests').append(line_req);
    }

    function moveToComplete(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var form_goes_here = $(button).closest('.js-action-service-provider');
        console.log(form_goes_here);
        var provider = $(button).closest('.js-action-service-provider')[0].getAttribute('data-provider');
        var transaction = $(button).closest('.js-action-service-provider')[0].getAttribute('data-transaction');
        $(button).removeClass('is-hidden js-action-service-provider').addClass('js-feedback-provider').attr('data-status', 'Complete').text('Give feedback');
        $(button).siblings('[data-color="red"]').addClass('is-hidden');
        $(button).siblings('[data-color="blue"]').addClass('is-hidden');
        var form = generateFeedbackForm(provider, transaction);
        form_goes_here.after(form);
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-completed-services').append(card_content);
        line_req.remove();
        $('.js-completed-requests').append(line_req);
    }

    function moveToPending(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).siblings('[data-color="green"]').removeClass('is-hidden').attr('data-status', 'Accepted').text('Accept service');
        $(button).siblings('[data-color="red"]').removeClass('is-hidden').attr('data-status', 'Rejected').text('Reject service');
        $(button).addClass('is-hidden').attr('data-status', '');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-pending-services').append(card_content);
        line_req.remove();
        $('.js-pending-requests').append(line_req);
    }

    function moveToRejected(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).siblings('[data-color="green"]').addClass('is-hidden').attr('data-status', '');
        $(button).removeClass('is-hidden').attr('data-status', 'Archived').text('Archive');
        $(button).siblings('[data-color="blue"]').removeClass('is-hidden').attr('data-status', 'Pending').text('Pend service');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-rejected-services').append(card_content);
        line_req.remove();
        $('.js-rejected-requests').append(line_req);
    }

    function moveToCancelled(data, prov_st, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).removeClass('is-danger').addClass('is-primary').data('prov-status', prov_st).attr("data-status", "Requested").text('Restore request');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-cancelled-services').append(card_content);
        line_req.remove();
        $('.js-cancelled-requests').append(line_req);
    }

    function moveBackFromCancelled(data, prov_st, cli_st, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).addClass('is-danger').removeClass('is-primary').attr('data-status', 'Cancelled').text('Cancel request');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        line_req.remove();
        if(prov_st == "Pending") {
            console.log("pending");
            $('.js-pending-services').append(card_content);
            $('.js-pending-requests').append(line_req);
        } else if (prov_st == "Accepted") {
            console.log("accepted")
            $('.js-accepted-services').append(card_content);
            $('.js-accepted-requests').append(line_req);
        } else if (prov_st == "Rejected") {
            console.log("rejected")
            $('.js-rejected-services').append(card_content);
            $('.js-rejected-requests').append(line_req);
        }
    }

});
