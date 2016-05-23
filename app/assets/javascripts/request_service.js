$(function() {

    $('.filter-results').delegate('.is-user-date', 'focusin', function(event) {
        $('.is-user-date').each(function() {
            $(this).datepicker();
        });
    });

    $('.filter-results').delegate('.js-request-service', 'click', function(event) {
        event.preventDefault();
        var $hidden = $(event.currentTarget.parentNode).children('.date-and-time')
        $hidden.toggleClass('is-hidden');
    });

    $('.filter-results').delegate('.js-send-request', 'click', function(event) {
        event.preventDefault();
        var provider = event.currentTarget.getAttribute('data-prov');
        var $button = $(event.currentTarget).closest('.provider-box-content').find('.js-request-service');
        var date = $(event.currentTarget).closest('.date-and-time').find('.is-user-date').val();
        var time = $(event.currentTarget).closest('.date-and-time').find('#user-time').val();
        var desc = $(event.currentTarget).closest('.date-and-time').find('#user-description').val();
        if($.isNumeric(time)) {
            var hour = time.length > 2 ? time.slice(0,2) : time.slice(0);
            var minutes = time.length < 4 ? "00" : time.slice(-2);
            time = hour + ":" + minutes
            var user_date_time = date + ' ' + time;
            var dateArray = date.split('/')
            user_date_time = new Date(Date.UTC(dateArray[2], dateArray[0] - 1, dateArray[1],hour, minutes));
            if(date == "" || hour == "") {
                alert("Please fill in the date and time fields!");
            } else {
                $.ajax({
                    type: 'POST',
                    url: '/users/' + provider + '/transactions',
                    data: { date_time: user_date_time, description: desc },
                    success: addRequestData.bind($button)
                })
            }
        } else {
            alert("please enter a valid time")
        }
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
    }
});
