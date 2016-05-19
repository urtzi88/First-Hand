$(function() {
    $('.js-service-wrapper').delegate('.js-action-service-provider', 'click', function(event) {
        event.preventDefault();
        var user_id = $(event.currentTarget).data('client');
        var transaction_id = $(event.currentTarget).data('transaction');
        var status = {
            provider_status: $(event.currentTarget).data('status'),
            client_status: "",
            current_status: $(event.currentTarget).data('current')
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
            client_status: $(event.currentTarget).data('status'),
            current_status: $(event.currentTarget).data('current')
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
        var current_status = this.status.current_status;
        var button = this.button;
        if(prov_status == "Accepted" && cli_status == '') {
            moveToApproved(data, current_status, button);
        } else if (prov_status == "Complete" && cli_status == '') {
            moveToComplete(data, current_status, button);
        } else if (prov_status == "Pending" && cli_status == '') {
            moveToPending(data, current_status, button);
        } else if (prov_status == "Rejected" && cli_status == '') {
            moveToRejected(data, current_status, button);
        } else if (cli_status == "Cancelled") {
            moveToCancelled(data, prov_status, current_status, button);
        } else if (cli_status == "Requested") {
            moveBackFromCancelled(data, prov_status, cli_status, current_status, button);
        }
    }

    function hidePreviousBox(status) {
        var box = "js-" + status.toLowerCase() + "-transactions";
        if ($('.' + box).find('.is-hosting-a-card').length == 0) {
            $('.' + box).addClass('is-hidden');
        }
    }

    function moveToApproved(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).removeClass('is-hidden').attr('data-status', 'Complete').attr('data-current', 'Accepted').text('Mark as complete');
        $(button).siblings('[data-color="red"]').removeClass('is-hidden').attr('data-current', 'Accepted').attr('data-status', 'Rejected').text('Reject service');
        $(button).siblings('[data-color="blue"]').removeClass('is-hidden').attr('data-current', 'Accepted').attr('data-status', 'Pending').text('Pend service');
        $('.js-accepted-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-accepted-services').append(card_content);
        line_req.remove();
        $('.js-accepted-requests').append(line_req);
        hidePreviousBox(status);
    }

    function moveToComplete(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).removeClass('is-hidden js-action-service-provider').addClass('js-feedback-provider').attr('data-status', 'Complete').attr('data-current', 'Complete').text('Give feedback');
        $(button).siblings('[data-color="red"]').addClass('is-hidden').attr('data-current', 'Complete');
        $(button).siblings('[data-color="blue"]').addClass('is-hidden').attr('data-current', 'Complete');
        $('.js-completed-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-completed-services').append(card_content);
        line_req.remove();
        $('.js-completed-requests').append(line_req);
        hidePreviousBox(status);
    }

    function moveToPending(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).siblings('[data-color="green"]').removeClass('is-hidden').attr('data-status', 'Accepted').attr('data-current', 'Pending').text('Accept service');
        $(button).siblings('[data-color="red"]').removeClass('is-hidden').attr('data-status', 'Rejected').attr('data-current', 'Pending').text('Reject service');
        $(button).addClass('is-hidden').attr('data-status', '').attr('data-current', 'Pending');
        $('.js-pending-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-pending-services').append(card_content);
        line_req.remove();
        $('.js-pending-requests').append(line_req);
        hidePreviousBox(status);
    }

    function moveToRejected(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).siblings('[data-color="green"]').addClass('is-hidden').attr('data-status', '').attr('data-current', 'Rejected');
        $(button).removeClass('is-hidden').attr('data-status', 'Archived').attr('data-current', 'Rejected').text('Archive');
        $(button).siblings('[data-color="blue"]').removeClass('is-hidden').attr('data-status', 'Pending').attr('data-current', 'Rejected').text('Pend service');
        $('.js-rejected-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-rejected-services').append(card_content);
        line_req.remove();
        $('.js-rejected-requests').append(line_req);
        hidePreviousBox(status);
    }

    function moveToCancelled(data, prov_st, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).removeClass('is-danger').addClass('is-primary').data('prov-status', prov_st).attr("data-status", "Requested").attr('data-current', 'Cancelled').text('Restore request');
        $('.js-cancelled-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-cancelled-services').append(card_content);
        line_req.remove();
        $('.js-cancelled-requests').append(line_req);
        hidePreviousBox(status);
    }

    function moveBackFromCancelled(data, prov_st, cli_st, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        $(button).addClass('is-danger').removeClass('is-primary').attr('data-status', 'Cancelled').attr('data-current', prov_st).text('Cancel request');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        line_req.remove();
        if(prov_st == "Pending") {
            $('.js-pending-services').closest('.box').removeClass('is-hidden');
            $('.js-pending-services').append(card_content);
            $('.js-pending-requests').append(line_req);
        } else if (prov_st == "Accepted") {
            $('.js-accepted-services').closest('.box').removeClass('is-hidden');
            $('.js-accepted-services').append(card_content);
            $('.js-accepted-requests').append(line_req);
        } else if (prov_st == "Rejected") {
            $('.js-rejected-services').closest('.box').removeClass('is-hidden');
            $('.js-rejected-services').append(card_content);
            $('.js-rejected-requests').append(line_req);
        }
        hidePreviousBox(status);
    }

});
