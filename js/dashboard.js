$(document).ready(function(){

    if (localStorage.getItem('user') == "null"){
        $(".not-signed-in").show();
        $(".signed-in").hide();
    }
    else{
        $("#welcome-text").html("Welcome, " + JSON.parse(localStorage.getItem('user')).user.name);
        $(".not-signed-in").hide();
        $(".signed-in").show();
    }

    $( "#signin-button" ).click(function() {
        const email = $('#name').val();
        const password = $('#password').val();
        const data = { email, password };

        $.post( "http://localhost:3000/sign-in-extension", data, function( user ) {
            // Now the global userId has a value. The user is logged in and can see their data.
            localStorage.setItem('user', JSON.stringify(user));

            $(".not-signed-in").hide();
            $(".signed-in").show();

            $("#welcome-text").html("Welcome, " + user.user.name);

        });
    });

    $ ( "#logout-button").click(function(){

        localStorage.setItem('user', null);

        $(".not-signed-in").show();
        $(".signed-in").hide();

    })

})
