let userData = {};

$( "#signin-button" ).click(function() {
    const email = $('#name').val();
    const password = $('#password').val();
    const data = { email, password };

    $.post( "http://localhost:3000/sign-in-extension", data, function( data ) {
        // Now the global userId has a value. The user is logged in and can see their data.
        userData = data.user;
    });
});