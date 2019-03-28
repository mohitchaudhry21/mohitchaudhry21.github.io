if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var addToCartButtons = document.getElementsByClassName('addtocartbutton')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    if (localStorage.cartData) {
        //Do nothing
    } else {
        //initialize
        localStorage.setItem('cartData', JSON.stringify([]));
    }
}
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('itemname')[0].innerText
    var price = shopItem.getElementsByClassName('itemprice')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('itemimage')[0].src

    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {
    let cart = JSON.parse(localStorage.cartData);
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].title == title) {
            alert('This Item is Already in your Cart! You Cannot Add It Again!')
            return
        }
    }

        cart.push({ title, price, imageSrc, qty: 1 });
    
    localStorage.setItem('cartData', JSON.stringify(cart));
}
function ValidationEvent() {
    var name = document.getElementById("name").value;

    var email = document.getElementById("email").value;

    var comment = document.getElementById("comment").value;

    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (name != '' && email != '' && comment != '') {
        if (email.match(emailReg)) {
            alert("Thank You for Submitting!");
            return true;
        }
        else {
            alert("Invalid")
            return false;
        }
    }
}
