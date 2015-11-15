

$(document).on("click", "#nav-display-click", function() {
    
    //$('#content').css('margin', '225px auto');

    $("#guest-user").toggle();

    //$('.dropdown-toggle').dropdown();

    //$("#page-overlay, #nav-login-container").click(function () {
     //   $("#page-overlay, #nav-login-container").hide();
   // });

});




$(document).on("click", "#list-options-click", function() {
    $('.list-options').toggle();
});

$(document).on("click", "#word-options-click", function() {
    $('.word-options').toggle();
});


$(document).on("mouseover", ".word-container", function() {

        $(this).children(".delete-word").show();

        // hide
        $("#words-container").mouseout(function () {
            $(".delete-word").hide();
        });
});

