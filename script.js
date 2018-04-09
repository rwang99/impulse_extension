let authorizedPurchase = false;
let itemPriceAccountedFor = false;

let appId = 'impulse-gmdpe';
let stitchClientPromise = stitch.StitchClientFactory.create(appId);

let modalHTML = '<div class = "impulse-modal-wrapper">' +

                '</div>';

let userIpAddress;
let userId;

$('body').append(modalHTML);

// When the user presses proceed to checkout button stop action
$("#sc-buy-box-ptc-button").click(function(e){

    if (authorizedPurchase == false){ // If the user has not put in their justification yet
        e.preventDefault(); // Pause the request
    }

    $.get( "https://freegeoip.net/json/", function( data ) {
        userIpAddress = data.ip;

        // Get the user id attached to our auth'ed ip
        $.get( `http://localhost:3000/auth/${userIpAddress}`, function( data ) {
            userId = data.userId;

            if (userId !== ""){ // If they are logged in (if their IP is in the DB)

                console.log(userId);

                // If the user has not put in their justification yet
                if (authorizedPurchase == false){

                    let numCharRequired = 50;
                    let loggedInModal = '<div class="impulse-modal">'+
                        '<div class = "container-fluid impulse-modal-content">'+
                        '<div class = "impulse-modal-header row">' +
                        '<h1 class = "col-md-12 text-center">Impulse</h1>' +
                        '</div>' +
                        '<div class = "impulse-modal-main row">' +
                        '<h2 class = "text-center impulse-modal-light col-md-12" id = "impulse-main-instruct">Why Are You Buying This?</h2>' +
                        '<br>' +
                        `<h5 class = "impulse-modal-char-count impulse-modal-light col-md-12 text-center">${numCharRequired} characters left until you can purchase this item.</h5>` +
                        '<br>' +
                        '<form class = "col-md-12">' +
                        '<div class="form-group col-md-6 offset-md-3">' +
                        '<textarea class="form-control impulse-modal-reason-box" rows="5"></textarea>' +
                        '</div>' +
                        '<br>' +
                        '<div class = "text-center">' +
                        '<button class="btn btn-primary" id = "impulse-modal-buy-button">Buy Anyway</button> ' +
                        '<button class="btn btn-primary" id = "impulse-modal-cancel-button">This Is An Impulse Purchase</button>' +
                        '</div>'+
                        '</form>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    // Inject the modal html into the page
                    $('.impulse-modal-wrapper').html(loggedInModal);

                    // Disbale the buy now button until the use puts in the correct number of characters
                    if (numCharRequired > 0){
                        $('#impulse-modal-buy-button').attr('disabled', true);
                    }

                    // Function that tracks how many more characters the user has to put ini
                    $('.impulse-modal-reason-box').on('keyup', function(event) {
                        let numCharLeft = numCharRequired - $(this).val().length;
                        if (numCharLeft < 0){
                            numCharLeft = 0;
                        }
                        $('.impulse-modal-char-count').html(numCharLeft + " characters left until you can purchase this item.");
                        if (numCharLeft == 0){
                            $('#impulse-modal-buy-button').attr('disabled', false);
                        }
                        else{
                            $('#impulse-modal-buy-button').attr('disabled', true);
                        }
                    });

                    // If the user clicks the buy now button then they have inputted the min number of chars
                    $("#impulse-modal-buy-button").click(function(){

                        authorizedPurchase = true; // Alter the boolean

                        let purchasedData = {

                            itemTitle: $('.sc-product-title')[0].innerHTML,
                            itemPrice: $('.sc-product-price')[0].innerHTML.replace('$',''),
                            purchaseDate: (new Date).getTime(),
                            wasPurchased: true,
                            decisionReason: $(".impulse-modal-reason-box").val(),

                        };

                        // Get the user id attached to our ip
                        $.get( `http://localhost:3000/auth/${userIpAddress}`, function( data ) {
                            const userId = data.userId;

                            // Use the user id to fetch the user document with that id with stitch
                            stitchClientPromise.then(client => {
                                const db = client.service('mongodb', 'mongodb-atlas').db('impulse');
                                client.login().then(()=>
                                    db.collection('users').find({id: userId}).execute()
                                ).then(userDocument => {
                                    // Push the purchase data onto the document
                                    userDocument[0].purchaseData.push(purchasedData)

                                    // // Re-Save the document
                                    db.collection('users').updateOne({id: userId}, userDocument[0]);
                                }).catch(err => {
                                    console.error(err)
                                });
                            });
                        });

                        $(".impulse-modal-wrapper").html(""); // Blank the modal
                        $('#sc-buy-box-ptc-button').trigger('click'); // Allow them to continue with their checkout
                    })

                    // If the user cancels the purchase
                    $("#impulse-modal-cancel-button").click(function(){
                        if (!itemPriceAccountedFor){ // If we have not accounted for the savings, account for them

                            let unpurchasedData = {

                                itemTitle: $('.sc-product-title')[0].innerHTML,
                                itemPrice: $('.sc-product-price')[0].innerHTML.replace('$',''),
                                purchaseDate: (new Date).getTime(),
                                wasPurchased: false,
                                decisionReason: "",

                            }

                            // Get the user id attached to our auth'ed ip
                            $.get( `http://localhost:3000/auth/${userIpAddress}`, function( data ) {
                                const userId = data.userId;

                                // Use the user id to fetch the user document with that id with stitch
                                stitchClientPromise.then(client => {
                                    const db = client.service('mongodb', 'mongodb-atlas').db('impulse');
                                    client.login().then(()=>
                                        db.collection('users').find({id: userId}).execute()
                                    ).then(userDocument => {
                                        // Push the purchase data onto the document
                                        userDocument[0].purchaseData.push(unpurchasedData)

                                        // // Re-Save the document
                                        db.collection('users').updateOne({id: userId}, userDocument[0]);
                                    }).catch(err => {
                                        console.error(err)
                                    });
                                });
                            });

                        }
                        $(".impulse-modal-wrapper").html(""); // Blank the modal
                        itemPriceAccountedFor = true;
                    })

                }

                else { // If the user has already inputted their justification, don't bring the modal again
                    $(".impulse-modal-wrapper").html("");
                }

            } else { // If the user is not logged in

                let notLoggedInModal = '<div class="impulse-modal">'+
                    '<div class = "container-fluid impulse-modal-content">'+
                    '<div class = "impulse-modal-header row">' +
                    '<h1 class = "col-md-12 text-center">Impulse</h1>' +
                    '</div>' +
                    '<br>' +
                    '<div class = "impulse-modal-main row">' +
                    '<h2 class = "text-center impulse-modal-light col-md-12">Please Log In Using the Extension.</h2>' +
                    '</div>' +
                    '<div class = "row">' +
                    '<div class = "col-md-12 text-center"><button class="btn btn-primary" id = "impulse-modal-close-button">Close</button></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                // Inject the modal html into the page
                $('.impulse-modal-wrapper').html(notLoggedInModal);

                $('#impulse-modal-close-button').click(function(){
                    $('.impulse-modal-wrapper').html("");
                })

            }
        });
    });

});
