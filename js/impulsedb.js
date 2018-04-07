
let globalUserData = {}; // The data off of the user document

let appId = 'impulse-gmdpe';
let stitchClientPromise = stitch.StitchClientFactory.create(appId);

$( "#signin-button" ).click(function() {
    const email = $('#name').val();
    const password = $('#password').val();
    const data = { email, password };

    $.post( "http://localhost:3000/sign-in-extension", data, function( user ) {
        // Now the global userId has a value. The user is logged in and can see their data
        globalUserData = user;
    });
});

// stitchClientPromise.then(client => {
//     const db = client.service('mongodb', 'mongodb-atlas').db('impulse');
//     client.login().then(()=>
//         db.collection('users').find({email: "ephremdsg@gmail.com"}).execute()
//     ).then(docs => {
//         console.log("Found docs", docs)
//         console.log("[MongoDB Stitch] Connected to Stitch")
//     }).catch(err => {
//         console.error(err)
//     });
// });
