$(document).ready(function () {
    $("#signUpForm").validate({
        rules: {
            email: {
                required: true,
                minlength: 8,
                maxlength: 30,
            },
            userName: {
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

    var formData = $("#signUpForm").serializeArray();
    console.log(formData);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8000/auth/sign-up',
        crossDomain: true,
        data: formData,
        dataType: 'json',
        success: function (responseData, textStatus, jqXHR) {

            console.log(responseData);

        },
        error: function (responseData, textStatus, errorThrown) {
            alert('POST failed.');
        }
    });

    //$.ajax({
    //    type: "POST",
    //    url: "https://localhost:8000/auth/sign-up",
    //    dataType: "jsonp",
    //    data: formData,
    //    success: function (data) {
    //        console.log(data);

    //    },
    //    error: function (xhr, status, error) {
    //        console.log(error);

    //    }
    //});
}