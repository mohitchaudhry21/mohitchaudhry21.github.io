if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked);
    updateView();
    updateCartTotal();
}

function purchaseClicked() {
    alert('Thank You for Your Purchase! Enjoy!')
    localStorage.setItem('cartData', JSON.stringify([]));
    updateCartTotal();
    updateView();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    let parentRow = buttonClicked.parentElement.parentElement;
    let titleToRemove = parentRow.getElementsByClassName('citemname')[0].innerHTML;
    let cart = JSON.parse(localStorage.cartData);
    let indexToRemove = -1;
    for (let i = 0; i < cart.length; i++) {
        const x = cart[i];
        if (x.title === titleToRemove) {
            indexToRemove = i;
            break;
        }
    }
    cart.splice(indexToRemove, 1);
    localStorage.setItem('cartData', JSON.stringify(cart));
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    updateView();
}

function quantityChanged(event) {
    var input = event.target
    let newQty = input.value;
    if (isNaN(newQty) || newQty <= 0) {
        newQty = 1
    }
    let parentRow = input.parentElement.parentElement;
    let titleToRemove = parentRow.getElementsByClassName('citemname')[0].innerHTML;
    let cart = JSON.parse(localStorage.cartData);
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === titleToRemove) {
            cart[i].qty =  newQty
        }
    }
    localStorage.setItem('cartData', JSON.stringify(cart));
    updateCartTotal();
    updateView();
}

function updateCartTotal() {
    var total = 0
    let cart = JSON.parse(localStorage.cartData);
    for (let i = 0; i < cart.length; i++) {
        const x = cart[i];
        var price = parseFloat(x.price.replace('$', ''));
        var quantity = x.qty;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('totalprice')[0].innerText = '$' + total
}

function updateView(){
    let cart = JSON.parse(localStorage.cartData);
    var cartRowContents = ``;
    var cartItems = document.getElementsByClassName('citems')[0];
    for (let i = 0; i < cart.length; i++) {
        const x = cart[i];
        cartRowContents += `
        <div class="crow">
            <div class="citem cart-column">
                <img class="citemimage" src="${x.imageSrc}" width="100" height="100">
                <span class="citemname">${x.title}</span>
            </div>
            <span class="cprice cart-column">${x.price}</span>
            <div class="cquantity cart-column">
                <input class="cquantity-input" type="number" value="${x.qty}">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`;
    }
    cartItems.innerHTML = cartRowContents;
    var allRemoveButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < allRemoveButtons.length; i++) {
        var button = allRemoveButtons[i]
        button.removeEventListener('click', removeCartItem)
        button.addEventListener('click', removeCartItem)
    }
    var qtyChange = document.getElementsByClassName('cquantity-input')
    for (var i = 0; i < qtyChange.length; i++) {
        var button = qtyChange[i]
        button.removeEventListener('click', quantityChanged)
        button.addEventListener('click', quantityChanged)
    }
}