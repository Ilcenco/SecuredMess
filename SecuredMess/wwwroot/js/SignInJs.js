$(document).ready(function () {
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

    var formData = $("#logInForm").serializeArray();
    console.log(formData);

    $.ajax({
        url: "https://localhost:8000/auth/sign-in",
        method: "POST",
        data: formData,
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log(this.url);
        }
    });
}