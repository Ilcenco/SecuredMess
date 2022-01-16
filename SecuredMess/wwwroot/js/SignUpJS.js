$(document).ready(function () {
    window.localStorage.removeItem('x-auth-token');
    window.localStorage.removeItem('x-username');

    $("#signUpForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 7,
                maxlength: 22,
            },
            password: {
                required: true,
                minlength: 9,
            },
            passwordConfirm: {
                required: true,
                equalTo: "#typePassword"
            }
        }
    });
    $("#signUpForm").submit(function (event) {
        event.preventDefault();
        if ($("#signUpForm").valid()) {
            SignUpRequest();
        }
    });

});

function SignUpRequest() {

    var formData = {
        username: $("#typeUserName").val(),
        password: $("#typePassword").val(),
    }
    console.log(formData);

    $.ajax({
        url: 'http://localhost:8000/auth/sign-up',
        method: 'POST',
        data: JSON.stringify(formData),
        success: function (responseData, textStatus, jqXHR) {
            if (window.confirm('You have been successfuly registered! Thank You.')) {
                location.href = "https://localhost:44324/SignIn/SignIn";
            }
            else {
                location.href = "https://localhost:44324/SignUp/SignUp";
            }
            //alert("You have been successfuly registered! Thank You.")
        },
        error: function (responseData, textStatus, errorThrown) {
            alert('This username is taken');
        }
    });
}
