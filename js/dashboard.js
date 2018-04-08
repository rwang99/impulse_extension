let userIpAddress;

$(document).ready(function(){

    // If the user is not logged in, don't let them in
    if (localStorage.getItem('user') == "null" || localStorage.getItem('user') == "undefined"){
        $(".not-signed-in").show();
        $(".signed-in").hide();
    }
    else{ // If the user is logged in, let them in
        $("#welcome-text").html("Welcome, " + JSON.parse(localStorage.getItem('user')).user.name);
        $(".not-signed-in").hide();
        $(".signed-in").show();
    }

    // When they try to sign in, create {ip, id} k,v pair in the db (so modal can access)
    $( "#signin-button" ).click(function() {
        const email = $('#name').val();
        const password = $('#password').val();
        // get ip
        $.get( "https://freegeoip.net/json/", function( data ) {
            userIpAddress = data.ip;
            const postData = { email, password, ip: userIpAddress};

            $.post( "http://localhost:3000/sign-in-extension", postData, function( user ) {
                // Now the global userId has a value. The user is logged in and can see their data.
                localStorage.setItem('user', JSON.stringify(user));

                $(".not-signed-in").hide();
                $(".signed-in").show();

                $("#welcome-text").html("Welcome, " + user.user.name);

            });
        });

    });

    // When they log out, delete {ip, id} k,v pair in the db, erase local storage, update ui
    $ ( "#logout-button").click(function(){

        localStorage.setItem('user', null);

        $(".not-signed-in").show();
        $(".signed-in").hide();

        // Delete auth for client ip
        $.ajax({
            url: `http://localhost:3000/auth/${userIpAddress}`,
            type: 'DELETE',
            success: function(result) {
                if(result.status === "success"){
                    console.log(`Success. Auth for ip ${userIpAddress} removed.`)
                } else if(result.status === "failure"){
                    console.log(`Failure. Auth for ip ${userIpAddress} had a problem being removed.`)
                }
            }
        });

    })

})
