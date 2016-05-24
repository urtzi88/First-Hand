$(function() {
    //only show all the providers list on the search page
    if($('body').find('.filter-results').length > 0) {
        $('.js-loading-icon').removeClass('is-hidden');
        $.ajax({
            method: 'GET',
            url: '/users/provider_list',
            success: showData
        })
    }

    $('#js-selection').change(function() {
        var selection = $('#js-selection option:selected').val();
        var filter = $('#filter').val()
        $('.js-loading-icon').removeClass('is-hidden');
        request_for_results(selection, filter);
    });

    $('#filter').change(function() {
        var selection = $('#js-selection option:selected').val();
        var filter = $('#filter').val()
        $('.js-loading-icon').removeClass('is-hidden');
        request_for_results(selection, filter);
    });

    function request_for_results(selection, filter) {
        $.ajax({
            method: 'GET',
            url: '/users/provider_list/' + selection,
            data: {filter: filter},
            success: showData
        })
    }

    function showData(data) {
        console.log(data);
        $('.js-loading-icon').addClass('is-hidden');
        $('.filter-results').empty();
        data.forEach(function(provider) {
            var html = createProviderBox(provider);
            $('.filter-results').append(html);
        });
    }
});
