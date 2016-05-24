$(function() {

    var user_id;
    var transaction_id;
    var status;
    var button;
    var type;
    var text;

    $('.js-service-wrapper').delegate('.js-action-service', 'click', function(event) {
        event.preventDefault();
        $('.modal').removeClass('is-hidden');
        gatherInformation(event);
        if(type == "Provider") {
            switch (status.provider_status) {
                case "Rejected":
                    text = "Are you sure you want to reject this service?"
                    break;
                case "Pending":
                    text = "Are you sure you want to pend this service?"
                    break;
                case "Accepted":
                    text = "Are you sure you want to accept this service?"
                    break;
                case "Archived":
                    text = "Are you sure you want to archive this service?"
                    break;
                default:
                    text = "Are you sure?"
            }
        } else {
            if(status.client_status == "Requested") {
                if($(button).text() == "Archive") {
                    text = "Are you sure you want to archive this request?"
                } else {
                    text = "Are you sure you want to cancel this request?"
                }
            } else {
                text = "Are you sure you want to undo this request's cancellation?"
                if($(button).hasClass('is-item-bad')){
                    text = "Are you sure you want to archive this request?"
                } else {
                    text = "Are you sure you want to restore this request?"
                }
            }
        }
        $('.modal-confirm-text').text(text);
    });

    $('.modal-close, .modal-background, .modal-cancel').on('click', function(event) {
        event.preventDefault();
        $('.modal').addClass('is-hidden');
    });

    $('.modal-continue').on('click', function(event) {
        event.preventDefault();
        $('.modal').addClass('is-hidden');
        ajaxQuery(user_id, transaction_id, status, button, type);
    });

    function gatherInformation(event) {
        user_id = $(event.currentTarget).data('key').provider;
        transaction_id = $(event.currentTarget).data('key').transaction;
        status = {
            provider_status: $(event.currentTarget).data('key').next_status,
            client_status: $(event.currentTarget).data('key').client_status,
            current_status: $(event.currentTarget).data('key').current_status
        }
        button = event.currentTarget;
        if($(event.currentTarget).hasClass("Client")) {
            type = "Client";
        } else {
            type = "Provider"
        }
    }

});
