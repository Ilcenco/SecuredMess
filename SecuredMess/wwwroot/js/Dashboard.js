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
var destinationId = "";

function DrawCompanions(list) {
    list.forEach(name => AppendCompanion(name));
}
function AppendCompanion(name) {
    var id = "'" + name + "'";
    var showName = name;
    var sample = '<div class="contact" id="' + showName + '">' +
        '<div class="activePlusInfo" id="' + showName + '" onclick="GetMessageList('+ id +')">' +
        '<div class="activeContact"> </div>' +
        '<div class="contactsInfo">' +
        '<div class="contactImageContainer">' +
        '<img class="contactImage" src="/images/fox%20(2).png" alt="">' +
        '</div>' +
        '<div class="contactsInfo">' +
        '<p class="contactName">' + id + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="deleteContactContainer" id="' + showName + '" onclick="DeleteCompanion('+ id +')">' +
        '<input class="deleteContactIcon" type="image" name="Delete Contact Button"' +
        'src="/images/trash.png" alt="delete contact">' +
        '</div>' +
        '</div>';

    $(".contactsContainer").append(sample);
   
}

//<div class="receivedMessage">
//                    <div class="textMessageContainer">
//                        <p class="textMessageReceived">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                            Necessitatibus ratione vero iure in id perspiciatis numquam est. Fugit quas laboriosam
//                            similique reiciendis, atque, quam officiis et, id odio cum perspiciatis.</p>
//                    </div>
//                </div>
//                <div class="sentMessage">
//                    <p class="textMessageSend">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam quod
//                        repellat quae deserunt non consequuntur reiciendis enim nam doloremque corrupti? Sapiente vero
//                        beatae tenetur laboriosam quibusdam magnam doloribus voluptatem architecto.</p>
//                </div>


function AppendMessages(list) {
    list.forEach(m => DrawMessage(m));
}
function DrawMessage(m) {
    var sample = "";
    if (m.author_id == destinationId) {
        sample =
            '<div class="receivedMessage">' +
            '<div class="textMessageContainer">' +
            '<p class="textMessageReceived">' + m.content + '</p>' + 
            '</div>' +
            '</div>';
    }
    else {
        sample =
            '<div class="sentMessage">' + 
            '<p class="textMessageSend">'+ m.content + '</p>'
            '</div>';
    }
    $("#messagesContainer").append(sample);
}


function SendMessage() {
    var data = {
        destination_id: destinationId,
        content: $("#messageInput").val(),
    }
    data = JSON.stringify(data);
    console.log(data);
    $("#messageInput").val("");

    $.ajax({
        url: 'http://localhost:8000/message/send',
        method: 'POST',
        headers: {
            "Authorization": authString,
        },
        data: data,
        success: function (responseData) {
            GetMessageList(destinationId);
        },
        error: function (responseData) {
            console.log(responseData);
        }
    });
}

function GetMessageList(name) {
    destinationId = name;
    $(".sentMessage").remove();
    $(".receivedMessage").remove();
    $.ajax({
        url: 'http://localhost:8000/message/' + name,
        method: 'GET',
        headers: {
            "Authorization": authString,
        },
        success: function (responseData) {
            AppendMessages(responseData);
        },
        error: function (responseData) {
            console.log(responseData);
        }
    });

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

