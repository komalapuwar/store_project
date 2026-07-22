function validateForm() {

    let password = document.getElementById("password-input").value;
    let confirmPassword = document.getElementById("confirm-password-input").value;

   
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    return true;
}