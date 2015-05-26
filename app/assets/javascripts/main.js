$(document).ready(function () {
    // Word settings
    // --------------------------------
    $("#display-menu-text").click(function () {
        // display
        $("#page-overlay, #sort-options").show();
    });
    // hide
    $("#page-overlay").click(function () {
        $("#page-overlay, #word-settings").hide();
    });
});



$(document).on("click", "#nav-guest", function() {
        $("#nav-login-container").toggle();
        //$("#page-overlay").show();

    $("#form-login").submit(function () {
        $("#nav-login-container").hide();
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

