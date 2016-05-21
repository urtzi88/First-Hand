function createProviderBox(provider) {
    var transNumber = countTransactionsForCurrentUser(provider);
    var html = '<div class="box is-fullwidth"><article class="media">' +
        '<div class="media-left"><figure class="image is-128x128">' +
        '<img class="search-avatar-user" src="' + provider.avatar_url + '" alt="avatar"></figure></div>' +
        '<div class="media-content"><div class="content provider-box-content">' +
        '<h1 class="title is-3">' + provider.name + ' ' + provider.surname + ' ' + provider.average_rating + '(' + provider.rating_amount + ')' + '</h1>' +
        '<div class="columns"><div class="column is-half">' +
        '<p><strong>Address: </strong>' + provider.address + '</p>' +
        '<p><strong>Postcode: </strong>' + provider.postcode + '</p>' +
        '<p><strong>City: </strong>' + provider.city + '</p>' +
        '</div><div class="column is-half">' +
        '<p><strong>Service: </strong>' + provider.service.name + '</p>' +
        '<p><strong>Price: </strong>' + provider.price_per_hour + '$ \/ hour</p>' +
        '<p><strong>Previous services: </strong>' + transNumber + '</p>' +
        '</div></div><div class="columns"><div class="column is-half">' +
        '<p><strong>Email: </strong>' + provider.email + '</p>' +
        '<p><strong>Phone Number: </strong>' + provider.phone_number + '</p>' +
        '</div><div class="column is-half">' +
        '<button class="button js-request-service" data-prov="' + provider.id + '" data-id="">Request service</button>' +
        '<div class="date-and-time is-hidden">' +
        '<div class="user-date">' +
        '<label for="service_date">Select desired date: </label><br>' +
        '<input id="user-date' + provider.id + '" class="is-user-date" type="text" name="service_date">' +
        '</div><div class="user-time">' +
        '<label for="service_time">Select desired time: </label><br>' +
        '<input id="user-time" type="text" name="service_time">' +
        '</div><div class="user-datetime-send">' +
        '<button class="js-send-request button" data-prov="' + provider.id + '">Send</button>' +
        '</div></div></div></div></div></div></div></div></article></div>';

    return(html);
}

function countTransactionsForCurrentUser(provider) {
    var transNumber = 0;
    provider.transactions.forEach(function(transaction) {
        var current_user_id = $('#user-id').attr('data');
        if(current_user_id == transaction.client_id) {
            transNumber ++;
        }
    });
    return transNumber;
}
