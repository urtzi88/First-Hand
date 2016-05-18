function generateFeedbackForm(provider, transaction) {
    var html = '<form action="/users/' + provider + '/transactions/' + transaction + '" action: "PATCH" class="js-feedback-form is-hidden">' +
               '<p class="title is-4">Feedback:</p>' +
               '<p class="control"><label>Rating:</label><br/>' +
               '<label class="is-rating-label">0</label>' +
               '<label class="is-rating-label">1</label>' +
               '<label class="is-rating-label">2</label>' +
               '<label class="is-rating-label">3</label>' +
               '<label class="is-rating-label">4</label>' +
               '<label class="is-rating-label">5</label><br/>' +
               '<input type="radio" name="client_rating" value="0">' +
               '<input type="radio" name="client_rating" value="1">' +
               '<input type="radio" name="client_rating" value="2">' +
               '<input type="radio" name="client_rating" value="3">' +
               '<input type="radio" name="client_rating" value="4">' +
               '<input type="radio" name="client_rating" value="5">' +
               '<p class="control"><textarea name="client_feedback" class="textarea" placeholder="Feedback"></textarea></p>' +
               '<p class="control"><input type="submit" value="Send" name="commit" class="button is-primary" data_transaction="' + transaction + '", data_provider="' + provider + '"></p>' +
               '</form>';

    return html;
}
