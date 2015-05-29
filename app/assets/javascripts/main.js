$(document).ready(function () {
    // Word settings
    // --------------------------------
    $("#display-menu-text").click(function () {
        // display
        $("#page-overlay, #sort-options").show();
    });
    // hide
    $("#page-overlay").click(function () {
        $("#page-overlay, #nav-login-container, #word-settings").hide();
    });
});



$(document).on("click", "#nav-guest, .create-account", function() {
        $("#nav-login-container, #page-overlay").toggle();

    $("#form-login").submit(function () {
        $("#nav-login-container, #page-overlay").hide();
        $("#form-login input").val("");

    });


    //$("#page-overlay, #nav-login-container").click(function () {
     //   $("#page-overlay, #nav-login-container").hide();
   // });

});

$(document).on("mouseover", ".word-container", function() {
        $(".delete-word").show();

        // hide
        $("#words-container").mouseover(function () {
            $(".delete-word").hide();
        });

});

