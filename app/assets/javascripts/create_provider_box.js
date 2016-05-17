function createProviderBox(provider) {
    var button = generateButton(provider);
    var html = '<div class="box is-fullwidth">' +
        '<h1 class="title is-3">' + provider.name + ' ' + provider.surname + '</h1>' +
        '<div class="columns"><div class="column is-half">' +
        '<p><strong>Address: </strong>' + provider.address + '</p>' +
        '<p><strong>Postcode: </strong>' + provider.postcode + '</p>' +
        '<p><strong>City: </strong>' + provider.city + '</p>' +
        '</div><div class="column is-half">' +
        '<p><strong>Service: </strong>' + provider.service.name + '</p>' +
        '<p><strong>Price: </strong>' + provider.price_per_hour + '$ \/ hour</p>' +
        '</div></div><div class="columns"><div class="column is-half">' +
        '<p><strong>Email: </strong>' + provider.email + '</p>' +
        '<p><strong>Phont Number: </strong>' + provider.phone_number + '</p>' +
        '</div><div class="column is-half">' +
        button +
        '<div class="date-and-time hidden">' +
        '<div class="user-date">' +
        '<label for="service_date">Select desired date: </label><br>' +
        '<input id="user-date" type="date" name="service_date">' +
        '</div><div class="user-time">' +
        '<label for="service_time">Select desired time: </label><br>' +
        '<input id="user-time" type="time" name="service_time">' +
        '</div><div class="user-datetime-send">' +
        '<button class="js-send-request button is-primary" data-prov="' + provider.id + '">Send</button>' +
        '</div></div></div></div></div></div>';

    return(html);
}

function generateButton(provider) {
    var button = '<button class="button is-primary js-request-service" data-prov="' + provider.id + '" data-id="">Request service</button>'
    provider.transactions.forEach(function(transaction) {
        var current_user_id = $('#user-id').attr('data');
        if( current_user_id == transaction.client_id){
            button = '<button class="button is-danger js-cancel-service" data-prov="' + provider.id + '" data-id="' + transaction.id + '">Cancel service</button>'
        }
    });
    return button;
}
