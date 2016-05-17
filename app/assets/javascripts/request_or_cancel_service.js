$(function() {
    $('.filter-results').delegate('.js-request-service', 'click', function(event) {
        event.preventDefault();
        var $hidden = $(event.currentTarget.parentNode).children('.date-and-time')
        $hidden.removeClass('hidden');
    });

    $('.filter-results').delegate('.js-send-request', 'click', function(event) {
        var provider = event.currentTarget.getAttribute('data-prov');
        var $button = $(event.currentTarget.parentNode.parentNode.parentNode).children('.js-request-service');
        var date = $(event.currentTarget.parentNode.parentNode).children('.user-date').children('#user-date').val();
        var time = $(event.currentTarget.parentNode.parentNode).children('.user-time').children('#user-time').val();
        var user_date_time = date + ' ' + time;
        $.ajax({
            type: 'POST',
            url: '/users/' + provider + '/transactions',
            data: { date_time: user_date_time },
            success: addRequestData.bind($button)
        })
    });

    $('.filter-results').delegate('.js-cancel-service', 'click', function(event) {
        event.preventDefault();
        var provider = event.currentTarget.getAttribute('data-prov');
        var transaction = event.currentTarget.getAttribute('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/users/' + provider + '/transactions/' + transaction,
            success: removeRequestData.bind(event.currentTarget)
        })
    });

    function addRequestData(data) {
        $('.date-and-time').addClass('hidden');
        var button = this;
        console.log(data);
        var html = '<p data-id="' + data.id + '">' + data.id + ' ' + data.provider.name + '</p>';
        if (data.status == 'Pending') {
            $('.js-pending-requests').append(html);
        } else if (data.status == 'Approved') {
            $('.js-approved-requests').append(html);$('.js-current-requests').append(html);
        } else if (data.status == 'Rejected') {
            $('.js-rejected-requests').append(html);
        }
        $(button).text('Cancel Service').removeClass("is-primary js-request-service").addClass("is-danger js-cancel-service");
        $(button).attr('data-id', data.id);
    }

    function removeRequestData(data) {
        var button = this;
        var line = $('[data-id=' + data.id + ']');
        line[0].remove();
        $(button).text('Request Service').removeClass("is-danger js-cancel-service").addClass("is-primary js-request-service");
        $(button).attr('data-id', '');
    }
});
