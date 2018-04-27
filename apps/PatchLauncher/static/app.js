
var appBaseURL = '/patchselect'


$(function () {
    $.get(appBaseURL+'/info')
    .done(function (data) {
        Object.keys(data).forEach(function(key) {
            $('#info').append('<p></p>').append('<b>'+key+'</b>: <i>'+data[key]+'</i>');
            //$('#info').append(key);
            //$('#info').append(data[key]);
        });
    })
    .fail(function () {
        console.log('problem');
    });
});
