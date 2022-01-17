$(document).ready(function () {

    //check if authenticated
    //if (localStorage.getItem('x-auth-token') == null) {

    //    if (window.confirm('You have to register or log in')) {
    //        location.href = "https://localhost:44324/SignIn/SignIn";
    //    }
    //    else {
    //        location.href = "https://localhost:44324/SignUp/SignUp";
    //    }
    //}
    //else {
    //    $('#mainContainer').css('display', 'flex');
    //    $('.userNameText').text(localStorage.getItem('x-username'));
    //    GetCompanions();
    //}
    // this leave uncommented if development
    $('#mainContainer').css('display', 'flex');
});

function GetCompanions() {
    var authString = "Bearer " + localStorage.getItem('x-auth-token');
    console.log(authString);

    $.ajax({
        url: "http://localhost:8000/chat/get_companions",
        method: "GET",
        headers: {
            "Authorization": authString,
        },
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            alert(data);
        }
    });
}