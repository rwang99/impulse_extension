
//Regex to find the place order button
var p = document.getElementsByClassName("place-order-button-link");

/*
$("#sc-buy-box-ptc-button").click(function(){
    var mod = document.createElement('div');
    mod.setAttribute('modal', '');
    document.querySelector('#sc-new-upsell').appendChild(mod);
    alert("Test: " + $("#sc-subtotal-amount-activecart").text());

});

*/

$("#sc-buy-box-ptc-button").click(function(){
    event.preventDefault();

    $('body').append('<div class="modal"><div class = "modal-content"> HELO' + $("#sc-subtotal-amount-activecart").text() + '</div></div>');

    event.submit();

});

$("#sc-buy-box-ptc-button").submit(function(e){

    e.preventDefault();

    $('body').append('<div class="modal"><div class = "modal-content"> HELO' + $("#sc-subtotal-amount-activecart").text() + '</div></div>');

    setInterval(function(){
        e.submit();
    },1000);

});
