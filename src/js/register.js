window.onload = function () {
    common_script.updateCartItem();
}

var password = document.getElementById("userpwd"), confirm_password = document.getElementById("confirmpwd");

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;