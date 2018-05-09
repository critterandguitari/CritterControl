
var appBaseURL = '/patchselect'
var currentPatch = ''

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

function getCurrentPatch() {
    $.get(appBaseURL+'/current')
    .done(function (data) {
        $('#current-patch').empty();
        $('#current-patch').append('<p>'+data+'</p>');
        currentPatch = data;
        $('button').each(function() {
            $(this).removeClass('btn-success').addClass('btn-primary');
            if ($(this).data("patch") == currentPatch) $(this).removeClass('btn-primary').addClass('btn-success');
        });
       
    })
    .fail(function () {
        console.log('problem');
    });
}

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
    $.get(appBaseURL+'/list_patches')
    .done(function (data) {
        data.forEach(function(p) {
            //selectable_patch = $('<p class="selectable-patch">'+p+'</p>');
            selectable_patch = $('<button type="button" class="selectable-patch btn btn-primary">'+p+'</button>');
            selectable_patch.data("patch", p);  
            $('#patch-list').append('<p></p>').append(selectable_patch);
        });
        getCurrentPatch();
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
            getCurrentPatch();
        })
        .fail(function () {
            console.log('problem');
        });
    });

});
