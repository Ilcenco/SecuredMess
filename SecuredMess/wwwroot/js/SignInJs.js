$(document).ready(function () {
    window.localStorage.removeItem('x-auth-token');
    window.localStorage.removeItem('x-username');


    $("#logInForm").validate({
        rules: {
            userName: {
                required: true,
                minlength: 7,
                maxlength: 22,
            },
            password: {
                required: true,
                minlength: 9,
            }
        }
    });
    $("#logInForm").submit(function (event) {
        event.preventDefault();
        if ($("#logInForm").valid()) {
            SignInRequest();
        }     
    });

});

function SignInRequest() {

    var formData = {
        username: $("#typeuserName").val(),
        password: $("#typePassword").val(),
    }
    console.log(formData);

    $.ajax({
        url: 'http://localhost:8000/auth/sign-in',
        method: 'POST',
        data: JSON.stringify(formData),
        success: function (responseData) {
            window.localStorage.setItem('x-auth-token', responseData.token);
            window.localStorage.setItem('x-username', $("#typeuserName").val());
            location.href = "https://localhost:44324/Messenger/MessengerLayout";
        },
        error: function (responseData) {
            $('#signInError').removeAttr('hidden');
        }
    });
}

$("#typeuserName").focus(function () {
    $("#signInError").attr("hidden", true);
});
$("#typePassword").focus(function () {
    $("#signInError").attr("hidden", true);
});