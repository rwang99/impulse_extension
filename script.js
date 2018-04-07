
//Regex to find the place order button
var p = document.getElementsByClassName("place-order-button-link");


$("#sc-buy-box-ptc-button").click(function(){
    var mod = document.createElement('div');
    mod.setAttribute('modal', '');
    document.querySelector('#sc-new-upsell').appendChild(mod);
    alert("Test: " + $("#sc-subtotal-amount-activecart").text());

});