// When the user presses proceed to checkout
$("#sc-buy-box-ptc-button").click(function(e){

    let numCharRequired = 100;

    e.preventDefault(); // Pause the request

    let modalHTML = '<div class="modal-impulse">'+
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
                                        '<button type="submit" class="btn btn-primary">Buy Anyway <i class="fas fa-credit-card"></i></button> ' +
                                        '<button class="btn btn-primary">This Is An Impulse Purchase <i class="fas fa-ban"></i></button>' +
                                    '</div>'+
                                '</form>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

    $('body').append(modalHTML);

    $('.impulse-reason-box').on('keyup', function(event) {
       let numChar = numCharRequired - $(this).val().length;
      $('.char-count').html(numChar + " characters left until you can purchase this item.");
    });

});
