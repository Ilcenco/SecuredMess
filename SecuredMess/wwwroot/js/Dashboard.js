$(document).ready(function () {
    //check if authenticated
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

        GetCompanions();
    }
    //this leave uncommented if development
    //$('#mainContainer').css('display', 'flex');
});

var authString = "Bearer " + localStorage.getItem('x-auth-token');

function DrawCompanions(list) {
    list.forEach(name => AppendCompanion(name));
}
function AppendCompanion(name) {
    var id = "'" + name + "'";

    var sample = '<div class="contact" id="' + name + '">' +
        '<div class="activePlusInfo" id="' + name + '" onclick="GetMessageList('+ id +')">' +
        '<div class="activeContact"> </div>' +
        '<div class="contactsInfo">' +
        '<div class="contactImageContainer">' +
        '<img class="contactImage" src="/images/fox%20(2).png" alt="">' +
        '</div>' +
        '<div class="contactsInfo">' +
        '<p class="contactName">' + name + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="deleteContactContainer" id="' + name + '" onclick="DeleteCompanion('+ id +')">' +
        '<input class="deleteContactIcon" type="image" name="Delete Contact Button"' +
        'src="/images/trash.png" alt="delete contact">' +
        '</div>' +
        '</div>';

    $(".contactsContainer").append(sample);
   
}


function GetMessageList(name) {
    console.log("message list " + name);

}


function AddCompanion() {

    var username = $("#addUserInput").val();

    $.ajax({
        url: 'http://localhost:8000/chat/add_companion/' + username,
        method: 'POST',
        headers: {
            "Authorization": authString,
        },
        success: function (responseData) {
            $(".contact").remove();
            GetCompanions();
        },
        error: function (responseData) {
            console.log(responseData);
        }
    });
}

function GetCompanions() {
    //var authString = "Bearer " + localStorage.getItem('x-auth-token');
    console.log(authString);
    $.ajax({
        url: "http://localhost:8000/chat/get_companions",
        method: "GET",
        headers: {
            "Authorization": authString,
        },
        success: function (data) {
            DrawCompanions(data);
        },
        error: function (data) {
            alert(data);
        }
    });

}
function DeleteCompanion(name) {

    $.ajax({
        url: 'http://localhost:8000/chat/remove_companion/' + name,
        method: "POST",
        headers: {
            "Authorization": authString,
        },
        success: function (data) {
            $(".contact").remove();
            GetCompanions();
        },
        error: function (data) {
            alert(data);
        }
    });
}

