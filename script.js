// When the user presses proceed to checkout
$("#sc-buy-box-ptc-button").click(function(e){

    e.preventDefault(); // Pause the request

    let modalHTML = '<div class="modal-impulse">'+
                        '<div class = "container-fluid modal-impulse-content">'+
                            '<div class = "modal-impulse-header row">' +
                                '<h1 class = "col-md-12 text-center">Impulse</h1>' +
                            '</div>' +
                            '<div class = "modal-impulse-main row">' +
                                '<h2 class = "text-center light col-md-12" id = "impulse-main-instruct">Provide Justification For This Purchase.</h2>' +
                                '<br>' +
                                '<form class = "col-md-8 offset-md-2">' +
                                    '<div class="form-group">' +
                                        '<textarea class="form-control" rows="5" id="modal-justification"></textarea>' +
                                    '</div>' +
                                    '<br>' +
                                    '<div class = "text-center">' +
                                        '<button type="submit" class="btn btn-primary">Buy Anyway</button> ' +
                                        '<button class="btn btn-primary">This Is An Impulse Purchase</button>' +
                                    '</div>'+
                                '</form>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

    $('body').append(modalHTML);

});
