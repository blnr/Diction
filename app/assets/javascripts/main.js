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



$(document).on("click", ".display-menu-text", function() {
        $("#sort-options").toggle();
});

$(document).on("mouseover", ".word-container", function() {
        $(".delete-word").show();

        // hide
        $("#words-container").mouseover(function () {
            $(".delete-word").hide();
        });

});

