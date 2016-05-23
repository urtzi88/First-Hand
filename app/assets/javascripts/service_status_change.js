$(function() {
    $('.js-service-wrapper').delegate('.js-action-service', 'click', function(event) {
        event.preventDefault();
        var confirmation = confirm("Are you sure?");
        if(confirmation) {
            var user_id = $(event.currentTarget).data('key').provider;
            var transaction_id = $(event.currentTarget).data('key').transaction;
            var status = {
                provider_status: $(event.currentTarget).data('key').next_status,
                client_status: $(event.currentTarget).data('key').client_status,
                current_status: $(event.currentTarget).data('key').current_status
            }
            var button = event.currentTarget;
            if($(event.currentTarget).hasClass("Client")) {
                var type = "Client";
            } else {
                var type = "Provider"
            }
            ajaxQuery(user_id, transaction_id, status, button, type);
        }
    });

    function ajaxQuery(user, transaction, status, button, type) {
        var button = button;
        var obj = {button: button,
                   status: status,
                   usr_type: type
               };
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
        var user_type = this.usr_type
        if (status.client_status == "Archived" || status.provider_status == "Archived") {
            deleteCard(data, button, status, user_type);
        } else {
            if(status.provider_status == "Accepted" && status.client_status != 'Cancelled') {
                moveToAccepted(data, status, button);
            } else if (status.provider_status == "Complete" && status.client_status != 'Cancelled') {
                moveToComplete(data, status, button);
            } else if (status.provider_status == "Pending" && status.client_status != 'Cancelled') {
                moveToPending(data, status, button);
            } else if (status.provider_status == "Rejected" && status.client_status != 'Cancelled') {
                moveToRejected(data, status, button);
            } else if (status.client_status == "Requested") {
                moveToCancelled(data, status, button);
            } else if (status.client_status == "Cancelled") {
                moveBackFromCancelled(data, status, button);
            }
        }
    }

    function hidePreviousBox(status) {
        var box = "js-" + status.toLowerCase() + "-transactions";
        if ($('.' + box).find('.is-hosting-a-card').length == 0) {
            $('.' + box).addClass('is-hidden');
        }
    }

    function fixButtonAttr(button, current_status, next_status, client_status) {
        var data_attr = $(button).data('key');
        data_attr.current_status = current_status;
        data_attr.next_status = next_status;
        data_attr.client_status = client_status;
        return data_attr;
    }

    function moveToAccepted(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var data_attr = fixButtonAttr(button, "Accepted", "Complete", status.client_status);
        $(button).removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text('Mark as Complete');
        var medium_button = $(button).siblings('.is-item-medium');
        data_attr = fixButtonAttr(medium_button, "Accepted", "Pending", status.client_status);
        medium_button.removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text('Pend Service');
        var bad_button = $(button).siblings('.is-item-bad');
        data_attr = fixButtonAttr(bad_button, "Accepted", "Rejected", status.client_status);
        bad_button.removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text('Reject Service');
        $('.js-accepted-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-accepted-services').append(card_content);
        line_req.remove();
        $('.js-accepted-requests').append(line_req);
        hidePreviousBox(status.current_status);
    }

    function moveToComplete(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var data_attr = fixButtonAttr(button, "Complete", "", status.client_status);
        $(button).removeClass('is-hidden js-action-service-provider').addClass('js-feedback-provider').attr('data-key',JSON.stringify(data_attr)).text('Give Feedback');
        var medium_button = $(button).siblings('.is-item-medium');
        data_attr = fixButtonAttr(medium_button, "", "", status.client_status);
        medium_button.addClass('is-hidden').attr('data-key', JSON.stringify(data_attr));
        var bad_button = $(button).siblings('.is-item-bad');
        data_attr = fixButtonAttr(bad_button, "", "", status.client_status);
        bad_button.addClass('is-hidden').attr('data-key', JSON.stringify(data_attr));
        $('.js-completed-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-complete-services').append(card_content);
        line_req.remove();
        $('.js-completed-requests').append(line_req);
        hidePreviousBox(status.current_status);
    }

    function moveToPending(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var data_attr = fixButtonAttr(button, "", "", status.client_status);
        $(button).addClass('is-hidden').attr('data-key',JSON.stringify(data_attr));
        var good_button = $(button).siblings('.is-item-good');
        data_attr = fixButtonAttr(good_button, "Pending", "Accepted", status.client_status);
        good_button.removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text('Accept Service');
        var bad_button = $(button).siblings('.is-item-bad').attr('data-key',JSON.stringify(data_attr));
        data_attr = fixButtonAttr(bad_button, "Pending", "Rejected", status.client_status);
        bad_button.removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text('Reject Service');
        $('.js-pending-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-pending-services').append(card_content);
        line_req.remove();
        $('.js-pending-requests').append(line_req);
        hidePreviousBox(status.current_status);
    }

    function moveToRejected(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var data_attr = fixButtonAttr(button, "Rejected", "Archived", status.client_status);
        $(button).removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text('Archive');
        var good_button = $(button).siblings('.is-item-good');
        data_attr = fixButtonAttr(good_button, "", "", status.client_status);
        good_button.addClass('is-hidden').attr('data-key', JSON.stringify(data_attr));
        var medium_button = $(button).siblings('.is-item-medium');
        data_attr = fixButtonAttr(medium_button, "Rejected", "Pending", status.client_status);
        medium_button.removeClass('is-hidden').attr('data-key', JSON.stringify(data_attr)).text('Pend Service');
        $('.js-rejected-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-rejected-services').append(card_content);
        line_req.remove();
        $('.js-rejected-requests').append(line_req);
        hidePreviousBox(status.current_status);
    }

    function moveToCancelled(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var data_attr = fixButtonAttr(button, status.current_status, "Archived", "Cancelled");
        $(button).removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text("Archive");
        var good_button = $(button).siblings('.is-item-good');
        data_attr = fixButtonAttr(good_button, "Cancelled", status.current_status, "Cancelled");
        good_button.removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text('Restore Request');
        var medium_button = $(button).siblings('.is-item-medium');
        data_attr = fixButtonAttr(medium_button, status.current_status, "", "");
        medium_button.addClass('is-hidden').attr('data-key',JSON.stringify(data_attr));
        $('.js-cancelled-services').closest('.box').removeClass('is-hidden');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        $('.js-cancelled-services').append(card_content);
        line_req.remove();
        $('.js-cancelled-requests').append(line_req);
        hidePreviousBox(status.current_status);
    }

    function moveBackFromCancelled(data, status, button) {
        var card = $(button).closest('.is-hosting-a-card');
        var data_attr = fixButtonAttr(button, "", "", status.client_status);
        $(button).addClass('is-hidden').attr('data-key',JSON.stringify(data_attr));
        var medium_button = $(button).siblings('.is-item-medium');
        data_attr = fixButtonAttr(medium_button, "", "", status.client_status);
        medium_button.addClass('is-hidden').attr('data-key',JSON.stringify(data_attr));
        var bad_button = $(button).siblings('.is-item-bad').attr('data-key',JSON.stringify(data_attr));
        data_attr = fixButtonAttr(bad_button, "Pending", "Cancelled" , "Requested");
        bad_button.removeClass('is-hidden').attr('data-key',JSON.stringify(data_attr)).text('Cancel Request');
        var card_content = '<div class="column is-half is-hosting-a-card">' + card.html() + '</div>';
        var line_req = $('[data-id=' + data.id + ']');
        card.remove();
        line_req.remove();
        $('.js-pending-services').closest('.box').removeClass('is-hidden');
        $('.js-pending-services').append(card_content);
        $('.js-pending-requests').append(line_req);
        hidePreviousBox(status.current_status);
    }

    function deleteCard(data, button, status, user_type) {
        var card = $(button).closest('.is-hosting-a-card');
        card.remove();
        if(status.client_status == "Cancelled") {
            hidePreviousBox(status.client_status);
        } else {
            hidePreviousBox(status.current_status);
        }
    }

});
