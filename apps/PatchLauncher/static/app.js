
var appBaseURL = '/patchselect'


$(document).ajaxStart(function(){
	$.LoadingOverlay("show", {
    	fade  : [50, 50],
        color : "rgba(255, 255, 255, 0)",
        //image : "./assets/spinner.gif"
	});
});
$(document).ajaxStop(function(){
    $.LoadingOverlay("hide");
});

$(function () {
    /*$.get(appBaseURL+'/info')
    .done(function (data) {
        Object.keys(data).forEach(function(key) {
            $('#info').append('<p></p>').append('<b>'+key+'</b>: <i>'+data[key]+'</i>');
            //$('#info').append(key);
            //$('#info').append(data[key]);
        });
    })
    .fail(function () {
        console.log('problem');
    });*/

    $.get(appBaseURL+'/current')
    .done(function (data) {
        $('#current-patch').empty();
        $('#current-patch').append('<p>'+data+'</p>');
    })
    .fail(function () {
        console.log('problem');
    });

    $.get(appBaseURL+'/list_patches')
    .done(function (data) {
        data.forEach(function(p) {
            selectable_patch = $('<p class="selectable-patch">'+p+'</p>');
            selectable_patch.data("patch", p);  
            $('#patch-list').append(selectable_patch);
        });
    })
    .fail(function () {
        console.log('problem');
    });


    $('body').on('click', '.selectable-patch', function(event) {
        //ivar target = $(event.target);
       	selected = $(this).data("patch");
        $.get(appBaseURL+'/select_patch?patch=' + selected)
        .done(function (data) {
            console.log('started: ' + data);
            $('#current-patch').empty();
            $('#current-patch').append('<p>'+data+'</p>');
        })
        .fail(function () {
            console.log('problem');
        });
    });

});
