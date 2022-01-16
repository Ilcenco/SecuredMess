$(document).ready(function () {
    if (localStorage.getItem('x-auth-token') == null) {

        if (window.confirm('You have to register or log in')) {
            location.href = "https://localhost:44324/SignIn/SignIn";
        }
        else {
            location.href = "https://localhost:44324/SignUp/SignUp";
        }
    }
    else {
        $('#mainContainer').css('display', 'flex');
        $('.userNameText').text(localStorage.getItem('x-username'));
    }
});