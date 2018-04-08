let poppedUp = false;
let itemPriceAccountedFor = false;

let appId = 'impulse-gmdpe';
let stitchClientPromise = stitch.StitchClientFactory.create(appId);

let modalHTML = '<div class = "modal-impulse-wrapper">' +

                '</div>';

$('body').append(modalHTML);

// When the user presses proceed to checkout button stop action
$("#sc-buy-box-ptc-button").click(function(e){

    if (2==2){ // If they are logged in

        // If the user has not put in their justification yet
        if (poppedUp == false){

            e.preventDefault(); // Pause the request

            let numCharRequired = 50;
            let loggedInModal = '<div class="modal-impulse">'+
                                    '<div class = "container-fluid modal-impulse-content">'+
                                        '<div class = "modal-impulse-header row">' +
                                            '<h1 class = "col-md-12 text-center">Impulse</h1>' +
                                        '</div>' +
                                        '<div class = "modal-impulse-main row">' +
                                            '<h2 class = "text-center modal-light col-md-12" id = "impulse-main-instruct">Why Are You Buying This?</h2>' +
                                            '<br>' +
                                            `<h5 class = "char-count modal-light col-md-12 text-center">${numCharRequired} characters left until you can purchase this item.</h5>` +
                                            '<br>' +
                                            '<form class = "col-md-12">' +
                                                '<div class="form-group col-md-6 offset-md-3">' +
                                                    '<textarea class="form-control impulse-reason-box" rows="5"></textarea>' +
                                                '</div>' +
                                                '<br>' +
                                                '<div class = "text-center">' +
                                                    '<button class="btn btn-primary" id = "impulse-modal-buy">Buy Anyway</button> ' +
                                                    '<button class="btn btn-primary" id = "impulse-modal-cancel">This Is An Impulse Purchase</button>' +
                                                '</div>'+
                                            '</form>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

            // Inject the modal html into the page
            $('.modal-impulse-wrapper').html(loggedInModal);

            // Disbale the buy now button until the use puts in the correct number of characters
            if (numCharRequired > 0){
                $('#impulse-modal-buy').attr('disabled', true);
            }

            // Function that tracks how many more characters the user has to put ini
            $('.impulse-reason-box').on('keyup', function(event) {
                let numCharLeft = numCharRequired - $(this).val().length;
                if (numCharLeft < 0){
                    numCharLeft = 0;
                }
                $('.char-count').html(numCharLeft + " characters left until you can purchase this item.");
                if (numCharLeft == 0){
                    $('#impulse-modal-buy').attr('disabled', false);
                }
                else{
                    $('#impulse-modal-buy').attr('disabled', true);
                }
            });

            // If the user clicks the buy now button then they have inputted the min number of chars
            $("#impulse-modal-buy").click(function(){

                poppedUp = true; // Alter the boolean

                let purchasedData = {

                    itemTitle: $('.sc-product-title')[0].innerHTML,
                    itemPrice: $('.sc-product-price')[0].innerHTML.replace('$',''),
                    purchaseDate: (new Date).getTime(),
                    wasPurchased: true,
                    decisionReason: $(".impulse-reason-box").val(),

                };

                // Get our ip to get the user id from auth db
                $.get( "http://freegeoip.net/json/", function( data ) {
                    const ip = data.ip;
                    console.log(ip)

                    // Get the user id attached to our auth'ed ip
                    $.get( `http://localhost:3000/auth/${ip}`, function( data ) {
                        console.log(data)
                        const userId = data.userId;

                        // User the id to fetch the user document with that id with stitch
                        console.log(userId);
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

                        // Push the purchase data onto the document and re-save with Stitch
                    });
                });

                $(".modal-impulse-wrapper").html(""); // Blank the modal
                $('#sc-buy-box-ptc-button').trigger('click'); // Allow them to continue with their checkout
            })

            // If the user cancels the purchase
            $("#impulse-modal-cancel").click(function(){
                console.dir(JSON.parse(localStorage.getItem("user")));
                if (!itemPriceAccountedFor){ // If we have not accounted for the savings, account for them

                    let unpurchasedData = {

                        itemTitle: $('.sc-product-title')[0].innerHTML,
                        itemPrice: $('.sc-product-price')[0].innerHTML.replace('$',''),
                        purchaseDate: (new Date).getTime(),
                        wasPurchased: false,
                        decisionReason: "",

                    }

                    // Get our ip to get the user id from auth db
                    $.get( "https://freegeoip.net/json/", function( data ) {
                        const ip = data.ip;
                        console.log(ip)

                        // Get the user id attached to our auth'ed ip
                        $.get( `http://localhost:3000/auth/${ip}`, function( data ) {
                            console.log(data)
                            const userId = data.userId;

                            // User the id to fetch the user document with that id with stitch
                            console.log(userId);
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

                            // Push the purchase data onto the document and re-save with Stitch
                        });
                    });

                }
                $(".modal-impulse-wrapper").html(""); // Blank the modal
                itemPriceAccountedFor = true;
            })

        }

        else { // If the user has already inputted their justification, don't bring the modal again
            $(".modal-impulse-wrapper").html("");
        }

    }
    else { // If the user is not logged

        e.preventDefault(); // Pause the request

        let notLoggedInModal = '<div class="modal-impulse">'+
                                    '<div class = "container-fluid modal-impulse-content">'+
                                        '<div class = "modal-impulse-header row">' +
                                            '<h1 class = "col-md-12 text-center">Impulse</h1>' +
                                        '</div>' +
                                        '<br>' +
                                        '<div class = "modal-impulse-main row">' +
                                            '<h2 class = "text-center modal-light col-md-12">Please Log In Using the Extension.</h2>' +
                                        '</div>' +
                                        '<div class = "row">' +
                                            '<div class = "col-md-12 text-center"><button class="btn btn-primary" id = "impulse-modal-close">Close</button></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

        // Inject the modal html into the page
        $('.modal-impulse-wrapper').html(notLoggedInModal);

        $('#impulse-modal-close').click(function(){
            $('.modal-impulse-wrapper').html("");
        })

    }

});
