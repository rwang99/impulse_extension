
//Regex to find the place order button
var p = document.getElementsByClassName("place-order-button-link");


$("#sc-buy-box-ptc-button").click(function(){
    var mod = document.createElement('div');
    $('#sc-subtotal-amount-activecart').after('<div style="background-color:yellow"> New div </div>');
    mod.setAttribute('modal', '');
    document.querySelector('#sc-new-upsell').appendChild(mod);
    alert("Test: " + $("#sc-subtotal-amount-activecart").text());

});