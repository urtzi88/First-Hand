$(function() {
    //only show all the providers list on the search page
    if($('body').find('.filter-results').length > 0) {
        $.get({
            url: '/provider_list'
        })
        .done(showData)
    }

    $('.js-filter-form').on('submit', function(event) {
        event.preventDefault();
        var selection = $('#js-selection option:selected').val();
        request_for_results(selection);
    });

    function request_for_results(selection) {
        $.get({
            url: '/provider_list/' + selection
        })
        .done(showData);
    }

    function showData(data) {
        $('.filter-results').empty();
        data.forEach(function(provider) {
            var html = createProviderBox(provider);
            $('.filter-results').append(html);
        });
    }
});
